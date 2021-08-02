/** rollup打包配置 */
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

module.exports = {
  input: {
    a: './test/a.js',
    b: './test/b.js'
  },
  output: {
    dir: './lib',
    entryFileNames: '[name].js'
  },
  plugins: [
    resolve(), //允许加载在 node_modules中的第三方模块
    terser({ compress: true }), //压缩js文件
    babel() //高级特性转化(es6->es5)
  ]
};