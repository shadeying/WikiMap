
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(() => {
      return knex('favorites').insert([
        {
          mapid: '1',
          userid: 'Bob',
        },
        {
          mapid: '2',
          userid: 'Charlie',
        },
        {
          mapid: '3',
          userid: 'Alice',
        },
        {
          mapid: '1',
          userid: 'Alice',
        }
      ])
    });
};
