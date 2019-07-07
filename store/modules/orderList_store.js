import service from "../../common/service.js";
import _ from "lodash";

export default {
	state:{
		// 订单数据列表
		orderList: [],
		// 订单数量列表
		orderNumList: []
	},
	getters: {
		// 待付款订单个数
		dfk_num(state){
			let dfk_item = _.filter(state.orderNumList, item => item.status === "0")
			return dfk_item.length > 0 ? dfk_item[0].num : 0
		},
		// 待发货订单个数
		dfh_num(state){
			let dfk_item = _.filter(state.orderNumList, item => item.status === "1")
			return dfk_item.length > 0 ? dfk_item[0].num : 0
		},
		// 待收获订单个数
		dsh_num(state){
			let dfk_item = _.filter(state.orderNumList, item => item.status === "2")
			return dfk_item.length > 0 ? dfk_item[0].num : 0
		}
	},
	mutations:{
		// 初始化订单列表
		INIT_ORDERLIST(state, data) {
			state.orderList = data;
		},
		// 初始化订单总数列表
		INIT_ORDER_NUM_LIST(state, data) {
			state.orderNumList = data;
		},
	},
	actions:{
		// 获取订单数量列表
		getOrderNumList(ctx){
			// ctx.commit("INIT_ORDER_NUM_LIST", []);
			let params = {
				userId: ctx.rootState.userId
			}
			service.getOrderNumList(params).then(res=>{
				let data = res.data.data; 
				ctx.commit("INIT_ORDER_NUM_LIST", data);
			}).catch(err=>{})
		}
	}
}