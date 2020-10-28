import { Message } from 'discord.js';
import { addUser, getTop, getWinner, randomUser, removeUser } from '../data';
import phrases from './data/pidor_phrases';
import { wait } from '../helpers/time';
import random from '../helpers/random';

export const handleAddUser = async (msg: Message) => {
  const { author, channel } = msg;
  await msg.delete({ timeout: 0 });

  if (await addUser(author)) {
    channel.send(`<@${author.id}> добавлен в рулетку. Ты обязательно станешь пидором, я верю в тебя! <3`);
  } else {
    channel.send(`<@${author.id}> ты уже в пидрильном розыгрыше!`);
  }
};

export const handleRemoveUser = async (msg: Message) => {
  const { author, channel } = msg;

  if (await removeUser(author)) {
    channel.send(`<@${author.id}> ну и пошел на хуй, пидрила`);
  } else {
    channel.send(`<@${author.id}> ты и так не учавствовал, петушила`);
  }
};

export const handleWinner = async (msg: Message) => {
  const { channel } = msg;
  await msg.delete({ timeout: 0 });

  const winner = getWinner();
  if (winner) {
    await channel.send(`<@${winner.id}> сегодня пидорас дня.`);
    return;
  }

  const searchPhrasesPack = phrases.search[random(0, phrases.search.length)];

  await searchPhrasesPack.reduce(async (promise: Promise<void>, phrase: string) => {
    await promise;
    await channel.send(phrase);
    await wait(2000);
  }, Promise.resolve());

  const { id } = randomUser();

  const randomResultPhrase = phrases.result[random(0, phrases.result.length)];

  await channel.send(`${randomResultPhrase}<@${id}>`);
};

export const handleTop = async (msg: Message) => {
  const { channel } = msg;
  await msg.delete({ timeout: 0 });

  const top = getTop();

  let text = 'Рейтинг пидрил:\n';

  text += Object.entries(top)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => `<@${key}>: ${value} раз`).join('\n');
  channel.send(text);
};
