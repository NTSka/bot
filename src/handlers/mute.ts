import { GuildMember, Message } from 'discord.js';
import path from 'path';
import config from '../config';
import client from '../discord';

const handleVoiceChat = async (msg: Message, text: string, state: boolean) => {
  if (!msg.member) {
    return;
  }

  if (!config.admins.includes(msg.author.username)) {
    msg.channel.send(text);
    await msg.member.voice.setMute(true);
    return;
  }

  await msg.delete({ timeout: 0 });

  if (!msg.member.voice.channel) {
    return;
  }

  const clientUser = client.user || {
    id: '',
  };

  await Promise
    .all(msg.member.voice.channel.members
      .map(async (i: GuildMember) => {
        if (i.user.id === msg.author.id) {
          return;
        }
        if (i.user.id === clientUser.id) {
          return;
        }

        await i.voice.setMute(state);
      }));
};

export const handleMute = async (msg: Message) => {
  await handleVoiceChat(msg, 'Очко себе дерни, а не мут, псина', true);
  const { member } = msg;
  if (!member) {
    return;
  }

  const voiceChanel = member.voice.channel;
  if (!voiceChanel) {
    return;
  }

  const connection = await voiceChanel.join();
  const dispatcher = await connection.play(path.resolve(process.cwd(), 'assets/audio/ebla.mp3'));
  dispatcher.on('finish', async () => {
    await dispatcher.destroy();
    await voiceChanel.leave();
  });
};

export const handleUnmute = async (msg: Message) => {
  await handleVoiceChat(msg, 'Очко себе дерни, а не мут, псина', false);
};
