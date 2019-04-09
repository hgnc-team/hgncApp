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
						{{item.name}}
					</view>
					<view class="status uni-inline-item">
						{{item.status}}
					</view>
				</view>
				<view class="order-info uni-flex" @tap="toOrderDetail(item.id)">
					<view class="image uni-inline-item" >
						<image :src="item.url" mode="aspectFit"></image>
					</view>
					<view class="info uni-flex-item">
						<view class="name uni-h5">
							{{item.title}}
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
					items: ['全部', '待付款', '待发货', '待收货', '已完成'],
					current: 0,
					styleType: "text",
					activeColor: '#242424'
				},
				orderList: [{
					name: "大藏小玩",
					title: "仿宋代明月石",
					id: 102212,
					status: "已完成",
					url: '/static/HM-PersonalCenter/order_prod_thumb_pic.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12:10",
					address: "湖北省武汉市常青花园1栋1单元312室70928号",
					price: "500.00"
				},{
					name: "大藏小玩",
					title: "仿宋代明月石",
					id: 102213,
					status: "待发货",
					url: '/static/HM-PersonalCenter/order_prod_thumb_pic.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12:11",
					address: "湖北省武汉市常青花园1栋1单元312室70928号",
					price: "500.00"
				},{
					name: "大藏小玩",
					title: "仿宋代明月石",
					id: 102214,
					status: "待付款",
					url: '/static/HM-PersonalCenter/order_prod_thumb_pic.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12:13",
					address: "湖北省武汉市常青花园1栋1单元312室70928号",
					price: "500.00"
				},{
					name: "大藏小玩",
					title: "仿宋代明月石",
					id: 102215,
					status: "待收货",
					url: '/static/HM-PersonalCenter/order_prod_thumb_pic.png',
					orderNum: "201856464646644",
					orderTime: "2018-12-04 12:16",
					address: "湖北省武汉市常青花园1栋1单元312室70928号",
					price: "500.00"
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
		background-color:#f0f0f0;
		.tabs{
			width: 100%;
			height: 80upx;
			position: fixed;
			/* #ifdef H5 */
			top: 80upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 80upx);
			/* #endif */
			z-index: 1000;
			background-color: #fff;
			.segmented-control{
				width: 100%;
				height: 100%;
			}
			
			.segmented-control /deep/ .segmented-control-item.text{
				line-height:80upx;
				text-align:center;
				position:relative;
			}
			
			.segmented-control /deep/ .segmented-control-item.text:after{
				content: ' ';
				display:inline-block;
				height:6upx;
				width:40%;
				background-color:#fff;
				position:absolute;
				bottom:-6upx;
				left:0;
				z-index:10000;
			}
			
			.segmented-control /deep/ .segmented-control-item.text:before{
				content: ' ';
				display:inline-block;
				height:6upx;
				width:40%;
				background-color:#fff;
				position:absolute;
				bottom:-6upx;
				right:0;
				z-index:10000;
			}
		}
		.content{
			/* #ifdef H5 */
			padding-top: 80upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			padding-top: calc(var(--status-bar-height) + 80upx); 
			/* #endif */	
			.order-item{
				background-color:#fff;
				width: 100%;
				border: 1px solid #eee;
				padding: 0 30upx;
				box-sizing: border-box;
				margin-top:16upx;
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
