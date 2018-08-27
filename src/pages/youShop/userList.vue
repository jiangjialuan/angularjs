<template>
  <div id="userList">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="ID">
        <el-input  placeholder="ID" v-model="form.uid"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input  placeholder="账号" v-model="form.mobile_phone"></el-input>
      </el-form-item>
      <el-form-item label="客户名">
        <el-input  placeholder="客户名" v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input  placeholder="昵称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.from_time"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>至
        <el-date-picker
          v-model="form.end_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="getList(1)">查询</el-button>
      </el-form-item>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
      >
        <el-table-column
          header-align="center"
          prop="id"
          label="客户ID">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.head_pic" width="60" height="60"/>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="realname"
          label="客户名">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="mobile_phone"
          label="帐号">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="regtime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="contacts_name"
          label="联系人">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="url"
          label="分店二维码">
          <template slot-scope="scope">
            <p>{{'http://yimi.artqiyi.com/weixin/authorization/getShopQrcode?from_uid='+scope.row.parent_shop_id+'&sub_from_uid='+scope.row.id}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getList"
        :page-size="pagination.perSize"
        layout="total, prev, pager, next"
        :total="pagination.total">
      </el-pagination>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "userManager",
    data(){
      return {
        form:{
          uid:'',
          mobile_phone:'',
          from_time:'',
          end_time:'',
          name:'',
          realname:''
        },
        pagination:{
          page:1,
          total:0,
          perSize:50
        },
        tableData:[],
      }
    },
    created(){
      this.getList(1);
    },
    methods:{
      //获取列表
      getList(page){
        var smData=JSON.parse(JSON.stringify(this.form));
        smData.act=11;
        smData.page=page;
        this.api.request({
          url:this.api.settled_user,
          method:'post',
          data:smData,
        }).then((res)=>{
          this.tableData=res.list;
          this.pagination.page=page;
          this.pagination.total=res.total_count;
        });
      }
    }
  }
</script>

<style scoped>

</style>
