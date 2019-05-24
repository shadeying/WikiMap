"use strict"
const express = require('express');
const router  = express.Router();
const path = require('path');


module.exports = () => {

  router.get("/", (req, res) => {
    res.redirect('/map')
  });

  router.get('/map', (req, res) => {
    res.render("index");
  });

  router.get('/maps', (req, res) => {
    res.render("maps");
  });

  router.get('/users/:userid', (req, res) => {
    const templateVars = {}
    res.render('user', templateVars)
  })


  return router
}
