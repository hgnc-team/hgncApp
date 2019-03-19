<template>
	<view>
		<view class="footerNav">
			<view class="footer_item" :class="index==now_index?'select_text':''" :style="'width:'+item_width" @click="change_nav(index)" v-for="(item,index) in footer_nav" :key="index">
				<uni-icon :type="index==now_index?item.select_icon:item.icon" size="24"></uni-icon>
				<view style="margin-top: 4upx;">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniIcon } from '@dcloudio/uni-ui';
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				
			};
		},
		methods:{
			change_nav(index){
				// 方便微信调试用
// 				if(index === 0) {
// 					uni.navigateTo({
// 						url: "../../home/home_page"
// 					})
// 					return
// 				}
// 				if(index === 2) {
// 					uni.navigateTo({
// 						url: "../../vipCenter/vipCenter_page"
// 					})
// 					return
// 				}
// 				if(index === 3) {
// 					uni.navigateTo({
// 						url: "../../shopCart/shopCart_page"
// 					})
// 					return
// 				}
// 				if(index === 4) {
// 					uni.navigateTo({
// 						url: "../../mine/mine_page"
// 					})
// 					return
// 				}
				// 点击附近，跳转到其对应的页面
				if(index === 1) {
					uni.navigateTo({
						url: "../../nearby/nearby_page"
					})
					return
				}
				this.$store.commit("change_page",index)
			}
		},
		computed:{
			selectIcon(index, item){
				switch (index){
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			item_width(){
				let length = this.$store.state.footer_store.footer_nav.length;
				switch (length){
					case 4:
						return '25%'
						break;
					case 5:
						return '20%'
						break;
					default:
						break;
				}
			},
			footer_nav(){
				console.log(this.$store.state.footer_store.footer_nav)
				return this.$store.state.footer_store.footer_nav
			},
			now_index(){
				return this.$store.state.footer_store.now_page_index;
			}
		}
	}
</script>

<style lang="scss">
.footerNav{
	height: 120upx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	border-top: 1upx solid #eee;
	color: #999;
	.footer_item{
		float: left;
		width: 33.3%;
		text-align: center;
		font-size: 28upx;
		height: 120upx;
		margin-top: 4upx;
	}
	.select_text{
		color: #000;
	}
	.footer_item image{
		width: 40upx;
		height: 40upx;
		top: 4upx;
	}
}

</style>
