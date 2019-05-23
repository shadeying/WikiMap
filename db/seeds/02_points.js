
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(() => {
      return knex('points').insert([
        {
          mapid: '1',
          title: 'point_a1',
          editorid: 'alice',
          lat: 55.647,
          lng: 37.581,
        },
        {
          mapid: '1',
          title: 'point_a2',
          editorid: 'charlie',
          lat: 55.647,
          lng: 37.585,
        },
        {
          mapid: '2',
          title: 'point_b',
          editorid: 'bob',
          lat: 55.124,
          lng: 37.281,
        },
        {
          mapid: '3',
          title: 'point_c',
          editorid: 'charlie',
          lat: 57.647,
          lng: 37.345,
        }
      ])
    });
};
