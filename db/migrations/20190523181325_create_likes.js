exports.up = function(knex, Promise) {
	return knex.schema.createTable("likes", function(table) {
		table.increments("id").primary();
		table.integer("users_id").unsigned();
		table.foreign("users_id").references("users.id");
		table.integer("resource_id").unsigned();
		table.foreign("resource_id").references("resource.id");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("likes");
};

