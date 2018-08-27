<template>
    <div id="mitiaoOrder">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="推广位">
          <el-input v-model="form.adzone_name" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="form.order_sn" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.order_status" placeholder="状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="订单付款" value="1"></el-option>
            <el-option label="订单失效" value="2"></el-option>
            <el-option label="订单结算" value="3"></el-option>
            <el-option label="订单完成" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
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
      </el-form>
      <div class="tablePanel">
        <el-button class="btn btn-default">导入米淘订单</el-button>
        <input type="file" id="importExcel"  accept=".xls" @change="fileChange" name="file[]" class="btn btn-default im"/>
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
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="goods_title"
          label="商品名">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="goods_num"
          label="商品数量">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="price"
          label="商品价格">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="订单状态">
          <template slot-scope="scope">
            <p v-if="scope.row.order_status==1">订单付款</p>
            <p v-if="scope.row.order_status==2">订单失效</p>
            <p v-if="scope.row.order_status==3">订单结算</p>
            <p v-if="scope.row.order_status==4">订单完成</p>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="order_money"
          label="订单总额">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="settle_time"
          label="结算时间">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="commission_money"
          label="佣金">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="order_sn"
          label="订单号">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="商品图">
          <template slot-scope="scope">
            <img :src="scope.row.pict_url" width="60" height="60"/>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="adzone_name"
          label="推广位">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="commission_proportion"
          label="分佣比率">
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
        name: "mitiaoOrder",
      data(){
          return{
            form:{
              adzone_name:'',
              order_sn:'',
              order_status:'0',
              from_time:'',
              end_time:''
            },
            pagination:{
              page:1,
              total:0,
              perSize:10
            },
            tableData:[],
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
            url:this.api.admin_tbk_order,
            method:'post',
            data:smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=page;
            this.pagination.total=res.total_count;
            this.pagination.perSize=Math.ceil(res.total_count/res.total_page);
          })
        },

        //导入米淘订单
        improtOrder(e){
          return new Promise(((resolve, reject) => {
            let file = e.target.files[0];
            let param = new FormData(); //创建form对象
            param.append('file[]',file,file.name);//通过append向form对象添加数据
            param.append('path_code',17);//添加form表单中其他数据
            this.api.request({
              url:this.api.upload_img,
              method:'post',
              data:param,
            }).then((res)=>{
              resolve(res)
            }).catch(()=>{
              reject();
            });
          }))
        },
        //changeg事件
        fileChange(e){
          this.improtOrder(e).then((res)=>{
            this.api.request({
              url:this.api.import_tbk_order,
              method:'post',
              data:{
                act:11,
                path:res,
              }
            }).then((re)=>{
              this.$message({
                type:'success',
                message:'导入成功'
              });
              this.getList(1);
            });
          });
        }
      }
    }
</script>

<style lang="less" scoped>
#mitiaoOrder{
  .tablePanel{
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
  }
  .im{
    width:126px;
    height:40px;
    margin-left:-129px;
    opacity: 0;
    vertical-align: top;
  }
}
</style>
