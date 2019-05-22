
exports.up = function(knex, Promise) {
  return knex.schema.createTable('points', (table) => {
    table.increments().unique().primary();
    table.string('title').notNull();
    table.string('image');
    table.integer('mapid')
      .notNull()
      .references('maps.id')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('points');
};
