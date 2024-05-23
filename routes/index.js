const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
  const {username, password} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  }).catch((err) => {
    res.json(err);
  });
});


router.post('/authenticate', (req, res, next) => {
  const {username, password} = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, wrong password.'
          });
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 hours
          });
          res.json({
            status: true,
            token
          });
        }
      }).catch((err) => {
        res.json(err);
      });
    }
  });
});

module.exports = router;