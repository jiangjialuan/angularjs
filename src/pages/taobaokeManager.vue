<template>
    <div id="taobaokeManager">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="推广位ID">
          <el-input v-model="form.adzone_id" placeholder="推广位ID"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.adzone_name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="form.uid" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tablePanel">
        <el-button class="btn btn-default" @click="distributTaoBaoke(1)">新增推广位</el-button>
        <el-button  class="btn btn-default" @click="distributTaoBaoke(0)">分配推广位</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%">
        <el-table-column
          header-align="center"
          prop="adzone_id"
          label="推广位ID">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="adzone_name"
          label="推广位名称">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="uid"
          label="用户ID">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="name"
          label="用户名称">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="mobile_phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="tbk_type"
          label="淘客类型">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="content"
          label="详情">
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getList"
        :page-size="pagination.perSize"
        layout="total, prev, pager, next"
        :total="pagination.total">
      </el-pagination>
      <el-dialog :title="type==0?'分配推广位':'新增推广位'" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm" ref="dialogForm">
          <el-form-item label="用户ID" label-width="100px" v-if="type==0"  prop="uid" :rules="[{ required: true, message: '请输入用户ID', trigger: 'blur'}]">
            <el-input v-model="dialogForm.uid" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="推广位ID" label-width="100px" v-if="type==1"  prop="adzone_id" :rules="[{ required: true, message: '请输入推广位ID', trigger: 'blur'}]">
            <el-input v-model="dialogForm.adzone_id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="推广位名称" label-width="100px" v-if="type==1"  prop="adzone_name" :rules="[{ required: true, message: '请输入推广位名称', trigger: 'blur'}]">
            <el-input v-model="dialogForm.adzone_name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogComfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "taobaokeManager",
      data(){
          return{
            form:{
              adzone_id:'',
              adzone_name:'',
              uid:'',
            },
            pagination:{
              page:1,
              total:0,
              perSize:10
            },
            tableData:[],
            dialogForm:{
              adzone_id:'',
              adzone_name:'',
              uid:''
            },
            dialogFormVisible:false,
            type:0
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
        //获取列表数据
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.act=11;
          smData.page=page;
          this.api.request({
            url:this.api.get_tbk_adzone,
            method:'post',
            data:smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=page;
            this.pagination.total=res.total_count;
            this.pagination.perSize=Math.ceil(res.total_count/res.total_page);
          });
        },
        //分配/新增推广位id
        distributTaoBaoke(type){
          this.type=type;
          this.dialogFormVisible=true;
        },
        //点击确认
        dialogComfirm(){
          this.$refs['dialogForm'].validate((valid)=>{
            if(valid){
              var smData={
                act:11,
              };
              var url;
              if(this.type==0){
                smData.uid=this.dialogForm.uid;
                url=this.api.binding_tbk_adzone
              }else{
                smData.adzone_id=this.dialogForm.adzone_id;
                smData.adzone_name=this.dialogForm.adzone_name;
                url=this.api.add_tbk_adzone;
              }
              this.api.request({
                url:url,
                method:'post',
                data:smData
              }).then((res)=>{
                this.dialogFormVisible=false;
                this.$message({
                  type:'success',
                  message:this.type==0?'分配推广位成功！':'新增推广位成功！'
                });
                this.getList(1);
              })
            }
          });
        }
      }
    }
</script>

<style lang="less" scoped>
#taobaokeManager{
  .tablePanel{
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
  }
}
</style>
