const express = require('express');
const path = require('path');

const shopProducts = express.Router();


shopProducts.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../' ,'views', 'shop.html'));
});

module.exports = shopProducts;