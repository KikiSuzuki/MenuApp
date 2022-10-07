const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../schemas');
const { adminAccess } = require('../lib/roleRestricted');

const router = express.Router();

module.exports = () => {
  router.post('/', adminAccess, async (req, res, next) => {
    try {
      const user = await new User(req.body).save();
      res.json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {
      next(err);
    }
  });
  

  router.get('/profile', async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('not authorized user');
      }
      const user = await User.findById(req.user._id)
        .select('-password')
        .exec();
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'user does not exist' });
      }
    } catch (err) {
      next(err);
    }
  });

  router.put('/profile', async (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error('not authorized user');
      }
      const user = await User.updateOne({ _id: req.user._id }, req.body, { runValidators: true }).exec();
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'user does not exist' });
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .select('-password')
        .exec();
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'user with such id does not exist' });
      }
    } catch (err) {
      next(err);
    }
  });

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

  router.put('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const toUpdate = { ...req.body };
      if (password) {
        const hash = await bcrypt.hash(password, 12);
        toUpdate.password = hash;
      }
      const { modifiedCount } = await User.updateOne({ _id: id }, toUpdate, { runValidators: true }).exec();
      if (modifiedCount > 0) {
        res.json({ success: true, modifiedCount });
      } else {
        res.status(404).json({ error: 'user with such id does not exist' });
      }
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await User.deleteOne({ _id: id }).exec();
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
