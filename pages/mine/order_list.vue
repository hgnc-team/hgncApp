<template>
	<view class="orderListPage">
		<view class="tabs">
			<uni-segmented-control :current="tabs.current" :values="tabs.items" v-on:clickItem="changeTabs" :styleType="tabs.styleType" :activeColor="tabs.activeColor"></uni-segmented-control>
		</view>
		<!-- 列表内容 -->
		<view class="content">
			<view class="order-item" v-for="(item, index) in orderList" :key="index" >
				<view class="title-wrap uni-flex" @tap="toOrderDetail(item.id)">
					<view class="title uni-h5 uni-flex-item">
						{{item.title}}
					</view>
					<view class="status uni-inline-item">
						{{item.status}}
					</view>
				</view>
				<view class="order-info uni-flex" @tap="toOrderDetail(item.id)">
					<view class="image uni-inline-item" >
						<image :src="item.src" mode="aspectFit"></image>
					</view>
					<view class="info uni-flex-item">
						<view class="name uni-h5">
							{{item.name}}
						</view>
						<view class="code uni-text-small text-color-gray uni-column uni-flex">
							<text>订单编号:{{item.orderNum}}</text>
							<text>订单时间:{{item.orderTime}}</text>
						</view>
						<view class="address  uni-text-small text-color-gray">
							送货地址：{{item.address}}
						</view>
					</view>
				</view>
				<view class="total" style="text-align: right;">
					合计:{{item.price}}
				</view>
				<view class="btn" style="text-align: right;" @tap="toGoodsDetail(item.id)">
					<button type="primary" size="mini">再来一单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniTag,
		uniIcon,
		uniNavBar,
		uniSegmentedControl
	} from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	export default {
		components: {
			uniTag,
			uniSegmentedControl		
		},
		data() {
			return {	
				tabs: {
					// 选项卡
					items: ['全部', '待付款', '待发货', '待收货', '交易成功'],
					current: 0,
					styleType: "line",
					activeColor: '#007aff'
				},
				orderList: [{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '/static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '/static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '/static/img/common/logo.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12.15",
					address: "哇哈是的撒谎肯德基撒谎的空间撒谎的空间撒谎的空间撒谎的空间撒谎的",
					price: "￥500.00"
				},{
					name: "大藏小玩",
					title: "放送的是多少",
					id: 1,
					status: "已完成",
					url: '/static/img/common/logo.png',
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
			// 切换选项卡
			changeTabs(index) {
				if (this.tabs.current !== index) {
					this.tabs.current = index;
				}
			},
			// 订单详情
			toOrderDetail(){
				uni.navigateTo({
					url: "/pages/mine/order_detail"
				})
			},
			// 商品详情
			toGoodsDetail(){
				uni.navigateTo({
					url: "/pages/home/goods_detail"
				})
			}
			
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
		.tabs{
			width: 100%;
			height: 88upx;
			position: fixed;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/* #endif */
			z-index: 1000;
			background-color: #fff;
			.segmented-control{
				width: 100%;
				height: 100%;
			}
		}
		.content{
			/* #ifdef H5 */
			padding-top: 88upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			padding-top: calc(var(--status-bar-height) + 88upx); 
			/* #endif */	
			.order-item{
				width: 100%;
				border: 1px solid #eee;
				padding: 0 30upx;
				box-sizing: border-box;
				.title-wrap{
					width: 100%;
					height: 88upx;
					border-bottom: 1upx solid #f0f0f0;		
					.title{
						line-height: 88upx;
					}
					.status{
						width: 100upx;
					}
				}
				.order-info{
					.image{
						width: 130upx;
						height: 130upx;
						margin-right: 20upx;
						
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
