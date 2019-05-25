exports.seed = function(knex, Promise) {
  return knex("category")
    .del()
    .then(function() {
      return Promise.all([
        knex("category").insert({
          id: 1,
          topic: "all"
        }),
        knex("category").insert({
          id: 2,
          topic: "design"
        }),
        knex("category").insert({
          id: 3,
          topic: "food"
        }),
        knex("category").insert({
          id: 4,
          topic: "coding"
        })
      ]);
    });
};
