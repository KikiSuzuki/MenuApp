const morgan = require('morgan');
const logger = require('./logger')('request');

const format = ':requestId :ip :user :method :url :status :response-time ms';

const formatUser = (user) => (user ? `${user.login} ${user.lastname || ''} ${user.firstname || ''} ${user.middlename || ''}` : null);

morgan.token('requestId', (request) => request.id);
morgan.token('user', (request) => formatUser(request.user));
morgan.token('ip', (request) => request.headers['x-forwarded-for']);

const options = {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
};

module.exports = morgan(format, options);
