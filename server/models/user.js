const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const secret = require('../config').secret;

const PALLETE = [
  '1080b7',
  '229c1a'
];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  image: String,
  hash: String,
  salt: String,
  guides: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Guide' 
  }]
}, {
  timestamps: true
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.setUsername = function (username) {
  this.username = username;
  const bgColor = PALLETE[Math.floor(Math.random() * PALLETE.length)];
  this.image = `https://ui-avatars.com/api/?size=128&name=${username}&background=${bgColor}&uppercase=false`;
};

userSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    image: this.image
  };
};

mongoose.model('User', userSchema);
