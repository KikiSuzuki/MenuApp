const express = require('express');
const { SessionLog, User } = require('../schemas');

const router = express.Router();

module.exports = () => {
  router.get('/', async (req, res, next) => {
    try {
      const { page = 1, pageSize = 10, startDate, endDate } = req.query;
      // const filter = {};
      // if (startDate && endDate) {
      //   filter.createdAt = {
      //     $gt: new Date(startDate),
      //     $lt: new Date(endDate),
      //   };
      // }
      const [logs, count] = await Promise.all([
        SessionLog.find()
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .populate({ path: 'user', model: User, select: 'firstname lastname middlename login' })
          .exec(),
        SessionLog.count(),
      ]);
      res.json({ logs, count });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
