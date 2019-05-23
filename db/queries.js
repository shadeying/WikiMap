module.exports = knex => ({
  getMaps: () => (
    knex('maps')
      .select()
  ),

  getMapPoints: (mapid) => (
    knex()
      .select()
      .from('points')
      .where('mapid', mapid )
  ),

  getMapFavorites: (mapid) => (
    knex()
      .select()
      .from('favorites')
      .where('mapid', mapid)
  ),

  newMap: maps => (
    knex('maps')
      .insert(maps)
  ),

  saveMap: (mapid, updates) => {
    console.log('updates: ', updates)
    return knex('maps')
      .where('mapid', mapid )
      // .update({description: 'a new description'})
      .update({
        description: updates.description,
      })
   }
});
