const path = require('path');
const router = require('express').Router()

router.use('/api', require('./api'));
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../static/index.html'), err => {
    if (err) {
      return res.status(500).send(err);
    }
  });
});

module.exports = router;
