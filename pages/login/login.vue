<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-pdt-10">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/img/common/logo.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="content">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" v-model="loginData.phone" placeholder="请输入手机号" class="is-input1 " data-val="phone" />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input v-model="loginData.password" placeholder="请输入登录密码" class="is-input1"  data-val="password"/>
				</view>

				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="loginData.loading" @tap="bindLogin"> {{ loginData.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80 content">
			<navigator url="pwd" class=" has-radius is-center is-grey" style="font-size: 30upx;" hover-class="">
				<text class="is-blue">忘记密码？</text>
			</navigator>
			<navigator url="reg" class=" has-radius is-center is-grey" style="font-size: 30upx;margin-top: 20upx;" hover-class="">
				<text>还没有账号？</text><text class="is-blue">注册</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				loginData: {
					loading: false,
					phone:"",
					password:""
				},

			};
		},
		methods:{
			// 将 `this.login()` 映射为 `this.$store.commit('login')`
			...mapMutations(['login']),
		
// 			BindInput:function(e){
// 				var dataval = e.currentTarget.dataset.val;
// 				this.loginData[dataval] = e.detail.value; 
// 			},
			// 点击登录
			bindLogin() {
			    // 校验手机号
				console.log(this.loginData.phone)
			    if (this.loginData.phone != 123456 && this.loginData.phone != 1234567) {
			        uni.showToast({
			            icon: 'none',
			            title: '请输入正确的手机号'
			        });
			        return;
			    }
				// 校验密码
			    if (this.loginData.password.length < 6) {
			        uni.showToast({
			            icon: 'none',
			            title: '密码最短为 6 个字符'
			        });
			        return;
			    }
			   
			    const data = {
			        phone: this.loginData.phone,
			        password: this.loginData.password
			    };
				let validUser = false;
				this.loginData.loading = true;
				// 使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
// 				service.loginFn(data).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
// 					var [error, res]  = data;
// 					console.log(res.data);
// 					validUser = true;
// 				}));
				 
			    validUser = true;
				const userLevel = this.loginData.phone == 123456 ? 1 : 2;
			    if (validUser) {
			        this.setfooterBar(this.loginData.phone, userLevel);
			    } else {
			        uni.showToast({
			            icon: 'none',
			            title: '用户账号或密码不正确',
			        });
			    }
			},
			// 设置不同的tabbar
			setfooterBar(userName, userLevel) {
				// 同步store里面的用户名称，等级
				this.login(userName, userLevel);
				if(userLevel == 1) {
					// 注册会员看不到会员中心
					this.$store.dispatch("menu_4");
				} else {
					// 普通会员及以上有会员中心
					this.$store.dispatch("menu_5");
				}
				this.toIndex();
			}
			,
			// 跳转首页
			toIndex() {
				uni.reLaunch({
				    url: '../index',
				});
				// uni.navigateBack();		
			}
		}
	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		width: 85%;
		margin: 0 auto;
	}

	.loginbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		/* background: #f35; */
		background: #222;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}
</style>
