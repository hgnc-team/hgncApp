<template>
	<view class="orderListPage">
		<view class="tabs">
			<uni-segmented-control :current="tabs.current" :values="tabs.items" v-on:clickItem="changeTabs" :styleType="tabs.styleType" :activeColor="tabs.activeColor"></uni-segmented-control>
		</view>
		<!-- 列表内容 -->
		<view class="order-list">
			<view class="order-list-item" v-for="(item, index) in orderList" :key="index" >
				<view class="title-wrap uni-flex" @tap="toOrderDetail(item.id)">
					<view class="iconfont icondianpu uni-inline-item"></view>
					<view class="title uni-h5 uni-flex-item">
						<view class="">
							{{item.name}}
						</view>
					</view>
					<view class="status uni-inline-item">
						{{item.status | traslateStatus}}
					</view>
				</view>
				<view class="order-info uni-flex" @tap="toOrderDetail(item.id)">
					<view class="image uni-inline-item" >
						<image :src="item.url" mode="aspectFit"></image>
					</view>
					<view class="info uni-flex-item">
						<view class="name uni-h5">
							<text style="color:#242424;font-weight:bold;">{{item.title}}</text><text style="color:#aaa;font-size:20upx;margin-left:10upx;">X1</text>
							<view class="total-price">
								￥<text>{{item.price}}</text>
							</view>
						</view>
						<view class="code uni-text-small text-color-gray uni-column uni-flex">
							<text>订单编号: {{item.orderNum}}</text>
							<text>订单时间: {{item.orderTime}}</text>
							<text style="line-height:1.4">送货地址: {{item.address}}</text>
						</view>
					</view>
				</view>
				<view class="btn" style="text-align: right;line-height:1;padding:30upx 0;margin-top:14upx;" @tap="toGoodsDetail(item.goodsId)">
					<button type="primary" size="mini" style="border:1upx solid #c6c6c6;color:#242424;background-color:#fff;border-radius:0;font-weight:bold;">再来一单</button>
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
	import _ from "lodash";
	import service from '../../common/service.js';
	import util from "../../common/util.js";
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
					status: 0,
					title: "防宋代明月石",
					num: 1,
					price: 555.55,
					orderCode: "12323423454566546",
					orderTime: "2019-01-01 12:05:09"
				},{
					name: "大藏小玩",
					status: 1,
					title: "防宋代明月石",
					num: 16,
					price: 555.55,
					orderCode: "12323423454566546",
					orderTime: "2019-01-01 12:05:09"
				},{
					name: "大藏小玩",
					status: 2,
					title: "防宋代明月石",
					num: 10,
					price: 555.55,
					orderCode: "12323423454566546",
					orderTime: "2019-01-01 12:05:09"
				},{
					name: "大藏小玩",
					status: 2,
					title: "防宋代明月石",
					num: 11,
					price: 555.55,
					orderCode: "12323423454566546",
					orderTime: "2019-01-01 12:05:09"
				}],
				page: 1
			}
		},
		computed:{
			noData(){
				return this.orderList.length === 0;
			}
		},
		onReachBottom() {
			console.log(11111)
			uni.showToast({title: '触发上拉加载'});
		},
		filters:{
			traslateStatus(value){
				let status = "";
				switch (value){
					case "0":
						// 全部
						status = "待付款";
						break;
					case "1":
						// 待付款
						status = "待发货";
						break;
					case "2":
						// 待发货
						status = "待收货";
						break;
					case "d":
						// 待收货
						status = "已完成";
						break;
					case "c":
						// 已完成
						status = "已取消";
						break;
					case "n":
						// 已完成
						status = "退款中";
						break;
					case "a":
						// 已完成
						status = "已退款";
						break;
					default:
						break;
				}
				return status;
			}
		},
		methods: {
			initData(id){
				service.getGoodsDetail().then();
			},
			// 获取订单列表
			getOrderList(status){
				let params = {
					status: status,
					page: this.page,
					pageSize: 10,
				}
				uni.showLoading();
				service.getOrderList(params).then(res=>{
					uni.hideLoading();
					let data = res.data.data.data;
					console.log(data);
					if(data.length > 0) {
						// 拼接图片链接
						_.forEach(data, item => {
							item.imageUrl = util.setImageUrl({
								type: "goods",
								goodId: item.goodsId,
								imageName: item.imageUrl
							})
						})
						this.orderList = this.orderList.concat(data);
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title: (err.data && err.data.data) || err.errMsg
					})
				})
			},
			// 切换选项卡
			changeTabs(index) {
				if (this.tabs.current !== index) {
					this.tabs.current = index;
					this.page = 1;
					let status = this.switchStatus(this.tabs.current);
					this.getOrderList(status);
				}
			},
			// 订单详情
			toOrderDetail(id){
				uni.navigateTo({
					url: `/pages/mine/order_detail?id=${id}`
				})
			},
			// 商品详情
			toGoodsDetail(){
				uni.navigateTo({
					url: "/pages/home/goods_detail"
				})
			},
			// 转化status
			switchStatus(index){
// 				status订单状态  后台枚举范围 ：
				// 不传时查询所有订单
// 				"0"为待付款，
// 				"1"为已付款待发货，
// 				"2"为已发货待收货，
// 				"d"为确认收货已完成(done)交易成功状态
// 				"c"为未付款订单已取消(cancel)状态,
// 				"n"为已付款订单取消未退款状态
// 				"a"为已付款订单取消已退款状态
// 				其中流程已结束的订单状态为 d,c,a
				let status = "";
				switch (index){
					case 0:
						// 全部
						status = "";
						break;
					case 1:
						// 待付款
						status = "0";
						break;
					case 2:
						// 待发货
						status = "1";
						break;
					case 3:
						// 待收货
						status = "2";
						break;
					case 4:
						// 已完成
						status = "d";
						break;
					default:
						break;
				}
				return status;
			}
			
		},
		onLoad(e) {
			console.log(e)
			// this.initData(e.id);
			this.tabs.current = e.index - 0;
			// 初始化页面数据
			let status = this.switchStatus(this.tabs.current);
			this.getOrderList(status);
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
					height: 74upx;
					border-bottom: 1upx solid #f0f0f0;		
					.title{
						line-height: 74upx;
					}
					.status{
						width: 100upx;
					}
				}
				.order-info{
					.image{
						width: 184upx;
						height: 184upx;
						margin-top:30upx;
						margin-right: 20upx;
						
						image{
							width: 100%;
							height: 100%;
						}
					}
					
					.info{
						margin-top:18upx;
						.name{
							// 合计的价格
							.total-price{
								float:right;
								font-weight:bold;
								color:#1c5ef0;
							}
						}
					}
				}
			}
		}
	}
</style>
