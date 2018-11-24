const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/roles', require('./roles'));
router.use('/skills', require('./skills'));

module.exports = router;
