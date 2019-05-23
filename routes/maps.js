"use strict"
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/:mapid", (req, res) => {
    console.log('get map and points');
    knex
      .select()
      .from("points")
        .join('maps', { 'points.mapid': 'points.mapid' })
      .where('maps.mapid', req.params.mapid)
      .groupBy('maps.mapid')
      .then((results) => {
        res.json(results);
    });
  });

  router.get('/', (req, res) => {
    knex('maps')
    .select()
    .then((results) => {
      res.json(results)
    })
  })

  router.put("/new", (req, res) => {
    knex('maps')
      .insert({
        name: 'd',
        ownerid: 'dorothy',
      })
      .then(() => {
        console.log('settings status')
        res.status(200).send();
      })
  })

  /**
   * updates an entry of maps.
   * Expecting an object body.mapid containing
   * columns to update and their new values.
   */
  router.put('/:mapid/save', (req, res) => {
    knex('maps')
      .where({ mapid: req.params.mapid })
      .update( body.updates )
  })

  return router;
}
