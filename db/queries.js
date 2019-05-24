module.exports = knex => ({
  getMaps: () => (
    knex('maps')
      .select()
  ),

  getUsersMaps: (ownerid) => (
    knex()
      .select()
      .from('maps')
      .where('ownerid', ownerid)
  ),

  getFavoritedMaps: userid => (
    knex('favorites')
      .select('ownerid', 'favorites.mapid', 'name', 'description')
      .join('maps', { ['favorites.mapid']: 'maps.mapid' } )
      .where('favorites.userid', userid)
  ),

  getEditedMaps: editorid => (
    knex('points')
      .select('maps.ownerid', 'points.mapid', 'maps.name', 'maps.description')
      .join('maps', { ['points.mapid']: 'maps.mapid'})
      .where('editorid', editorid)
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
      .update(updates);
   }
});
