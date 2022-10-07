const winston = require('winston');

const { combine, label, timestamp, prettyPrint, colorize, printf } = winston.format;

const printFormat = printf(({ level, message, label: logLabel, timestamp: logTimestamp }) => `${logTimestamp} [${logLabel}] ${level}: ${message}`);

const logger = (logTag = 'app') =>
  winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: combine(
          colorize(),
          label({
            label: logTag.toUpperCase(),
          }),
          timestamp(),
          prettyPrint(),
          printFormat,
        ),
      }),
    ],
  });

module.exports = logger;
