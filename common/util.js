/**  
 * @Title: service.js    
 * @Description: 公共工具汇总   
 * @author cskying  
 * @date 2019-3-11   
 * @version V1.0  
 */

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

// 模拟跳转底部nav页面的首页
var navigator = function(){
	
}

/**     
  * @method  alert确认框       
  **/
const alert = function(parms) {
	uni.showModal({
		title:parms.title,
		content: parms.content,
		showCancel: false,
		confirmColor: "#242424",
		success: (res) => {
			if (res.confirm) {
				parms.success()
			}
		}
	})
}

/**     
  * @method 确认框       
  **/
const confirm = function(parms) {
	uni.showModal({
		title:parms.title,
		content: parms.content,
		confirmColor: "#242424",
		success: (res) => {
			if (res.confirm) {
				parms.success()
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}	
	})
}

export default {
	graceChecker,
	alert,
	confirm
}
