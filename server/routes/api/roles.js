const mongoose = require('mongoose');
const router = require('express').Router();

const Role = mongoose.model('Role');

router.get('/popular', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
  const role = new Role();

  const { name, skills } = req.body;
  role.name = name;

  role.save().then(() =>
    res.json(role.toJSON())
  ).catch(next);
});

module.exports = router;
