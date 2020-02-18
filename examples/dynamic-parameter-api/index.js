const {createApiClient} = require('../../');
const logger = require('loglevel');

logger.setLevel('debug');

const server = createApiClient();

server.start();
