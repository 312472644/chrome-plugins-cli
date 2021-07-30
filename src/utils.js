const fs = require('fs');
const colors = require('colors');

/** 工具脚本 */
const utils = {
  /**
   * 重写clone项目package文件
   *
   * @param {*} path
   * @param {*} data
   */
  rewritePackage(path, data) {
    const fileName = `${path}/package.json`;
    const { projectName, description, author } = data;
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      let json = JSON.parse(content);
      json.name = projectName;
      json.author = author;
      json.description = description;
      //修改项目文件夹中 package.json 文件
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
    } else {
      console.log('file is not exist'.red);
    }
  }
};

module.exports = utils;