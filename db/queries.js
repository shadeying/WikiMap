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
      .where('points.mapid', mapid )
  ),

  getMapFavorites: (mapid) => {
    const columns = [
      'maps.mapid',
      'maps.name',
      'maps.description',
      'maps.ownerid'
    ];
    return knex('favorites')
      .select(...columns)
      .join('maps', {'favorites.mapid': 'maps.mapid' })
      .where('favorites.mapid', mapid)
  },

  newMap: maps => (
    knex('maps')
      .insert(maps)
  ),

  updateMapInfo: (mapid, updates) => (
    knex('maps')
      .where('mapid', mapid )
      .update(updates)
 ),

  updatePointInfo: (id, updates) => (
    knex('points')
      .where('id', id)
      .update(updates)

  ),
});
