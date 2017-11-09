const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const pkg = require('./package.json');
const chalk = require('chalk');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/main.js')],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.sass', '.scss'],
    modules: ['node_modules'],
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    noInfo: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlPlugin({
      title: pkg.name,
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new ProgressBarPlugin({
      format: chalk`Build [{green.bold :bar}] {green.bold :percent} (:elapseds) {gray :msg}`,
      summary: false,
    }),
  ],
};
