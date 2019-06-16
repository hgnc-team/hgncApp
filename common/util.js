/**  
 * @Title: service.js    
 * @Description: 公共工具汇总   
 * @author cskying  
 * @date 2019-3-11   
 * @version V1.0  
 */
import store from '../store/index.js';
import _ from 'lodash';
/**     
  * @method 表单优雅校验   
  * @param {String} error 错误提示  
  * @param {Object} data  需要检验的数据 {phone：13555555555}
  * @param {Array} rule   校验规则  [{checkType: "notnull",name: "password1",errorMsg: "确认密码不能为空"},{checkType: "same",checkRule: this.pwdData.password,name: "password1",errorMsg: "两次密码输入不一致"}]
  * @throws   
  */
const graceChecker = {
	error:'',
	check : function (data, rule){
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].name) {return true;}
			if (!rule[i].errorMsg) {return true;}
			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
			switch (rule[i].checkType){
				case 'string':
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				case 'int':
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				break;
				case 'between':
					if (!this.isNumber(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenD':
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenF': 
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'same':
					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
				break;
				case 'notsame':
					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'phoneno':
					var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'reg':
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case 'in':
					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'notnull':
					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
				break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
}

// 模拟底部其他非nav页面跳转nav页面
const switchTab = function(type){
	store.dispatch("change_page", type);
	uni.navigateTo({
		url:"/pages/index"
	})
}
/**
  * @method  进入有权限的页面之前判断当前是否登录 
  * @param {String} code 目标页面的标识
  **/
const guardToLogin = function(code) {
	return new Promise((reslove, reject)=>{
		// 获取登录状态
		const hasLogin = store.state.hasLogin;
		if(hasLogin) {
			reslove();
		} else {
			// 未登录跳转登录页面
			uni.navigateTo({
				url: `/pages/login/login?pageCode=${code}`,
				animationType: "slide-in-bottom"
			});
			reject();
		}
	})
}

/**     
  * @method  alert确认框       
  **/
const alert = function(params) {
	uni.showModal({
		title:params.title,
		content: params.content,
		showCancel: false,
		confirmColor: "#242424",
		success: (res) => {
			if (res.confirm) {
				params.success()
			}
		}
	})
}

/**     
  * @method 确认框       
  **/
const confirm = function(params) {
	uni.showModal({
		title:params.title,
		content: params.content,
		confirmColor: "#242424",
		success: (res) => {
			if (res.confirm) {
				params.success()
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}	
	})
}

/**     
  * @method 拼接图片路径
  * @param {String} domain 后台配置图片域名
  * @param {String} type 需要配置的模块 商品模块-goods
  * @param {String} goodID
  * @param {String} imageName 图片名称 英文冒号分割 detail_1.jpg;detail_2.jpg;
  * return String | Array   https://images.maiyidesan.cn/goods/018fsmw30000100/title1.jpg
  **/
const setImageUrl = function(params) {
	if(params.imageName) {
		let baseUrl = "https://";
		let domain = store.state.imageDomain;
		let type = params.type;
		let goodId = params.goodId;
		let imageName = params.imageName;
		let imgArr = _.split(imageName, ";");
		// 判断imageName是否带分号
		if(imgArr.length > 1) {
			let arr = [];
			_.forEach(imgArr, item => {
				arr.push({img: `${baseUrl}${domain}/${type}/${goodId}/${item}`})
			})
			return arr
		} else {
			return `${baseUrl}${domain}/${type}/${goodId}/${imageName}`
		}
	} else {
		return []
	}
}

/**     
  * @method 设置下拉刷新模式
  * @param {Boolean} isSupport 是否开启
  * @param {String} offset下拉刷新的起始位置
  **/
const setRefreshMode = function(isSupport, offset){
	// upx转化为px
	let _offset = offset ? uni.upx2px(offset) + "px" : "0px";
	// #ifdef APP-PLUS
	const pages = getCurrentPages();
	const page = pages[pages.length - 1];
	var currentWebview = page.$getAppWebview();
	currentWebview.setStyle({
		pullToRefresh: {
			support: isSupport,
			offset: _offset, //仅对"circle"样式下拉刷新控件有效
			"style": "circle",
			"color": "#4c9bfa"
		}
	});
	// #endif
}

const BASE_IMAGE_URL = 'https://images.maiyidesan.cn/'
const BASE_URL = 'http://server.maiyidesan.cn/v1/api/'

export default {
	graceChecker,
	switchTab,
	guardToLogin,
	alert,
	confirm,
	setImageUrl,
	setRefreshMode,
	BASE_IMAGE_URL
}
