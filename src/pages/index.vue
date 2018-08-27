<template>
<div id="home">
  <Top></Top>
  <Sidebar></Sidebar>
  <router-view class="mainbody"></router-view>
</div>
</template>

<script>
  import Top from './top.vue'
  import Sidebar from './slider.vue'
    export default {
      name: "index",
      components: {Sidebar, Top}
    }
</script>

<style lang="less">
  @import url('../../static/css/common.css');
#home{
 .mainbody{
   padding:65px 20px 20px 200px;
 }
}
</style>
