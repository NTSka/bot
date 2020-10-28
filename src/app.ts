import client, { connect } from './discord';

import handlers from './handlers';

(async () => {
  await connect();
  console.log('Bot connected');
  handlers(client);
})();
