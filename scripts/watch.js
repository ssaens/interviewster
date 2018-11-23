const nodemon = require('nodemon');
const path = require('path');
const webpack = require('webpack');

const config = require('../client/config/webpack.dev.config');
const compiler = webpack(config);
compiler.watch({
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});

nodemon({
  script: path.join(__dirname, '../server'),
  ignore: [
    path.join(__dirname, '../client'),
    path.join(__dirname, '../node_modules'),
    path.join(__dirname, '../scripts'),
    path.join(__dirname, '../static')
  ]
});

nodemon.on('start', function () {
  console.log('server starting on port 8080');
}).on('quit', function () {
  console.log('server stopped');
  process.exit();
}).on('restart', function (files) {
  console.log('server restart due to: ', files);
});
