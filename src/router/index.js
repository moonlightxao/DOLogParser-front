import Vue from 'vue'
import VueRouter from "vue-router";

//配置路由需要的组件
import UploadByFile from "../view/upload/UploadByFile";
import UploadByLink from "../view/upload/UploadByLink";
import ShowLogs from "../view/show/ShowLogs";

//安装路由
Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/uploadByFile',
      component: UploadByFile
    },
    {
      path: '/uploadByLink',
      component: UploadByLink
    },
    {
      path: '/showLogs',
      component: ShowLogs
    }
  ]
})

export default router
