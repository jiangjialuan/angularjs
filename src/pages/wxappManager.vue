<template>
    <div id="wxappManager">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.nick_name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <table class="el-table el-table--border el-table--border">
        <thead>
        <tr>
          <th  class="alignCenter v-mid">名称</th>
          <th class="alignCenter v-mid">主体名称</th>
          <th class="alignCenter v-mid">appid</th>
          <th class="alignCenter v-mid" width="120">appsecret</th>
          <th class="alignCenter v-mid" width="180">一米ID</th>
          <th class="alignCenter v-mid">代理手机</th>
          <!--<th class="alignCenter v-mid">类型</th>-->
          <th class="alignCenter v-mid">当前版本</th>
          <th class="alignCenter v-mid">提交代码时间</th>
          <th class="alignCenter v-mid">提交审核时间</th>
          <!--<th class="alignCenter v-mid">审核id</th>
          <th class="alignCenter v-mid">审核成功时间</th>
          <th class="alignCenter v-mid">创建时间</th>-->
          <th class="alignCenter v-mid">版本</th>
          <th class="alignCenter v-mid">审核结果</th>
          <th class="alignCenter v-mid"  width="120">基本操作</th>
          <th class="alignCenter v-mid"  width="120">发布操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData" id="item.authorizer_appid">
          <td class="alignCenter v-mid"><p>{{item.nick_name}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.principal_name}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.authorizer_appid}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.authorizer_appsecret}}</p></td>
          <td class="alignCenter v-mid">
            <p>一米ID：{{item.anchorid}}</p>
            <p>手机号:{{item.mobile_phone==''?'无':item.mobile_phone}}</p>
          </td>
          <td class="alignCenter v-mid"><p>{{item.general_agent_phone}}</p></td>
          <!--<td class="alignCenter v-mid"><p>{{item.type==0?'小程序':'公众号'}}</p></td>-->
          <td class="alignCenter v-mid"><p>{{item.version}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.commit_code_time}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.commit_auditid_time}}</p></td>
          <!--<td class="alignCenter v-mid"><p>{{item.auditid}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.audit_success_time}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.create_time}}</p></td>-->
          <td class="alignCenter v-mid"><p>{{item.applet_version}}</p></td>
          <td class="alignCenter v-mid"><p>{{item.audit_result}}</p></td>
          <td class="alignCenter v-mid">
            <p>
              <el-button type="text" @click="modifyRealmName(item.authorizer_appid)">修改域名</el-button>
              <el-button type="text"  @click="getType(item.authorizer_appid)">获取类目</el-button>
              <el-button type="text" @click="getSetting(item.authorizer_appid)">获取配置</el-button>
              <el-button type="text" @click="getQrcode(item.authorizer_appid)">获取二维码</el-button>
              <el-button type="text" @click="getAuditstatus(item.authorizer_appid,item.auditid)">获取审核状态</el-button>
              <el-button type="text" @click="bindTester(item.authorizer_appid)">绑定体验者</el-button>
            </p>
          </td>
          <td class="alignCenter v-mid">
            <p>
              <el-button type="text" @click="getModal(item.authorizer_appid)">上传代码</el-button>
              <el-button type="text" @click="submitAudit(item.authorizer_appid)">提交审核</el-button>
              <el-button type="text" @click="release(item.authorizer_appid)">发布小程序</el-button>
            </p>
          </td>
        </tr>
        </tbody>
      </table>
      <el-pagination
        @current-change="getList"
        :page-size="pagination.perSize"
        layout="total, prev, pager, next"
        :total="pagination.total">
      </el-pagination>
      <el-dialog title="上传小程序代码" :visible.sync="dialogFormVisible">
        <el-form :model="uploadForm" ref="uploadForm">
          <el-form-item label="模板id" prop="template_id" :rules="[{ required: true, message: '请输入模板id', trigger: 'blur'}]">
            <el-input v-model="uploadForm.template_id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="小程序版本" prop="user_version" :rules="[{ required: true, message: '请输入小程序版本', trigger: 'blur'}]">
            <el-input v-model="uploadForm.user_version" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="当前版本描述" prop="user_desc" :rules="[{ required: true, message: '当前版本描述', trigger: 'blur'}]">
            <el-input v-model="uploadForm.user_desc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmuploadForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "wxappManager",
      data(){
          return {
            form:{
              nick_name:'',
            },
            pagination:{
              page:1,
              total:0,
              perSize:20
            },
            tableData:[],
            uploadForm:{
              appid:'',
              template_id:'',
              user_version:'',
              user_desc:''
            },
            dialogFormVisible:false
          }
      },
      created(){
        this.getList(1)
      },
      methods:{
        //获取列表
        getList(page){
          var smData={
            act:11,
            page:page,
            nickname:this.form.nick_name
          };
          this.api.request({
            url:this.api.get_authorised_applet,
            method:'post',
            data:smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.total=res.total_count;
            this.pagination.page=page;
            this.pagination.perSize=Math.ceil(res.total_count/res.total_page);
          });
        },
        //修改域名
        modifyRealmName(sappid){
          this.api.request({
            url:this.api.modifyDomain,
            method: 'get',
            params: {
              appid:sappid
            }
          }).then((res)=>{
            this.$message({
              type:'success',
              message:'修改成功！'
            });
          });
        },
        //获取类目
        getType(sappid){
          window.open(window.location.protocol+"//"+window.location.host+'/weixin/authorization/getCategory?appid='+sappid);
        },
        //获取配置
        getSetting(sappid){
          window.open(window.location.protocol+"//"+window.location.host+'/weixin/authorization/getPage?appid='+sappid);
        },
        //获取二维码
        getQrcode(sappid){
          window.open(window.location.protocol+"//"+window.location.host+'/weixin/authorization/getQrcode?appid='+sappid);
        },
        //获取审核状态
        getAuditstatus(sappid,sauditid){
          if(sauditid==''||sauditid==undefined||sauditid==null){
            this.$message.error('请先提交审核!')
          }else {
            this.api.request({
              url: this.api.getAuditstatus,
              mothod: 'get',
              params: {
                appid: sappid,
                auditid: sauditid
              }
            }).then((res) => {
              this.$confirm(res.state.msg, '提示', {
                showConfirmButton: false,
                cancelButtonText: '确定',
              });
            }).catch((res) => {
              this.$confirm(res, '提示', {
                showConfirmButton: false,
                cancelButtonText: '确定',
              });
            });
          }
        },
        //是否为空
        isNull(value){
          if(value==''||value==null){
            return '微信号不能为空';
          }
        },
        //绑定体验者
        bindTester(sappid,swechatid){
          this.$prompt('微信号', '绑定微信用户为小程序体验者', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator: this.isNull,
            inputErrorMessage: '微信号不能为空'
          }).then(({ value }) => {
            var smData={
              appid:sappid,
              wechatid:value
            };
            debugger;
            this.api.request({
              url:this.api.bindTester,
              params:smData,
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'绑定成功！'
              });
            })
          }).catch();
        },
        //上传代码
        getModal(sappid){
          this.uploadForm.appid=sappid;
          this.dialogFormVisible=true;
        },
        //上传代码确认
        comfirmuploadForm(){
          this.$refs['uploadForm'].validate((valid)=>{
            if(valid){
              var smData=JSON.parse(JSON.stringify(this.uploadForm));
              this.api.request({
                url:this.api.commitCode,
                params: smData
              }).then((res)=>{
                this.dialogFormVisible=false;
                this.$message({
                  type:'success',
                  message:'上传成功！'
                });
              });
            }
          });
        },
        //提交审核
        submitAudit(sappid){
          this.$confirm('您确定提交审核么?', '提交审核', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.api.request({
              url:this.api.submitAudit,
              params: {
                appid:sappid,
              }
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'提交审核成功！'
              });
              this.getList(this.pagination.page);
            });
          }).catch(()=>{});
        },
        //发布小程序
        release(sappid){
          this.$confirm('您确定要发布小程序么?', '发布小程序', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            debugger;
            this.api.request({
              url:this.api.release,
              params: {
                appid:sappid,
              }
            }).then((res)=>{
              this.$message({
                type:'success',
                message:'发布成功！'
              });
            });
          }).catch(()=>{});
        }
      }
    }
</script>

<style lang="less">
#wxappManager{
  table{
    width:100% !important;
    td{
      word-break: break-word;
    }
  }
}
</style>
