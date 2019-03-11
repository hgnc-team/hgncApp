<template>
	<view class="pwdPage pd-30">
		<view class="page-title uni-h4">找回密码</view>
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
	    			<input placeholder="输入密码" type="password" v-model="pwdData.password"/>
	    		</view>
	    		<view class="input-item">
	    			<input placeholder="确认密码" type="password" v-model="pwdData.password1"/>
	    		</view>
	    	</view>
	    	<view class=" loginbtn">
	    		<button :loading="pwdData.loading" @tap="bindLogin">完 成</button>
	    	</view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwdData: {
					loading: false,
					phone:"",
					password:"",
					code: ""
				},
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
			}
		},
		
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
