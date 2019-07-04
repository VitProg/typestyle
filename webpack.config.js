const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    // unminified
    mode: 'development',
    entry: {
      'typestyle': './lib/index.js',
    },
    output: {
      filename: '../umd/typestyle.js',
      libraryTarget: 'umd',
      library: 'typestyle',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            comments: true,
          },
          sourceMap: false,
        }),
      ],
    },
  },
  {
    // minified
    mode: 'production',
    entry: {
      'typestyle.min': './lib/index.js',
    },
    output: {
      filename: '../umd/typestyle.min.js',
      libraryTarget: 'umd',
      library: 'typestyle',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: true,
          },
          sourceMap: false,
        }),
      ],
    },
  },
];
