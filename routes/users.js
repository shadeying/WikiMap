"use strict";
// currently dead code, might use later
const express = require('express');
const router  = express.Router();

module.exports = (queries) => {

  router.get("/", (req, res) => {
    console.log('get got')
  });

  router.get('/:userid', async (req, res) => {
    const  { userid  } = req.params;
    try {
      console.log('userid: ', userid);
      const owned = await queries.getUsersMaps(userid);
      const favorited = await queries.getFavoritedMaps(userid);
      const edited = await queries.getEditedMaps(userid);
      res.json({ owned, favorited, edited })
    } catch (err) {
      res.status(400).send('something went wrong!')
      throw err
    }
  });

  router.get('/:userid/login', async (req, res) => {
    console.log('userid: ', req.params.userid)
    req.session.userid = req.params.userid
    console.log('userid session: ', req.session.userid)
    res.status(200).end('set cookie');
  })

  return router;
}
