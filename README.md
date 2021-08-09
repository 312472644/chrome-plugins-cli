# chrome-cli 
chrome插件脚手架。

#### npm插件
1、commander 用来编写指令和处理命令行。

2、inquirer 交互式命令行工具。

3、ora 加载效果。

4、download-git-repo 用来下载远程模板的，支持 GitHub、 GitLab 和 Bitbucket等。

#### 安装

```
npm i chrome-plugins-cli
```

#### 发布

```javascript
npm run cli:publish --发布npm，执行该命令会在发布执行打包命令
npm run prepublish --发布npm之前执行的钩子，发布之前会进行cli打包,npm中内置一种前置hooks(pre),一种后置hooks(post)
npm run build:rollup --打包cli
```



#### 命令说明

```
chrome-plugins-cli init
```

| 命令 | 说明       | 描述                                                         |
| ---- | ---------- | ------------------------------------------------------------ |
| init | 工程初始化 | 构建初始化工程，参数包括项目名称、描述、作者。 |

