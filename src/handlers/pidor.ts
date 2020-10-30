import { Message } from 'discord.js';
import { resolve } from 'path';
import { addSpecialWinners, addUser, getTop, getWinner, randomUser, removeUser } from '../data';
import phrases from './data/pidor_phrases';
import { wait } from '../helpers/time';
import random from '../helpers/random';
import config from '../config';

export const specialPidor = async (msg: Message) => {
  console.log('special pidor action');
  const { author, guild, channel, member } = msg;
  await msg.delete({ timeout: 0 });

  if (!config.allowedId.includes(author.id)) {
    msg.channel.send('Ну ты и пиииидор');
    return;
  }

  if (!guild) {
    console.log('no guild');
    return;
  }

  const role = guild.roles.cache.get(config.specialRole);

  if (!role) {
    console.log('no role');
    return;
  }

  const ids = role.members.map((i) => ({ id: i.user.id, username: i.user.username }));

  const winner = addSpecialWinners(ids);

  channel.send(`<@${winner.id}> петушара`);

  if (!member) {
    return;
  }

  const voiceChanel = member.voice.channel;
  if (!voiceChanel) {
    return;
  }

  if (voiceChanel.members.find((i) => winner.id === i.user.id)) {
    const connection = await voiceChanel.join();
    const dispatcher = await connection.play(resolve(process.cwd(), 'assets/audio/petushara.mp3'));
    dispatcher.on('finish', async () => {
      await dispatcher.destroy();
      await voiceChanel.leave();
    });
  }
  console.log(`special pidor ${winner.username}`);
};

export const handleAddUser = async (msg: Message) => {
  console.log('action add user');
  const { author, channel } = msg;
  await msg.delete({ timeout: 0 });

  if (await addUser(author)) {
    channel.send(`<@${author.id}> добавлен в рулетку. Ты обязательно станешь пидором, я верю в тебя! <3`);
    console.log(`User ${author.username} added`);
  } else {
    channel.send(`<@${author.id}> ты уже в пидрильном розыгрыше!`);
  }
};

export const handleRemoveUser = async (msg: Message) => {
  console.log('action remove user');
  const { author, channel } = msg;

  if (await removeUser(author)) {
    channel.send(`<@${author.id}> ну и пошел на хуй, пидрила`);
    console.log(`user ${author.username} removed`);
  } else {
    channel.send(`<@${author.id}> ты и так не учавствовал, петушила`);
  }
};

export const handleWinner = async (msg: Message) => {
  console.log('get winner');
  const { channel } = msg;
  await msg.delete({ timeout: 0 });

  const winner = getWinner();
  if (winner) {
    await channel.send(`<@${winner.id}> сегодня пидорас дня.`);
    console.log(`winner already chosed ${winner.username}`);
    return;
  }

  const searchPhrasesPack = phrases.search[random(0, phrases.search.length)];

  await searchPhrasesPack.reduce(async (promise: Promise<void>, phrase: string) => {
    await promise;
    await channel.send(phrase);
    await wait(2000);
  }, Promise.resolve());

  const { id, username } = randomUser();

  const randomResultPhrase = phrases.result[random(0, phrases.result.length)];

  await channel.send(`${randomResultPhrase}<@${id}>`);

  console.log(`winner is ${username}`);
};

export const handleTop = async (msg: Message) => {
  console.log('handle top');
  const { channel } = msg;
  await msg.delete({ timeout: 0 });

  const top = getTop();

  let text = 'Рейтинг пидрил:\n';

  text += Object.entries(top)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => `<@${key}>: ${value} раз`).join('\n');
  channel.send(text);
  console.log('top handled  ');
};
