<template>
	<view class="orderDetailPage">
		<uni-notice-bar 
			show-close="true"
			show-icon="true" 
			scrollable="true" single="true" 
			:text="notice">
		</uni-notice-bar>
		
		<view class="order-list">
			<view class="order-list-item">
				订单详情
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniNoticeBar
	} from '@dcloudio/uni-ui'; 
	export default{
		components: {
			uniNoticeBar		
		},
		data() {
			return {
				notice:"为了您的财产安全，不要点击陌生连接，不要向任何人透露银行卡或验证码信息，谨防诈骗！",
				tabs: {
					// 选项卡
					items: ['全部', '待付款', '待发货', '待收货', '交易成功'],
					current: 0,
					styleType: "line",
					activeColor: '#007aff'
				},
			}
		},
		methods: {
			
		},
		onLoad(e) {
		},
	}
</script>

<style lang="scss">
</style>
