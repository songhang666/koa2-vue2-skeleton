    # 全局安装 vue-cli
    $ npm install --global vue-cli
    # 创建一个基于 webpack 模板的新项目
    $ vue init webpack my-project
    # 安装依赖
    $ cd my-project
    $ npm install
    $ npm run dev

生成的项目目录如下

打开package.json

	 "scripts": {
        "dev": "node build/dev-server.js",
        "build": "node build/build.js"
      }

上面两行代码的意思是，当我们在命令行输入```cnpm run dev```,实际上执行的是```node build/dev-server.js```

打开dev-serve.js
