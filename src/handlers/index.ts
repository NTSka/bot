import { Client } from 'discord.js';
import handlers from './bindings';

export default (client: Client) => {
  client.on('message', async (message) => {
    const { content } = message;

    const handler = handlers.find((i) => content.match(i.validation));
    if (handler) {
      await handler.handle(message);
    }
  });

  console.log('Bot subscribe to events');
};
