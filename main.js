import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
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
const app = new Vue({
    
	store,
	...App
})
app.$mount()
