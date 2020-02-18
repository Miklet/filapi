function createResponse(httpServerResponse) {
	return {
		ok(data) {
			const stringData = JSON.stringify(data);

			httpServerResponse.writeHead(200, {
				'Content-Length': Buffer.byteLength(stringData),
				'Content-Type': 'application/json',
			});

			httpServerResponse.end(stringData);
		},

		notFound() {
			httpServerResponse.writeHead(404);
			httpServerResponse.end();
		},
	};
}

module.exports = {
	createResponse,
};
