
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("resource", function(table) {
    table.integer("category_id").unsigned();
    table.foreign("category_id").references("category.id");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("resource", function(table) {
    table.dropColumn("category_id");
    // table.dropForeign("category_id");
  })
};
