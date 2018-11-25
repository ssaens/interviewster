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
    rubric: [{
      points: Number,
      desc: String
    }]
  }],
  duration: Number
}, {
  timestamps: true
});

guideSchema.methods.toJSON = function (withAuthor) {
  if (withAuthor) {
    return {
      _id: this._id,
      role: this.role,
      skills: this.skills,
      questions: this.questions,
      duration: this.duration,
      author: this.author.toAuthJSON(),
      createdAt: this.createdAt
    };
  }
  return {
    _id: this._id,
    role: this.role,
    skills: this.skills,
    questions: this.questions,
    duration: this.duration,
    author: this.author,
    createdAt: this.createdAt
  }
}

mongoose.model('Guide', guideSchema);
