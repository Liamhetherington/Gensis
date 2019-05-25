
exports.up = function(knex, Promise) {
  return knex.schema.createTable("category", function(table) {
    table.increments("id").primary();
    table.integer("users_id").unsigned();
    table.string("topic");
    table.foreign("users_id").references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("category");
};
