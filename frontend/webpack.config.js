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
  context: path.join(__dirname, 'src'),
  entry: {
    './app.js': './app.jsx',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/assets/',
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
          sourceMap: isDevelopment,
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
            sourceMap: isDevelopment,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [autoprefixer];
            },
            sourceMap: isDevelopment,
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
            sourceMap: isDevelopment,
          },
        },
        'less-loader',
      ],
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    }
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
    open: true,
    historyApiFallback: {
      index: '/assets/',
    },
  },
};

module.exports = config;
