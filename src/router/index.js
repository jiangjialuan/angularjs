import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../pages/index.vue'], resolve),
      name: '首页',
      redirect: '/list/shortList',
      children: [
        {
          path:'/list/shortList',
          component: (resolve) => require(['../pages/shortVideoManager.vue'], resolve),
          name: '短视频管理',
        },
        {
          path:'/userManager',
          component: (resolve) => require(['../pages/userManager.vue'], resolve),
          name: '商户管理',
        },
        {
          path:'/shopManager',
          component: (resolve) => require(['../pages/goodsManager.vue'], resolve),
          name: '商品管理',
        },
        {
          path:'/appManagerList',
          component: (resolve) => require(['../pages/wxappManager.vue'], resolve),
          name: '小程序管理',
        },
        {
          path:'/appVersionList',
          component: (resolve) => require(['../pages/appVersionManager.vue'], resolve),
          name: 'APP版本管理',
        },
        {
          path:'/appVersionListEdit/:id',
          component: (resolve) => require(['../pages/appVersionListEdit.vue'], resolve),
          name: 'App版本编辑',
        },
        {
          path:'/appVersionListAdd',
          component: (resolve) => require(['../pages/appVersionListEdit.vue'], resolve),
          name: 'App版本新增',
        },
        {
          path:'/TaobaoList',
          component: (resolve) => require(['../pages/taobaokeManager.vue'], resolve),
          name: '淘宝客推广',
        },
        {
          path:'/miTaoOrder',
          component: (resolve) => require(['../pages/mitiaoOrder.vue'], resolve),
          name: '米淘订单',
        },
        {
          path:'/CustomerConsultation',
          component: (resolve) => require(['../pages/userConsultation.vue'], resolve),
          name: '客户咨询',
        },
        {
          path:'/ReportManagement',
          component: (resolve) => require(['../pages/reportManager.vue'], resolve),
          name: '报单管理',
        },
        {
          path:'/youShop/goodsList',
          component: (resolve) => require(['../pages/youShop/goodsList.vue'], resolve),
          name: '商品列表',
        },
        {
          path:'/youShop/userList',
          component: (resolve) => require(['../pages/youShop/userList.vue'], resolve),
          name: '入驻列表',
        },
        {
          path:'/youShop/videoList',
          component: (resolve) => require(['../pages/youShop/videoList.vue'], resolve),
          name: '视频列表',
        }
      ]
    },
    {
      path:'/login',
      component: (resolve) => require(['../pages/login.vue'], resolve),
      name: '登录',
    }

  ]
})
