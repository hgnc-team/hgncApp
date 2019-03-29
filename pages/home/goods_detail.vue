<template>
	<view class="goodsDetailPage">
		<!-- 状态栏 -->
		<!-- <statusBar></statusBar> -->
		<!-- 导航栏 -->
		<!-- <uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="redo" title="商品详情"></uni-nav-bar> -->
		
		<share :shareObj="shareObj" ref="shareChild"></share>
		
		<view class="content">
			<!-- 轮播图 -->
			<customSwiper :swiperList="swiperList" @toSwiper="toSwiper" :height="520"></customSwiper>
			<view class="goods-info">
				<!-- 商品文字描述 -->
				<view class="info-item">
					<view class="uni-h4 uni-ellipsis">
						经典低帮帆布鞋
					</view>
					<view class="uni-text-small text-color-gray">
						<text>茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯</text>
					</view>
				</view>
				<!-- 商品价格积分 -->
				<view class="price-info info-item uni-flex">
					<view class="price uni-flex">
						<view class="uni-inline-item text-price uni-h4" style="font-size: 36upx;">
							￥17,935
						</view>
						<text class="uni-inline-item tag uni-text-small">
							可获双倍积分
						</text>
					</view>
					<view class="number uni-flex text-color-gray">
						<view class="icon uni-inline-item">
							<uni-icon type="plus"></uni-icon>
						</view>
						<view class="uni-inline-item">
							123
						</view>
					</view>
				</view>
				
				<!-- 优惠 -->
				<view class="preferential uni-flex">
					<view class="title uni-inline-item text-color-gray">
						优惠
					</view>
					<view class="uni-inline-item">
						可获得1,2324个积分
					</view>
				</view>
			</view>
			
			<!-- 商品详情图 -->
			<view class="detail-image common-pa-30">
				<view class="title uni-h4">
					商品详情
				</view>
				<view class="image">
					<image src="../../static/img/common/goodDetail.png" mode="widthFix"></image>
				</view>
			</view>
			
			<!-- 猜你喜欢 -->
			<view class="goods-list">
				<view class="title">猜你喜欢</view>
				<view class="product-list">
					<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
						<image mode="widthFix" :src="product.img"></image>
						<view class="name">{{product.name}}</view>
						<view class="info">
							<view class="price">{{product.price}}</view>
							<view class="slogan">{{product.slogan}}</view>
						</view>
					</view>
				</view>
			</view>
			<bottomInfo></bottomInfo>
		</view>
		<view class="goods-footer uni-flex">
			<view class="cart uni-flex-item">
				<uni-icon type="star" @click="toCart"></uni-icon>
				<uni-badge :text="total_num" type="primary" v-if="total_num - 0 > 0"></uni-badge>
			</view>
			<view class="btn add-to-cart uni-flex-item uni-center" @click="addToCart">
				加入购物车
			</view>
			<view class="btn to-buy uni-flex-item uni-center" @click="toBuy">
				立即购买
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		uniIcon,
		uniBadge,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import { mapMutations, mapGetters } from 'vuex';
	import service from '../../common/service.js';
	import util from '../../common/util.js';
	import customSwiper from "../../components/common/custom-swiper.vue";
	
	import share from "../../components/common/share.vue";
	export default {
		components: {
			uniIcon,
			uniBadge,
			uniNavBar,
			customSwiper,
			share
		},
		data() {
			return {
				// 商品内容
				goods: {
					goodsId:"",
					title: "",
					price: 0,
					detail: "",
					pointRate: "",
				},
				// 分享的内容
				shareObj:{
					// 分享链接
					strShareUrl: "",
					// 分享标题
					strShareTitle: "",
					// 内容描述
					strShareSummary: "",
					// 分享图标
					strShareImageUrl: ""
				},
				//轮播
				swiperList: [{
						sid: 0,
						src: '自定义src0',
						img: '../../static/img/common/banner1.jpg',
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '../../static/img/common/banner2.jpg'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '../../static/img/common/banner3.jpg'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '../../static/img/common/banner4.jpg'
					}
				],
				//猜你喜欢列表
				productList: [{
						goods_id: 0,
						img: '../../static/img/common/good1.jpg',
						name: '老街口-红糖麻花500g/袋',
						price: '￥58',
						slogan: '1096人付款'
					},
					{
						goods_id: 1,
						img: '../../static/img/common/good2.jpg',
						name: '阿玛熊红豆薏米粉480g熟早餐五谷核桃黑豆粉牛奶燕麦熟早餐五谷核桃黑豆粉牛奶燕麦',
						price: '￥68',
						slogan: '686人付款'
					},
					{
						goods_id: 2,
						img: '../../static/img/common/good3.jpg',
						name: '刘涛推荐负离子乳胶枕，享有氧睡眠',
						price: '￥368',
						slogan: '1234人付款'
					},
					{
						goods_id: 3,
						img: '../../static/img/common/good4.jpg',
						name: '阿迪达斯SUPERSTAR金标贝壳头小白鞋',
						price: '￥668',
						slogan: '678人付款'
					}
				],
			}
		},
		onNavigationBarButtonTap(e) {
			if(this.goods.goodsId) {
				// 定义分享内容
				this.shareObj = {
					// 分享链接
					strShareUrl: "https://uniapp.dcloud.io",
					// 分享标题
					strShareTitle: this.goods.title,
					// 内容描述
					strShareSummary: this.goods.detail,
					// 分享图标
					strShareImageUrl: this.goods.imageUrl
				}
				// 调用分享组件里面的分享方法
				if(e.index === 0) {
					this.$refs.shareChild.openShareBox();
				}
			}
		},
		computed:{
			// 注入vuex的计算方法
			...mapGetters(["total_num"])
		},
		methods: {
			// 注入vuex的加入购物车方法
			...mapMutations(['ADD_GOODS']),
			init(id){
				let ids = [];
				ids.push(id)
				uni.showLoading();
				service.getGoodListById({ids: ids}).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					this.goods = {
						goodsId: data[0].id,
						title: data[0].title,
						price: data[0].price,
						detail: data[0].detail,
						pointRate: data[0].pointRate,
					}
			
				}).catch(err=>{
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  err.errMsg || err.data.data,
					})
				})
			},
			/**  
			 * 左侧按钮点击事件  
			 */
			onClickLeft() {
				uni.navigateBack()
			},
			/**  
			 * 右侧按钮点击事件  
			 */
			onClickRight() {
				uni.showToast({
					title: "分享"
				})
			},
			//轮播图预览
			toSwiper(e) {
				uni.previewImage({
					urls: [e.img]
				});
			},
			// 跳转购物车
			toCart(){
				// 判断是否登录
				this.$guardToLogin().then(()=>{
					util.switchTab("shopCart");
				}).catch(()=>{});
			},
			// 加入购物车
			addToCart(){
				// 判断是否登录
				this.$guardToLogin().then(()=>{
					let parms = {
						userId: this.$store.state.userId,
						goodsId: this.goodsId
					}
					uni.showLoading()
					service.addToCart(parms).then(res=>{
						uni.hideLoading();
						uni.showToast({
							title:"加入购物车成功"
						});
						let data = res.data.data;
						// 同步vuex数据
						// this.ADD_GOODS(data);
					}).catch(err=>{
						uni.hideLoading();
						uni.showToast({
							icon:"none",
							title: err.errMsg || err.data.data
						})
					})
				}).catch(()=>{});
			},
			toBuy(){
				// 判断是否登录
				this.$guardToLogin().then(()=>{
					// 创建订单；
					uni.navigateTo({
						url: '/pages/shopCart/pay'
					});
				}).catch(()=>{});
			}
		},
		onLoad(e) {
			this.init(e.id);
		},
		
	}
