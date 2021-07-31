/** 项目创建 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const ora = require('ora'); // 下载loading图标
const inquirer = require('inquirer'); // 交互式命令
const download = require('download-git-repo'); // git clone

const { rewritePackage, isInstallDep, installDep, deleteDirectory } = require('./utils');
const { projectInitList, installDepList, coverOptionList } = require('./prompt.js');

// 是否需要覆盖项目
const coverProject = async (absolutePath) => {
  if (fs.existsSync(absolutePath)) {
    const spinner = ora();
    spinner.warn('the project has exist。'.yellow);
    const { isCoverProject } = await inquirer.prompt(coverOptionList);
    if (isCoverProject === "Y") {
      deleteDirectory(downPath);
    } else {
      return false;
    }
  }
};

// git clone project
const generateTemplate = (projectName, description, author) => {
  // 要下载文件路径
  const downPath = path.join(process.cwd(), projectName);
  const notCover = coverProject(downPath);
  if (!notCover) {
    return;
  }

  return new Promise((resolve) => {
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
      rewritePackage(packagePath, { projectName, description, author });
      // 结束加载图标
      spinner.succeed();
      resolve(isInstallDep());
    });
  });
}

// 询问是否需要下载依赖
const inquirerInstallDep = (dependencies, devDependencies) => {
  inquirer
    .prompt(installDepList)
    .then((answer) => {
      const { choiceInstallDep } = answer;
      if (choiceInstallDep === 'Y') {
        installDep(dependencies, devDependencies);
      }
    })
}

// cli 初始化
const initCli = () => {
  inquirer
    .prompt(projectInitList)
    .then(async (answer) => {
      const { projectName, description, author } = answer;
      const { dependencies, devDependencies, isPromptInstall } = await generateTemplate(projectName, description, author);
      if (isPromptInstall) {
        inquirerInstallDep(dependencies, devDependencies);
      }
    })
}

initCli();


