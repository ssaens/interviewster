const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
    required: [true, 'can\'t be blank']
  },
  popularity: {
    type: Number,
    default: 0,
    index: true
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }]
});

roleSchema.plugin(uniqueValidator, {message: 'already exists.'});

roleSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    skills: this.skills
  };
};

mongoose.model('Role', roleSchema);
