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
    res.render('maps', { maps, "loginUser":loginUser });
  });

  router.get('/users/:userid', async (req, res) => {
    const { userid } = req.params
    const maps = await dataHelpers.getMapsForUsersPage(userid);
    const loginUser = req.session.userid;
    console.log(maps);
    res.render('user', {maps, userid, "loginUser":loginUser});
  });

  router.get('/:userid/login', async (req, res) => {
    console.log('userid: ', req.params.userid);
    req.session.userid = req.params.userid;
    console.log('userid session: ', req.session.userid);
    res.status(200).end('set cookie');
  });

  router.get('/current', (req, res) => {
    res.json(req.session.userid);
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
}
