/** rollup打包配置 */
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import utils from './utils';

module.exports = {
  input: utils.getDirectoryFile('src'),
  output: {
    dir: './lib',
    entryFileNames: '[name].js',
    format: 'cjs',
  },
  plugins: [
    terser({ compress: true }), //压缩js文件
    babel() //高级特性转化(es6->es5)
  ]
};