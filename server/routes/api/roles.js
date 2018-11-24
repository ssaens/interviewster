const mongoose = require('mongoose');
const router = require('express').Router();

const Role = mongoose.model('Role');
const Skill = mongoose.model('Skill');

router.get('/', (req, res, next) => {
  const query = {};
  const sort = { createdAt: 'desc' };
  const { popular, q, v, limit } = req.query;

  if (popular) {
    sort.popularity = 'desc';
  }

  if (q) {
    query.name = new RegExp(`^${q}`, 'i');
  }

  let request = Role.find(query).sort(sort);
  if (popular && !limit) {
    request = request.limit(10);
  }
  if (limit) {
    request = request.limit(Number(limit));
  }
  if (v) {
    request = request.populate('skills');
  }

  request.exec().then(skills => {
    res.json(skills);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  const { name, skills } = req.body;
  const role = new Role();
  role.name = name;
  role.skills = skills;

  const updateSkills = Skill.updateMany({
    _id: { $in: skills }
  }, {
    $inc: { popularity: 1 }
  });

  Promise.all([
    role.save(),
    updateSkills
  ]).then(() => 
    res.json(role.toJSON())
  ).catch(next); 
});

module.exports = router;
