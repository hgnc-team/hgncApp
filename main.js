import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
// 是否登录路由守卫挂到vue上面
import util from "./common/util.js"
// 设置http 
import http from './common/http/';
// 全局组件
import statusBar from './components/global/status_bar.vue';
import bottomInfo from './components/global/bottom_info.vue';

//设置baseUrl
// http.config.baseUrl = "http://10.90.131.120:7002";

// #ifdef MP-WEIXIN
// 域名后面不能有斜杠，会导致登录失败
http.config.baseUrl = "http://server.maiyidesan.cn";
// #endif
/* #ifdef APP-PLUS */
// 域名后面不能有斜杠，会导致登录失败
http.config.baseUrl = "http://server.maiyidesan.cn";
/* #endif */

// // 在main.js中注册全局组件
// import myloading from './components/loading/loading.vue'
// Vue.component('myloading',myloading) 

// 全局注册组件
Vue.component('statusBar',statusBar);
Vue.component('bottomInfo',bottomInfo);


App.mpType = 'app'
Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.prototype.$guardToLogin = util.guardToLogin;
const app = new Vue({ 
	store,
	...App
})
app.$mount()
