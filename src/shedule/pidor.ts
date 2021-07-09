import { TextChannel } from 'discord.js';
import { randomUser } from '../data';
import client from '../discord';
import { winner as phrases } from '../handlers/data/pidor_phrases';
import random from '../helpers/random';
import { wait } from '../helpers/time';

export default async () => {
  // @ts-ignore
  const channel = client.channels.cache.find((i) => i.type === 'text' && i.name === '👌│pidor_of_the_day') as TextChannel;
  if (!channel) {
    console.error('Unable to find pidor_of_the_day channel');
    return;
  }

  await channel.fetch();

  const searchPhrasesPack = phrases.search[random(0, phrases.search.length)];

  await searchPhrasesPack.reduce(async (promise: Promise<void>, phrase: string) => {
    await promise;
    await channel.send(phrase);
    await wait(2000);
  }, Promise.resolve());

  const {
    id,
    username,
  } = randomUser();

  const randomResultPhrase = phrases.result[random(0, phrases.result.length)];

  await channel.send(`${randomResultPhrase}<@${id}>`);

  console.log(`winner is ${username}`);
};
