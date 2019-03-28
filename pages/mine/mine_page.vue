<template>
	<view class="minePage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<view class="header">
			<view class="userinfo">
				<view class="face">
					<image :src="userinfo.face"></image>
				</view>
				<view class="info" v-if="$store.state.hasLogin">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">手机号:{{userinfo.telPhone}}</view>
				</view>
				<view class="info" v-if="!$store.state.hasLogin" @tap="login">
					<view class="username">登录/注册 ></view>
				</view>
			</view>
			<view class="setting" @tap="toAccountInfo">
				<image src="../../static/HM-PersonalCenter/setting.png"></image>
			</view>
		</view>
		<view class="orders">
			<view class="title uni-flex">
				<view class="uni-h4 uni-flex-item">
					我的订单
				</view>
				<view class="to-all-orders uni-flex-item uni-link" @tap="toOrderType(0)">
					所有订单 >
				</view>
			</view>
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index+1)">
					<view class="icon">
						<view class="badge" v-if="row.badge>0">{{row.badge}}</view>
						<image :src="'../../static/HM-PersonalCenter/'+row.icon"></image>
					</view>
					<view class="text">
						{{row.name}}
					</view>
				</view>
			</view>
			<view class="bg-bar"></view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item title="换绑手机" @click="changeTelphone" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="收货地址" @click="toAddress" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="密码管理" @click="setSecondaryPassword" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>
<script>
	import {
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	import { mapMutations } from 'vuex';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				userinfo: {},
				orderTypeLise: [
					//name-标题 icon-图标 badge-角标
					{
						name: '待付款',
						icon: 'l1.png',
						badge: 1
					},
					{
						name: '待发货',
						icon: 'l2.png',
						badge: 2
					},
					{
						name: '待收货',
						icon: 'l3.png',
						badge: 6
					},
					{
						name: '交易成功',
						icon: 'l4.png',
						badge: 9
					}
				]
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: "VIP会员23123",
					telPhone: "1435*****2132"
				}
			},
			login(){
				// this.login()
				// this.$store.commit('login');
				uni.navigateTo({
					url: "../../login/login",
					animationType: "slide-in-bottom"
				})
			},
			// 修改账户信息
			toAccountInfo(){
				uni.navigateTo({
					url: `../../mine/account_info`
				})
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.navigateTo({
					url: `../../mine/order_list?index=${index}`
				})
			},
			// 换绑手机
			changeTelphone(){
				uni.navigateTo({
					url: "../../mine/change_telphone"
				})
			},
			// 管理密码
			setSecondaryPassword(){
				uni.navigateTo({
					url: "../../mine/gesture_lock?mode=set"
				})
			},
			// 收货地址
			toAddress(){
				uni.navigateTo({
					url: "../../mine/address_management"
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff
	}

	.header {
		background-color:#eee;
		width:92%;
		height:260upx;
		padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 120upx;
				height:120upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #fff;
		width: 100%;
		.title{
			width: 100%;
			padding: 15upx 30upx;
			border-bottom: 1upx solid #eee; 
			box-sizing: border-box; 
			.to-all-orders{
				text-align: right;
				line-height: 2;
			}
		}
		.box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				width: 100%;
				height: 160upx;
				color: #666666;
				padding: 20upx 0;
				font-size: 26upx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;
					border: 1upx;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
				.text{
					
				}
			}
		}
		.bg-bar{
			width: 100%;
			height: 30upx;
			background-color: #eee;
		}
	}

	.list {
		width: 100%;
		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>

