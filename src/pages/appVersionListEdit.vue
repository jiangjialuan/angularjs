<template>
    <div id="appVersionListEdit">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="版本状态">
          <el-select v-model="form.status" placeholder="版本状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.os_type" placeholder="版本状态">
            <el-option label="Android" value="0"></el-option>
            <el-option label="IOS" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="version" :rules="[{ required: true, message: '请输入版本号', trigger: 'blur'}]">
          <el-input v-model="form.version" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="版本代号" prop="code" :rules="[{ required: true, message: '请输入版本代号', trigger: 'blur'}]">
          <el-input v-model="form.code" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="版本说明" prop="note" :rules="[{ required: true, message: '请输入版本说明', trigger: 'blur'}]">
          <el-input v-model="form.note" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "appVersionListEdit",
      data(){
          return {
            form:{
              act:11,
              code:this.$route.query.code?this.$route.query.code:'',
              id:this.$route.query.id?this.$route.query.id:'',
              note:this.$route.query.note?this.$route.query.note:'',
              os_type:this.$route.query.os_type?this.$route.query.os_type==0?'0':'1':'0',
              status:this.$route.query.status?this.$route.query.status==0?'0':'1':'0',
              version:this.$route.query.version?this.$route.query.version:''
            },
          }
      },
      created(){
          console.log(this.$route.query.status==0?'0':'1');
          console.log(this.form);
      },
      methods:{
        //若有id获取编辑数据

        //点击发布触发事件
        onSubmit(){
          this.$refs['form'].validate((valid)=>{
            if(valid){
              var smData=JSON.parse(JSON.stringify(this.form));
              if(smData.id!=''){
                var url=this.api.edit_app_version;
              }else{
                var url=this.api.publish_app_version;
              }
              this.api.request({
                url:url,
                method:'post',
                data:smData
              }).then((res)=>{
                  this.$message({
                    type:'success',
                    message:'发布成功！'
                  });
                  this.$router.push('/appVersionList');
              });
            }
          });
        }
      },
    }
</script>

<style lang="less" scoped>
  #appVersionListEdit{
    .el-form-item{
      text-align: left;
    }
  }

</style>
