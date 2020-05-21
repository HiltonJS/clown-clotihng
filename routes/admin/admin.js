const express = require('express');

const adminController = require('../../controllers/admin/admin');

const router = express.Router();

router.get('/add-product', adminController.addProduct);

router.get('/admin-products', adminController.getAllProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/postaddProduct', adminController.postaddProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
