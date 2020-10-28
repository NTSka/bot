FROM node:12
ENV DISCORD_TOKEN=""
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["npm", "start"]