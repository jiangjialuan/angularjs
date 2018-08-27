<template>
    <div id="reportManager">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="客户主体">
          <el-input v-model="form.name" placeholder="客户主体"></el-input>
        </el-form-item>
        <el-form-item label="一米帐号">
          <el-input v-model="form.account" placeholder="一米帐号"></el-input>
        </el-form-item>
        <el-form-item label="报单人">
          <el-input v-model="form.salesman" placeholder="报单人"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-select v-model="form.version" placeholder="版本">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="(item,index) in versionData" :key="'version'+index" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="form.channel" placeholder="渠道">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="(item,index) in channelData" :key="'channel'+index" :label="item" :value="item" ></el-option>
          </el-select>
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
          header-align="center"
          prop="name"
          label="客户主体">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="account"
          label="一米帐号">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="version"
          label="购买版本">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="duration"
          label="购买时长-年">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="sum"
          label="合同价格-元">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="first_price"
          label="主号首年价格">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="renew_price"
          label="主号续费价格">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="sub_first_price"
          label="分店首年价格">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="sub_renew_price"
          label="分店续费价格">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="salesman"
          label="报单人">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="channel"
          label="报单渠道">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="create_time"
          label="报单时间">
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
        name: "reportManager",
      data(){
          return{
            versionData:[],
            channelData:[],
            form:{
              channel:'',
              version:'',
              salesman:'',
              account:'',
              name:''
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
        this.getBaseData();
        this.getList(1);
      },
      methods:{
          //获取版本渠道信息
        getBaseData(){
          this.api.request({
            url:this.api.get_bill_base_data,
            params:{
              act:11,
            }
          }).then((res)=>{
            this.versionData=res.version;
            this.channelData=res.channel;
            console.log(this.versionData);
          })
        },
        //获取数据列表
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.act=11;
          smData.page=page;
          if(smData.version=='0'){
            smData.version='';
          }
          if(smData.channel=='0'){
            smData.channel='';
          }
          this.api.request({
            url:this.api.get_bill_list,
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
