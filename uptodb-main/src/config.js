const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/CombinedDB';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected Successfully'))
  .catch(err => console.error('Database connection error:', err.message));

const Loginschema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', Loginschema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Added category field
  imageUrl: { type: String, required: true } // Added image field
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { User, Product };
