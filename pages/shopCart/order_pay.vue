<template>
	<view class="payPage">
		<!-- 收货地址 -->
		<view class="address-wrap uni-flex uni-row" @tap="toAddress">
			<view class="icon-left uni-inline-item common-mr-20">
				<view class="iconfont iconicon_position_fill"></view>
			</view>
			<view class="default-address uni-inline-item">
				<!-- 有地址 -->
				<view class="info uni-h5 uni-bold" v-if="address">
					{{address.receiver}}&nbsp;&nbsp;{{address.phone}}
				</view>
				<view class="address-detail uni-text-small text-color-gray" v-if="address">
					{{address.province}} &nbsp;{{address.city}} &nbsp;{{address.region}} &nbsp;{{address.detail}}
				</view>
				<!-- 暂无地址 -->
				<view class="text-color-gray uni-flex-item flex-center-center" v-if="!address">
					暂无收货地址，请前往设置
				</view>
			</view>
			<view class="icon-right uni-inline-item">
				<uni-icon type="arrowright" color="#666"></uni-icon>
			</view>
		</view>
		<!-- <rain-color ref="rainColor" v-model="rainColor.value" :mode="rainColor.mode" :color="rainColor.colorArr" :w="rainColor.w" @click="addColor" /> -->
		<!-- 购买商品 -->
		<view class="goods-list"> 
			<view class="goods-item uni-flex uni-row" v-for="(item, index) in getOrderList" :key="index" :id="item.index">
				<view class="image uni-inline-item" @tap="toDetail(item.goodsId)">
					<image :src="item.imageUrl" mode="aspectFit"></image>
				</view>
				<view class="info uni-flex-item">
					<view class="title  uni-flex uni-column">
						<text class="uni-ellipsis">{{ item.title }}</text>
						<text class="text-color-gray uni-text-small">{{ item.standardText }}</text>
					</view>
					<view class="price uni-flex">
						<text class="text-price uni-flex-item">￥{{ item.price }}</text>
						<text class="uni-flex" style="align-items: flex-end;">x {{ item.num }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<!-- <view class=" discount uni-flex">
			<view class="title uni-inline-item">
				优惠券
			</view>
			<view class="uni-flex-item text-price" style="text-align: right;line-height: 88upx;">
				满99减10
			</view>
			<view class="icon-right uni-inline-item">
				<uni-icon type="arrowright" color="#666"></uni-icon>
			</view>
		</view> -->
		
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="order-info-item uni-flex">
				<view class="title uni-flex-item">
					发货方式
				</view>
				<view class="info uni-flex-item uni-flex">
					<view class="text-price uni-flex-item">
						￥0
					</view>
					<text class="uni-inline-item flex-right" style="width: 142upx;">(快递包邮)</text>
				</view>
			</view>
			<view class="order-info-item uni-flex">
				<view class="title uni-flex-item">
					订单总价
				</view>
				<view class="text-price info uni-flex-item">
					￥{{totalPrice}}
				</view>
			</view>
			<!-- <view class="order-info-item uni-flex">
				<view class="title uni-flex-item">
					活动优惠
				</view>
				<view class="uni-flex-item">
					-￥220
				</view>
			</view> -->
		</view>
		<!-- 支付方式 -->
		<view class="pay-type">
			<view class="pay-title uni-h5">
				支付方式
			</view>
			<radio-group @change="radioChange">
				<view class="pay-type-item uni-flex">
					<view class="title uni-flex uni-flex-item">
						<view class="uni-inline-item weixin_pay"></view>
						<view class="name uni-inline-item">
							微信支付
						</view>
					</view>
					<view class="uni-inline-item  uni-flex flex-right">
						<view class="checkbox uni-inline-item">
							<radio value="alipay" :checked="payType === 'alipay'" ></radio>
						</view>
					</view>
				</view>	
				<view class="pay-type-item uni-flex">
					<view class="title uni-flex uni-flex-item">
						<view class="iconfont iconicon_zhifubao uni-inline-item"></view>
						<view class="name uni-inline-item">
							支付宝支付
						</view>
					</view>
					<view class="uni-inline-item  uni-flex flex-right">
						<view class="checkbox uni-inline-item">
							<radio value="alipay" :checked="payType === 'alipay'" ></radio>
						</view>
					</view>
				</view>	
				<view class="pay-type-item uni-flex" :class="!isJfPayAvailable?'disabled':''">
					<view class="title uni-flex uni-flex-item">
						<view class="iconfont iconicon_integral uni-inline-item"></view>
						<view class="name uni-inline-item">
							积分支付（余额{{comPoint}}）
						</view>
					</view>
					<view class="uni-inline-item  uni-flex flex-right">
						<text class="uni-inline-item red" v-if="!isJfPayAvailable">余额不足</text>
						<view class="checkbox uni-inline-item">
							<radio value="jf" :checked="payType === 'jf'" :disabled="!isJfPayAvailable"></radio>
						</view>
					</view>
				</view>	
				<view class="pay-type-item uni-flex" :class="!isMbPayAvailable?'disabled':''">
					<view class="title uni-flex uni-flex-item">
						<view class="iconfont iconicon_m uni-inline-item"></view>
						<view class="name uni-inline-item">
							M币支付（余额{{gold}}）
						</view>
					</view>
					<view class="uni-inline-item  uni-flex flex-right">
						<text class="uni-inline-item red" v-if="!isMbPayAvailable">余额不足</text>
						<view class="checkbox uni-inline-item">
							<radio value="mb" :checked="payType === 'mb'"  :disabled="!isMbPayAvailable"></radio>
						</view>
					</view>
				</view>	
			</radio-group>
		</view>
		
		<view class="footer uni-flex">
			<view class="total uni-flex-item flex-center-center">
				<text>共计：</text>
				<text class="text-price">{{totalPrice}} {{ unit }}</text>
			</view>
			<view class="buy  uni-flex-item flex-center-center" @tap="creatOrder">
				去付款
			</view>
		</view>
		
	</view>
</template>
<script>
	import { uniIcon } from '@dcloudio/uni-ui';
	import { mapState, mapMutations, mapGetters} from 'vuex';
	import service from '../../common/service.js';
	import util from '../../common/util.js';
	// import rainColor from "../../components/common/rain-color.vue"
	export default {
		components: {
			uniIcon,
			// rainColor
		},
		data(){
			return {
				// 支付方式
				payType: "alipay",
				// 货币单位
				unit: '元',
				// 轮询计时器
				timer: null,
				pollingTimes: 0
			}
		},
		destroyed() {
			clearInterval(this.timer);
		},
		computed: {
			// 注入vuex的计算方法
			...mapState(["userId", "comPoint", "gold"]),
			...mapGetters(["getAddressList", "getOrderList"]),
			// 默认地址
			address(){
				return this.getAddressList.length > 0 ? this.getAddressList[0] : null
			},
			totalPrice(){
				let total = 0;
				_.forEach(this.getOrderList, item => {
					total += util.calc.Mul(item.price, item.num)
				})
				return total
			},
			// 积分是否可用
			isJfPayAvailable() {
				return this.comPoint >= this.totalPrice; 
			},
			// M币是否可用
			isMbPayAvailable() {
				return this.gold >= this.totalPrice; 
			}			
		},
		methods: {
			// 去地址管理页面
			toAddress(){
				uni.navigateTo({
					url: "/pages/mine/address_management"
				})
			},
			// 跳转商品详情
			toDetail(id){
				// uni.navigateTo({
				// 	url: `/pages/home/goods_detail?${id}`
				// })
			},
			// 选择付款方式
			radioChange(evt) {
				this.payType = evt.detail.value;
				if (this.payType === 'alipay') {
					this.unit = '元'
				} else if (this.payType === 'jf') {
					this.unit = '分'
				} else if (this.payType === 'mb') {
					this.unit = 'M币'
				}
				console.log(evt)
			},
			// 创建订单
			creatOrder(){
				// 支付宝支付不用检验二级密码
				if(this.payType !== "alipay" && !this.$store.state.isCheckPassword) {
					this.toSecond();
					return 
				} 
				let goods = [];
				_.forEach(this.getOrderList, item => {
					goods.push({
						goodsId: item.goodsId,
						num: item.num,
						price: item.price,
						detail: item.standardText,
						imageUrl: item.imageUrl,
						storeId: item.storeId
					})
				})
				let params = {
					goods: goods,
					addressId: this.address.id
				}
				uni.showLoading();
				service.createOrder(params).then(res=>{
					// console.log(JSON.stringify(res));
					if (res.data.status === 200) {
						uni.hideLoading();
						// 去支付
						this.toPay(res.data.data);
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title: err.errMsg
					})
				})
			},
			// 支付
			toPay(data){
				// 支付流程
				if(this.payType === "alipay") {
					// 支付宝支付
					// uni.showToast({
					// 	title: "支付宝支付"
					// })
					this.alipay(data);
				} else if (this.payType === "jf") {
					// 支付宝支付
					// uni.showToast({
					// 	title: "积分支付"
					// })
					this.jfPay(data);
				} else {
					// 支付宝支付
					// uni.showToast({
					// 	title: "Mb支付宝支付"
					// })
					this.mbPay(data);
				}
			},
			// 支付宝支付
			alipay(data){
				service.doSecretInAlipay(data.orderId)
				.then(res => {
					if (res.data.status === 200) {
						// 然后调用api，吊起支付宝支付
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.data.data.secret, //订单数据
							success: function(res) {
								// console.log("----支付宝成功返回----")
								// console.log(JSON.stringify(data))
								// console.log('success:' + JSON.stringify(res));
								// this.callbackAfterPay(data);
								this.timer = setInterval(() => {
									if (this.pollingTimes >= 10) {
										clearInterval(this.timer);
										this.toResult(data.orderId, false);
										return;
									}
									this.pollingTimes ++;
									service.getOrderDetail({ids:[data.orderId]})
									.then(res => {
										// 支付成功跳转到支付成功页面
										// console.log(JSON.stringify(res));
										if (res.data.status === 200) {
											if (res.data.data.length > 0 && res.data.data[0].status === '1') {
												clearInterval(this.timer);
												this.toResult(data.orderId, true);
											}
										} else {
											clearInterval(this.timer);
											this.toResult(data.orderId, false);
										}
									});
								}, 1000);
							}.bind(this),
							fail: function(err) {
							// 	uni.showToast({
							// 		icon: "none",
							// 		title:  err.errMsg || err.data.data,
							// })
							// this.toResult(data.orderId, false);
							console.log("----支付宝失败返回-----")
							console.log(JSON.stringify(data))
							console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				})
			},
			// 积分支付
			jfPay(orderId){
				// 调用支付流程
					
				// 去结果页
				this.toResult(orderId);
			},
			// M币支付
			mbPay(orderId){
				// 调用支付流程
					
				// 去结果页
				this.toResult(orderId);
			},
			// 支付成功了回调，这个接口是支付宝去调用的，不用客户端调用
			callbackAfterPay(){
				let parms = {
					orderId: data.orderId,
					payment: this.payType
				}
				uni.showLoading();
				service.callbackAfterPay().then(res=>{
					uni.hideLoading();
					const data = res.data.data;
					
				}).catch(err=>{
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg,
					})
				})
			},
			// 去二级密码页面
			toSecond(){
				uni.navigateTo({
					url: "/pages/mine/gesture_lock?mode=check"
				})
			},
			// 支付结果
			toResult(orderId, isSuccess) {
				let payStatus = isSuccess ? "success" : "fail";
				uni.showToast({
					title: isSuccess ? "支付成功" : "支付失败",
					icon: isSuccess ? "success" : "",
					duration: 2000,
					complete: () => {
						uni.reLaunch({
							url: `/pages/shopCart/order_result?payStatus=${payStatus}&orderId=${orderId}`
						});
					}
				});
			}
		},
		onLoad(data) {
			console.log(JSON.stringify(data))
			this.init();
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
	}
	.payPage{
		width: 100%;
		.address-wrap{
			width: 100%;
			height: 180upx;
			padding: 30upx 20upx; 
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 30upx;
			.icon-left{
				width: 40upx;
			}
			.default-address{
				flex: 1 1 0%;
				display: flex;
				flex-direction: column !important;
				align-items: flex-start !important;
			}
			.icon-right{
				width: 96upx;
				// justify-content: end;
				flex-direction: row-reverse;
			}
		}
		.goods-list{
			width: 100%;
			background-color:  #fff;
			padding: 30upx;
			box-sizing: border-box;
			margin-bottom: 30upx;
			.goods-item{
				margin-bottom: 10upx;
				border-bottom: 1upx solid #f0f0f0;
				padding: 10upx 30upx;
				margin: 0 -30upx;
				box-sizing: border-box;
				.image {
					width: 130upx;
					height: 130upx;
					margin-right: 30upx;
					flex-shrink: 0;
					image {
						display: block;
						width: 100%;
						height: 100%;
						background-color: #f0f0f0;
					}
				}
				.info{
					width: calc(100% - 180upx);
					.price{
						justify-content: space-between;
					}
				}
			}
			
		}
		.discount{
			width: 100%;
			height: 88upx;
			background-color: #fff;
			margin-bottom: 30upx;
			padding: 0 10upx 0 30upx;
			box-sizing: border-box;
		}
		.order-info{
			width: 100%;
			padding: 30upx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 30upx;
			.order-info-item{
				.title{
					color: #666;
				}
				.info{
					text-align: right
				}
			}
		}
		.pay-type{
			width: 100%;
			background-color: #fff;
			margin-bottom: 130upx;
			.pay-title{
				width: 100%;
				height: 84upx;
				line-height: 84upx;
				border: 1upx solid #f0f0f0;
				text-indent: 30upx;
				color: #666;
			}
			.pay-type-item{
				width: 100%;
				height: 84upx;
				padding: 0 30upx; 
				box-sizing: border-box;
				.iconfont{
					margin-right: 10upx;
				}
				.weixin_pay{
					display:inline-block;
					width:40upx;
					height:40upx;
					margin-left:5upx;
					margin-right:10upx;
					margin-top:20upx;
					background-size:100% 100%;
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYWEwMDg1OC0wOGQ4LTRhN2YtYWQ4My0zNzZhNDMxZTEzOTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUZDNzM1MjgxMjNEMTFFNEI1MERFQjkyRkM2NUIyOUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUZDNzM1MjcxMjNEMTFFNEI1MERFQjkyRkM2NUIyOUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y5NWUzYzMtOWQ2My00YzliLWEzZDQtZmNhMTJjODBhNDI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJhYTAwODU4LTA4ZDgtNGE3Zi1hZDgzLTM3NmE0MzFlMTM5MiIvPiA8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');
				}
				.iconicon_zhifubao{
					color: #01aaef;
				}
				.iconicon_integral{
					color: #fcbb3b;
				}
				.iconicon_m{
					color: #ff8067;
				}
				.uni-flex-item{
					border-bottom: 1upx solid #f0f0f0;
				}
				.checkbox{
					margin-left: 20upx;
				}
				.red{
					color: #ff5011;
				}
				&.disabled{
					.name{
						color:#bbb;
					}
				}
			}
		}
		.footer{
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			.total{
				background-color: #fff;
			}
			.buy{
				background-color: #242424;
				color: #fff;;
			}
		}
	}
</style>
