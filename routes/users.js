"use strict";
// currently dead code, might use later
const express = require('express');
const router  = express.Router();

module.exports = (queries, dataHelpers) => {

  router.get("/", (req, res) => {
    console.log('get got')
  });

  router.get('/current', (req, res) => {
    if (req.session)
    res.json(req.session.userid || null);
  })

  router.get('/:userid', async (req, res) => {
    const  { userid  } = req.params;
    try {
      console.log('userid: ', userid);
      const maps = await dataHelpers.getMapsForUsersPage(userid)
      res.json(maps)
    } catch (err) {
      res.status(400).send('something went wrong!')
      throw err
    }
  });

  router.get('/:userid/login', async (req, res) => {
    console.log('userid: ', req.params.userid);
    req.session.userid = req.params.userid;
    console.log('userid session: ', req.session.userid);
    res.status(200).end('set cookie');
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });


  return router;
}
