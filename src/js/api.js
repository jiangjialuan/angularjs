import axios from 'axios';
import {Message} from 'element-ui'
import {Loading} from 'element-ui'

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(config => {// 处理请求之前的配置
  let loading = Loading.service({
    lock: true,
    text: 'Loading',
  });
  return config;
}, error => {// 请求失败的处理
  let loading = Loading.service({});
  loading.close();
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(res => {// 处理响应数据
  /*if (res.data.state!=undefined&&res.data.state.code == 10400) {
    Message.error(res.data.state.msg);
  } else if (res.data.state!=undefined&&res.data.state.code == 10401) {
    Message.error(res.data.state.msg);
    sessionStorage.clear();
    location.replace("/login");
  }
  return res;*/


  if(res.data.state!=undefined&&res.data.state.code==10200){
    let loading = Loading.service({});
    loading.close();
    return res.data.data;
  }else{
    let loading = Loading.service({});
    loading.close();
    Message.error(res.data.state.msg);
    return Promise.reject(res.data.state.msg);
  }
}, error => {// 处理响应失败
  return Promise.reject(error);
});
export default {
  login:'/api/v2/login',//登录接口
  logout:'/api/v1/logout',//退出登录接口
  admin_short_video:'/manapi/v1/admin_short_video',//短视频列表接口
  updown_short_video:'/manapi/v1/updown_short_video',//投放/禁用短视频
  recommend_short_video:'/manapi/v1/recommend_short_video',//取消推荐短视频接口
  admin_short_video_recommend:'/manapi/v1/admin_short_video_recommend',//小程序推荐列表
  recommend_sort:'/manapi/v1/recommend_sort',//推荐小程序排序
  business_user:'/manapi/v1/business_user',//商户列表
  business_shop:'/manapi/v1/admin_goods_list',//商品管理列表
  get_authorised_applet:'/manapi/v1/get_authorised_applet',//获取小程序管理列表
  modifyDomain:'/weixin/authorization/modifyDomain',//小程序修改域名
  commitCode:'/weixin/authorization/commit',//上传小程序代码
  submitAudit:'/weixin/authorization/submitAudit',//小程序提交审核
  getAuditstatus:'/weixin/authorization/getAuditstatus',//小程序获取审核状态
  release:'/weixin/authorization/release',//发布小程序
  bindTester:'/weixin/authorization/bindTester',//绑定体验者
  app_version_list:'/manapi/v1/app_version_list',//获取小程序版本
  publish_app_version:'/manapi/v1/publish_app_version',//发布APP版本
  edit_app_version:'/manapi/v1/edit_app_version',//编辑APP版本
  get_tbk_adzone:'/manapi/v1/get_tbk_adzone',//淘宝客推广列表
  add_tbk_adzone:'/manapi/v1/add_tbk_adzone',//新增推广位
  binding_tbk_adzone:'/manapi/v1/binding_tbk_adzone',//分配推广位
  admin_tbk_order:'/manapi/v1/admin_tbk_order',//获取淘宝客订单
  upload_img:'/index/index/upload_img',////excel上传
  import_tbk_order:'/manapi/v1/import_tbk_order',//导入米淘订单
  consultation_list:'/manapi/v1/get_consultation_list',//客户咨询列表
  get_bill_base_data:'/api/v1/get_bill_base_data',//获取报单业务版本，渠道数据
  get_bill_list:'/manapi/v1/get_bill_list',//报单管理列表
  settled_goods_list:'/manapi/v1/settled_goods_list',//优店---商品列表
  settled_user:'/manapi/v1/settled_user',//优店--入驻列表
  settled_short_video:'/manapi/v1/settled_short_video',//优店--视频列表

  preUrl:'http://yimi.artqiyi.com',//正式服务器

  request(data) {
    let reqData = data.data || {};
    let requestData = {
      url: data.url,
      data: reqData,
      method: data.method || 'GET',
      params:data.params||{},
      timeout:300000,
      onUploadProgress:data.onUploadProgress||null,
      headers: data.headers || '',
      responseType:data.responseType|| 'json'
    };
    return axios(requestData);
  },
}
