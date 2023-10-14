// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const Stock = require('./models/Stock'); // We'll create this model in a moment

const PORT = process.env.PORT || 3001;

// Connect to your MongoDB Atlas cluster (replace with your connection string)
const dbURI = 'mongodb+srv://stockapi:stockapi@cluster0.2iho49z.mongodb.net/stockTracker';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());



app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    console.log(stocks,"stock")
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to update stock prices randomly
function updateStockPrices() {
  Stock.find()
    .then((stocks) => {
      stocks.forEach(async (stock) => {
        const randomChange = (Math.random() - 0.5) * 10;
        stock.price += randomChange;
        await stock.save();
      });
    })
    .catch((error) => {
      console.error('Error updating stock prices:', error);
    });
}

// Periodically update stock prices (every minute)
setInterval(updateStockPrices, 60000);



























