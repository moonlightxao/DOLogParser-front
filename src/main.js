// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'

//导入路由router
import router from "./router";

//导入axios
import axios from "axios";
import VueAxios from "vue-axios"

//配置代码用以解决axios跨域问题
axios.defaults.baseURL='/api/'

//注册组件
Vue.use(Element)
Vue.use(router)
Vue.use(VueAxios, axios);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
