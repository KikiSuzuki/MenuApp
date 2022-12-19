const { Schema, model } = require('mongoose');
const { RESTAURANTS } = require('./collectionNames');

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    compound:{
        type: String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    restaurant:{
        type: 'ObjectId',
        default: null,
        ref: RESTAURANTS,
    }
  },
  { timestamps: true },
);

const Menu = model('menus', menuSchema);

module.exports = Menu;
