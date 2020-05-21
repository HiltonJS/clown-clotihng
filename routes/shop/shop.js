const express = require('express');

const shopController = require('../../controllers/shop/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);

router.get('/men', shopController.getMen);

router.get('/women', shopController.getWomen);

router.get('/products', shopController.getAll);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

module.exports = router;
