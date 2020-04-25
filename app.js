const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', (req, res, next) => {
  res.render('index', { pageTitle: 'home' });
});

app.listen(3000);
