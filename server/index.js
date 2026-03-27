require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const MOCKAPI_URL = process.env.MOCKAPI_URL;

const app = express();
app.use(cors({ origin: '*' }));
const PORT = process.env.PORT || 4000;

function getCategories(data) {
  return [...new Set(data.map(r => r.category))];
}

app.get('/restaurants', async (req, res) => {
  try {
    const { category } = req.query;
    const response = await fetch(`${MOCKAPI_URL}/restaurants`);
    const data = await response.json();
    let filtered = data;
    if (category) {
      filtered = filtered.filter(r => r.category === category);
    }
    res.json({
      restaurants: filtered,
      categories: getCategories(data)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

app.get('/restaurants/:id', async (req, res) => {
  try {
    const response = await fetch(`${MOCKAPI_URL}/restaurants/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurant detail' });
  }
});

app.get('/restaurants/:id/reviews', async (req, res) => {
  try {
    const response = await fetch(`${MOCKAPI_URL}/reviews/?restaurantId=${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});
