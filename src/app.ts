import schedule from 'node-schedule';
import client, { connect } from './discord';
import pidorJob from './shedule/pidor';

import handlers from './handlers';

(async () => {
  await connect();
  schedule.scheduleJob('0 0 17 * * *', () => {
    pidorJob();
  });
  console.log('Bot connected');
  handlers(client);
})();
