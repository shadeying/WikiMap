
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.string('userid').notNull();
    table.integer('mapid')
      .notNull()
      .references('maps.mapid')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
