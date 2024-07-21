const express = require('express');
const path = require('path');
const session = require('express-session');
const { User, Product } = require('./config');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
 
const app = express();
const port = 7000;
 
// Session middleware configuration
app.use(session({
  secret: 'your_secret_key', // Change this to a secure secret key
  resave: false,
  saveUninitialized: true
}));
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
 
app.use('/', authRoutes);
app.use('/products', productRoutes);
 
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));