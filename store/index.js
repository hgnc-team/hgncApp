import Vue from 'vue'
import Vuex from 'vuex'
import footer_store from "./modules/footer_store.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 是否强制登录
		forcedLogin: false,
		// 是否已经登录
		hasLogin: false,
		// 接口请求基本路径
		base_url:"",
		// 用户名
		userName: "",
		// 用户等级，分为1,2,3,4,5五个等级
		userLevel: 1,
	},
	mutations: {
		// 登录动作
		login(state, userName, userLevel) {
		    state.userName = userName || '新用户';
			state.userLevel = userLevel;
		    state.hasLogin = true;
		}
	},
	actions: {
		
	},
	modules:{
		footer_store
	}
})

export default store
