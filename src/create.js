/** 项目创建 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const ora = require('ora'); // 下载loading图标
const inquirer = require('inquirer'); // 交互式命令
const download = require('download-git-repo'); // git clone

const { rewritePackage, isInstallDep, installDep, deleteDirectory, installCompleteMessage } = require('./utils');
const { projectInitList, installDepList, coverOptionList } = require('./prompt.js');
const { CHOICES, COMPLETE } = require('./constant.js');

/**
 * 下载项目文件
 *
 * @param {*} downPath
 * @param {*} [answer={ projectName, description, author }]
 */
const downTemplate = (downPath, answer = { projectName, description, author }) => {
  console.log('Start generating... \n');
  // 出现加载图标
  const spinner = ora("Downloading...");
  spinner.start();
  download('direct:https://github.com/312472644/chrome-utils.git#main', downPath, { clone: true }, (error) => {
    if (error) {
      installCompleteMessage(spinner, COMPLETE.Fail, `Generation failed. ${error}`);
      return;
    }
    const packagePath = path.join(downPath, `package.json`);
    const { projectName, description, author } = answer;
    rewritePackage(packagePath, { projectName, description, author });
    // 结束加载图标
    spinner.succeed();
    // 安装依赖文件
    const { dependencies, devDependencies, isPromptInstall } = isInstallDep();
    if (isPromptInstall) {
      inquirerInstallDep(dependencies, devDependencies);
    }
  });
};

// git clone project
const generateTemplate = async (projectName, description, author) => {
  const downPath = path.join(process.cwd(), projectName);
  // 存在重复的项目名称
  if (fs.existsSync(downPath)) {
    const spinner = ora();
    spinner.warn('warn:the project has existed'.rainbow);
    inquirer.prompt(coverOptionList).then((answer) => {
      const { isCoverProject } = answer;
      if (isCoverProject === CHOICES.Yes) {
        const spinner = ora('Deleting...');
        spinner.start();
        try {
          deleteDirectory(downPath);
        } catch (error) {
          throw new Error(`\n delete file fail,${error}`.red);
        } finally {
          spinner.succeed();
        }
        downTemplate(downPath, { projectName, description, author });
      }
    });
  } else {
    downTemplate(downPath, { projectName, description, author });
  }
}

/**
 * 询问是否需要下载依赖
 *
 * @param {*} dependencies
 * @param {*} devDependencies
 */
const inquirerInstallDep = (dependencies, devDependencies) => {
  inquirer
    .prompt(installDepList)
    .then((answer) => {
      const { choiceInstallDep } = answer;
      if (choiceInstallDep === CHOICES.Yes) {
        installDep(dependencies, devDependencies);
      } else {
        console.log(`\n Generation Success`.green);
      }
    })
}

// cli 初始化
const initCli = () => {
  inquirer
    .prompt(projectInitList)
    .then(async (answer) => {
      const { projectName, description, author } = answer;
      generateTemplate(projectName, description, author);
    })
}

initCli();


