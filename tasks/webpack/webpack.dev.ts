import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as OfflinePlugin from 'offline-plugin';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';

import pathUtil from '../utils/path-util';

import * as packageJson from '../../package.json';

import {webpackBaseConfig} from './webpack.base';

const baseConfig = packageJson.config.base;

const PROTOCOL = 'http://';
const LOCAL_IP = '127.0.0.1';

const webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.build),
    publicPath: PROTOCOL + LOCAL_IP + ':' + baseConfig.dev.port + '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: `./${baseConfig.dir.src}/index.html`,
      favicon: `./${baseConfig.dir.src}/favicon.ico`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin(),
    new OfflinePlugin()
  ],
  devServer: {
    host: LOCAL_IP,
    port: baseConfig.dev.port,
    historyApiFallback: true,
    open: true,
    quiet: false,
    noInfo: true,
    stats: {
      cached: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    publicPath: PROTOCOL + LOCAL_IP + ':' + baseConfig.dev.port
  }
});

export {webpackDevConfig};