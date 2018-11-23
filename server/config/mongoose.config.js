const mongoose = require('mongoose');

module.exports = mongoose.connect(
  process.env.MONGO_URL, 
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
