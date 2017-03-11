/**
 * Created by chuck7 on 16/7/19.
 */
"use strict";
const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot,'../'),
  staticDir = path.join(root, 'static'),
  fs = require('fs'),
  _ = require('lodash');
//默认生产环境
let config = {
  app: {
    name:'kov-blog',
    port: 3000,
    adminPath: '/api' // 后台路径
  },
  debug:false,
  env:'production',
 /* mongoConfig: { // 数据库配置
    url: 'mongodb://localhost:27017/kov-blog',
    opts:{
      user:'',
      pass:''
    }
  },*/
  dir: { // 目录配置
    root,
    log: path.join(__dirname,'..', 'logs'),
    server:serverRoot,
    static: staticDir
  },
};

module.exports = config;
