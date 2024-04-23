const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const {name, version} = pkg;
const banner =  `Copyright ${new Date().getUTCFullYear()}, Lucas Elvira Martín. ${name} ${version}`

module.exports = (env, args) =>({
  entry: './src/index.ts',
  mode: args.mode === "development" ? 'development' : 'production',
  plugins: [new webpack.BannerPlugin(banner),],
  watch: args.mode === "development",
  module: {rules: [{ test: /\.tsx?$/, loader: "ts-loader" },],},
  resolve: {extensions: ['.tsx', '.ts', '.js'],},
  //target: 'web',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `./jscomponents.js`,
    library: {
      name: 'jscomponents',
      type: 'amd'
    },
    umdNamedDefine: true,
    chunkFormat: 'module',
    clean: true,
  },
})
