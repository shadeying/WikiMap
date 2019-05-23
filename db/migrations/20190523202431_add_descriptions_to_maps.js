exports.up = function(knex, Promise) {
  return knex.schema.table('maps', t => {
    t.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('maps', t => {
    t.dropColumn('description');
  })
};
