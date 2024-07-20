const axios = require('axios');
const Stock = require('../models/stockModel');

const fetchData = async () => {
  const symbols = process.env.STOCKS.split(',');
  for (const symbol of symbols) {
    try {

      
      const response = await axios.get(process.env.API_URL, {
        params: {
          symbol,
          token: process.env.API_KEY
        }
      });

      const data = response.data;
      const stockData = {
        symbol,
        open: data.o,
        high: data.h,
        low: data.l,
        close: data.c,
        dp: data.dp
      };

      // Insert data into MongoDB
      const newStock = new Stock(stockData);
      await newStock.save();

      console.log('Data inserted into MongoDB:', stockData);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }
};

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchData, getAllStocks };
