const mongoose = require('mongoose');
const router = require('express').Router();

const Skill = mongoose.model('Skill');

router.get('/', (req, res, next) => {
  const query = {};
  const { featured, q } = req.query;

  if (featured) {
    query.featured = true;
  }

  if (q) {
    query.name = new RegExp(`^${q}`, 'i');
  }

  Skill.find(query)
    .sort({createdAt: 'desc'})
    .exec()
    .then(skills => {
      res.json(skills);
    }).catch(next);
});

router.post('/', (req, res, next) => {
  const { name, questions } = req.body;
  
  const skill = new Skill();
  skill.name = name;
  skill.questions = questions;
  skill.featured = false;

  skill.save().then(() => {
    res.json(skill.toJSON());
  }).catch(next);
});

module.exports = router;
