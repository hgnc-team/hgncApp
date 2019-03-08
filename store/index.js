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
		base_url:"https://cnodejs.org/api/v1",
		// 用户名
		userName: "",
		// 用户等级，分为1,2,3,4,5五个等级
		userLevel: 1,
		list:[],
		detail:''
	},
	mutations: {
		// 登录动作
		login(state, userName, userLevel) {
		    state.userName = userName || '新用户';
			state.userLevel = userLevel;
		    state.hasLogin = true;
		},
		update_list(state,data){
			state.list = data
		},
		update_detail(state,data){
			state.detail = data
		}
	},
	actions: {
		get_data(ctx){
			
			console.log(ctx)		
			uni.request({
				url:ctx.state.base_url+"/topics",
				data:{
					page :1,
					tab :"share",
					limit :10,
					mdrender :false
				},
				success(res) {
					ctx.commit("update_list",res.data.data)
				},
				complete(){
					ctx.commit("switch_loading","false")
				}
			})
		},
		get_detail(ctx,id){
			uni.request({
				url:ctx.state.base_url+"/topic/"+id,
				data:{
					mdrender :true
				},
				success(res) {
					console.log(res)
					ctx.commit("update_detail",res.data.data.content)
				},
				complete(){
					ctx.commit("switch_loading","false")
				}
			})
		}
	},
	modules:{
		footer_store
	}
})

export default store
