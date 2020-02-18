function createRoutesRegistry() {
	const routes = {};

	return {
		add({path, method, handler}) {
			const route = routes[path];

			if (route) {
				routes[path] = {
					...routes[path],
					[method]: handler,
				};

				return;
			}

			routes[path] = {[method]: handler};
		},

		get(path, method) {
			const route = routes[path];

			return route ? route[method] : null;
		},

		getAll() {
			return {...routes};
		},
	};
}

module.exports = {
	createRoutesRegistry,
};
