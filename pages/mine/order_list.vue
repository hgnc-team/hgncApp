<template>
	<view class="orderListPage">
		<view class="tabs uni-flex">
			<view class="tab uni-flex-item flex-center-center" :class="{active: index === tabs.current}" v-for="(item, index) in tabs.items"
			 :key="index" @tap="changeTabs(index)">
				<view class="name">
					{{item}}
				</view>
				<view class="line-bottom"></view>
			</view>
		</view>
		<!-- 列表内容 -->
		<view class="order-list">
			<block v-if="!hasNoData">
				<view class="order-list-item" v-for="(item, index) in orderList" :key="index">
					<view class="title-wrap uni-flex" @tap="toOrderDetail(item.id)">
						<view class="iconfont icondianpu uni-inline-item">

						</view>
						<view class="title uni-h5 uni-flex-item">
							<!-- <view class="">
								{{item.detail}}
							</view> -->
						</view>
						<view class="status uni-inline-item">
							{{item.statusText}}
						</view>
					</view>
					<view class="order-info uni-flex" @tap="toOrderDetail(item.id)">
						<view class="image uni-inline-item">
							<image :src="item.imageUrl" mode="aspectFit"></image>
						</view>
						<view class="info uni-flex-item uni-flex uni-column">
							<view class="name uni-h5 uni-flex-item uni-flex">
								<text class="title uni-flex-item">{{item.title}}</text>
								<text class="num uni-inline-item">X{{item.num}}</text>
								<view class="total-price uni-inline-item">
									￥{{item.price}}
								</view>
							</view>
							<view class="code uni-flex-item uni-text-small text-color-gray uni-column uni-flex">
								<text>订单编号: {{item.id}}</text>
								<text>订单时间: {{item.orderCreateTime}}</text>
								<text style="line-height:1.4">送货地址: {{item.address}}</text>
							</view>
						</view>
					</view>
					<!-- 订单可操作按钮 -->
					<view class="btn">
						<!-- 再来一单 -->
						<button type="primary" class="hasBuyAgainBtn" v-if="item.hasBuyAgainBtn" size="mini" @tap="toGoodsDetail(item.id)">再来一单</button>
						<!-- 确认收货 -->
						<button type="primary" class="hasReceiptBtn" v-if="item.hasReceiptBtn"  size="mini" @tap="confirmHarvest(item, index)">确认收货</button>
						<!-- 去付款 -->
						<button type="primary" class="toPayBtn" v-if="item.toPayBtn" size="mini" @tap="toPay(item)">去付款</button>
						<!-- 删除 -->
						<button type="primary" class="hasDeleteBtn" v-if="item.hasDeleteBtn" size="mini" @tap="deleteOrder(item, index)">删除</button>
						<!-- 关闭 -->
						<button type="primary" class="hasCloseBtn" v-if="item.hasCloseBtn" size="mini" @tap="closeOrder(item, index)">关闭</button>
					</view>

				</view>
			</block>
			<!-- 暂无数据 -->
			<block v-if="hasNoData">
				<noData :text="noDataText"></noData>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		uniTag,
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import _ from "lodash";
	import service from '../../common/service.js';
	import util from "../../common/util.js";
	import noData from "../../components/common/no-data.vue";
	import moment from "moment"
	import {
		mapMutations
	} from 'vuex';

	export default {
		components: {
			uniTag,
			noData
		},
		data() {
			return {
				tabs: {
					// 选项卡
					items: ['全部', '待付款', '待发货', '待收货', '已完成'],
					current: 0,
				},
				orderList: [],
				// 状态查询字段
				statusParam: "",
				page: 1,
				noDataText: "暂无订单相关数据"
			}
		},
		computed: {
			hasNoData() {
				return this.orderList.length === 0;
			}
		},
		onReachBottom() {
			// 加载更多
			this.page++;
			this.getOrderList(this.statusParam);
		},
		methods: {
			...mapMutations(['INIT_ORDER_lIST']),
			// initData(id){
			// 	service.getGoodsDetail().then();
			// },
			// 获取订单列表
			getOrderList(status) {
				let params = {
					status: status,
					page: this.page,
					pageSize: 10,
				}
				uni.showLoading();
				service.getOrderList(params).then(res => {
					uni.hideLoading();
					let data = res.data.data.data;
					if (data.length > 0) {
						_.forEach(data, item => {							
							// 处理订单时间
							item.orderCreateTime = moment(item.createTime).format("YYYY年MM月DD日 HH:MM:SS");
							// 判断订单是否过期,订单创建后半小时过期
							item.isExpire = moment().isAfter(moment(item.createTime).add(30, 'm'));
							// 收货地址怕拼接
							item.address = `${item.province||''}${item.city||''}${item.region||''}${item.detail||''}`;
							// 转换订单状态
							item.statusText = this.traslateStatus(item, "TO-TEXT");
							// 待收获状态，有确认收货按钮（一键结束流程）
							item.hasReceiptBtn = item.status === 2 ? true : false;
							// 是否有删除按钮，已完成的订单可以删除
							item.hasDeleteBtn = (item.status === '0' && item.isExpire) || item.status === 'a' || item.status === 'c' || item.status === 'd';
							// 是否有关闭按钮，已完成的订单可以删除
							item.hasCloseBtn = item.status === '0' && !item.isExpire  ? true : false;
							// 是否有再来一单按钮
							item.hasBuyAgainBtn = item.status === 'a' || item.status === 'c' || item.status === 'd';
							// 是否有去付款
							item.toPayBtn = item.status === '0' && !item.isExpire  ? true : false;

						})
						this.orderList = this.orderList.concat(data);
					} else {
						this.page--
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg
					})
				})
			},
			// 切换选项卡
			changeTabs(index) {
				if (this.tabs.current !== index) {
					this.tabs.current = index;
					// 初始化查询条件
					this.page = 1;
					this.statusParam = this.traslateStatus(this.tabs.current);
					this.orderList = [];

					this.getOrderList(this.statusParam);
				}
			},
			// 订单详情
			toOrderDetail(id) {
				uni.navigateTo({
					url: `/pages/mine/order_detail?id=${id}`
				})
			},
			// 商品详情
			toGoodsDetail() {
				uni.navigateTo({
					url: "/pages/home/goods_detail"
				})
			},
			// 确认收货
			confirmHarvest(order, index) {
				util.confirm({
					title: '',
					content: '是否确认收货',
					success: () => {
						uni.showLoading();
						service.receivedOrder({orderId: order.id}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "收货成功"
							})							
							let item = Object.assign({}, this.orderList[index]);
							item.statusText = "已收货";;
						this.$set(this.orderList, index, item)
						}).catch(err => {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: err.errMsg
							})
						})
					}
				})
			},
			// 去付款
			toPay(data) {
				// 同步vuex  
				let good = {
					goodsId: data.goodsId,
					title: data.title,
					imageUrl: data.imageUrl,
					standardId: data.id,
					standardText: data.detail,
					num: data.num,
					prie: data.price
				}
				this.INIT_ORDER_lIST([good]);
				uni.navigateTo({
					url: `/pages/shopCart/order_pay?hadOrderId=true`
				});
			},
			// 删除订单
			deleteOrder(order, index){
				util.confirm({
					title: '',
					content: '是否删除订单',
					success: () => {
						uni.showLoading();
						service.deleteOrder({orderId: order.id}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "删除成功"
							})	
							// 手动删除并刷新列表
							this.orderList = _.remove(this.orderList, (item, i) => index !== i);
						}).catch(err => {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: err.errMsg
							})
						})
					}
				})
			},
			// 关闭订单
			closeOrder(order, index){
				util.confirm({
					title: '',
					content: '是否关闭订单',
					success: () => {
						uni.showLoading();
						service.receivedOrder({orderId: order.id}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "关闭成功"
							})							
							let item = Object.assign({}, this.orderList[index]);
							item.statusText = "已关闭";;
						this.$set(this.orderList, index, item)
						}).catch(err => {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: err.errMsg
							})
						})
					}
				})
			},
			// 转化status为对应的文字
			// value-需要转化的值；mode-转化模式：TO-TEXT:状态码转文字，TO-PARAM: tab下标转为查询参数
			traslateStatus(value, mode) {
				// status订单状态  后台枚举范围 ：
				// 不传时查询所有订单
				// 				"0"为待付款，
				// 				"1"为已付款待发货，
				// 				"2"为已发货待收货，
				// 				"d"为确认收货已完成(done)交易成功状态
				// 				"c"为未付款订单已取消(cancel)状态,
				// 				"n"为已付款订单取消未退款状态
				// 				"a"为已付款订单取消已退款状态
				// 				其中流程已结束的订单状态为 d,c,a
				let tValue = "";
				if (mode === "TO-PARAM" || !mode) {
					switch (value) {
						case 0:
							// 全部
							tValue = "";
							break;
						case 1:
							// 待付款
							tValue = "0";
							break;
						case 2:
							// 待发货
							tValue = "1";
							break;
						case 3:
							// 待收货
							tValue = "2";
							break;
						case 4:
							// 已完成
							tValue = "d";
							break;
						default:
							break;
					}
				} else {
					switch (value.status) {
						case "0":
							tValue = value.isExpire ? "已失效" : "待付款";
							break;
						case "1":
							tValue = "待发货";
							break;
						case "2":
							tValue = "待收货";
							break;
						case "d":
							tValue = "已完成";
							break;
						case "c":
							tValue = "已取消";
							break;
						case "n":
							tValue = "退款中";
							break;
						case "a":
							tValue = "已退款";
							break;
						default:
							break;
					}
				}
				return tValue;
			}
		},
		onLoad(e) {
			// 获取页面传参 - 当前tab
			this.tabs.current = e.index - 0;
			// 初始化状态字段
			this.statusParam = this.traslateStatus(this.tabs.current);
			// 初始化页面数据
			this.getOrderList(this.statusParam);
		},

	}
