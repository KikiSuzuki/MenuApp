const { Schema, model } = require('mongoose');
const { USER_CREATE_REQUESTS } = require('./collectionNames');
const { validatePhone, validateEmail } = require('./validators');

const userCreateRequestSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      default: null,
    },
    position_kz: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
      trim: true,
      validate: {
        validator: validatePhone,
        message: (props) => `${props.value} is not a valid phone`,
      },
    },
    login: {
      type: String,
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const UserCreateRequest = model(USER_CREATE_REQUESTS, userCreateRequestSchema);

module.exports = UserCreateRequest;
