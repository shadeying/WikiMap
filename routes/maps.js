"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = queries => {
  console.log(queries);
  router.get('/', async (req, res) => {
    res.json(await queries.getMaps());
  })

  router.get("/:mapid", async (req, res) => {
    const points = await queries.getMapPoints(req.params.mapid)
    const favorites = await queries.getMapFavorites(req.params.mapid)
    res.json(points, favorites);
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

  /**
   * updates an entry of maps.
   * Expecting an object body.mapid containing
   * columns to update and their new values.
   */
  router.put('/:mapid/save', async (req, res) => {
    console.log(req.body)
    try {
      await queries.saveMap(req.params.mapid, req.body)
      res.status(200).send('saved!');
    } catch (err) {
      res.status(400).send(err)
    }
  })


  return router;
}
