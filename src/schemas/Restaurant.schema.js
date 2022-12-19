const { Schema, model } = require('mongoose');
const { validatePhone } = require('./validators');
const { MENU } = require('./collectionNames');

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    active: {
      type: Boolean,
      default: false,
    },
    photo: {
        type: String,
        required:false,
    },
    rate:{
      type: Number,
      required:false,
    },
    rateCounter:{
      type: Number,
      required:false,
    },
    rateSumm:{
      type: Number,
      required:false,
    }, 
    menu:{
      type: Array,
      required:false,
    }
  },
  { timestamps: true },
);



const Restaurant = model('restaurant', restaurantSchema);

module.exports = Restaurant;
