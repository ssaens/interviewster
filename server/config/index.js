const secret = process.env.NODE_ENV === 'production' ? SECRET : 'secret';

module.exports = {
  secret
}