/**  
 * @Title: service.js    
 * @Description: 后台请求接口汇总   
 * @author cskying  
 * @date 2019-3-11   
 * @version V1.0  
 */
//引入vue
import Vue from 'vue'; 
//必须实例化 Vue
let vm = new Vue();

// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// uni.getStorageSync(USERS_KEY);
// uni.setStorageSync(USERS_KEY, JSON.stringify(users));


/**     
  * @method 登录   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @return {promise} 返回一个promise对象   
  * @throws   
  */
const login = function(userInfo) {
	let data = {
		phoneNum: userInfo.phone,
		pwd: userInfo.password
	}
	return vm.$http.post('/v1/api/user/login', data)
}

/**     
  * @method 注册   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @param {String} inviteCode  邀请码
  * @param {String} authCode  验证码
  * @return {promise} 返回一个promise对象     
  **/
const register = function(params) {
	let data = {
		phoneNum: params.phone,
		pwd: params.password,
		inviteCode: params.inviteCode,
		authCode: params.code,
	}
	return vm.$http.post('/v1/api/user/signUp', data)
}

/**     
  * @method 发送验证码  
  * @param {String} phoneNum  手机号
  * @return {promise} 返回一个promise对象    
  **/
const getSms = function(params) {
	let data = {
		phoneNum: params.phone,
		pwd: params.password,
		authCode: params.authCode,
	}
	return vm.$http.post('/v1/api/sms/sendSms', data)
}

/**     
  * @method 忘记密码（重新设置密码）   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @param {String} authCode  验证码
  * @return {promise} 返回一个promise对象     
  **/
const reSetPwd = function(params) {
	let data = {
		phoneNum: params.phone,
		pwd: params.password,
		authCode: params.code,
	}
	return vm.$http.post('/v1/api/user/changePwd', data)
}

/**     
  * @method 获取商品顶级分类列表   
  * @param {String} classScheme   cat1  
  * @return {promise} 返回一个promise对象     
  **/
const getGoodTopClass = function(params) {
	let data = {
		classScheme: params.classScheme,
	}
	return vm.$http.post('/v1/api/goods/topClass', data)
}

/**     
  * @method 获取商品二级分类列表   
  * @param {Array} topClass   ["0","1"]  
  * @return {promise} 返回一个promise对象     
  **/
const getGoodSecondClass = function(params) {
	let data = {
		topClass: params.topClass,
	}
	return vm.$http.post('/v1/api/goods/secondClass', data)
}


/**     
  * @method 根据商品类型获取商品列表   
  * @param {String} type   商品类型   
  * @param {Number} page   列表页数   1
  * @param {Number} pageSize   一页商品数   默认为10条
  * @param {Array} orderBy   筛选条件
  * @return {promise} 返回一个promise对象     
  **/
const getGoodListByType = function(params) {
	let data = {
		type: params.type,
		page: params.page,
		pageSize: params.pageSize,
		orderBy: params.orderBy
	}
	return vm.$http.post('/v1/api/goods/goodsPageList', data)
}

/**     
  * @method 根据商品id获取商品详情   
  * @param {Array} ids   商品ID数组   
  * @return {promise} 返回一个promise对象     
  **/
const getGoodListById = function(params) {
	let data = {
		ids: params.ids,
	}
	return vm.$http.post('/v1/api/goods/goodsList', data)
}

/**     
  * @method 根据商品title模糊搜索商品（带分页）   
  * @param {String} title   ["0","1"]  
  * @param {Number} page   列表页数   1
  * @param {Number} pageSize   一页商品数    
  * @param {Array} orderBy   排序
  **/
const getGoodListBySearch = function(params) {
	let data = {
		title: params.title,
		page: params.page,
		pageSize: params.pageSize,
		orderBy: params.orderBy
	}
	return vm.$http.post('/v1/api/goods/search', data)
}

/**     
  * @method 用户商品推荐   
  * @param {String} userId   ["0","1"]  
  * @param {String} areaId  地区id
  * @param {Number} num   推荐商品数    
  **/
