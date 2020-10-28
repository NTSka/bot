import { GuildMember, Message } from 'discord.js';

const handleVoiceChat = async (msg: Message, text: string, state: boolean) => {
  if (!msg.member) {
    return;
  }

  if (!msg.member.permissions.any('MUTE_MEMBERS')) {
    msg.channel.send(text);
    await msg.member.voice.setMute(true);
    return;
  }

  await msg.delete({ timeout: 0 });

  if (!msg.member.voice.channel) {
    return;
  }

  await Promise
    .all(msg.member.voice.channel.members
      .map((i: GuildMember) => i.voice.setMute(state)));
};

export const handleMute = async (msg: Message) => {
  await handleVoiceChat(msg, 'Очко себе дерни, а не мут, псина', true);
};

export const handleUnmute = async (msg: Message) => {
  await handleVoiceChat(msg, 'Очко себе дерни, а не мут, псина', false);
};
