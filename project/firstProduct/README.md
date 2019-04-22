## 第一步
npm i

## 运行项目调试
npm run dev

## 运行electron
npm run elc

## tslit rules
rules: https://palantir.github.io/tslint/rules/

## 修改electron  的 main.js
项目运行需要注意：
npm run dev 之后 要看是哪个端口 8080或者其他，
需要在main.js  的 mainWindow.loadURL(url)  修改url 

## 其他
1.关于.vue 文件里的警告 a和b：
  a.experimentalDecorators
  b. xxx can only be used in .ts file
  vscode 安装vetur , vue 2 snippets
  按网上的方法配置后， 任然不可以， 则：
  vscode 全局配置
   "files.associations": {
        "*.vue": "vue"   //  原来是"*.vue": "html" 的 
    },
  参考: https://segmentfault.com/q/1010000011197194/