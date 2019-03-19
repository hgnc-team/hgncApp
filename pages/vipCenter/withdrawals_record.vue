<template>
	<view class="withdrawalsRecordPage">
		<view class="list">
			<view class="row-item uni-flex common-pa-30" v-for="(item, index) in dataList" :key="index" @tap="toDetail">
				<view class="left uni-flex-item">
					<view class="title uni-h5 uni-bold">
						{{item.title}}
					</view>
					<view class="date uni-text-gray uni-text-small">
						{{item.date}}
					</view>
				</view>
				<view class="right uni-flex-item">
					<view class="">
						<view class="money">
							{{item.money}}
						</view>
						<view class="status">
							{{item.status}}
						</view>
					</view>
					<view class="icon uni-flex-item">
						<uni-icon type="rightarrow"></uni-icon>
					</view>
				</view>
				<view class="icon">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				dataList: [{
					title: "提现申请",
					date: "2019-11-11 20:33:20",
					money:"+$44.22",
					status: "提现成功"
				},{
					title: "提现申请",
					date: "2019-11-11 20:33:20",
					money:"+$48.22",
					status: "提现失败"
				},{
					title: "提现申请",
					date: "2019-11-11 20:33:20",
					money:"+$54.22",
					status: "提现成功"
				},{
					title: "提现申请",
					date: "2019-11-11 20:33:20",
					money:"+$224.22",
					status: "提现成功"
				},{
					title: "提现申请",
					date: "2019-11-11 20:33:20",
					money:"+$4994.22",
					status: "提现成功"
				}]
			}
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: "withdrawals_record_detail"
				})
			}
		},
	}
</script>

<style lang="scss">
	.withdrawalsRecordPage{
		.list{
			.row-item{
				width: 100%;
				height: 120upx;
				border-bottom: 1upx solid #f0f0f0;
				box-sizing: border-box;
			}
		}
	}
</style>
