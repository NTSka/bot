import { Message } from 'discord.js';
import {
  addUser,
  getList,
  getTop, removeFromTopById,
  removeUser, removeUserById,
} from '../data';
import config from '../config';
import choosePhrase from '../helpers/choosePhrase';
import { adding, errorAdding, errorRemoving, removing } from './data/pidor_phrases';

export const handleHelp = async (msg:Message) => {
  console.log('help handler');
  const {
    author,
    channel,
  } = msg;

  const text = `<@${author.id}>, бестолочь, запомни:
  !a - добавиться в розыгрышь
  !r - удалиться из розыгрыша
  !l - список претендентов на звание пидора
  !t - список успешных людей
  Только для админов:
  !rua @username - удалить участника из розыгрыша
  !rta @username - удалить все заслуги участника
  !m - заставить всех завалить ебла
  !u - позволить плебеям говорить`;

  await channel.send(text);
};

export const handleAddUser = async (msg: Message) => {
  console.log('action add user');
  const {
    author,
    channel,
  } = msg;
  await msg.delete({ timeout: 0 });

  if (await addUser(author)) {
    channel.send(`<@${author.id}> ${choosePhrase(adding)}`);
    console.log(`User ${author.username} added`);
  } else {
    channel.send(`<@${author.id}> ${choosePhrase(errorAdding)}`);
  }
};

export const handleRemoveUser = async (msg: Message) => {
  console.log('action remove user');
  const {
    author,
    channel,
  } = msg;

  if (await removeUser(author)) {
    await channel.send(`:man_in_manual_wheelchair_tone1: <@${author.id}> ${choosePhrase(removing)}`);
    console.log(`user ${author.username} removed`);
  } else {
    channel.send(`<@${author.id}> ${choosePhrase(errorRemoving)}`);
  }
};

export const handleRemoveUserByAdmin = async (msg: Message) => {
  console.log('remove user by admin');
  const {
    author,
    content,
    channel,
  } = msg;
  await msg.delete({ timeout: 0 });

  if (!config.admins.includes(author.username)) {
    await channel.send(`<@${author.id}> ты что, ахуел?`);
    return;
  }

  const userID = content.replace(/[!<>@rua ]/g, '');
  if (Number.isNaN(Number(userID))) {
    await channel.send(`<@${author.id}> я тебя нихуя не понял`);
    return;
  }

  if (await removeUserById(userID)) {
    await channel.send(`<@${userID}> с позором выгнан`);
    console.log(`user ${author.username} removed`);
  } else {
    await channel.send(`<@${userID}> итак никогда не учавствовал`);
  }
};

export const handleRemoveFromTopByAdmin = async (msg: Message) => {
  console.log('remove from top by admin');
  const {
    author,
    content,
    channel,
  } = msg;
  await msg.delete({ timeout: 0 });

  if (!config.admins.includes(author.username)) {
    await channel.send(`<@${author.id}> ты что, ахуел?`);
    return;
  }

  const userID = content.replace(/[!<>@rta ]/g, '');
  if (Number.isNaN(Number(userID))) {
    await channel.send(`<@${author.id}> я тебя нихуя не понял`);
    return;
  }

  if (await removeFromTopById(userID)) {
    await channel.send(`список достижений <@${userID}> очищен`);
    console.log(`top for ${author.username} cleared`);
  } else {
    await channel.send(`У <@${userID}> и так не было никаких успехов`);
  }
};

export const handleList = async (msg: Message) => {
  console.log('get list');
  const { channel } = msg;
  await msg.delete(({ timeout: 0 }));

  const top = getList();

  let text = 'Список кандидатов:\n';

  text += top
    .map((v) => `:rainbow_flag: <@${v.id}>`)
    .join('\n');
  await channel.send(text);
  console.log('top handled  ');
};

export const handleTop = async (msg: Message) => {
  console.log('handle top');
  const { channel } = msg;
  await msg.delete({ timeout: 0 });

  const top = getTop();

  let text = 'Рейтинг пидрил:\n';

  text += Object.entries(top)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => `<@${key}>: ${value} раз`)
    .join('\n');
  channel.send(text);
  console.log('top handled  ');
};
