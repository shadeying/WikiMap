"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (queries, dataHelpers) => {
  router.get('/', async (req, res) => {
    const maps = await dataHelpers.getMapsAndFavorites();
    console.log('outer maps', maps);
    res.json(maps);
  })

  router.get("/:mapid", async (req, res) => {
    res.json(await dataHelpers.getMapRepr(req.params.mapid, queries));
  });

  router.post("/new", async (req, res) => {
    try {
      const { userid } = req.session;
      const mapid = await queries.getNextMapid();
      console.log('mapid', mapid);
      if(!req.session.userid){
        res.status(400).send('not logged in!');
      }else{
        await queries.newMap({"ownerid": req.session.userid, "name" :"Enter Map Title", "description": "Enter map description"});
        res.redirect('/maps/' + mapid);
        res.send({"url": `/maps/${mapid}`})
      }
    } catch (error) {
      res.status(400).send('something went wrong with the query!');
      throw error;
    }
  });

  router.put('/:mapid/save', async (req, res) => {
    try {
      const { mapid } = req.params
      const { mapInfo, points, } = req.body;
      console.log('data: ', req.body);
      await dataHelpers.updatePoints(points, mapid);
      await queries.updateMapInfo(mapid, mapInfo);
      res.json(await dataHelpers.getMapRepr(mapid, queries));
    } catch (err) {
      res.status(400).send('oh noes')
      throw err;
    }
  })

  router.put('/:mapid/addFavorite', async (req, res) => {
    const favorite = {
      mapid: req.params.mapid,
      userid: req.session.userid,
    }
    try {
      await queries.addFavorite(favorite)
      res.status(200).send('w00t');
    } catch (err) {
      res.status(400).send('oh no');
      throw err;
    }
  })

  router.post('/:mapid/toggleFavorite', async (req, res) => {
    const favorite = {
      mapid: Number(req.params.mapid),
      userid: req.session.userid,
    }

    const [existingFavorite] = await queries.getFavorite(favorite);
    console.log('existing: ', existingFavorite);
    if (existingFavorite) {
      await queries.deleteFavorite(existingFavorite.id);
      res.json(false)
    } else {
      await queries.addFavorite(favorite)
      res.json(true)
    }
  })

  router.delete('/:mapid/deleteFavorite', async (req, res) => {
    console.log('deleting')
    const favorite = {
      mapid: req.params.mapid,
      userid: req.session.userid,
    }
    const [existingFavorite] = await queries.getFavorite(favorite);
    if (!existingFavorite) {
      res.status(400).send('favorite doesn\'t exist')
      return;
    }
    await queries.deleteFavorite(existingFavorite.id);
    res.status(200).send('deleted favorite');
  });


  return router;
}
