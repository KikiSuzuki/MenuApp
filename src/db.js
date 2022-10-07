const mongoose = require('mongoose');

module.exports.connect = async (dbConnectionString) => mongoose.connect(dbConnectionString, { useNewUrlParser: true });
