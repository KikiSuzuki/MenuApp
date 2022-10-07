const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressRequestId = require('./lib/requestId');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const auth = require('./lib/auth');
const db = require('./db');
const router = require('./routes');
const requestLogger = require('./lib/requestLogger');
const { expressLogger, mongoLogger } = require('./lib/appLoggers');

const PORT = process.env.PORT || 5000;

db.connect(config.dbUrl)
  .then(() => {
    mongoLogger.info('connected');
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(cookieParser());
    app.use(expressRequestId());
    /**
     * router
     */
    app.use(requestLogger);
    app.use(auth.setUserMiddleware);
    app.use(config.baseUrl || '/', router());

    /**
     * error handler middleware
     */
    app.use((err, req, res, next) => {
      expressLogger.error(`${req?.id || ''} ${err.message}`);
      res.status(err.status || 400).send({ error: err?.message || err });
    });

    app.listen(PORT, () => {
      expressLogger.info(`server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    mongoLogger.error('connection error ', err);
  });
