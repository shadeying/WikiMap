
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
          image: 'https://wallup.net/wp-content/uploads/2018/03/19/589967-pancakes-food-fruit-berries-blueberries-blackberries-Rasperry_Food-748x522.jpg',
          description: 'This is point a1'
        },
        {
          mapid: '1',
          title: 'Point_a2',
          editorid: 'Charlie',
          lat: 49.3,
          lng: -123.2,
          image: 'https://i.pinimg.com/originals/cb/09/7c/cb097c2cb9c351b265d3c3ec5e485b9b.jpg',
          description: 'This is point a2'
        },
        {
          mapid: '2',
          title: 'Point_b',
          editorid: 'Bob',
          lat: 49.38,
          lng: -123.24,
          image: 'https://images7.alphacoders.com/491/thumb-350-491050.jpg',
          description: 'This is point b'
        },
        {
          mapid: '3',
          title: 'Point_c',
          editorid: 'Charlie',
          lat: 49.1,
          lng: -123.01,
          image: 'https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3',
          description: 'This is point c'
        }
      ])
    });
};
