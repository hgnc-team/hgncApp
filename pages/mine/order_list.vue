<template>
	<view class="orderListPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="titleBg" color="textColor" left-icon="back" @click-left="onClickLeft"
		title="订单列表"></uni-nav-bar>
		<topTabMenu :current="tabs.current" :values="tabs.items" @clickItem="changeTabs"></topTabMenu>
		<!-- 列表内容 -->
		<view class="content">
			<view class="order-item" v-for="(item, index) in orderList" :key="index">
				<view class="title">
					<view class="uni-h5">
						{{item.title}}
					</view>
					<view class="tags">
						<uni-tag type="success" :text="item.status" size="small" inverted="true" mark="true" circle="true"></uni-tag>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniTag,
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	import topTabMenu from "../../components/common/top_tabMenu.vue";
	export default {
		components: {
			uniTag,
			uniIcon,
			uniNavBar,
			topTabMenu
		},
		data() {
			return {
				titleBg: 'rgba(0,0,0,1)',
				textColor: 'rgba(255,255,255,1)',	
				tabs: {
					// 选项卡
					items: ['全部', '待付款', '待发货', '待收货', '交易成功'],
					current: 0
				},
				orderList: [{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '../../static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '../../static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '../../static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '../../static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				}]
			}
		},
		methods: {
			initData(id){
				service.getGoodsDetail().then();
			},
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
			// 切换选项卡
			changeTabs(index) {
				if (this.tabs.current !== index) {
					this.tabs.current = index;
				}
			},
		},
		onLoad(e) {
			console.log(e)
			// this.initData(e.id);
			this.tabs.current = e.index - 0;
		},
		
	}
</script>

<style lang="scss">
	.orderListPage{
		.uni-navbar__header{
			height: 120upx;
		}
		.content{
			.order-item{
				width: 100%;
				height: 300upx;
				border: 1px solid #eee;
				.title{
					height: 100upx;
				}
			}
		}
	}
</style>
