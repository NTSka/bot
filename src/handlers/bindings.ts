import { Message } from 'discord.js';
import { handleWinner, handleAddUser, handleRemoveUser, handleTop, specialPidor } from './pidor';
import { handleMute, handleUnmute } from './mute';

export type Handler = (message: Message) => Promise<void>

export interface Binding {
    validation: RegExp,
    handle: Handler
}

const handlers: Binding[] = [
  {
    validation: /^!a$/,
    handle: handleAddUser,
  },
  {
    validation: /^!r$/,
    handle: handleRemoveUser,
  },
  {
    validation: /^!g$/,
    handle: handleWinner,
  },
  {
    validation: /^!t$/,
    handle: handleTop,
  },

  {
    validation: /^!m$/,
    handle: handleMute,
  },
  {
    validation: /^!u$/,
    handle: handleUnmute,
  },
  {
    validation: /^\\sr$/,
    handle: specialPidor,
  },
];

export default handlers;
