const glob = require('glob');
const path = require('path');

/** 打包工具 */
export default {
  /**
   * 获取目录下所有文件名称
   *
   * @param {*} dirName
   */
  getDirectoryFile(dirName) {
    const absolutePath = path.join(process.cwd(), dirName);
    const entryList = glob.sync(path.join(`${absolutePath}/**/*`), { nodir: true });
    const entry = {};
    entryList.map((item) => {
      if (item.endsWith('.js')) {
        const pathList = item.split('/');
        if (pathList.length) {
          const pageName = pathList[pathList.length - 1].replace('.js', '');
          entry[pageName] = path.join(process.cwd(), `/src/${pageName}.js`);
        }
      }
    });
    return entry;
  }
}