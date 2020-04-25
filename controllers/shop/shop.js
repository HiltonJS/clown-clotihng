exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Shop',
  });
};
