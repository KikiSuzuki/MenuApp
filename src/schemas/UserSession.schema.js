const { Schema, model } = require('mongoose');
const { USERS, USER_SESSIONS } = require('./collectionNames');

const UserSessionSchema = new Schema(
  {
    user: {
      type: 'ObjectId',
      ref: USERS,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expired: {
      type: Boolean,
      required: true,
      default: true,
    },
    family: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const UserSession = model(USER_SESSIONS, UserSessionSchema);

module.exports = UserSession;
