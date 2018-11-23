const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const guideSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: String,
  skills: [String],
  questions: [{
    text: String,
    rubric: [String]
  }],
  duration: Number
}, {
  timestamps: true
});

mongoose.model('Guide', guideSchema);
