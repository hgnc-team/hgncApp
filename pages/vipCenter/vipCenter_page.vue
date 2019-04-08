<template>
	<view class="vipCenterPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<view class="header">
			<view class="title" v-if="title">
				{{title}}
			</view>
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">{{ userinfo.telPhone }}</view>
				</view>
				<view class="info2 uni-text-small">
					<text>ID</text>
					<text>{{userinfo.id}}</text>
					<view class="icon">
						<uni-icon type=""></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="table">
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center">
					<view class="top">
						9.88枚
					</view>
					<view class="bottom">
						今日释放M币
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(1)">
					<view class="top">
						9999.99枚
					</view>
					<view class="bottom">
						M币钱包>
					</view>
				</view>
			</view>
			
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center" @tap="toMyOrder">
					<view class="top">
						我的订单
					</view>
					<view class="bottom">
						购买记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(0)">
					<view class="top">
						积分中心
					</view>
					<view class="bottom">
						数据详情
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toMyTeam">
					<view class="top">
						我的团队
					</view>
					<view class="bottom">
						团队数据
					</view>
				</view>
			</view>
			
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center" @tap="toFundManagement">
					<view class="top">
						资金管理
					</view>
					<view class="bottom">
						佣金提现
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toSalesManagement">
					<view class="top">
						销售管理
					</view>
					<view class="bottom">
						销售记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toPerformanceManagement">
					<view class="top">
						业绩管理
					</view>
					<view class="bottom">
						业绩详情
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item title="邀请会员" @click="inviteMembers" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="积分转让" @click="transferIntergral" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="实体加盟" @click="setupStore" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" show-badge="true" badge-text="需要实名"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			
			return {
				userinfo: {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: 'VIP会员2312',
					id:"1234567",
					levelName:"销售经理",
					telPhone: '1435*****2132'
				}
			};
		},
		computed: {
			...mapState(['userName', 'userLevel', 'userFace', 'userPhone', 'userInviteCode']),
			title() {
				let title = "";
				switch (this.userLevel){
					case 4:
						title = "大区经理，你好！"
						break;
					case 3:
						title = "业务总监，你好！"
						break;
					case 2:
						title = "销售经理，你好！"
						break;
					case 1:
						title = ""
						break;
					default:
						break;
				}
				return title;
			}
		},
		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: 'VIP会员10240',
					telPhone: '1435*****2132'
				};
			},
			// 我的订单
			toMyOrder(){
				uni.navigateTo({
					url: '../../mine/order_list?index=0'
				})
			},
			// 积分中心
			toIntegralCenter(index){
				// 根据index的不同展示不同的tab
				uni.navigateTo({
					url: '../../vipCenter/intergral_center'
				})
			},
			// 我的团队
			toMyTeam(){
				uni.navigateTo({
					url: '../../vipCenter/my_team'
				})
			},
			// 资金管理
			toFundManagement(){
				uni.navigateTo({
					url: '../../vipCenter/fund_management'
				})
			},
			// 销售管理
			toSalesManagement(){
				uni.navigateTo({
					url: '../../vipCenter/sales_management'
				})
			},
			// 业绩管理
			toPerformanceManagement(){
				uni.navigateTo({
					url: '../../vipCenter/performance_management'
				})
			},
			// 邀请会员
			inviteMembers(){
				uni.showToast({
					title: "邀请会员"
				})
			},
			// 积分转让
			transferIntergral(){
				uni.navigateTo({
					url: '../../vipCenter/intergral_transfer'
				})
			},
			// 实体加盟（我要开店）
			setupStore(){
				uni.navigateTo({
					url: '../../vipCenter/setup_store'
				})
			}
		}
	};
</script>

<style lang="scss">
.vipCenterPage {
	.header {
		background-color: #242424;
		width: 100%;
		height: 260upx;
		padding: 10upx;
		.title{
			text-align: center;
			color: #fff;
			padding: 10upx;
			
		}
		.userinfo {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30upx 0 30upx 30upx;
			box-sizing: border-box;
			.face {
				flex-shrink: 0;
				width: 136upx;
				height: 136upx;
				border-radius: 100%;
				border: 2upx solid #fff;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 32upx;
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx;
				}
			}
			
			.info2{
				height: 48upx;
				background-color: #e5bd77;
				border-top-left-radius: 24upx ;
				border-bottom-left-radius: 24upx ;
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.table{
		width: 100%;
		height: 420upx;
		padding: 30upx;
		box-sizing: border-box;
		.row{
			border-bottom: 2upx solid #999;
			&:last-child{
				border-bottom:none; 
			}
			.row-item{
				margin: 20upx 0;
				border-right: 1upx solid #999;
				&:last-child{
					border-right:none; 
					margin-bottom: none;
				}
				.top{
					color: #333;
					font-weight: 600;
				}
				.bottom{
					color: #999;
					font-size:24upx;
				}
			}
		}
		// .row
	}
}
</style>
