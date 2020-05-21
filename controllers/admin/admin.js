const Product = require('../../model/product');
const mongodb = require('mongodb');

exports.addProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add-Product',
    path: '/add-product',
  });
};
exports.postaddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl1 = req.body.imageUrl1;
  const imageUrl2 = req.body.imageUrl2;
  const price = req.body.price;
  const description = req.body.Description;
  const category = req.body.category;

  const product = new Product({
    title: title,
    description: description,
    price: price,
    imageUrl1: imageUrl1,
    imageUrl2: imageUrl2,
    category: category,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      console.log('created product');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
  .then((products) => {
    console.log(products);
    res.render('admin/admin-products', {
      pageTitle: 'All Products',
      path: '/admin-products',
      products: products,
    });
  });
};
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
      });
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl1;
  const updatedImageUrl2 = req.body.imageUrl2;
  const updatedDesc = req.body.description;
  const updateCategory = req.body.category;

  console.log(updatedTitle);
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl1 = updatedImageUrl;
      product.imageUrl2 = updatedImageUrl2;
      product.description = updatedDesc;
      product.category = updateCategory;
      return product.save();
    })
    .then((result) => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin-products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('Destroyed Product');
      res.redirect('/admin-products');
    })
    .catch((err) => console.log(err));
};
