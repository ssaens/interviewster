const webpack = require('webpack');
const config = require('../client/config/webpack.config');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.toString({
    colors: true
  }));
});
