import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";

// 设置http 
import http from './common/http/';
//设置baseUrl
// #ifdef H5
http.config.baseUrl = "10.90.131.120:7002";
// #endif
/* #ifdef APP-PLUS */
http.config.baseUrl = "http://yapi.maiyidesan.cn:3000/mock/15";
/* #endif */

//设置请求前拦截器
http.interceptor.request = (config) => {
    //添加通用参数
//     config.header = {
//         "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//     }
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
    //判断返回状态 执行相应操作
    return response;
}


// // 在main.js中注册全局组件
// import myloading from './components/loading/loading.vue'
// Vue.component('myloading',myloading) 

// 全局注册组件
import statusBar from './components/global/status_bar.vue';
import bottomInfo from './components/global/bottom_info.vue';
Vue.component('statusBar',statusBar);
Vue.component('bottomInfo',bottomInfo);

App.mpType = 'app'
function switch_loading(tf){
	if(tf){
		store.commit("switch_loading",tf)
	}else{
		store.commit("switch_loading")

	}
}
Vue.prototype.$loading = switch_loading;
Vue.prototype.$store = store;
Vue.prototype.$http = http;
const app = new Vue({
    
	store,
	...App
})
app.$mount()
