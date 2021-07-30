/** 命令初始化 */

// 初始化命令
const program = require('commander');

program
  .version(require('../package').version)
  .usage('init')
  .command('init', 'generate a new project from a template') // 定义命令。对应package.json里面的bin命令

// 解析命令行参数
program.parse(process.argv);