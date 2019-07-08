<template>
	<view class="nearby-orderDetail-page">
		<uni-notice-bar show-close="true" show-icon="true" scrollable="true" single="true" :text="notice">
		</uni-notice-bar>

		<view class="order-list">
			<!-- 店铺名称，订单状态 -->
			<view class="title-wrap uni-flex bg-white padding-30-lr" @tap="toShopIndex(shopId)">
				<view class="iconfont icondianpu uni-inline-item"></view>
				<view class="title uni-h5 uni-flex-item uni-flex">

				</view>
				<view class="order-status uni-inline-item text-color-gray">
					{{orderDetail.orderStatus}}
				</view>
			</view>

			<!-- 商品信息 -->
			<view class="goods-info bg-white padding-30-lr uni-flex">
				<view class="image uni-inline-item">
					<image :src="orderDetail.imageUrl" mode="aspectFit"></image>
				</view>
				<view class="info uni-flex-item uni-flex uni-column">
					<view class="title-box uni-h5 uni-flex uni-row">
						<view class="title uni-flex-item">
							{{orderDetail.title}}
							<text class="num">X{{orderDetail.num}}</text>
						</view>

						<view class="uni-inline-item total-price text-price uni-bold">
							<text>￥{{orderDetail.price}}</text>
						</view>
					</view>

					<!-- 订单可操作按钮 -->
					<view class="btn">
						<!-- 再来一单 -->
						<button type="primary" class="hasBuyAgainBtn" v-if="orderDetail.hasBuyAgainBtn" size="mini" @tap="toGoodsDetail(orderDetail.goodsId)">再来一单</button>
						<!-- 确认收货 -->
						<button type="primary" class="hasReceiptBtn" v-if="orderDetail.hasReceiptBtn" size="mini" @tap="confirmHarvest(orderDetail)">确认收货</button>
						<!-- 去付款 -->
						<button type="primary" class="toPayBtn" v-if="orderDetail.toPayBtn" size="mini" @tap="toPay(orderDetail)">去付款</button>
						<!-- 删除 -->
						<button type="primary" class="hasDeleteBtn" v-if="orderDetail.hasDeleteBtn" size="mini" @tap="deleteOrder(orderDetail)">删除</button>
						<!-- 关闭 -->
						<button type="primary" class="hasCloseBtn" v-if="orderDetail.hasCloseBtn" size="mini" @tap="closeOrder(orderDetail)">关闭</button>
					</view>

				</view>

			</view>

			<!-- 订单信息 -->
			<view class="order-info bg-white padding-30-lr">
				<view class="order-info-item uni-column uni-flex">
					<text>订单编号：{{orderDetail.id}}</text>
					<text>订单时间：{{orderDetail.orderCreateTime}}</text>
				</view>
				<view class="order-info-item uni-column uni-flex">
					<text>收件人：{{orderDetail.receiver}}</text>
					<text>收获地址：{{orderDetail.address}}</text>
				</view>
				<view class="order-info-item  uni-column uni-flex" v-if="orderDetail.payType">
					<text>支付方式：{{orderDetail.payType}}</text>
					<text>支付时间：{{orderDetail.payTime}}</text>
				</view>
				<view class="order-info-item uni-flex">
					<text class="uni-flex-item">
						商品总额：
					</text>
					<text class="uni-flex-item" style="text-align: right;">￥{{orderDetail.totalPrice}}</text>
				</view>
			</view>
		</view>

		<!-- 底部实付款 -->
		<view class="footer padding-30-lr">
			实付款：<view class="text-price uni-bold" style="display: inline-block;">￥{{orderDetail.actualPayment}}</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniNoticeBar
	} from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	import util from "../../common/util.js";
	import moment from "moment";
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniIcon,
			uniNoticeBar
		},
		data() {
			return {
				// 订单详情
				orderDetail: {},
				// 提示
				notice: "为了您的财产安全，不要点击陌生连接，不要向任何人透露银行卡或验证码信息，谨防诈骗！",
			}
		},
		computed: {

		},
		methods: {
			...mapMutations(['INIT_ORDER_lIST']),
			init() {

				this.getOrderDetail();
			},
			// 获取订单信息
			getOrderDetail() {
				let params = {
					ids: [this.orderId],
				}
				uni.showLoading();
				service.getOrderDetail(params).then(res => {
					uni.hideLoading();
					let data = res.data.data;
					console.log(data)
					if (data.length > 0) {
						this.orderDetail = data[0];
						// 判断订单是否过期,订单创建后半小时过期
						this.orderDetail.isExpire = moment().isAfter(moment(this.orderDetail.createTime).add(30, 'm'));
						// 订单地址拼接
						this.orderDetail.address =
							`${this.orderDetail.province||''}${this.orderDetail.city||''}${this.orderDetail.region||''}${this.orderDetail.detail||''}`;
						// 订单状态转换
						this.orderDetail.orderStatus = this.traslateStatus(this.orderDetail);
						// 订单创建时间
						this.orderDetail.orderCreateTime = moment(this.orderDetail.createTime).format("YYYY年MM月DD日 HH:MM:SS");
						// 支付方式
						this.orderDetail.payType = this.orderDetail.payType ? "支付宝" : "";
						// 支付时间
						this.orderDetail.payTime = moment(this.payTime).format("YYYY年MM月DD日 HH:MM:SS");
						// 订单总价
						this.orderDetail.totalPrice = util.calc.Mul(this.orderDetail.price, this.orderDetail.num);
						// 实际支付
						this.orderDetail.actualPayment = this.orderDetail.totalPrice;
						// 待收获状态，有确认收货按钮（一键结束流程）
						this.orderDetail.hasReceiptBtn = this.orderDetail.status === 2 ? true : false;
						// 是否有删除按钮，已完成的订单可以删除
						this.orderDetail.hasDeleteBtn = (this.orderDetail.status === '0' && this.orderDetail.isExpire) || this.orderDetail
							.status === 'a' || this.orderDetail.status === 'c' || this.orderDetail.status === 'd';
						// 是否有关闭按钮，已完成的订单可以删除
						this.orderDetail.hasCloseBtn = this.orderDetail.status === '0' && !this.orderDetail.isExpire ? true : false;
						// 是否有再来一单按钮
						this.orderDetail.hasBuyAgainBtn = this.orderDetail.status === 'a' || this.orderDetail.status === 'c' || this.orderDetail
							.status === 'd';
						// 是否有去付款
						this.orderDetail.toPayBtn = this.orderDetail.status === '0' && !this.orderDetail.isExpire ? true : false;
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg
					})
				})
			},
			// 店铺首页
			toShopIndex(id) {
				// uni.navigateTo({
				// 	url: `/pages/nearby/shop_index?id=${id}`
				// })
			},
			// 去产品详情页面
			toGoodsDetail(id) {
				uni.navigateTo({
					url: `/pages/nearby/goods_detail?id=${id}`
				})
			},
			// 确认收货
			confirmHarvest(order) {
				util.confirm({
					title: '',
					content: '是否确认收货',
					success: () => {
						uni.showLoading();
						service.receivedOrder({
							orderId: order.id
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "收货成功"
							})
							this.orderDetail.orderStatus = "已收货";
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
			deleteOrder(order) {
				util.confirm({
					title: '',
					content: '是否删除订单',
					success: () => {
						uni.showLoading();
						service.deleteOrder({
							orderId: order.id
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "删除成功"
							})
							this.refreshListPage();
							uni.navigateBack();
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
			closeOrder(order) {
				util.confirm({
					title: '',
					content: '是否关闭订单',
					success: () => {
						uni.showLoading();
						service.receivedOrder({
							orderId: order.id
						}).then(res => {
							uni.hideLoading();
							uni.showToast({
								title: "关闭成功"
							})
							this.orderDetail.statusText = "已关闭";
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
			// 需要转化的值
			traslateStatus(value) {
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
				return tValue;
			},
			// 设置列表页面让其刷新
			refreshListPage() {
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					isDoRefresh: true
				})
			}
		},
		onLoad(e) {
			this.orderId = e.id;
			this.init();
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f0f0;
	}

	.nearby-orderDetail-page {
		.bg-white {
			background-color: #fff;
		}

		.padding-30-lr {
			padding: 0 30upx;
			box-sizing: border-box;
		}

		.order-list {
			margin-top: 16upx;

			.title-wrap {
				border-bottom: 1upx solid #f0f0f0;

				.title {
					margin-left: 20upx;

					.name {
						margin-right: 10upx;
					}
				}
			}

			.goods-info {
				padding: 30upx;
				position: relative;

				.name {
					width: 100%;
					height: 40upx;
				}

				.image {
					width: 184upx;
					height: 184upx;
					border-radius: 6upx;
					margin-right: 20upx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 6upx;
					}
				}

				.info {
					display: flex;
					flex-direction: column;

					.title-box {
						.title {
							font-weight: 600;

							.num {
								font-size: 22upx;
								font-weight: 100;
								margin-left: 10upx;
								color: #777;
							}
						}

						.total-price {
							text-align: right;
							align-items: baseline;
							font-weight: bold;
						}
					}

					.tags {
						flex: 1;
						padding-top: 10upx;
						box-sizing: border-box;
					}
				}

				.btn {
					text-align: right;
					line-height: 1;
					padding: 30upx 0;
					margin-top: 14upx;

					button {
						color: #242424;
						background-color: #fff;
						font-weight: bold;
						margin: 10upx;
						border-radius: 4upx;
						box-shadow: 1upx 1upx 1upx 1upx #eee;
						&::after {
							border-radius: 0;
						}
					}

					.hasBuyAgainBtn,
					.hasBuyAgainBtn,
					.hasBuyAgainBtn {
						color: #1c5ef0;
					}

					.hasDeleteBtn,
					.hasCloseBtn {
						color: #f44837;
					}
				}
			}

			.order-info {
				margin-top: 16upx;

				.order-info-item {
					width: 100%;
					padding: 24upx 0;
					border-bottom: 1upx solid #f0f0f0;

					&:nth-last-child(0) {
						border-bottom: none;
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			text-align: right;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
		}
	}
</style>
