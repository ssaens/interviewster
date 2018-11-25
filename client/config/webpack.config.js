const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '../index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../../static/public')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: '/public'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_PRODUCTION__: JSON.stringify(true)
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, ".."), 
      "node_modules"
    ],
    extensions: ['.js', '.jsx']
  }
};
