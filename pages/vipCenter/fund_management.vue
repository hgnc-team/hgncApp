<template>
	<view class="fundManagementPage">
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
				<view class="row-item uni-flex-item uni-center">
					<view class="top">
						9999.99枚
					</view>
					<view class="bottom">
						已赚取
					</view>
				</view>
			</view>
				
	
			<view class="list">
				<uni-list>
					<uni-list-item title="银行卡管理" @click="toBankCard" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
					<uni-list-item title="佣金管理" @click="toCommissionsManagement" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
					<uni-list-item title="提现记录" @click="toWithdrawalsRecord" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				</uni-list>
			</view>
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
				
			}
		},
		methods: {
			// 银行卡管理
			toBankCard(){
				uni.navigateTo({
					url: 'bank_card'
				})
			},
			// 佣金管理
			toCommissionsManagement(){
				uni.navigateTo({
					url: 'commissions_management'
				})
			},
			// 提现记录
			toWithdrawalsRecord(){
				uni.navigateTo({
					url: 'withdrawals_record'
				})
			},
		}
	}
</script>

<style lang="scss">
	.fundManagementPage{
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
