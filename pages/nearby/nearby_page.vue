<template>
	<view class="nearbyPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="titleBg" color="textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="redo" title="附近"></uni-nav-bar>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			uniIcon,
			uniNavBar
		},
		data() {
			return {
				titleBg: 'rgba(0,0,0,1)',
				textColor: 'rgba(255,255,255,1)',
			};
		},
		onLoad() {
			
		},
		methods:{
			/**  
			 * 左侧按钮点击事件  
			 */
			onClickLeft() {
				uni.navigateBack({
			
				})
			},
			/**  
			 * 右侧按钮点击事件  
			 */
			onClickRight() {
				uni.showToast({
					title: "分享"
				})
			},
		}
	}
</script>

<style>

</style>
