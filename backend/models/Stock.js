// models/Stock.js

const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
