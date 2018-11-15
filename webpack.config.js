var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const paths = {
  ROOT_DIR: path.resolve(__dirname, '/'),
  BUILD_DIR: path.resolve(__dirname, 'src/build'),
  APP_DIR: path.resolve(__dirname, 'src/app'),
  GLOBAL_CFG: path.resolve(__dirname, 'src/appConfig.json'),
}

var config = {
  entry: paths.APP_DIR + '/index.jsx',
  output: {
    path: paths.BUILD_DIR,
    filename: 'bundle.js'
  },

  externals: {
    appConfig: JSON.stringify(require(paths.GLOBAL_CFG)), //eslint-disable-line
  },


  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.(png|jpg|svg)$/,
        // loader: 'url-loader?limit=8192'
        loader: 'file-loader'
      },

      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.APP_DIR, 'index.html'),
    }),
  ],

  devServer: {
    port: 8080,
    open: false,
    contentBase: paths.SRC,
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      'root', path.resolve(paths.APP_DIR),
      'node_modules', path.resolve(__dirname + './node_modules')
    ]
  }

};

module.exports = config;