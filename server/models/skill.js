const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: [true, 'can\'t be blank']
  },
  popularity: {
    type: Number,
    default: 0,
    index: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  questions: [{
    text: String,
    rubric: [{
      points: Number,
      desc: String 
    }]
  }]
}, {
  timestamps: true
});

skillSchema.plugin(uniqueValidator, {message: 'already exists.'});

skillSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    questions: this.questions,
    featured: this.featured
  }
}

mongoose.model('Skill', skillSchema);
