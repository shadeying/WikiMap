"use strict"
const express = require('express');
const router  = express.Router();

module.exports = queries => {
  console.log(queries);
  router.get('/', async (req, res) => {
    res.json(await queries.getMaps());
  })

  router.get("/:mapid", async (req, res) => {
    const { mapid } = req.params
    console.log('mapid: ', mapid)
    const points = await queries.getMapPoints(mapid);
    const favorites = await queries.getMapFavorites(mapid);
    res.json({ favorites, points });
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
      const { mapid } = req.params.mapid
      const { mapUpdates, pointsUpdates } = req.body;
      await queries.updateMapInfo(mapid, mapUpdates)

      await pointsUpdates.forEach(async (update) => {
        await queries.updatePointInfo(update.id, update)
      })
      res.status(200).send('saved!');
    } catch (err) {
      res.status(400).send(err)
    }
  })


  return router;
}
