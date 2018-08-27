<template>
    <div id="login">
      <div class="body-login">
        <div class="loginMain">
          <div class="loginRight">
            <div class="logo"></div><br/>
            <div class="loginChange">
              <!--登录框-->
              <div class="input-group">
                <span class="input-group-addon">手机号&nbsp;&nbsp;</span>
                <el-input type="text" class="form-control" id="loginphone" v-model="phone" ></el-input>
              </div><br/>
              <div class="input-group">
                <span class="input-group-addon">密　码&nbsp;&nbsp;</span>
                <el-input class="form-control" type="password" id="loginpsw" v-model="passward" ></el-input>
              </div>
              <div class="box-con loginItem">
                <p class="alignCenter"><el-button type="primary"  @click="goLogin">登录</el-button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import md5 from 'js-md5'
    export default {
        name: "login",
      data(){
        return{
          phone:"19999999999",
          passward:'admin',
          parentMsg:'',
        }
      },
      methods:{
        //登录
        goLogin(){
          var smData={
            "act":11,
            "mobile_phone":this.phone,
            'password':md5(this.passward),
            'role':'2'
          };
          this.api.request({
            url:this.api.login,
            method: 'post',
            data:smData,
          }).then((res)=>{
            sessionStorage.setItem('userName',res.name);
            sessionStorage.setItem('isLogin',true);
            this.$message({
              type:'success',
              message:"登录成功"
            });
            setTimeout(()=>{
              this.$router.push('/list/shortList')
            },500);
          });
        },
      }
    }
</script>

<style lang="less" scoped>
#login{
  .body-login{
    background:  #2e2a4a;
    position:absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;

  }
  .form-control{
    width:250px;
  }
  .box-con{ padding: 20px;padding-top: 10px;line-height: 25px}
  .box-con tr>td{ padding-top:20px; vertical-align: middle}
  .box-con tr>td td{ padding: 0}
  .box-con .button{    border: 1px solid #00aeec;   border-radius:15px; margin-top: 20px;  line-height: 20px;  display: inline-block;  background: #1cc0fb;  color: #fff;  cursor:pointer;  font-size: 14px; padding: 5px 30px;}

  .box-con .button:hover{color:#fff; text-decoration: none }
  .box-con>p{ font-size: 13px; text-align: center;}
  .box-con p span:hover{ color: #1cc0fb; text-decoration: underline; cursor: pointer}
  .box-con input{ width: 100%;outline:none; background: none; border:none; line-height: 25px;padding:0 10px; height: 25px; color:#fff;}
  .box-con input:-webkit-autofill{background-color:transparent;background-color:transparent !important;}
  .loginMain{
    width:1000px;
    margin: 0px auto;
    position:fixed;
    top:0px;
    bottom:0px;
    left:50%;
    margin-left:-500px;
  }
  .loginRight{
    width:330px;
    color:#fff;
    position:absolute;
    top:50%;
    height:300px;
    margin-top:-200px;
    left:50%;
    margin-left:-250px;
    width:500px;
    z-index:2;
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
  }
  .logo{
    height:100px;
    background: url("../img/logo.png") no-repeat center;
    width:100%;
  }
  .m-b-20{
    margin-bottom:20px;

  }
  input:-webkit-autofill {-webkit-box-shadow: 0 0 0px 1000px #fff inset;-webkit-text-fill-color:#333 !important;}
}
</style>
