const {createApiClient} = require('../../');

logger.setLevel('debug');

const server = createApiClient();

server.start();
