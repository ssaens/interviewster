const mongoose = require('mongoose');

const router = require('express').Router();
const Guide = mongoose.model('Guide');
const Role = mongoose.model('Role');
const User = mongoose.model('User');

const auth = require('../../middleware/auth');

router.get('/:id', auth.required, (req, res, next) => {
  const id = req.params.id;
  Guide.findById(id).populate('author').exec().then(guide => {
    return res.json(guide.toJSON(true));
  }).catch(next);
});

router.get('/', auth.required, (req, res, next) => {
  const id = req.payload.id;
  Guide.find({ author: id }).populate('author').exec().then(guides => {
    return res.json(guides.map(guide => guide.toJSON(true)));
  }).catch(next);
});

router.post('/', auth.required, (req, res, next) => {
  const user = req.payload.id;
  const { role, name, skills, questions, duration } = req.body;

  const guide = new Guide();
  guide.author = user;
  guide.role = role.name;
  guide.skills = skills;
  guide.questions = questions;
  guide.duration = duration

  Promise.all([
    guide.save(),
    Role.updateMany({ _id: role._id }, { $inc: { popularity: 1 }}),
  ]).then(() => {
    return User.updateOne({ _id: user }, { $push: { guides: guide._id }})
  }).then(() => {
    return res.json(guide.toJSON());
  }).catch(next);
});

module.exports = router;
