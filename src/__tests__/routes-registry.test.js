const {createRoutesRegistry} = require('../routes-registry');

test('adds route', () => {
	const registry = createRoutesRegistry();

	const handlerMock = jest.fn();

	registry.add({
		path: '/',
		method: 'GET',
		handler: handlerMock,
	});

	const addedRouteHandler = registry.get('/', 'GET');

	expect(addedRouteHandler).toEqual(handlerMock);
});

test('returns all routes', () => {
	const registry = createRoutesRegistry();

	const handlerMock1 = jest.fn();

	registry.add({
		path: '/',
		method: 'GET',
		handler: handlerMock1,
	});

	const handlerMock2 = jest.fn();

	registry.add({
		path: '/todos',
		method: 'POST',
		handler: handlerMock2,
	});

	const handlerMock3 = jest.fn();

	registry.add({
		path: '/todos',
		method: 'DELETE',
		handler: handlerMock3,
	});

	const addedRoutes = registry.getAll();

	expect(addedRoutes).toEqual({
		'/': {
			GET: handlerMock1,
		},
		'/todos': {
			POST: handlerMock2,
			DELETE: handlerMock3,
		},
	});
});
