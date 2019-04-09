<template>
	<view>
		<view class="footerNav">
			<view class="footer_item" :class="index==now_index?'select_text':''" :style="'width:'+item_width" @click="change_nav(item, index)" v-for="(item,index) in footer_nav" :key="index">
				<!-- <uni-icon :type="index==now_index?item.select_icon:item.icon" size="24"></uni-icon> -->
				<image :src="index==now_index?item.select_icon:item.icon" mode=""></image>
				<view style="margin-top: 4upx;">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniIcon } from '@dcloudio/uni-ui';
	import util from "../../common/util.js";
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				
			};
		},
		methods:{
			change_nav(item, index){
				// 切换底部导航做权限判定，登录后才可进入(我的)
				if(item.name_code === "mine") {
					this.$guardToLogin(item.name_code).then(()=>{
						this.$store.dispatch("change_page", item.name_code);
					}).catch(()=>{});
					return
				}
				this.$store.dispatch("change_page", item.name_code);
			}
		},
		computed:{
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
	z-index: 10000;
	.footer_item{
		float: left;
		width: 33.3%;
		text-align: center;
		font-size: 28upx;
		height: 120upx;
		margin-top: 8upx;
	}
	.select_text{
		color: #000;
	}
	.footer_item image{
		width: 40upx;
		height: 40upx;
		top: 8upx;
	}
}

</style>
