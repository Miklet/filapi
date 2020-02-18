const {match} = require('path-to-regexp');

function createRequest(httpServerRequest, path) {
	const urlMatcher = match(path);
	let matcherResult = null;

	return {
		params() {
			if (!matcherResult) {
				matcherResult = urlMatcher(httpServerRequest.url);
			}

			return matcherResult ? matcherResult.params : {};
		},
	};
}

module.exports = {
	createRequest,
};
