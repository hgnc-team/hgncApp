import Vue from 'vue';
import Vuex from 'vuex';
import footer_store from "./modules/footer_store.js";
import shopCart_store from "./modules/shopCart_store.js";
import address_store from "./modules/address_store.js";
import orderList_store from "./modules/orderList_store.js";
import prod_view_store from "./modules/prod_view_store.js";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 是否强制登录
		forcedLogin: false,
		// 是否已经登录
		hasLogin: false,
		// 用户名
		userName: "",
		// 用户等级，分为0,1,2,3,4五个等级
		userLevel: 0,
		// 用户id
		userId: "",
		// 用户头像
		userFace: "",
		// 用户手机号
		userPhone: "",
		// 用户的邀请码
		userInviteCode: '',
		// 商品积分率
		gobalPointRate: 0,
		// 普通积分
		comPoint: 0,
		// 专用积分
		gold: 0,
		// 客服电话
		customerTelephone: "",
		// 是否开店
		isStoreOwner: false,
		// 图片地址域名
		imageDomain: "",
		// 是否校验用户二级密码
		isCheckPassword: false,
		// 用户二级密码
		secondaryPwd: null,
		// 全局的自定义标题栏的样式
		titleNView: Object.freeze({
			bg: '#242424',
			textColor: '#fff'
		})	
	},
	mutations: {
		// 登录动作
		LOGIN(state, data) {
		    state.userName = data.userName || 'PY_'+ data.phone;
			state.userLevel = data.role;
			state.userId = data.id;
			state.userFace = data.face || '/static/HM-PersonalCenter/face_default.png';
			state.userPhone = data.phone;
			state.userInviteCode = data.inviteCode;
			state.secondaryPwd = data.secondaryPwd;
			// 我的积分
			state.comPoint = data.comPoint;
			// M币钱包
			state.gold = data.gold;
		    state.hasLogin = true;
			state.isStoreOwner = data.storeOwner === 0 ? false : true;
		},
		// 刷新用户信息	
		REFLESH_USER_INFO(state, data) {
			state.userName = data.userName || 'PY_'+ data.phone;
			state.userLevel = data.role;
			state.userId = data.id;
			state.userFace = data.face || '/static/HM-PersonalCenter/face_default.png';
			state.userPhone = data.phone;
			state.userInviteCode = data.inviteCode;
			state.secondaryPwd = data.secondaryPwd;
			state.comPoint = data.comPoint;
			state.gold = data.gold;
			state.hasLogin = true;
			state.isStoreOwner = data.storeOwner === 0 ? false : true;
		},
		// 后台相关配置
		SET_CONFIGS(state, data){
			state.gobalPointRate = data.DEFAULT_GOODS_POINTRATE;
			state.imageDomain = data.DEFAULT_IMAGE_DOMAIN;
			state.customerTelephone = data.customer_Telephone || "400334233"
		},
		// 设置密码校验状态
		SET_PASSWORD_CHECKSTATUS(state, status) {
			state.isCheckPassword = status;
		},
		// 存储用户二级密码
		SET_SECONDARYPWD(state, pwd) {
			state.secondaryPwd = pwd;
		}
	},
	actions: {
		logout({commit, dispatch, state, rootState}, data){
			state.userName = "";
			state.userLevel = 0;
			state.userId = "";
			state.userFace = "";
			state.userPhone = "";
			state.userInviteCode = "";
			state.hasLogin = false; 
			// 还原底部按钮（隐藏会员中心）
			console.log(state)
			// 触发设置导航
			dispatch("menu_4");
			// 情况缓存信息
			uni.removeStorageSync('USERS_INFO');
			uni.removeStorageSync('USER_TOKEN');
		}
	},
	modules:{
		footer_store,
		shopCart_store,
		address_store,
		orderList_store
	}
})

export default store
