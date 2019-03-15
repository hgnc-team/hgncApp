<template>
	<view class="orderResultPage">
		支付成功
		<button type="primary" @tap="backToIndex">回到首页</button>
	</view>
	
</template>
<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			backToIndex() {
				uni.reLaunch({
					url: "../index"
				})
			}
		},
	}
</script>

<style lang="scss">
	
</style>