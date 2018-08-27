<template>
    <div id="goodsManager">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="帐号">
          <el-input v-model="form.phone" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="状态">
            <el-option label="全部" value="all"></el-option>
            <el-option label="出售中" value="sale"></el-option>
            <el-option label="仓库中" value="depot"></el-option>
            <el-option label="被删除" value="deleted"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="form.from"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>至
          <el-date-picker
            v-model="form.to"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
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
        style="width: 100%">
        <el-table-column
          header-align="center"
          width="300"
          label="商品">
          <template slot-scope="scope">
            <div class="goods-content">
              <div class="goods-img">
                <img :src="scope.row.image"  >
                <span class="parentIcon" v-if="scope.row.is_custom==4">总店</span>
              </div>
              <div class="goods-info">
                <p class="wname">{{scope.row.wname}}</p>
                <p class="videoBlockOther alignLeft opacity8 grey">
                  <!--<span class="goods-type" :class="custom[scope.row.is_custom].className">{{custom[scope.row.is_custom].text}}</span>-->
                  {{scope.row.goods_type}}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="price"
          width="120"
          label="单价">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="stock"
          width="120"
          label="库存">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="sale_num"
          width="120"
          label="累计销量">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="updatetime"
          width="180"
          label="更新时间">
        </el-table-column>
        <el-table-column
          header-align="center"
          prop="owner"
          label="供货商">
          <template slot-scope="scope">
            <p>昵称：{{scope.row.buser_name}}</p><p>电话：{{scope.row.buser_phone}}</p>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="操作">
          <template slot-scope="scope">
            <p>
              <el-button>编辑</el-button>
              <el-button>已下架，查看原因</el-button>
              <el-button>上架</el-button>
              <el-button>下架</el-button>
            </p>
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
        name: "goodsManager",
      data(){
          return{
            form:{
              phone:'',
              status:'',
              from:'',
              to:''
            },
            tableData:[],
            pagination:{
              page:1,
              total:0,
              perSize:20
            },
            custom:[
              {className:'distribution',text:'分销'},
              {className:'custom',text:'定制'},
              {className:'private',text:'自有'},
              {className:'agency',text:'代理'}
            ]
          }
      },
      created(){
        this.getList(1);
      },
      methods:{
        //获取tablelist数据
        getList(page){
          var smData=JSON.parse(JSON.stringify(this.form));
          smData.page=page;
          this.api.request({
            url:this.api.business_shop,
            method:'post',
            data:smData
          }).then((res)=>{
            this.tableData=res.list;
            this.pagination.page=res.page;
            this.pagination.total=res.total_count;
          });
        },
      },
    }
</script>

<style lang="less" scoped>
#goodsManager{
  .goods-type.private {
    background-color: #5bc0de;
  }
  .goods-type.agency{
    background-color: #ff3366;
  }
  .goods-type.custom{
    background-color: #FF0099;
  }
  .goods-type.distribution{
    background-color: #FF9900;
  }
  .goods-content{
    width:240px;
    display: flex;
    .goods-img{
      width:60px;
      height:60px;
      margin-right:10px;
      display: inline-block;
      position: relative;
      .parentIcon{
        display: inline-block;
        width:32px;
        height:18px;
        line-height: 18px;
        border-radius:1px;
        background: rgba(0,0,0,0.5);
        font-size:10px;
        position: absolute;
        bottom:3px;
        right:3px;
        color:#fff;
        text-align: center;
      }
      img{
        width:60px;
        height:60px;
      }
    }
    .goods-info{
      width:160px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      p{
        overflow : hidden;
        text-overflow: ellipsis;
        align-items: center;
        justify-content: center;
        margin:0px;
        &.wname{
          margin-bottom:10px;
          text-align: left;
        }
        &.price{
          color:#f60;
          line-height: 20px;
          font-size:16px;
          text-align: left;
        }
      }
    }
  }
}
</style>
