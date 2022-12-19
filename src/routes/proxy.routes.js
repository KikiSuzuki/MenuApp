const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../schemas');
const { adminAccess } = require('../lib/roleRestricted');

const router = express.Router();

module.exports = () => {

  router.get('/', async (req, res, next) => {
    try {
      const users = await User.find()
        .select('-password')
        .exec();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
