
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(() => {
      return knex('maps').insert([
        {
          mapid: '1',
          name: 'Food!',
          ownerid: 'alice',
          description: 'Just in case I missed any nice FOOD :|'
        },
        {
          mapid: '2',
          name: 'Beaches',
          ownerid: 'bob',
          description: 'Beaches my HOME'
        },
        {
          mapid: '3',
          name: 'Map :|',
          ownerid: 'charlie',
          description: `It's Charlie's Map`
        }
      ])
    });
};
