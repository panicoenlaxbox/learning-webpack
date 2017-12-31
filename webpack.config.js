const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/app.ts",
    admin: "./src/admin.ts"
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }]
      })
    }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CommonsChunkPlugin({
      name: 'shared',
      minChunks: 2
    }),
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new HtmlWebpackPlugin({
      chunks: ['app', 'shared'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin', 'shared'],
      filename: 'settings.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'app.bundle.css'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};