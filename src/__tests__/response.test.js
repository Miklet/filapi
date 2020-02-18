const {createResponse} = require('../response');

function createMockHttpResponse() {
	return {
		writeHead: jest.fn(),
		end: jest.fn(),
	};
}

test('ok method writes json data with status of 200', () => {
	const mockHttpResponse = createMockHttpResponse();

	const response = createResponse(mockHttpResponse);

	const data = {data: {foo: 'foo', bar: 'bar', baz: 'baz'}};

	response.ok(data);

	expect(mockHttpResponse.writeHead).toHaveBeenCalledTimes(1);
	expect(mockHttpResponse.writeHead).toHaveBeenCalledWith(200, {
		'Content-Length': 46,
		'Content-Type': 'application/json',
	});
	expect(mockHttpResponse.end).toHaveBeenCalledTimes(1);
	expect(mockHttpResponse.end).toHaveBeenCalledWith(JSON.stringify(data));
});

test('notFound method writes status 404', () => {
	const mockHttpResponse = createMockHttpResponse();

	const response = createResponse(mockHttpResponse);

	response.notFound();

	expect(mockHttpResponse.writeHead).toHaveBeenCalledTimes(1);
	expect(mockHttpResponse.writeHead).toHaveBeenCalledWith(404);
	expect(mockHttpResponse.end).toHaveBeenCalledTimes(1);
});
