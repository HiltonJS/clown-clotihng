const express = require('express');
const path = require('path');

const app = express();

const shopRoutes = require('./routes/shop/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(shopRoutes);

app.listen(3000);
