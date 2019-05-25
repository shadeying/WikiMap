"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (queries, dataHelpers) => {

  router.get('/', (req, res) => {
    const templateVars = queries.getMaps();
    res.render('maps', templateVars)
  })

  router.get('/map', (req, res) => {
    res.render("index");
  });

  router.get('/maps', async (req, res) => {
    console.log(await queries.getMaps());
    res.render('maps', { maps: await queries.getMaps() });
  });

  router.get('/users/:userid', async (req, res) => {
    const { userid } = req.params
    const templateVars = await dataHelpers.getMapsForUsersPage(userid)
    console.log(templateVars);
    res.render('user', templateVars);
  });

  return router;
}
