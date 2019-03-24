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
const register = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		inviteCode: parms.inviteCode,
		authCode: parms.code,
	}
	return vm.$http.post('/v1/api/user/signUp', data)
}

/**     
  * @method 发送验证码  
  * @param {String} phoneNum  手机号
  * @return {promise} 返回一个promise对象    
  **/
const getSms = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		authCode: parms.authCode,
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
const reSetPwd = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		authCode: parms.code,
	}
	return vm.$http.post('/v1/api/user/changePwd', data)
}

/**     
  * @method 获取商品顶级分类列表   
  * @param {String} classScheme   cat1  
  * @return {promise} 返回一个promise对象     
  **/
const getGoodTopClass = function(parms) {
	let data = {
		classScheme: parms.classScheme,
	}
	return vm.$http.post('v1/api/goods/topClass', data)
}

/**     
  * @method 获取商品二级分类列表   
  * @param {Array} topClass   ["0","1"]  
  * @return {promise} 返回一个promise对象     
  **/
const getGoodSecondClass = function(parms) {
	let data = {
		topClass: parms.topClass,
	}
	return vm.$http.post('v1/api/goods/secondClass', data)
}


/**     
  * @method 根据商品类型获取商品列表   
  * @param {String} type   商品类型   
  * @param {Number} page   列表页数   1
  * @param {Number} pageSize   一页商品数   默认为10条
  * @return {promise} 返回一个promise对象     
  **/
const getGoodListByType = function(parms) {
	let data = {
		type: parms.type,
		page: parms.page,
		pageSize: 10
	}
	return vm.$http.post('v1/api/goods/goodsPageList', data)
}

/**     
  * @method 根据商品id获取商品详情   
  * @param {Array} ids   商品ID数组   
  * @return {promise} 返回一个promise对象     
  **/
const getGoodListById = function(parms) {
	let data = {
		ids: parms.ids,
	}
	return vm.$http.post('v1/api/goods/goodsList', data)
}

/**     
  * @method 根据商品title模糊搜索商品（带分页）   
  * @param {String} title   ["0","1"]  
  * @param {Number} page   列表页数   1
  * @param {Number} pageSize   一页商品数   默认为2条 
  **/
const getGoodListBySearch = function(parms) {
	let data = {
		title: parms.title,
		page: parms.page,
		pageSize: 10,
	}
	return vm.$http.post('v1/api/goods/search', data)
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
const addToCart = function(parms) {
	let data = {
		userId: parms.userId,
		goodsId: parms.goodsId
	}
	return vm.$http.post('/v1/api/user/changePwd', data)
}

/**     
  * @method 添加商品至购物车   
  * @param {String} userId  用户id 
  * @param {Array | undefined} goodsIds - undefined时，清空用户所有购物车中的商品
  * @return {promise} 返回一个promise对象     
  **/
const deleteFromCart = function(parms) {
	let data = {
		userId: parms.userId,
		goodsIds: parms.ids
	}
	return vm.$http.post('/v1/api/cart/delete', data)
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
	getGoodListBySearch
	
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
	
}
export default {
	...LOGIN_MODULE,
    ...HOME_MODULE,
	...NEARBY_MODULE,
	...VIPCENTER_MODULE,
	...SHOPCART_MODULE,
	...MINE_MODULE
}
