<template>
	<view class="payPage">
		<!-- 收货地址 -->
		<view class="address-wrap uni-flex uni-row" @tap="toAddress">
			<view class="icon-left uni-inline-item common-mr-20">
				<uni-icon type="location-filled"></uni-icon>
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
					<image :src="item.pro_img" mode="aspectFit"></image>
				</view>
				<view class="info uni-flex-item">
					<view class="title  uni-flex uni-column">
						<text class="uni-ellipsis">{{ item.pro_name }}</text>
						<text class="text-color-gray uni-text-small">{{ item.tags }}</text>
					</view>
					<view class="price uni-flex">
						<text class="text-price uni-flex-item">￥{{ item.now_price }}</text>
						<text class="uni-flex" style="align-items: flex-end;">x {{ item.pro_count }}</text>
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
					订单编号
				</view>
				<view class="info uni-flex-item">
					214325435435435435
				</view>
			</view>
			<view class="order-info-item uni-flex">
				<view class="title uni-flex-item">
					下单时间
				</view>
				<view class="info uni-flex-item">
					2018-10-05
				</view>
			</view>
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
					￥2,220
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
						<view class="icon uni-inline-item">
							<uni-icon type="info" color="blue"></uni-icon>
						</view>
						<view class="name uni-inline-item">
							支付宝支付
						</view>
					</view>
					<view class="uni-flex-item  uni-flex flex-right">
						<view class="checkbox uni-inline-item">
							<radio value="zfb" :checked="payType === 'zfb'" ></radio>
						</view>
					</view>
				</view>	
				<view class="pay-type-item uni-flex" :class="!isJfPayAvailable?'disabled':''">
					<view class="title uni-flex uni-flex-item">
						<view class="icon uni-inline-item">
							<uni-icon type="info" color="blue"></uni-icon>
						</view>
						<view class="name uni-inline-item">
							积分支付（余额{{jBalance}}）
						</view>
					</view>
					<view class="uni-flex-item  uni-flex flex-right">
						<text class="uni-inline-item red" v-if="!isJfPayAvailable">余额不足</text>
						<view class="checkbox uni-inline-item">
							<radio value="jf" :checked="payType === 'jf'" :disabled="!isJfPayAvailable"></radio>
						</view>
					</view>
				</view>	
				<view class="pay-type-item uni-flex" :class="!isMbPayAvailable?'disabled':''">
					<view class="title uni-flex uni-flex-item">
						<view class="icon uni-inline-item">
							<uni-icon type="info" color="blue"></uni-icon>
						</view>
						<view class="name uni-inline-item">
							M币支付（余额{{mBalance}}）
						</view>
					</view>
					<view class="uni-flex-item  uni-flex flex-right">
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
				<text class="text-price">{{total}}M币</text>
			</view>
			<view class="buy  uni-flex-item flex-center-center" @tap="toPay">
				去付款
			</view>
		</view>
		
	</view>
</template>
<script>
	import { uniIcon } from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	import { mapMutations, mapGetters, mapActions } from 'vuex';
	// import rainColor from "../../components/common/rain-color.vue"
	export default {
		components: {
			uniIcon,
			// rainColor
		},
		data(){
			return {
				goodsList: [{
					pro_id: 1,
					pro_name: '老街口-红糖麻花500g/袋',
					pro_name2: '(又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
					tags: '50mi,淡香',
					reduce_price: 16,
					now_price: 100,
					pro_count: 1,
					pro_img: '../../static/img/common/good1.jpg',
					isChecked: false,
					// 滚动条
					scrollLeft: 0,
				},{
					pro_id: 2,
					pro_name: '第二件半价】雅思嘉猴头菇饼干整箱750g 早餐休闲零食',
					pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
					tags: '50mi,淡香',
					reduce_price: 16,
					now_price: 100,
					pro_count: 1,
					pro_img: '../../static/img/common/good2.jpg',
					isChecked: false,
					// 滚动条
					scrollLeft: 0,
				}],
				// 支付方式
				payType: "zfb",
				// 积分余额
				jBalance: 0,
				// m币余额
				mBalance: 0,
				// 总价
				total:0,
			}
		},
		computed: {
			// 注入vuex的计算方法
			...mapGetters(["getAddressList", "getOrderList"]),
			// 积分是否可用
			isJfPayAvailable() {
				return this.jBalance >= this.total; 
			},
			// M币是否可用
			isMbPayAvailable() {
				return this.mBalance >= this.total; 
			},
			// 默认地址
			address(){
				return this.getAddressList.length > 0 ? this.getAddressList[0] : null
			}
		},
		methods: {
			init(){
				this.jBalance = 450;
				this.mBalance = 650;
				this.total = 505;
			},
			// 去地址管理页面
			toAddress(){
				uni.navigateTo({
					url: "/pages/mine/address_management"
				})
			},
			// 跳转商品详情
			toDetail(id){
				uni.navigateTo({
					url: `/pages/home/goods_detail?${id}`
				})
			},
			// 选择付款方式
			radioChange(evt) {
				this.payType = evt.detail.value;
			},
			// 支付
			toPay(){
				console.log(this.payType);
				// 支付流程
				if(this.payType === "zfb") {
					// 支付宝支付
					uni.showToast({
						title: "支付宝支付"
					})
					// this.alipay();			

				} else if (this.payType === "jf") {
					// 支付宝支付
					uni.showToast({
						title: "积分支付"
					})
					this.jfPay();
				} else {
					// 支付宝支付
					uni.showToast({
						title: "Mb支付宝支付"
					})
					this.mbPay();
				}
				
				// this.toResult();
			},
			// 支付宝支付
			alipay(){
				// 请求后台接口获取订单数据
				uni.showLoading();
				service.getorderInfo().then(res=>{
					uni.hideLoading();
					const data = res.data.data;
					// 然后调用api，吊起支付宝支付
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: {
							"dealId": data.dealId,
							"appKey": data.appKey,
							"totalAmount": data.totalAmount,
							"tpOrderId": data.tpOrderId,
							"dealTitle": data.dealTitle,
							"rsaSign": data.rsaSign,
							"bizInfo": data.bizInfo
						}, //订单数据
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							uni.showToast({
								icon: "none",
								title:  err.errMsg || err.data.data,
							})
						}
					});
				}).catch(err=>{
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg || err.data.data,
					})
				})
				
			},
			// 积分支付
			jfPay(){
				// 是否检验二级密码
				if(this.$store.state.isCheckPassword) {
					// 调用支付流程
					
					
					this.toResult();
				} else {
					// 
					this.toSecond();
				}
			},
			// M币支付
			mbPay(){
				// 是否检验二级密码
				if(this.$store.state.isCheckPassword) {
					// 调用支付流程
					
					
					this.toResult();
				} else {
					// 
					this.toSecond();
				}
			},
			// 去二级密码页面
			toSecond(){
				uni.navigateTo({
					url: "/pages/mine/gesture_lock?mode=check"
				})
			},
			// 支付成功
			toResult() {
				uni.navigateTo({
					url: "/pages/shopCart/order_result"
				})
			}
		},
		onLoad() {
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
			padding: 30upx 10upx; 
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
