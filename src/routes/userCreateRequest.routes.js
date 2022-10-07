const express = require('express');
const { randomBytes } = require('crypto');
const { UserCreateRequest, User } = require('../schemas');
const { adminAccess } = require('../lib/roleRestricted');
const { AppError, appRoles } = require('../lib');

const router = express.Router();

module.exports = () => {
  router.post('/', async (req, res, next) => {
    try {
      const { phone , email } = req.body;
      const [sameNumber, sameLogin] = await Promise.all([
        User.findOne({ phone }).exec(),
        User.findOne({ login: email }).exec(),
      ]);
      if (sameNumber) {
        throw new AppError(`User with Number ${iin} already exists`, 400);
      }
      let login = email;
      if (sameLogin) {
        let i = 1;
        let found = false;
        const [emailLogin, domain] = email.split('@');
        while (!found) {
          login = `${emailLogin}${i}@${domain}`;
          const result = await User.findOne({ login }).exec();
          if (!result) {
            found = true;
          }
          i++;
        }
      }
      const user = await new UserCreateRequest({
        ...req.body,
        login,
      }).save();
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserCreateRequest.findById(id)
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

  router.put('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = await UserCreateRequest.findById(id).select('-createdAt -updatedAt -__v').exec();
      const toSave = JSON.parse(JSON.stringify(userData));
      const password = randomBytes(8).toString('hex');
      const user = await new User({
        ...toSave,
        appRole: appRoles.DOCS_APPROVER,
        passwordExpired: true,
        active: true,
        password,
      }).save();
      await UserCreateRequest.deleteOne({ _id: id }).exec();
      res.json(userData);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await UserCreateRequest.deleteOne({ _id: id }).exec();
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
