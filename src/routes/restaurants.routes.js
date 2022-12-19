const express = require('express');
const { Restaurant } = require('../schemas');
var xss = require('xss');
const { adminAccess } = require('../lib/roleRestricted');

const router = express.Router();

module.exports = () => {
  router.post('/', adminAccess, async (req, res, next) => {
    const {name, phone, active, photo} = req.body;
    try {
      const restaurant = await new Restaurant({name: xss(name), phone: xss(phone), active:true, rate:5, rateCounter:0, photo:'__'}).save();
      res.json({
        name: restaurant.name,
        phone: restaurant.phone,
        active: restaurant.active,
        photo: restaurant.photo,
        createdAt: restaurant.createdAt,
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.post('/:id/rate/:value', async (req, res, next) => {
    try {
      const { id, value } = req.params;
      const restaurantForUpdate = await Restaurant.findById(id)
      restaurantForUpdate.rateCounter++;
      restaurantForUpdate.rate = (restaurantForUpdate.rateSumm+value)/restaurantForUpdate.rateCounter;
      const restaurant = await Restaurant.updateOne(restaurantForUpdate);
      res.json({
        name: restaurant.name,
        phone: restaurant.phone,
        active: restaurant.active,
        photo: restaurant.photo,
        createdAt: restaurant.createdAt,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.find()
      .populate()
        .exec();
      res.json(restaurants);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', adminAccess, async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Restaurant.deleteOne({ _id: id }).exec();
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
