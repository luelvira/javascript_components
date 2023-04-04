import PACKAGE from './package.json' assert { type: 'json' };
import webpack from 'webpack';
const {name, version} = PACKAGE;
const banner =  `Copyright ${new Date().getUTCFullYear()}, Lucas Elvira Martín. ${name} ${version}`
export default {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: `./jscomponents.min.${version}.js`,
    library: 'jscomponents',
    libraryTarget: 'var',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
};
