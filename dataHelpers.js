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
  }),

  updatePoints: async (points, mapid) => {
    const newPoints = [];
    const oldPoints = [];
    points.forEach(point => {
      point.mapid = mapid;
      if (point.id) {
        oldPoints.push(point)
      } else {
        newPoints.push(point)
      }
    });

    console.log('mapid: ', mapid);
    console.log('newPoints: ', newPoints);
    console.log('oldPoints: ', oldPoints);
    {
      const pointids = oldPoints.map((point) => point.id)
      console.log('pointids: ', pointids);
      await queries.deletePointsNotIncluded(pointids, mapid)
    }
    await queries.addPoints(newPoints);
    oldPoints.forEach(async (point) => {
      const { title, image, editorid, description, lat, lng} = point
      const updates = { title, image, editorid, description, lat, lng };
      await queries.updatePointInfo(point.id, updates);
    })
  },
});
