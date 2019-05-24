"use strict"
const express = require('express');
const router  = express.Router();

module.exports = queries => {
  router.get('/', async (req, res) => {
    res.json(await queries.getMaps());
  })

  router.get("/:mapid", async (req, res) => {
    const { mapid } = req.params
    console.log('mapid: ', mapid)
    const mapData = {
      mapInfo: await queries.getMapInfo(mapid),
      points: await queries.getMapPoints(mapid),
      userFavorites: (await queries
        .getMapFavoriteUsers(mapid)
        .map(obj => obj.userid)
      ),
    }
    res.json(mapData);
  });

  router.put("/new", async (req, res) => {
    try {
      console.log('map: ', req.body)
      await queries.newMap(req.body);
      res.status(200).send('saved')
    } catch (error) {
      res.status(400).send('something went wrong with the query!');
      throw error;
    }
  });


  router.put('/:mapid/save', async (req, res) => {
    try {
      const { mapid } = req.params
      const { map, points } = req.body;

      console.log('mapid: ', mapid)
      console.log('body: ', req.body)
      console.log('map: ', map)
      console.log('points: ', points)

      await queries.updateMapInfo(mapid, map)
      {
        const pointids = points.map((point) => point.id)
        await queries.deletePointsNotIncluded(pointids, mapid)
      }

      await points.forEach(async (point) => {
        await queries.updatePointInfo(point.id, point)
      })

      res.status(200).send('saved!');
    } catch (err) {
      res.status(400).send('oh noes')
      throw err;
    }
  })

  router.put('/:mapid/favorite', async (req, res) => {
      const favorite = {
        mapid: req.params.mapid,
        userid: req.session.userid,
      }

      console.log('session: ', req.session);
      console.log(favorite)
      const { id } = await queries.getFavorite;
      console.log('id', id)
      if (id) {
        queries.deleteFavorite(id)
        return
      }
      queries.addFavorite(favorite)
      console.log(await queries.getMapFavorites(favorite.mapid))
      res.status(200)
  })


  return router;
}
