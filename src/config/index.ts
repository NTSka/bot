require('dotenv').config();

export type Index = {
  discord: {
      token?: string
  },
  admins: string[]
}

const config: Index = {
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
  admins: (process.env.ADMINS || '').split(','),
};

export default config;
