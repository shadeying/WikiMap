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

  router.put("/new", (req, res) => {
    res.status(404).send('unimplemented');
  })

  /**
   * updates an entry of maps.
   * Expecting an object body.mapid containing
   * columns to update and their new values.
   */
  router.put('/:mapid/save', (req, res) => {
    queries.saveMap(req.params.mapid)
      .then(data => res.json(data))
  })

  return router;
}
