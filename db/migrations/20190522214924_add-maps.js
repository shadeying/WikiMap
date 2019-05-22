
exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', (table) => {
    table.increments('id');
    table.integer('ownerid');
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps')
};
