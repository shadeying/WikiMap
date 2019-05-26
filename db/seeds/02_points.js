
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(() => {
      return knex('points').insert([
        {
          mapid: '1',
          title: 'point_a1',
          editorid: 'alice',
          lat: 49.350792406932015,
          lng: -123.06817161865234,
          image: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          description: 'this is point a1',
        },
        {
          mapid: '1',
          title: 'point_a2',
          editorid: 'charlie',
          lat: 55.647,
          lng: 37.585,
          description: 'this is point a2',
        },
        {
          mapid: '2',
          title: 'point_b',
          editorid: 'bob',
          lat: 55.124,
          lng: 37.281,
          description: 'this is point b',
        },
        {
          mapid: '3',
          title: 'point_c',
          editorid: 'charlie',
          lat: 57.647,
          lng: 37.345,
          description: 'this is point c',
        }
      ])
    });
};
