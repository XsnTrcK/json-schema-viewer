const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.md$/i,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JSON Schema Viewer',
      template: 'index.html',
      publicPath: '/',
      filename: 'index.html'
    }),
    new CspHtmlWebpackPlugin({
      'script-src': ["'strict-dynamic'", "cdn.jsdelivr.net"],
      'style-src': ["'unsafe-inline'", "'self'", "cdn.jsdelivr.net"]
    }),
    new webpack.DefinePlugin({
      'process': undefined,
      'process.release': null
    }),
    new webpack.EnvironmentPlugin({
      ANALYTICS_NEXT_MODERN_CONTEXT: true,
      NODE_ENV: 'development'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/logo.svg',
      publicPath: '/',
      prefix: 'auto/[contenthash]'
    })
  ]
};