module.exports = knex => ({
  getMaps: () => (
    knex('maps')
      .select()
  ),

  getUsersMaps: (ownerid) => (
    knex('maps')
      .select()
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

  getMapInfo: mapid => (
    knex('maps')
      .where('mapid', mapid)
  ),


  getMapPoints: (mapid) => (
    knex('points')
      .select('id', 'title', 'image', 'editorid', 'description', 'lat', 'lng')
      .where('points.mapid', mapid )
  ),


  getMapFavoriteUsers: (mapid) => {
    return knex('favorites')
      .select('userid')
      .join('maps', {'favorites.mapid': 'maps.mapid' })
      .where('favorites.mapid', mapid)
  },

  getFavorite: ({ mapid, userid }) => {
    return knex('favorites')
      .select()
      .where('mapid', mapid)
      .andWhere('userid', userid)
  },

  newMap: map => (
    knex('maps')
      .insert(map)
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

  addPoints: (pointArr) => (
    knex('points')
      .insert(pointArr)
  ),

  deletePointsNotIncluded: (ids, mapid) => (
    knex('points')
      .where(function() {
        this
          .where('mapid', mapid)
          .whereNotIn('id', ids)
      })
      .del()
  ),

  addFavorite: ({mapid, userid}) => (
    knex('favorites')
      .insert({ mapid, userid })
  ),

  deleteFavorite: id => (
    knex('favorites')
      .where('id', id)
      .del()
  ),

  getNextMapid: async () => (
    1 + (await knex('maps')
      .max('mapid'))[0].max
  ),
});
