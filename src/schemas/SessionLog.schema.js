const { Schema, model } = require('mongoose');
const { USERS, SESSION_LOGS } = require('./collectionNames');

const sessionLogSchema = new Schema(
  {
    user: {
      type: 'ObjectId',
      ref: USERS,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SessionLog = model(SESSION_LOGS, sessionLogSchema);

module.exports = SessionLog;
