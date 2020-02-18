const {createRequest} = require('../request');

test('params method returns route params as object', () => {
	const mockHttpRequest = {
		url: '/api/todos/5/a123fq',
	};

	const path = '/api/todos/:todoId/:assigneId';

	const request = createRequest(mockHttpRequest, path);

	expect(request.params()).toEqual({
		todoId: '5',
		assigneId: 'a123fq',
	});
});

test('params method returns same object when called multiple times', () => {
	const mockHttpRequest = {
		url: '/api/todos/5/a123fq',
	};

	const path = '/api/todos/:todoId/:assigneId';

	const request = createRequest(mockHttpRequest, path);

	const paramsFromFirstCall = request.params();
	const paramsFromSecondCall = request.params();
	const paramsFromThirdCall = request.params();

	expect(paramsFromFirstCall).toBe(paramsFromSecondCall);
	expect(paramsFromSecondCall).toBe(paramsFromThirdCall);
	expect(paramsFromThirdCall).toBe(paramsFromFirstCall);
});
