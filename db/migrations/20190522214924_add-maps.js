
exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', (table) => {
    table.string('mapid').unique();
    table.string('ownerid').unique();
    table.string('name').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
