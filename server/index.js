require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../static')));

require('./config/mongoose.config').then(() => {
  require('./models');
  require('./config/passport.config');

  app.use(require('./routes'));
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });

  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}).catch(err => {
  console.error(err);
});
