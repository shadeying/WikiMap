
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(() => {
      return knex('favorites').insert([
        {
          mapid: '1',
          userid: 'bob',
        },
        {
          mapid: '2',
          userid: 'charlie',
        },
        {
          mapid: '3',
          userid: 'alice',
        },
        {
          mapid: '1',
          userid: 'alice',
        }
      ])
    });
};
