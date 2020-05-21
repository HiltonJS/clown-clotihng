const Product = require('../../model/product');

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getMen = (req, res, next) => {
  Product.find().then((products) => {
    console.log(products);
    res.render('shop/men', {
      pageTitle: 'Men Clothing',
      path: '/men',
      products: products,
    });
  });
};

exports.getWomen = (req, res, next) => {
  Product.find().then((products) => {
    console.log(products);
    res.render('shop/women', {
      pageTitle: 'Men Clothing',
      path: '/women',
      products: products,
    });
  });
};
exports.getAll = (req, res, next) => {
  Product.featchAll().then((products) => {
    console.log(products);
    res.render('/', {
      pageTitle: 'Men Clothing',
      path: '/women',
      products: products,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  let id = prodId.replace(/[^\w]/g, '');
  console.log(id);
  Product.findById(id)
    .then((product) => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect('/cart');
    });
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findById(prodId);
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};
