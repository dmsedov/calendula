/* eslint-disable */
const path = require('path');
const { argv } = require('yargs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = argv.mode;
const isDevelopment = env === 'development';
const isProduction = !isDevelopment;

const config = {
  context: __dirname + "/src/client/",
  entry: {
    './index.js': './index.jsx',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/public/static/',
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react'],
        },
      }],
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: isProduction,
            sourceMap: isProduction,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [autoprefixer];
            },
            sourceMap: isProduction,
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: isProduction,
          },
        },
        'less-loader',
      ],
    },
  ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './html/index.html',
    }),
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            warnings: false,
            drop_console: true,
            unsafe: true,
          },
        },
      }),
    ],
  } : {},
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    compress: true,
    open: true,
    historyApiFallback: true,
    contentBase: '/public/static/',
  },
};

module.exports = config;
