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

  saveMap: (mapid) => (
    knex('maps')
      .where({ mapid })
      .update( body.updates )
  )
});
