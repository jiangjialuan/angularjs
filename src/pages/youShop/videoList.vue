<template>
<div id="videoList">
  <el-form :inline="true" :model="shortVideoForm" class="demo-form-inline">
    <el-form-item label="帐号">
      <el-input v-model="shortVideoForm.username" placeholder="帐号"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="shortVideoForm.status" placeholder="状态">
        <el-option label="全部" value="2"></el-option>
        <el-option label="已禁用" value="0"></el-option>
        <el-option label="投放中" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="上传时间">
      <el-date-picker
        v-model="shortVideoForm.from_time"
        type="date"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>至
      <el-date-picker
        v-model="shortVideoForm.end_time"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="getShortVideoList(1)">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    ref="multipleTable"
    :data="shortVideoData"
    tooltip-effect="dark"
    border
    style="width: 100%">
    <el-table-column
      header-align="center"
      width="310"
      label="视频信息">
      <template slot-scope="scope">
        <div class="videoBlock p10">
          <p class="videoBlockTitle">
            {{scope.row.title}}
          </p>
          <div class="videoBlockLeft m-r15 f-l">
            <img :src="scope.row.cover"/>
            <span class="videoTime">{{scope.row.length | filterTime}}</span>
          </div>
          <div class="videoBlockRight f-l">
            <p class="videoBlockDataTime alignLeft opacity8"><span>{{scope.row.create_time}}</span></p>
            <p class="videoBlockOther alignLeft opacity8">
              <span class="videoBlockPlayNum disInlineB w-85"><i class="glyphicon"></i><span> {{scope.row.thumbsup_number}} </span></span>
              <span class="videoBlockCommentNum disInlineB w-85"><i class="glyphicon"></i><span> {{scope.row.remark_count}} </span></span>
            </p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="商品数"
      header-align="center"
    >
      <template slot-scope="scope">
        <p>{{scope.row.goods_count}}</p>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      label="实付订单">
      <template slot-scope="scope">
        <p>数量：<span> {{scope.row.order_number}} </span></p>
        <p>总额：<span> ¥ {{scope.row.order_amount}} </span></p>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      label="红包打赏">
      <template slot-scope="scope">
        <p>数量：<span> {{scope.row.redenvelope_num}} </span></p>
        <p>总额：<span> ¥ {{scope.row.redenvelope_amount}} </span></p>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      prop="owner"
      label="帐号">
    </el-table-column>
    <el-table-column
      header-align="center"
      label="链接">
      <template slot-scope="scope">
        <p><a :href="scope.row.url" target="_blank">{{scope.row.url}}</a></p>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="getShortVideoList"
    :page-size="pagination.perSize"
    layout="total, prev, pager, next"
    :total="pagination.total">
  </el-pagination>
</div>
</template>

<script>
    export default {
        name: "videoList",
      data(){
          return{
            shortVideoForm:{
              username:'',
              status:'',
              from_time:'',
              end_time:'',
            },
            pagination:{
              page:1,
              total:0,
              perSize:10
            },
            shortVideoData:[],
            shortVideoSelect:[],
          }
      },
      filters:{
        filterTime:(val)=>{
          if (val < 86400) {
            var dt = new Date("01/01/2000 0:00");
            dt.setSeconds(val);
            var h = dt.getHours(),
              m = dt.getMinutes(),
              s = dt.getSeconds(),
              r = "";
            // if (h > 0) {
            r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
            // }
            r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
            r += (s > 9 ? s.toString() : "0" + s.toString());
            return r;
          } else {
            return null;
          }
        },
      },
      created(){
        this.getShortVideoList(1);
      },
      methods:{
        //获取短视频列表
        getShortVideoList(page){
          var smData={};
          smData.page=page;
          smData.username=this.shortVideoForm.username;
          smData.status=this.shortVideoForm.status;
          smData.from_time=this.shortVideoForm.from_time;
          smData.end_time=this.shortVideoForm.end_time;
          smData.act=11;
          this.api.request({
            url:this.api.settled_short_video,
            method: 'post',
            data:smData,
          }).then((res)=>{
            this.shortVideoData=res.list;
            this.pagination.page=page;
            this.pagination.total=res.total_count;
          })
        },
      }

    }
</script>

<style lang="less" scoped>
  #videoList{
    .videoBlock{
      display: block;
      width:280px;
    }
    .tablePanel{
      padding: 10px;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      text-align: left;
    }
    .alignLeft{
      text-align: left;
    }
    .videoBlockLeft{
      width:90px;
      height:70px;
      overflow: hidden;
      position: relative;
    }
    .videoBlockTitle{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width:240px;
      font-weight:bold;
      margin-bottom:10px;
      text-align: left;
    }
    .videoBlockLeft .videoTime{
      display:inline-block;
      height:20px;
      line-height: 20px;
      width:90px;
      background: rgba(0, 0, 0, 0.5);
      color:#fff;
      position:absolute;
      bottom:0px;
      left:0px;
      text-align: center;

    }
    .w-85{
      width:85px;
      display: inline-block;
    }
    .videoBlockLeft img{
      width:90px;
      height:100%;
    }
    .videoBlockRight{
      width:190px;
      padding-left:15px;
    }
    .videoBlockPlayNum i{
      background: url(data:image/png;base64,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) no-repeat left center;
      background-size: 20px 20px;
      padding:10px 10px;
    }
    .videoBlockCommentNum i{
      background: url(data:image/png;base64,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) no-repeat left center;
      background-size: 20px 20px;
      padding: 10px 10px;
    }
  }

</style>
