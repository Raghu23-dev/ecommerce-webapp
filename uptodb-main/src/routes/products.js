const express = require('express');
const { Product } = require('../config');
const router = express.Router();
 
// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}
 
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
router.get('/add', isAuthenticated, (req, res) => {
  res.render('addProduct');
});
 
router.post('/add', isAuthenticated, async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
 
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      imageUrl
    });
 
    await newProduct.save();
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('editProduct', { product });
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;
 
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      category,
      imageUrl
    });
 
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
module.exports = router;
