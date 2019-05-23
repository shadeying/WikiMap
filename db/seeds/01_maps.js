
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(() => {
      return knex('maps').insert([
        {
          mapid: '1',
          name: 'a',
          ownerid: 'alice',
          description: 'this is map a'
        },
        {
          mapid: '2',
          name: 'b',
          ownerid: 'bob',
          description: 'this is map b'
        },
        {
          mapid: '3',
          name: 'c',
          ownerid: 'charlie',
          description: 'this is map c'
        }
      ])
    });
};
