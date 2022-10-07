const logger = require('./logger');
module.exports = {
  expressLogger: logger('express'),
  mongoLogger: logger('Mongo DB')
};