</script>

<style lang="scss">
	.orderListPage {
		background-color: #f0f0f0;

		.tabs {
			width: 100%;
			height: 80upx;
			position: fixed;
			/* #ifdef H5 */
			top: 80upx;
			/* #endif */
			z-index: 1000;
			background-color: #fff;
			color: #999;
			border-bottom: 1upx solid #f0f0f0;

			.tab {
				position: relative;

				&.active {
					color: #242424;

					.line-bottom {
						width: 20upx;
						height: 6upx;
						background-color: #242424;
						position: absolute;
						bottom: 1upx;
						left: 50%;
						transform: translateX(-10upx);
					}
				}
			}
		}

		.order-list {
			/* #ifdef H5 */
			padding-top: 80upx;
			/* #endif */
			/*  #ifdef  APP-PLUS  */
			padding-top: calc(var(--status-bar-height) + 30upx);

			/* #endif */
			.order-list-item {
				background-color: #fff;
				width: 100%;
				border: 1px solid #eee;
				padding: 0 30upx;
				box-sizing: border-box;
				margin-top: 16upx;

				.title-wrap {
					width: 100%;
					height: 74upx;
					border-bottom: 1upx solid #f0f0f0;

					.title {
						line-height: 74upx;
					}

					.status {
						width: 100upx;
					}
				}

				.order-info {
					.image {
						width: 184upx;
						height: 184upx;
						margin-top: 30upx;
						margin-right: 20upx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						margin-top: 18upx;
						display: flex;
						.name {
							.title {
								color:#242424;
								font-weight:bold;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								line-clamp: 2;
								-webkit-box-orient: vertical;
								/deep/ span{
									    overflow: hidden;
										-o-text-overflow: ellipsis;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										line-clamp: 2;
										-webkit-box-orient: vertical;
								}
							}
							.num{
								color:#aaa;
								font-size:20upx;
								margin:0upx 20upx;
							}
							// 合计的价格
							.total-price {
								font-weight: bold;
								color: #1c5ef0;
							}
						}
					}
				}

				.btn {
					text-align: right;
					line-height: 1;
					padding: 30upx 0;
					margin-top: 14upx;
					
					button {
						border: 1upx solid #c6c6c6;
						color: #242424;
						background-color: #fff;
						border-radius: 0;
						font-weight: bold;
						margin: 10upx;
						&::after {
							border-radius: 0;
						}
					}
					.hasBuyAgainBtn, .hasBuyAgainBtn, .hasBuyAgainBtn{
						color: #1c5ef0;
					}
					.hasDeleteBtn, .hasCloseBtn{
						color: #f44837;
					}
				}
			}
		}
	}
</style>
