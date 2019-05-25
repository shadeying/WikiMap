module.exports = (queries) => ({
  getMapRepr: async (mapid, queries) => ({
    mapInfo: (await queries.getMapInfo(mapid))[0],
    points: await queries.getMapPoints(mapid),
    userFavorites: (await queries.getMapFavoriteUsers(mapid).map(obj => obj.userid)),
  }),

  getMapsForUsersPage: async (userid) => ({
    owned: await queries.getUsersMaps(userid),
    favorited: await queries.getFavoritedMaps(userid),
    edited: await queries.getEditedMaps(userid)
  })

})
