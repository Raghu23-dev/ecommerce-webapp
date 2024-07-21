const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../config');
const router = express.Router();
 
router.get('/', (req, res) => res.render('login'));
router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));
 
router.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;
 
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword
    });
 
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials.');
    }
 
    req.session.user = user;
    res.redirect('/products'); // Redirect to products page after login
  } catch (error) {
    res.status(500).send('Server error');
  }
});
 
module.exports = router;