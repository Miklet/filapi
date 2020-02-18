const {todos} = require('../../data/todos');

module.exports = function(req, res) {
	res.ok({
		data: todos,
	});
};
