
exports.up = function(knex, Promise) {
  return knex.schema.createTable("category", function(table) {
    table.increments("id").primary();
    table.string("topic");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("category");
};
