<template>
    <div id="appVersionManager">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="版本状态">
          <el-select v-model="form.status" placeholder="状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.os_type" placeholder="状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="Android" value="0"></el-option>
            <el-option label="IOS" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="tablePanel">
        <el-button class="btn btn-default" @click="goAppVersionEdit()">发布APP</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          header-align="center"
          label="设备类型">
          <template slot-scope="scope">
            <p>{{scope.row.os_type==0?'Android':'IOS'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="version"
          label="版本号">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="版本状态">
          <template slot-scope="scope">
            <p>{{scope.row.status==0?'无效':'有效'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="code"
          label="版本代号">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="note"
          label="版本描述">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getList"
        :page-size="pagination.perSize"
        layout="total, prev, pager, next"
        :total="pagination.total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "appVersionManager",
      data(){
          return {
            form:{
              status:'-1',
              os_type:'-1'
            },
            tableData:[],
            pagination:{
              page:1,
              total:0,
              perSize:10
            },
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
          //获取列表
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.page=page;
          smData.act=11;
          this.api.request({
            url:this.api.app_version_list,
            method: 'post',
            data: smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=page;
            this.pagination.total=res.total_count;
            this.pagination.perSize=Math.ceil(res.total_count/res.total_page);
          });
        },
        //发布APP
        goAppVersionEdit(){
          this.$router.push({path:'/appVersionListAdd'})
        },
        //点击编辑
        edit(obj){
          debugger;
          this.$router.push({path:'/appVersionListEdit/'+obj.id,query:obj})
        }
      }
    }
</script>

<style lang="less" scoped>
#appVersionManager{
  .tablePanel{
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    text-align: right;
  }
}
</style>
