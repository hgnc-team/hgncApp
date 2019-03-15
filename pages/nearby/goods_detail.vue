<template>
	<view class="goodsDetailPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="redo" title="商品详情"></uni-nav-bar>

		<view class="content">
			<!-- 轮播图 -->
			<view class="swiper-view">
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
					<swiper-item v-for="swiper in swiperList" :key="swiper.sid" @tap="toSwiper(swiper)">
						<image mode="aspectFill" :src="swiper.img"></image>
					</swiper-item>
				</swiper>
				<view class="keep-out"></view>
			</view>
			<view class="goods-info">
				<!-- 商品价格积分 -->
				<view class="info-item uni-flex">
					<view class="info-item-detail uni-flex-item">
						<view class="price uni-h4">
							￥17,935
						</view>
						<view class="price uni-text-small">
							可以获得35,888个积分
						</view>
					</view>
					<view class="info-item-detail uni-flex-item" style="text-align: right;">
						<view class="uni-flex">
							<view class="uni-flex-item">
								<uni-icon class="icon" type="star" size="30"></uni-icon>
							</view>
							<view class="uni-flex-item">
								<text>555</text>
							</view>

						</view>
						<view class="uni-text-small">
							可以获得双倍积分
						</view>
					</view>
				</view>
				<!-- 商品文字描述 -->
				<view class="info-item">
					<view class="uni-h4 uni-ellipsis">
						茅夫斯基欧塞附近熬时间发哦是激发你
					</view>
					<view class="uni-text-small uni-text-gray" style="line-height: 1;">
						<text>茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯基欧塞附近熬时间发哦是激发你茅夫斯</text>
					</view>
				</view>
				<!-- 商品详情图 -->
				<view class="detail-image">
					商品详情图
					<image src="" mode=""></image>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<view class="goods-list">
				<view class="title">— 猜你喜欢 —</view>
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
				<view class="bottom-info">
					<view class="info">
						M+ 可以赚钱的购物平台
					</view>
					<view class="tel">
						客服电话：400-6555200
					</view>
				</view>

			</view>
		</view>
		<!-- #ifdef H5 -->
		<view class="goods-footer uni-flex">
			<view class="cart uni-flex-item uni-center" @click="toCart">
				<text>购物车</text>
			</view>
			<view class="to-buy uni-flex-item uni-center" @click="toBuy">
				<button type="warn">去买单</button>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
			<van-goods-action-button text="去买单" @click="toBuy" />
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
	export default {
		components: {
			uniIcon,
			uniNavBar
		},
		data() {
			return {
				titleBg: 'rgba(0,0,0,1)',
				textColor: 'rgba(255,255,255,1)',
				//轮播
				swiperList: [{
						sid: 0,
						src: '自定义src0',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '../../../static/img/login/img_login_bg@3x.png'
					}
				],
				//猜你喜欢列表
				productList: [{
						shop_id: 0,
						img: '../../../static/HM-shophome/img/p1.jpg',
						name: '商品名称商品名',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '../../../static/HM-shophome/img/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '../../../static/HM-shophome/img/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '../../../static/HM-shophome/img/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '../../../static/HM-shophome/img/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '../../../static/HM-shophome/img/p9.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
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
				uni.navigateTo({
					url: "../shopCart/pay"
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
		.content {
			
			.swiper-view {
				border: 1px solid #eee;
			}

			.goods-info {
				.info-item {
					height: 120upx;
					padding: 0 30upx;
					border-bottom: 1px solid #eee;

					.info-item-detail {}
				}

				.detail-image {
					height: 700upx;
					background-color: #bbb;
				}
			}

			.goods-list {
				background-color: #f4f4f4;
				.title {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 60upx;
					color: #979797;
					font-size: 24upx;
				}

				.loading-text {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 60upx;
					color: #979797;
					font-size: 24upx;
				}

				.product-list {
					width: 95%;
					padding: 0 2.5% 2.5vw 2.5%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.product {
						width: 48.75%;
						border-radius: 20upx;
						background-color: #fff;
						margin: 0 0 15upx 0;

						image {
							width: 100%;
							border-radius: 20upx 20upx 0 0;
						}

						.name {
							width: 92%;
							padding: 10upx 4%;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							text-align: justify;
							overflow: hidden;
							font-size: 30upx;
						}

						.info {
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							width: 92%;
							padding: 10upx 4% 10upx 4%;

							.price {
								color: #e65339;
								font-size: 30upx;
								font-weight: 600;
							}

							.slogan {
								color: #807c87;
								font-size: 24upx;
							}
						}
					}
				}

				.bottom-info {
					width: 100%;
					text-align: center;
					font-size: 28upx;
					color: #979797;
					.info,
					.tel {
						margin: 5upx 0 ;
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
	}
</style>
