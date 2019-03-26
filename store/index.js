import Vue from 'vue'
import Vuex from 'vuex'
import footer_store from "./modules/footer_store.js";
import shopCart_store from "./modules/shopCart_store.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 是否强制登录
		forcedLogin: false,
		// 是否已经登录
		hasLogin: false,
		// 用户名
		userName: "",
		// 用户等级，分为1,2,3,4,5五个等级
		userLevel: 1,
		// 用户id
		userId: "",
		// 全局的自定义标题栏的样式
		titleNView: Object.freeze({
			bg: '#242424',
			textColor: '#fff'
		})	
	},
	mutations: {
		// 登录动作
		LOGIN(state, data) {
		    state.userName = data.userName || '新用户';
			state.userLevel = data.userLevel;
			state.userId = data.id;
		    state.hasLogin = true;
		},
		// 退出登录
		LOGOUT(state) {  
            state.hasLogin = false;   
            state.userName = '';  
			state.userLevel = 1;  
        }  
	},
	actions: {
		
	},
	modules:{
		footer_store,
		shopCart_store
	}
})

export default store
