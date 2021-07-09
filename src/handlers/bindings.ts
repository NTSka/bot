import { Message } from 'discord.js';
import {
  handleAddUser,
  handleRemoveUser,
  handleTop,
  handleList, handleRemoveUserByAdmin, handleRemoveFromTopByAdmin, handleHelp,
} from './pidor';
import { handleMute, handleUnmute } from './mute';

export type Handler = (message: Message) => Promise<void>

export interface Binding {
    validation: RegExp,
    handle: Handler
}

const handlers: Binding[] = [
  {
    validation: /^!cum$/,
    handle: handleHelp,
  },
  {
    validation: /^!a$/,
    handle: handleAddUser,
  },
  {
    validation: /^!r$/,
    handle: handleRemoveUser,
  },
  {
    validation: /^!rua */,
    handle: handleRemoveUserByAdmin,
  },
  {
    validation: /^!rta */,
    handle: handleRemoveFromTopByAdmin,
  },
  {
    validation: /^!l$/,
    handle: handleList,
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
];

export default handlers;