const getRecommendGoodList = function(params) {
	let data = {
		userId: params.userId,
		areaId: params.areaId,
		num: params.num,
	}
	return vm.$http.post('/v1/api/goods/recommend', data)
}

/**     
  * @method 查询购物车列表   
  * @param {String} userId  用户id  
  * @return {promise} 返回一个promise对象     
  **/
const getCartList = function(userId) {
	let data = {
		userId: userId,
	}
	return vm.$http.post('/v1/api/cart/list', data)
}

/**     
  * @method 添加商品至购物车   
  * @param {String} userId  用户id  
  * @return {promise} 返回一个promise对象     
  **/
const addToCart = function(params) {
	let data = {
		userId: params.userId,
		goodsId: params.goodsId
	}
	return vm.$http.post('/v1/api/cart/add', data)
}

/**     
  * @method 删除购物车中的商品  
  * @param {String} userId  用户id 
  * @param {Array | undefined} goodsIds - undefined时，清空用户所有购物车中的商品
  * @return {promise} 返回一个promise对象     
  **/
const deleteFromCart = function(params) {
	let data = {
		userId: params.userId,
		goodsIds: params.ids
	}
	return vm.$http.post('/v1/api/cart/delete', data)
}

/**     
  * @method 查询地址列表  
  * @param {String} userId  用户id 
  * @return {promise} 返回一个promise对象     
  **/
const getAddressList = function(params) {
	let data = {
		userId: params.userId
	}
	return vm.$http.post('/v1/api/address/list', data)
}

/**     
  * @method 编辑地址信息  
  * @param {String} id  地址行id 
  * @return {promise} 返回一个promise对象     
  **/
const editAddress = function(params) {
	let data = {
		"id": params.id,
		"params": {
			province: params.province,
			city: params.city,
			region:  params.region,
			street:  params.street,
			detail:  params.detail,
			receiver:  params.receiver,
			phone:  params.phone,
			default:  params.default || false,
			tag: params.tag,
		}
	}
	return vm.$http.post('/v1/api/address/edit', data)
}

/**     
  * @method 新增地址  
  * @param {String} province  省份 
  * @param {String} city  市
  * @param {String} region  区
  * @param {String} street  街道
  * @param {String} detail  地址详情
  * @param {String} receiver  收件人
  * @param {String} phone  手机号
  * @param {Boolean} default  是否默认
  * @param {String} tag  标签   家|公司
  * @return {promise} 返回一个promise对象     
  **/
const addAddress = function(params) {
	let data = {
		"userId": params.userId,
		"params": {
			province: params.province,
			city: params.city,
			region:  params.region,
			street:  params.street,
			detail:  params.detail,
			receiver:  params.receiver,
			phone:  params.phone,
			default:  params.default || false,
			tag: params.tag,
		}
	
	}
	return vm.$http.post('/v1/api/address/add', data)
}

/**     
  * @method 删除用户名下地址信息  
  * @param {String} id  地址id 
  * @return {promise} 返回一个promise对象     
  **/
const deleteAddress = function(params) {
	let data = {
		id: params.id
	}
	return vm.$http.post('/v1/api/address/del', data)
}

const LOGIN_MODULE = {
	login,
	register,
	getSms,
	reSetPwd
}
const HOME_MODULE = {
	getGoodTopClass,
	getGoodSecondClass,
	getGoodListByType,
	getGoodListById,
	getGoodListBySearch,
	getRecommendGoodList
	
}
const NEARBY_MODULE = {
	
}
const VIPCENTER_MODULE = {
	
}
const SHOPCART_MODULE = {
	getCartList,
	addToCart,
	deleteFromCart
}
const MINE_MODULE = {
	getAddressList,
	editAddress,
	addAddress,
	deleteAddress
}
export default {
	...LOGIN_MODULE,
    ...HOME_MODULE,
	...NEARBY_MODULE,
	...VIPCENTER_MODULE,
	...SHOPCART_MODULE,
	...MINE_MODULE
}
