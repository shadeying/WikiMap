
exports.up = function(knex, Promise) {
  return knex.schema.createTable('points', (table) => {
    table.increments().unique().primary();
    table.string('title').notNull();
    table.string('image');
    table.float('lat').notNull();
    table.float('lng').notNull();
    table.string('editorid').notNull();
    table.integer('mapid')
      .notNull()
      .references('maps.mapid')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('points');
};
