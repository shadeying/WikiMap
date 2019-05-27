
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(() => {
      return knex('points').insert([
        {
          mapid: '1',
          title: 'Point_a1',
          editorid: 'Alice',
          lat: 49.2820,
          lng: -123.1171,
          image: 'https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3',
          description: 'This is point a1',
        },
        {
          mapid: '1',
          title: 'Point_a2',
          editorid: 'Charlie',
          lat: 49.3,
          lng: -123.2,
          description: 'This is point a2',
        },
        {
          mapid: '2',
          title: 'Point_b',
          editorid: 'Bob',
          lat: 49.38,
          lng: -123.24,
          description: 'This is point b',
        },
        {
          mapid: '3',
          title: 'Point_c',
          editorid: 'Charlie',
          lat: 49.1,
          lng: -123.01,
          description: 'This is point c',
        }
      ])
    });
};
