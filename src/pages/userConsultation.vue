<template>
    <div id="userConsultation">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          header-align="center"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          header-align="center"
          label="手机号码"
        ></el-table-column>
        <el-table-column
          prop="field"
          header-align="center"
          label="所属行业"
        ></el-table-column>
        <el-table-column
          prop="detail"
          header-align="center"
          label="咨询详情"
        ></el-table-column>
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
        name: "userConsultation",
      data(){
          return{
            form:{
              name:'',
              mobile:''
            },
            pagination:{
              page:1,
              total:0,
              perSize:10
            },
            tableData:[]
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
          //获取数据列表
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.act=11;
          smData.page=page;
          this.api.request({
            url:this.api.consultation_list,
            params:smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=page;
            this.pagination.total=res.total_count;
            this.pagination.perSize=Math.ceil(res.total_count/res.total_page);
          })
        }
      }
    }
</script>

<style scoped>

</style>
