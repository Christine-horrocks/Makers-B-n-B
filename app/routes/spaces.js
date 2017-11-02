var express = require('express');
var router = express.Router();
var sessionTools = require('../bin/sessionTools');

const mongoose = require('mongoose');
const Space = mongoose.model("spaces");

router.get('/new', sessionTools.requireLogin, (req, res) => {
  res.render('spaces/new');
});

router.get("/", (req, res) => {
  Space
    .find()
    .exec(function (err, doc) {
      res.render('spaces/index', { spaces: doc });
    });
});

router.post("/", (req, res) => {
  var newSpace = new Space(req.body);
  newSpace.owner = req.user.id
  newSpace.save()
    .then(item => {
      res.redirect('/users/' + req.user.username + '/spaces');
    })
    .catch(err => {
      res.send('spaces/new');
    });
});

module.exports = router;
