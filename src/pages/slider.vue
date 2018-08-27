<template>
<div id="slider">
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/list/shortList">短视频管理</el-menu-item>
    <el-menu-item index="/userManager">商户管理</el-menu-item>
    <el-menu-item index="/shopManager">商品管理</el-menu-item>
    <el-menu-item index="/appManagerList">小程序管理</el-menu-item>
    <el-menu-item index="/appVersionList">APP版本管理</el-menu-item>
    <el-menu-item index="/TaobaoList">淘宝客推广</el-menu-item>
    <el-menu-item index="/miTaoOrder">米淘订单</el-menu-item>
    <el-menu-item index="/CustomerConsultation">客户咨询</el-menu-item>
    <el-menu-item index="/ReportManagement">报单管理</el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <!--<i class="el-icon-location"></i>-->
        <span>优店</span>
      </template>
      <el-menu-item index="/youShop/userList">入驻列表</el-menu-item>
      <el-menu-item index="/youShop/goodsList">商品列表</el-menu-item>
      <el-menu-item index="/youShop/videoList">视频列表</el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
    export default {
        name: "slider",
      data(){
          return {

          }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style lang="less" scoped>
#slider{
  width:180px;
  position:fixed;
  top:45px;
  bottom:0px;
  left:0px;
  overflow:hidden;
  background-color: rgb(84, 92, 100);
  ul{
    width:180px;
    overflow:hidden;
  }
}
</style>
