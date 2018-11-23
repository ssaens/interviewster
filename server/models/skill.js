const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    index: true,
    unique: true
  },
  popularity: {
    type: Number,
    default: 0,
    index: true
  },
  featured: Boolean,
  questions: [{
    text: String,
    rubric: [String]
  }]
}, {
  timestamps: true
});

skillSchema.plugin(uniqueValidator, {message: 'already exists.'});

mongoose.model('Skill', skillSchema);
