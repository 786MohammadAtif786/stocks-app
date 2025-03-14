const express = require('express');
const connectDB = require('./config/db');
const stockRoutes = require('./routes/stockRoutes');
const { fetchData } = require('./controllers/stockController');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes);

// Polling function
const startPolling = () => {
  fetchData(); // Fetch data immediately
  setInterval(fetchData, process.env.POLL_INTERVAL); // Fetch data at regular intervals
};

// Start polling
startPolling();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
