const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    
    trim: true
  },
  category: {
    type: String,
    
    trim: true
  },
  price: {
    type: Number,
    
    min: 0
  },
  description: {
    type: String,
    
    trim: true
  },
  images: {
    type: [String],
    required: true
  },
  stock: {
    type: Number,
    
    min: 0
  },
  colors: {
    type: [String],
    
  },
  sizes: {
    type: [String],
   
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;
