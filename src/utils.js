const fs = require('fs');
const colors = require('colors');
const path = require('path');
const ora = require('ora');
const { exec } = require('child_process');
const { COMPLETE } = require('./constant.js');

/** 工具脚本 */
const utils = {
  // 用户输入的项目信息
  initProject: {
    projectName: 'chrome-plugins-cli'
  },
  // package依赖包
  packageDependencies: {
    dependencies: {},
    devDependencies: {}
  },
  /**
   * 重写clone项目package文件
   *
   * @param {*} path
   * @param {*} data
   */
  rewritePackage(path, data) {
    const { projectName, description, author } = data;
    if (fs.existsSync(path)) {
      const content = fs.readFileSync(path).toString();
      let json = JSON.parse(content);
      json.name = projectName;
      json.author = author;
      json.description = description;
      // 获取第三方依赖包
      utils.packageDependencies.dependencies = json.dependencies || {};
      utils.packageDependencies.devDependencies = json.devDependencies || {};
      // 获取项目信息
      utils.initProject.projectName = projectName;
      //修改项目文件夹中 package.json 文件
      fs.writeFileSync(path, JSON.stringify(json, null, '\t'), 'utf-8');
    } else {
      console.log('file is not exist'.red);
    }
  },
  /**
   * 是否需要安装依赖
   *
   * @return {*} 
   */
  isInstallDep() {
    const { dependencies, devDependencies } = utils.packageDependencies;
    return {
      dependencies,
      devDependencies,
      isPromptInstall: Object.keys(dependencies).length > 0 || Object.keys(devDependencies).length > 0
    }
  },
  /**
   * 安装依赖
   *
   */
  installDep() {
    const spinner = ora('install...');
    spinner.start();
    // 执行依赖命令
    exec('npm i', {
      cwd: path.join(process.cwd(), utils.initProject.projectName)
    }, (error) => {
      if (error) {
        utils.installCompleteMessage(spinner, COMPLETE.Fail, 'install dependencies fail');
        return;
      }
      utils.installCompleteMessage(spinner, COMPLETE.Success, 'install dependencies success');
    });
  },
  /**
   * 安装完成提示信息
   *
   * @param {*} spinner ora实例
   * @param {*} type fail | success
   * @param {*} message 加载完成提示信息
   */
  installCompleteMessage(spinner, type, message) {
    if (type === COMPLETE.Success) {
      console.log(`\n ${message}`.green);
      spinner.succeed();
    } else if (type === COMPLETE.Fail) {
      console.log(`\n ${message}`.red);
      spinner.fail();
    }
  },
  /**
   * 删除文件夹以及其目录下的所有文件
   *
   * @param {*} path
   */
  deleteDirectory(path) {
    let files = [];
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach((file) => {
        const curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          utils.deleteDirectory(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
};

module.exports = utils;