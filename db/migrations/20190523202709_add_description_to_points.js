exports.up = function(knex, Promise) {
  return knex.schema.table('points', t => {
    t.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('points', t => {
    t.dropColumn('description');
  })
};
