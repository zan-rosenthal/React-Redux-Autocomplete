var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders:[{
      test:/\.js/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets:[ 'es2015', 'react', 'stage-2' ],
        plugins: ['transform-decorators-legacy']
      }
    },{
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: __dirname+'/dist',
    publicPath:'/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    contentBase: './dist'
  }
};
