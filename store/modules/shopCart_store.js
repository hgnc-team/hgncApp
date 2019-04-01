
// import service from "../../common/service.js";

export default {
	state:{
		// 购物车商品总数量
		// total_num: 0,
		// 购物车数据
		goodsList: [],
	},
	getters: {
		// 购物车商品总数量
		total_num(state){
			return state.goodsList.length + "";
		}
	},
	mutations:{
		INIT_GOODS(state, data) {
			state.goodsList = data;
		},
		ADD_GOODS(state, data){
			state.goodsList.push(data);
		},
		DELETE_GOODS(state, index) {
			state.goodsList.splice(index, 1);
		},
		UPDATA_GOODS(state, data) {
			const {index,key,value}=data;
			state.goodsList[index][key]=value;
		}
	},
	actions:{
		deleteGoods(ctx, arr){
			_.forEach(arr, item => {
				ctx.commit("DELETE_GOODS", item.index);
			})
		}
	}
}