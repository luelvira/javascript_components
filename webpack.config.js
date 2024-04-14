//import PACKAGE from './package.json' assert { type: 'json' };
const path = require('path');
const webpack = require('webpack');
const {name, version} = {name: "jscomponents", version: "0.0.1"};
const banner =  `Copyright ${new Date().getUTCFullYear()}, Lucas Elvira Martín. ${name} ${version}`
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: `./jscomponents.min.${version}.js`,
    library: 'jscomponents',
    libraryTarget: 'var',
    umdNamedDefine: true,
    clean: true
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
