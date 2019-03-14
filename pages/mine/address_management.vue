<template>
	<view class="addressManagementPage">
		地址管理
		<view class="" @tap="edit">
			<button type="primary" >编辑</button>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			edit(){
				console.log(123123)
				uni.navigateTo({
					url:"address_edit"
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
