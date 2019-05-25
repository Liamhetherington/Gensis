exports.seed = function(knex, Promise) {
	return knex("users")
		.del()
		.then(function() {
			return Promise.all([
				knex("users").insert({ id: 1, username: "Alice" }),
				knex("users").insert({ id: 2, username: "Bob" }),
				knex("users").insert({ id: 3, username: "Charlie" })
			]);
		});
};
