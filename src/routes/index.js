const express = require('express');
const userRouter = require('./users.routes');
const userCreateRequestRouter = require('./userCreateRequest.routes');
const authRouter = require('./auth.routes');
const sessionLogsRouter = require('./sessionLogs.routes');
const { authorizedOnly } = require('../lib/auth');
const { adminAccess } = require('../lib/roleRestricted');

const router = express.Router();

module.exports = () => {
  const authProtectedRoutes = [
    {
      router: userRouter,
      urlPath: '/user',
    },
    {
      router: userCreateRequestRouter,
      urlPath: '/user-create-request',
    },
    {
      router: sessionLogsRouter,
      urlPath: '/session-logs',
      routerMiddlewares: [adminAccess],
    },
  ];
  authProtectedRoutes.forEach((route) => {
    router.use(route.urlPath, authorizedOnly, ...route.routerMiddlewares || [], route.router());
  });
  router.use('/', authRouter());
  router.get('/ping', (req, res) => {
    return res.send('pong');
  });
  router.use('/static', express.static('public'));
  return router;
};
