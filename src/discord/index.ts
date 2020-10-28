import { Client } from 'discord.js';
import config from '../config';

const client = new Client();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PERMISSIONS = 14336;

export const connect = async () => {
  await client.login(config.discord.token);
};

export default client;
