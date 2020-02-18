const {todos} = require('../../../data/todos');

module.exports = function(req, res) {
	const todosId = req.params().id;
	const todo = todos.find(todo => todo.id === Number(todosId));

	if (todo) {
		res.ok({
			data: todo,
		});
	} else {
		res.notFound();
	}
};
