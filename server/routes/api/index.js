const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/skills', require('./skills'));

module.exports = router;
