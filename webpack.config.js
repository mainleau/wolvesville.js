const TerserJSPlugin = require('terser-webpack-plugin');
const version = require('./package.json').version;

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: `wolvesville.${version}.min.js`,
    library: {
      type: 'umd',
      name: 'Wolvesville'
    }
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          keep_classnames: true
        }
      })
    ]
  }
}
