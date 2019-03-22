<template>
	<view class="goodsDetailPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="redo" title="商品详情"></uni-nav-bar>

		<view class="content">
			<!-- 轮播图 -->
			<customSwiper :swiperList="swiperList" @toSwiper="toSwiper"></customSwiper>
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
		<!-- #ifdef H5 -->
		<view class="goods-footer uni-flex">
			<view class="cart uni-flex-item uni-center" @click="toCart">
				<uni-icon type="star"></uni-icon>
			</view>
			<view class="add-to-cart uni-flex-item uni-center" @click="addToCart">
				<button type="primary">加入购物车</button>
			</view>
			<view class="to-buy uni-flex-item uni-center" @click="toBuy">
				<button type="warn">立即购买</button>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" info="6" @click="toCart" />
			<van-goods-action-button id="cartBtn" text="加入购物车" type="warning" @click="addToCart" />
			<van-goods-action-button id="buyBtn" text="立即购买" @click="toBuy" />
		</van-goods-action>
		<!-- #endif -->

	</view>
</template>

<script>
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	import customSwiper from "../../components/common/custom-swiper.vue";
	export default {
		components: {
			uniIcon,
			uniNavBar,
			customSwiper
		},
		data() {
			return {
				titleBg: 'rgba(0,0,0,1)',
				textColor: 'rgba(255,255,255,1)',
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
			//轮播图预览
			toSwiper(e) {
				uni.previewImage({
					urls: [e.img]
				});
			},
			// 跳转购物车
			toCart(){
				console.log(222)
				this.$store.commit("change_page", 2)
				uni.navigateTo({
					url:"../index"
				})
				
			},
			// 加入购物车
			addToCart(){
				uni.showToast({
					title:"加入购物车"
				})
			},
			toBuy(){
				uni.showToast({
					title:"立即购买"
				})
			}
		},
		onLoad(e) {
			console.log(e)
			// this.initData(e.id);
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

		/* #ifdef H5 */
		.goods-footer {
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			button{
				width: 100%;
				height: 100%;
				border-radius: 0;
			}
		}
		/* #endif */
		
		.custom-class{
			#cartBtn{
				background-color: #4c9bfa !important;
			}
		}
	}
</style>
