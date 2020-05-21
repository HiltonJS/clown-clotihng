const express = require('express');
const path = require('path');

const app = express();

const shopRoutes = require('./routes/shop/shop');

const adminRoutes = require('./routes/admin/admin');
const bodyParser = require('body-parser');

const User = require('./model/user');

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5eac0184408f5400dca430fd')
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(shopRoutes);
app.use(adminRoutes);

mongoose
  .connect(
    'mongodb+srv://hiltonjs:nitrox14@cluster0-4m9xa.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Hilton',
          email: 'hkudya@gmail.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