</script>

<style lang="scss">
	.goodsDetailPage {
		margin-bottom: 100upx;
		background-color: #f0f0f0;
		.content {
				
			.goods-info {
				.info-item {
					padding: 15upx 30upx;
					box-sizing: border-box;
					background-color: #fff;
				}
				.price-info{
					justify-content: space-between;
					padding-bottom: 40upx;
					margin-bottom: 20upx;
					.price{
						align-items: center;
						.tag{
							height: 32upx;
							background-color: #242424;
							padding: 4upx 12upx;
							color: #fff;
							margin-left: 30upx;
						}
					}
					.number{
						
					}
				}
				.preferential{
					height:88upx;
					margin-bottom: 20upx;
					background-color: #fff;
					padding: 0 30upx;
					box-sizing: border-box;
					align-items: center;
					.title{
						width: 96upx;
					}
				}
			}
			.detail-image {
				background-color: #fff;
				image{
					width:100%;
					height: auto;
				}
				margin-bottom: 30upx;
			}
			.goods-list {
				padding-top: 20upx;
				background-color: #fff;
				font-weight: 600;
				
				.title {
					width: 100%;
					height: 60upx;
					color: #242424;
					font-size: 40upx;
					margin-bottom: 36upx;
					padding: 0 30upx;
					box-sizing: border-box;
				}			
				.product-list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 0 30upx;
					box-sizing: border-box;
			
					.product {
						width: 47.75%;
						border-radius: 20upx;
						background-color: #fff;
						margin: 0 0 15upx 0;
			
						image {
							width: 100%;
							height: 246upx;
							background-color: #f0f0f0;
						}
			
						.name {
							width: 100%;
							padding: 10upx 0;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-weight: 400;
							font-size: 26upx;
						}
			
						.info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 100%;
							font-weight: 100;
			
							.price {
								color: #4c9bfa;
								font-size: 30upx;
								font-weight: 600;
							}
			
							.slogan {
								color: #c2c2c2;
								font-size: 24upx;
							}
						}
					}
			
				}
			}
		}

		.goods-footer {
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			.btn{
				font-size: 30upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.cart{
				padding-left: 30upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: start !important;
				position: relative;
				.uni-badge{
					position: absolute;
					top: 16upx;
					left: 60upx;
				}
			}
			.add-to-cart{
				background-color: #fff;
				color: #242424;
			}
			.to-buy{
				background-color: #242424;;
				color: #fff;
				
			}
		}
	}
</style>
