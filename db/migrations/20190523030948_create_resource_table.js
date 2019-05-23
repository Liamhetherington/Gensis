exports.up = function(knex, Promise) {
	return knex.schema.createTable("resource", function(table) {
		table.increments("id").primary();
		table.string("title");
		table.date("date_created");
		table.string("url");
		table.string("description");
		table.integer("users_id").unsigned();
		table.foreign("users_id").references("users.id");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("resource");
};
