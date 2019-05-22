
exports.up = function(knex, Promise) {
  return knex.schema.table('points', (table) => {
    table.integer('editorid').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('points', (table) => {
    table.dropColumn('editorid');
  })
};
