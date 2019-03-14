<template>
	<view class="vipCenterPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<view class="header">
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">手机号:{{ userinfo.telPhone }}</view>
				</view>
				<view class="info2 uni-text-small">
					<view class="username">{{ userinfo.levelName }}, 您好！</view>
					<view class="id">
						<text>id:{{ userinfo.id }}</text>
						<button type="primary" size="mini">点击复制</button>
					</view>
				</view>
			</view>
		</view>
		<view class="table">
			<view class="uni-flex">
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9.88枚
					</view>
					<view class="bottom">
						今日释放M币
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999.99枚
					</view>
					<view class="bottom">
						M币钱包
					</view>
				</view>
			</view>
			
			<view class="uni-flex">
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
			</view>
			
			<view class="uni-flex">
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
				<view class="uni-flex-item uni-center">
					<view class="top">
						9999
					</view>
					<view class="bottom">
						我的积分
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item title="邀请会员" @click="changeTelphone" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="积分转让" @click="toAddress" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="实体加盟" @click="setSecondaryPassword" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			
			return {
				userinfo: {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: 'VIP会员10240',
					id:"1234567",
					levelName:"销售经理",
					telPhone: '1435*****2132'
				}
			};
		},
		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: 'VIP会员10240',
					telPhone: '1435*****2132'
				};
			}
		}
	};
</script>

<style lang="scss">
.vipCenterPage {
	.header {
		background-color: #eee;
		width: 92%;
		height: 260upx;
		padding: 0 4%;
		display: flex;
		align-items: center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 120upx;
				height: 120upx;

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
					font-size: 40upx;
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
}
</style>
