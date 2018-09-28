const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map', 
   plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      showErrors: true
    })
  ],
   devServer: {
     contentBase: './docs'
   }
 });