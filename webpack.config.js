const webpack = require('webpack');
const path = require('path');
const pkg = require("./package.json");
const theme = pkg.theme;

const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './public');

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      "canner-schema": path.resolve(__dirname, './canner.schema.js'),
      "styled-components": path.resolve(__dirname, 'node_modules', 'styled-components')
    }
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        options: {
          presets: [
            require('babel-preset-env'),
            require('babel-preset-react'),
            require('babel-preset-stage-0'),
          ]
        }
      },
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: !isProduction ? 'style' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css'
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: !isProduction ? 'style' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css'
          },
          {
            loader: 'less',
            // antd - customized themes
            // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ],
      },
      // loader for canner.schema.js
      {
        test: /\.schema\.js|canner\.def\.js$/,
        use: [
          {loader: 'canner-schema-loader'},
          {loader: 'babel-loader'}
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: !isProduction ? '[name].css' : '[name].[hash].css',
      chunkFilename: !isProduction ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: !isProduction ? 'development' : 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
