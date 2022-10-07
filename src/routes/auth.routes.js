const express = require('express');
const { User } = require('../schemas');
const { loginUser, logoutUser, refreshUserToken, changePassword } = require('../lib/auth');

const router = express.Router();

module.exports = () => {
  router.post('/registration', async (req, res, next) => {
    try {
      const user = await new User(req.body).save();
      if (user) {
        res.json({
          firstname: user.firstname,
          lastname: user.lastname,
          login: user.login,
          appRole: user.appRole,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400);
      }
    } catch (err) {
      next(err);
    }
  });

  router.post('/login', loginUser);

  router.put('/change-password', changePassword);

  router.get('/refresh', refreshUserToken);

  router.post('/logout', logoutUser);
  return router;
};
