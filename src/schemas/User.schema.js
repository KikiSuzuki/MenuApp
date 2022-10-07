const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const appRolesEnum = require('../lib/appRoles.enum');
const { validateEmail, validatePhone } = require('./validators');

const userSchema = new Schema(
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
    phone: {
      type: String,
      default: null,
      trim: true,
      // validate: {
      //   validator: validatePhone,
      //   message: (props) => `${props.value} is not a valid phone`,
      // },
    },
    login: {
      type: String,
      // validate: {
      //   validator: validateEmail,
      //   message: (props) => `${props.value} is not a valid email`,
      // },
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    passwordExpired: {
      type: Boolean,
      default: false,
    },
    appRole: {
      type: String,
      enum: {
        values: Object.values(appRolesEnum),
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function preSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = model('users', userSchema);

module.exports = User;
