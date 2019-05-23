
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(() => {
      return knex('maps').insert([
        {
          mapid: '1',
          name: 'a',
          ownerid: 'alice',
        },
        {
          mapid: '2',
          name: 'b',
          ownerid: 'bob',
        },
        {
          mapid: '3',
          name: 'c',
          ownerid: 'charlie',
        }
      ])
    });
};
