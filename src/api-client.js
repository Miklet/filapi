const http = require('http');
const {pathToRegexp} = require('path-to-regexp');
const {createResponse} = require('./response');
const {createRequest} = require('./request');
const {createRoutesRegistry} = require('./routes-registry');
const {parseDirectoryToRoutes} = require('./parse-directory-to-routes');
const packageJson = require('../package.json');
const logger = require('loglevel');

function createApiClient() {
	const routesRegistry = createRoutesRegistry();

	const httpClient = http.createServer((request, response) => {
		response.setHeader('X-Node-Json-Api-Version', packageJson.version);

		const {url, method} = request;

		if (!url) {
			return;
		}

		const routes = routesRegistry.getAll();

		const routeKey = Object.keys(routes).find(path => {
			const pathRegexp = pathToRegexp(path);
			return pathRegexp.test(url) && routes[path][method];
		});

		if (routeKey) {
			logger.debug(`Found handler for ${method} ${url}`);
			routes[routeKey][method](
				createRequest(request, routeKey),
				createResponse(response),
			);
		}
	});

	const fileBasedRoutes = parseDirectoryToRoutes('api');

	fileBasedRoutes.forEach(({path, method, handler}) => {
		logger.debug(`Adding handler for ${method} ${path}`);
		routesRegistry.add({
			path,
			method,
			handler,
		});
	});

	return {
		start(port = 8080) {
			logger.debug('Starting server...');
			httpClient.listen(port, () => {
				logger.info(`Server started at ${port}!`);
			});
		},

		close() {
			logger.debug('Closing server...');
			httpClient.close(() => {
				logger.info('Server closed!');
			});
		},

		route({path, method, handler}) {
			logger.debug(`Adding handler for ${method} ${path}`);
			routesRegistry.add({
				path,
				method,
				handler,
			});
		},

		get(path, handler) {
			this.route({
				path,
				method: 'GET',
				handler,
			});
		},
	};
}

module.exports = {
	createApiClient,
};
