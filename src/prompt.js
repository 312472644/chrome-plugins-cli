/** 用户交互式命令配置 */
module.exports = {
  // 项目初始化配置
  projectInitList: [{
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
  }],
  // 是否安装依赖
  installDepList: [{
    name: 'choiceInstallDep',
    type: 'list',
    message: 'install dependencies?',
    choices: ['Y', 'N']
  }],
  // 是否覆盖现有项目重新下载
  coverOptionList: [{
    name: 'isCoverProject',
    message: 'is cover the project?',
    type: 'list',
    choices: ['Y', 'N']
  }]
};