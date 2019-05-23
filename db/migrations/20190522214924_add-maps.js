
exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', (table) => {
    table.increments('mapid').primary();
    table.string('ownerid');
    table.string('name').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
