<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
        <el-col :span="24">
          <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">订单管理</el-menu-item>

            <el-submenu index="4">
              <template slot="title">控制塔</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
              <el-menu-item index="4-3">选项3</el-menu-item>
              <el-menu-item index="4-4">选项4</el-menu-item>
            </el-submenu>

            <el-menu-item index="5">活动管理</el-menu-item>
            <el-menu-item index="6">切换主题</el-menu-item>

          </el-menu>


        </el-col>
    </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-row class="tac">
            <el-col :span="24">
          <el-menu default-active="/activePublic" class="el-menu-vertical-demo" @open="" @close="" theme="dark" unique-opened  :router="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/activePublic" :class="{'isActive': active}">选项1</el-menu-item>
                <el-menu-item index="/activeManage" :class="{'isActive': !active}">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-share"></i>导航四</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="4-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="4-4">
                <template slot="title">选项4</template>
                <el-menu-item index="4-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i>导航五</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="5-4">
                <template slot="title">选项4</template>
                <el-menu-item index="5-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
            </el-col>
          </el-row>
          <!--<el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">-->
            <!--<el-menu-item index="/activePublic" :class="{'isActive': active}">活动发布</el-menu-item>-->
            <!--<el-menu-item index="/activeManage" :class="{'isActive': !active}">活动管理</el-menu-item>-->
          <!--</el-menu>-->
        </div>

          <!-- 右侧主内容区 -->
          <div  class="main-right" >
            <transition name="fade">
              <router-view class="view"></router-view>
            </transition>
          </div>
    </main>
  </div>
</template>

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'

Vue.use(Element)

export default {
  name: 'app',
  data: function (){
    return {
      active:true,
      headerFixed : true
    }
  },
  created: function(){
    this.$router.push('/activePublic');
  },
  methods: {

  },
  watch: {
     '$route': function (to,from) {
         if(to.path == '/activePublic'){
             this.active = true ;
         }else if(to.path == '/activeManage'){
             this.active = false ;
         }
     }
  }
}
</script>

<style>

body{margin: 0;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
header .el-menu-demo{padding-left: 300px!important;}

/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
main .el-menu{background-color: transparent!important;}
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#20a0ff; }

/* 单选框 */
  .el-form-item .el-radio+.el-radio {
    margin-left: 30px!important;
  }
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

/* 导航栏菜单选中效果 */
  .isActive{color: #20a0ff!important;}
   #app main .aside .is-active{color: #475669;}

  /* 卡片 */
  .el-card{overflow: visible!important;}
</style>
