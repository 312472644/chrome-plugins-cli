/** 项目创建 */

const path = require('path');
const colors = require('colors');
const program = require('commander'); // 定义命令解析
const ora = require('ora'); // 下载loading图标
const inquirer = require('inquirer'); // 交互式命令
const download = require('download-git-repo'); // git clone
const utils = require('./utils');

// 输入项目名称
const inputOptionList = [{
  name: 'projectName',
  type: 'input',
  default: 'chrome-plugins-cli'
}, {
  name: 'description',
  type: 'input',
  default: 'chrome-plugins-cli project',
}, {
  name: 'author',
  type: 'input',
}];

// git clone project
const generateTemplate = (projectName, description, author) => {
  // 要下载文件路径
  const downPath = path.join(process.cwd(), projectName);
  console.log('Start generating... \n');
  // 出现加载图标
  const spinner = ora("Downloading...");
  spinner.start();
  download('direct:https://github.com/312472644/chrome-utils.git#main', downPath, { clone: true }, (error) => {
    if (error) {
      spinner.fail();
      console.log((`Generation failed. ${error}`.red))
      return;
    }
    const packagePath = path.join(downPath, `package.json`);
    console.log(packagePath);
    utils.rewritePackage(packagePath, { projectName, description, author });
    // 结束加载图标
    spinner.succeed();
    console.log('\n Generation completed!'.green);
    console.log('\n To get started');
  })
}

inquirer
  .prompt(inputOptionList)
  .then((answer) => {
    const { projectName, description, author } = answer;
    generateTemplate(projectName, description, author);
  })