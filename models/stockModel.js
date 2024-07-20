const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
 // timestamp: { type: Date, default: Date.now },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  dp: { type: Number }
}, {timestamps: true});

module.exports = mongoose.model('Stock', StockSchema);
