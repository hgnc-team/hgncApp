/**  
 * @Title: service.js    
 * @Description: 后台请求接口汇总   
 * @author cskying  
 * @date 2019-3-11   
 * @version V1.0  
 */

// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// uni.getStorageSync(USERS_KEY);
// uni.setStorageSync(USERS_KEY, JSON.stringify(users));


/**     
  * @method 登录   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @return {promise} 返回一个requestTask对象   
  * @throws   
  */
const loginRe = function(userInfo) {
	let data = {
		phoneNum: userInfo.phone,
		pwd: userInfo.password
	}
	// 直接返回promise对象
	return uni.request({
        url: '/api/v1/user/login',
		method: 'POST',
		data: data
    })
}

/**     
  * @method 注册   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @param {String} inviteCode  邀请码
  * @param {String} authCode  验证码
  * @return {promise} 返回一个requestTask对象     
  **/
const registerRe = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		inviteCode: parms.inviteCode,
		authCode: parms.code,
	}
	return uni.request({
        url: '/api/v1/user/signUp',
		method: 'POST',
		data: data
    })
}

/**     
  * @method 发送验证码  
  * @param {String} phoneNum  手机号
  * @return {promise} 返回一个requestTask对象    
  **/
const getSmsRe = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		authCode: parms.authCode,
	}
	return uni.request({
        url: '/api/v1/sms/getSms',
		method: 'POST',
		data: data
    })
}

/**     
  * @method 忘记密码（重新设置密码）   
  * @param {String} phoneNum  手机号  
  * @param {String} pwd  密码
  * @param {String} authCode  验证码
  * @return {promise} 返回一个requestTask对象     
  **/
const reSetPwdRe = function(parms) {
	let data = {
		phoneNum: parms.phone,
		pwd: parms.password,
		authCode: parms.code,
	}
	return uni.request({
        url: '/api/v1/user/changePwd',
		method: 'POST',
		data: data
    })
}

const LOGIN_MODULE = {
	loginRe,
	registerRe,
	getSmsRe,
	reSetPwdRe
}
const HOME_MODULE = {
	
}
const NEARBY_MODULE = {
	
}
const VIPCENTER_MODULE = {
	
}
const SHOPCART_MODULE = {
	
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
