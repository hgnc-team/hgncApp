<template>
	<view class="loginPage">
		<statusBar></statusBar>
		<view class="header-wrap pd-30">
			<view class="t-c-w">
				<uni-icon type="closeempty" size="36" @click="closed"></uni-icon>
			</view>
			<view class="title uni-h2 uni-center t-c-w">
				嬴鱼
			</view>
			<view class="tabs">
				<view class="uni-flex">
					<view class="loginTab uni-flex-item uni-center t-c-w" style="border-right: 4upx solid #eee;" @tap="changeTab('login')">
						<text>登录</text>
					</view>
					<view class="registerTab uni-flex-item uni-center t-c-w" @tap="changeTab('reg')">
						<text>注册</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 登录模块 -->
		<view class="content pd-30" v-if="currentTab == 'login'">
			<view class="input-wrap">
				<view class="input-item">
					<input type="number" maxlength="11" v-model="loginData.phone" placeholder="请输入手机号" data-val="phone" />
				</view>
				<view class="input-item has-label-right uni-flex">
					<input type="password" v-model="loginData.password" class="input-left" placeholder="请输入密码"  data-val="password"/>
					<view class="label-right">
						<navigator url="pwd">忘记密码？</navigator>
					</view>
				</view>
			</view>
			
			<view class="loginbtn">
				<button :loading="loginData.loading" @tap="bindLogin"> {{ loginData.loading ? "登录中...":"登 录"}} </button>
			</view>
			
			<!-- 第三方登录 -->
			<view class="oauth-wrap pd-30" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
				<view class="oauth-title uni-flex">
					<view class="oauth-title-item line">
						
					</view>
					<view class="oauth-title-item text">
						使用第三方账号登录
					</view>
					<view class="oauth-title-item line">
						
					</view>
				</view>
				<view class="oauth-row uni-flex">
					<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
					    <image :src="provider.image" @tap="oauth(provider.value)"></image>
					</view>
				</view> 
			</view>
		</view>
		<!-- 注册模块 -->
		<view class="content pd-30" v-if="currentTab == 'reg'">
			<view class="input-wrap">
				<view class=" input-item">
					<input type="number" maxlength="11" v-model="registerData.phone" placeholder="请输入手机号" class="is-input1 " data-val="phone" />
				</view>
				<view class="input-item has-label-right uni-flex">
					<input type="number" class="input-left" placeholder="短信验证码" v-model="registerData.code" />
					<view class="label-right" @tap="getsmscode">
						<text style="border: 1upx solid #999;padding: 12upx 16upx;">{{smsbtn.text}}</text>
					</view>
				</view>
				<view class="input-item">
					<input placeholder="输入密码" type="password" v-model="registerData.password"/>
				</view>
				<view class="input-item">
					<input placeholder="确认密码" type="password" v-model="registerData.password1"/>
				</view>
			</view>
			<view class=" loginbtn">
				<button :loading="registerData.loading" @tap="bindLogin"> {{ registerData.loading ? "注册中...":"注 册"}} </button>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js';
	import { uniIcon } from '@dcloudio/uni-ui';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		components:{
			uniIcon
		},
		data() {
			return {
				loginData: {
					loading: false,
					phone:"",
					password:""
				},
				registerData: {
					loading: false,
					phone:"",
					password:"",
					code: ""
				},
				currentTab: "login",
				smsbtn: {
					text: '获取验证码',
					status: true,
					codeTime: 60
				},
				providerList: [],
				hasProvider: true,
				positionTop: 0
			};
		},
		methods:{
			// 将 `this.login()` 映射为 `this.$store.commit('login')`
			...mapMutations(['login']),
			// 初始化第三方登录
			initProvider() {
			    const filters = ['weixin', 'qq', 'sinaweibo'];
			    uni.getProvider({
			        service: 'oauth',
			        success: (res) => {
			            if (res.provider && res.provider.length) {
			                for (let i = 0; i < res.provider.length; i++) {
			                    if (~filters.indexOf(res.provider[i])) {
			                        this.providerList.push({
			                            value: res.provider[i],
			                            image: '../../static/img/common/' + res.provider[i] + '.png'
			                        });
			                    }
			                }
			                this.hasProvider = true;
			            }
			        },
			        fail: (err) => {
			            console.error('获取服务供应商失败：' + JSON.stringify(err));
			        }
			    });
			},
			initPosition() {
			    /**
			     * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			     * 反向使用 top 进行定位，可以避免此问题。
			     */
			    this.positionTop = uni.getSystemInfoSync().windowHeight - 150;
			},
			// 第三方登录
			oauth(value) {
			    uni.login({
			        provider: value,
			        success: (res) => {
			            uni.getUserInfo({
			                provider: value,
			                success: (infoRes) => {
			                    /**
			                     * 实际开发中，获取用户信息后，需要将信息上报至服务端。
			                     * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			                     */
			                    this.toIndex(infoRes.userInfo.nickName);
			                }
			            });
			        },
			        fail: (err) => {
			            console.error('授权登录失败：' + JSON.stringify(err));
			        }
			    });
			},
			// 貌似iOS 平台不支持此 API
			closed() {
				// #ifdef APP-PLUS  
				plus.runtime.quit();  
				// #endif  
			},
			changeTab(tab) {
				console.log(tab)
				this.currentTab = tab;
			},
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
		},
		onLoad() {
		    this.initProvider();
			this.initPosition();
		}
	}
</script>

<style lang="scss">
	.loginPage {
		min-height: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.header-wrap{
			height: 300upx;
			background-color: #00B26A;
			// background-image: url()
			position: relative;
			top:0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);//表示状态栏的高度。
			/*  #endif  */
			
			.tabs{
				width: calc(100% - 60upx);
				box-sizing: border-box;
				position: absolute;
				bottom: 40upx;
			}

		}
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
			.oauth-wrap{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				box-sizing: border-box; 
				.oauth-title{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					margin-bottom: 30upx; 
					.oauth-title-item{
						&.text{
							flex-grow: 1;
							text-align: center;
							color:  #999;
						}
						&.line{
							flex-grow: 1;
							height: 1upx;
							border-bottom: 1upx solid #999; 
						}
					}
				}
				.oauth-row{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					.oauth-image {
					    width: 100upx;
					    height: 100upx;
					    border: 1upx solid #dddddd;
					    border-radius: 100upx;
					    margin: 0 40upx;
					    background-color: #ffffff;
						image {
						    width: 60upx;
						    height: 60upx;
						    margin: 20upx;
						}
					}
				}
			}
		}
	}
</style>
