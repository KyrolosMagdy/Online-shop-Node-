const express = require('express');
const path = require('path');
const productController = require('../controllers/products')

const router = express.Router();

 
router.get('/admin/add-product', productController.getAddProduct);

router.post('/admin/add-product', productController.postAddProduct);

exports.routes = router;