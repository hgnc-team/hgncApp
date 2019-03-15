<template>
	<view class="shopIndexPage">
		订单编号
		支付方式
		<button type="primary" @tap="toResult">去付款</button>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			toResult() {
				uni.navigateTo({
					url: "./order_result"
				})
			}
		},
	}
</script>

<style lang="scss">
	
</style>
