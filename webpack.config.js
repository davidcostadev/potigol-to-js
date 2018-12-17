const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  entry: resolve('src/editor.js'),
  output: {
    path: resolve('dist'),
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      chunksSortMode: 'dependency',
    }),
  ],
};
