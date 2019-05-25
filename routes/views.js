"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');

module.exports = (queries, dataHelpers) => {

  router.get("/", (req, res) => {
    res.render("main");
  });

  router.get('/map', (req, res) => {
    res.render("index");
  });

  router.get('/maps', async (req, res) => {
    res.render('maps', await queries.getMaps());
  });

  router.get('/users/:userid', async (req, res) => {
    const { userid } = req.params
    const templateVars = await dataHelpers.getMapsForUsersPage(userid)
    console.log(templateVars);
    res.render('user', templateVars);
  });

  return router;
}
