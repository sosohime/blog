import pathUtil from '../utils/path-util';
import * as packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

const webpackBaseConfig = {
  entry: {
    main: pathUtil.resolve(baseConfig.dir.src) + '/' + 'main.ts'
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.vue',
      '.json'
    ],
    alias: {
      '@': pathUtil.resolve(baseConfig.dir.src),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.test.unit),
          pathUtil.resolve(baseConfig.dir.test.e2e)
        ],
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {}
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: baseConfig.dir.dist.fonts + '/' + '[name].[ext]'
        }
      },
      {
        test: /\.properties$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        loader: 'properties-json-loader'
      }
    ]
  }
};

export {
  webpackBaseConfig
};