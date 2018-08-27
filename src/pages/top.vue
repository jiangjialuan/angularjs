<template>
  <div id="top">
    <div class="displayInlineB f-l"><img src="../img/logo.png"/>一米科技</div>
    <div class="displayInlineB f-r"><label class="mr-15 username">{{userName}}</label><el-button type="text" class="btn btn-primary" @click="exit">退出</el-button></div>
  </div>
</template>

<script>
    export default {
        name: "top",
      data(){
          return{
            userName:sessionStorage.getItem('userName'),
          }
      },
      methods:{
        //点击退出触发事件
        exit(){
          this.$confirm('确认退出么？','提示',{}).then(()=>{
            var smData={
              act:11
            };
            this.api.request({
              url:this.api.logout,
              method:'post',
              data:smData,
            }).then((res)=>{
              sessionStorage.clear();
              this.$router.push('/login')
            });
          });
        }
      },
    }
</script>

<style lang="less" scoped>
#top{
    position:fixed;
    top:0px;
    left:0px;
    right:0px;
    height:45px;
    background: #101010;
    line-height: 45px;
    padding:0px 20px;
    color:#fff;
    z-index:30;
  font-size:12px;
    img{
      height:40px;
      margin-right:20px;
      vertical-align: middle;
    }
}
</style>
