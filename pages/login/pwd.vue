<template>
	<view class="pwdPage pd-30">
		<view class="page-title uni-h4">重置密码</view>
	    <view class="content">
	    	<view class="input-wrap">
	    		<view class=" input-item">
	    			<input type="number" maxlength="11" v-model="pwdData.phone" placeholder="请输入手机号" class="is-input1 " data-val="phone" />
	    		</view>
	    		<view class="input-item has-label-right uni-flex">
	    			<input type="number" class="input-left" placeholder="短信验证码" v-model="pwdData.code" />
	    			<view class="label-right" @tap="getsmscode">
	    				<text style="border: 1upx solid #999;padding: 12upx 16upx;">{{smsbtn.text}}</text>
	    			</view>
	    		</view>
	    		<view class="input-item">
	    			<input placeholder="请输入新密码" type="password" v-model="pwdData.password"/>
	    		</view>
	    		<view class="input-item">
	    			<input placeholder="确认密码" type="password" v-model="pwdData.password1"/>
	    		</view>
	    	</view>
	    	<view class=" loginbtn">
	    		<button @tap="reSetPwd">完 成</button>
	    	</view>
	    </view>
	</view>
</template>

<script>
	import service from '../../common/service.js';
	import util from '../../common/util.js';
	export default {
		data() {
			return {
				pwdData: {
					phone:"",
					password:"",
					password1:"",
					code: ""
				},
				smsbtn: {
					text: '获取验证码',
					status: true,
					codeTime: 60
				},
				timerId: null,
			}
		},
		methods:{
			// 获取验证码
			getsmscode: function() {
				if(this.smsbtn.status) {
					this.timerId = setInterval(() => {
							this.smsbtn.status = false;
							var codeTime = this.smsbtn.codeTime;
							codeTime--;
							this.smsbtn.codeTime = codeTime;
							this.smsbtn.text = codeTime + "S";
							if (codeTime < 1) {
								clearInterval(this.timerId);
								this.smsbtn.text = "重新获取";
								this.smsbtn.codeTime = 60;
								this.smsbtn.status = true;
							}
						},
						1000);
					return false;
				}
			},
			// 校验数据是否合法
			isValidFn(name, rules, dataType){
				let data = {};
				data[name] = this[dataType][name];
				return util.graceChecker.check(data, rules);
			},
			// 重置密码
			reSetPwd(){
				// 定义校验列表
				const checkList = [
					{
						name: "phone",
						rules: [
							{
								checkType: "notnull",
								name: "phone",
								errorMsg: "请输入手机号"
							},{
								checkType: "phoneno",
								name: "phone",
								errorMsg: "请输入正确的手机号"
							}
						]
					},{
						name: "code",
						rules: [
							{
								checkType: "notnull",
								name: "code",
								errorMsg: "短信验证码不能为空"
							}
						]
					},{
						name: "password",
						rules: [
							{
								checkType: "notnull",
								name: "password",
								errorMsg: "请输入密码"
							}
						]
					},{
						name: "password1",
						rules: [
							{
								checkType: "notnull",
								name: "password1",
								errorMsg: "确认密码不能为空"
							},{
								checkType: "same",
								checkRule: this.pwdData.password,
								name: "password1",
								errorMsg: "两次密码输入不一致"
							}
						]
					}
				];
				// 校验数据
				let that = this;
				let isUserInvalid = false;
				_.forEach(checkList, function(item){
					const isValid = that.isValidFn(item.name, item.rules, "pwdData");
					if (!isValid) {
					    uni.showToast({
					        icon: 'none',
					        title: util.graceChecker.error
					    });
						isUserInvalid = true;
					    return false;
					}
				});
				if( isUserInvalid ) {
					return 
				}
				
				// 请求重置密码接口
				const parms = {
					phone: this.pwdData.phone,
					password: this.pwdData.password,
					code: this.pwdData.code,
				}
				uni.showLoading({title: '重置中'});
				service.reSetPwdRe(parms).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
					uni.hideLoading();
					var [error, res]  = data;
					if(!error) {
						// 请求失败
						uni.showToast({
						    icon: 'none',
						    title: JSON.stringify(error),
						});
						return;
					} else {
						// 重置成功
						if(res.data.code === 200) {
							// 跳转至登录页面？把手机号密码带过去？
							uni.redirectTo({
								url: `./login?phone=${this.pwdData.phone}&password=${this.pwdData.password}`
							})
						} else {
							// 重置失败
							uni.showToast({
							    icon: 'none',
							    title: JSON.stringify(res.data.errorMsg),
							});
							return;
						}
					};
				});
			},
			isPhoneValidFn(){
				const data = {
					phone: this.pwdData.phone
				};
				const rules = [
					{
						checkType: "notnull",
						name: "phone",
						errorMsg: "请输入手机号"
					},
					{
						checkType: "phoneno",
						name: "phone",
						errorMsg: "请输入正确的手机号"
					}
				];
				return util.graceChecker.check(data, rules);
			},
			isCodeValidFn(){
				const data = {
					code: this.pwdData.code
				};
				const rules = [
					{
						checkType: "notnull",
						name: "code",
						errorMsg: "短信验证码不能为空"
					}
				];
				return util.graceChecker.check(data, rules);
			},
			ispwdValidFn(){
				const data = {
					password: this.pwdData.password
				};
				const rules = [
					{
						checkType: "notnull",
						name: "password",
						errorMsg: "请输入新密码"
					}
				];
				return util.graceChecker.check(data, rules);
			},
			ispwdValidFn1(){
				const data = {
					password1: this.pwdData.password1
				};
				const rules = [
					{
						checkType: "notnull",
						name: "password1",
						errorMsg: "确认密码不能为空"
					},
					{
						checkType: "same",
						checkRule: this.pwdData.password,
						name: "password1",
						errorMsg: "两次密码输入不一致"
					}
				];
				return util.graceChecker.check(data, rules);
			}
		}
		
	}
</script>

<style lang="scss">
	.pwdPage{
		padding-top: 120upx;
		.content{
			margin-top:30upx;
			.input-wrap{
				.input-item{
					width: 100%;
					height: 80upx;
					margin-bottom: 10upx;
					padding-top: 10upx; 
					border-bottom: 1px solid #999;
					input{		
						width: 100%;
						height: 100%;
						border:none;
					}
					&.has-label-right{
						.input-left{
							width: 75%;
						}
						.label-right{
							width: 25%;
							text-align: center;
							line-height: 80upx;
						}
						
					}
				}
			}
			.loginbtn {
				margin-top: 80upx;
				button{
					height: 88upx;
					width: 100%;
					line-height: 88rpx;
					color: #ffffff;
					font-size: 32rpx;
					outline: 0;
					display: block;
					margin: 0;
					font-family: inherit;
					/* background: #f35; */
					background: #222;
					opacity: 0.8;
				}
			}
			
		}
	}
</style>
