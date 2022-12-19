const express = require('express');
const { User } = require('../schemas');
const { loginUser, logoutUser, refreshUserToken, changePassword } = require('../lib/auth');
var xss = require('xss');
const router = express.Router();

module.exports = () => {
  router.post('/registration', async (req, res, next) => {
    const {firstname, lastname, login, password} = req.body;
    try {
      const user = await new User({firstname: xss(firstname), lastname: xss(lastname), login: xss(login), password:xss(password), appRole:'user'}).save();
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
