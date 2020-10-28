require('dotenv').config();

export interface Index {
    discord: {
        token?: string
    }
}

const config: Index = {
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
};

export default config;
