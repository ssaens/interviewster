const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../middleware/auth');

const User = mongoose.model('User');

router.get('/me', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if (!user) {
      return res.status(401);
    }
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.post('/create', (req, res, next) => {
  const user = new User();
  const { username, email, password } = req.body;

  const errors = {};
  if (!username) {
    errors.username = 'can\'t be blank';
  }
  if (!email) {
    errors.email = 'can\'t be blank';
  }
  if (!password) {
    errors.password = 'can\'t be blank';
  }
  if (Object.keys(errors).length) {
    return res.status(422).json({ errors });
  }

  user.username = username;
  user.email = email;
  user.setPassword(password);

  user.save().then(() => {
    res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};
  if (!email) {
    errors.email = 'can\'t be blank';
  }
  if (!password) {
    errors.password = 'can\'t be blank';
  }
  if (Object.keys(errors).length) {
    return res.status(422).json({ errors });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = router;
