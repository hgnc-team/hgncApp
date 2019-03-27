<template>
	<view class="orderResultPage">
		支付成功
		<button type="primary" @tap="backToIndex">回到首页</button>
	</view>
	
</template>
<script>
	// 注入vuex的方法
	import { mapMutations } from 'vuex';
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			...mapMutations(['SET_PASSWORD_CHECKSTATUS']),
			backToIndex() {
				uni.reLaunch({
					url: "../index"
				})
			}
		},
		onLoad(option) {
			
			// 重置二级密码校验状态为false
			this.SET_PASSWORD_CHECKSTATUS(false);
		}
	}
</script>

<style lang="scss">
	
</style>