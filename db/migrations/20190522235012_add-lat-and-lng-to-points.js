
exports.up = function(knex, Promise) {
  return knex.schema.table('points', (table) => {
    table.float('lat').notNull();
    table.float('lng').notNull();
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('points', (table) => {
    table.dropColumn('lat');
    table.dropColumn('lng');
  })
};
