"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (queries, dataHelpers) => {

  router.get('/', (req, res) => {
    res.redirect('/maps');
  })

  router.get('/maps/:mapid', (req, res) => {
    res.render("index", { mapid: req.params.mapid });
  });

  router.get('/maps', async (req, res) => {
    const maps = await queries.getMaps();
    res.render('maps', { maps });
  });

  router.get('/users/:userid', async (req, res) => {
    const { userid } = req.params
    const maps = await dataHelpers.getMapsForUsersPage(userid)
    console.log(maps);
    res.render('user', {maps, userid});
  });

  return router;
}
