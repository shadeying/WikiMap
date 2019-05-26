"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (queries, dataHelpers) => {

  router.get('/', (req, res) => {
    res.redirect('/maps');
  });

  router.get('/maps/:mapid', (req, res) => {
    const loginUser = req.session.userid;
    res.render("index", { mapid: req.params.mapid, "loginUser":loginUser });
  });

  router.get('/maps', async (req, res) => {
    const maps = await queries.getMaps();
    console.log(maps);
    const loginUser = req.session.userid;
    res.render('maps', { maps, loginUser });
  });


  router.get('/users/:userid', async (req, res) => {
    const { userid } = req.params
    const maps = await dataHelpers.getMapsForUsersPage(userid);
    const loginUser = req.session.userid;
    console.log(maps);
    res.render('user', {maps, userid, "loginUser":loginUser});
  });

  return router;
}
