export default {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: './jscomponents.min.js',
    library: 'jscomponents',
    libraryTarget: 'var',
    umdNamedDefine: true
  },
};
