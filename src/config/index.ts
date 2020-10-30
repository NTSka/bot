require('dotenv').config();

export interface Index {
  discord: {
      token?: string
  },
  allowedId: string[],
  specialRole: string
}

const config: Index = {
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
  allowedId: (process.env.ALLOWED_ID || '').split(','),
  specialRole: process.env.SPECIAL_ROLE || '',
};

export default config;
