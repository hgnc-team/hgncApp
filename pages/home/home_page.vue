<template>
	<view class="homePage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<!-- 切换地理位置 -->
			<view class="location">
				<view class="local" @click="showPicker">
					<view class="text uni-ellipsis">{{picker.pickerText}}</view>
					<view class="icon">
						<uni-icon type="arrowdown" size="18"></uni-icon>
					</view>
				</view>
				<view class="mpvue-picer">
					<mpvue-picker ref="mpvuePicker" :mode="picker.mode" :deepLength="picker.deepLength" :pickerValueDefault="picker.pickerValueDefault"
					 :themeColor="picker.themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="picker.pickerValueArray"></mpvue-picker>
				</view>
			</view>
			<!-- 搜索 -->
			<view class="search">
				<view class="icon">
					<uni-icon  type="search" size="24"></uni-icon>
				</view>
				<input placeholder="名称,类型" @tap="toSearch()" />
			</view>
			<!-- 消息 -->
			<view class="messages" @tap="goMessagesPage">
				<view class="icon">
					<uni-icon type="email" size="30"></uni-icon>
				</view>
				<uni-badge text="2" type="error" size="small"></uni-badge>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 选项卡分类选择 -->
		<!-- <view class="custom-tabs"> -->
			<topTabMenu :current="tabs.current" :values="tabs.items" @clickItem="changeTabs"></topTabMenu>
		<!-- </view> -->
		<!-- 主体内容 -->
		<view class="content">
			<view v-show="tabs.current === i" v-for="(tab, i) in tabs.items" :key="i">
				<!-- 轮播图 -->
				<view class="swiper-view">
					<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
						<swiper-item v-for="swiper in swiperList" :key="swiper.sid" @tap="toSwiper(swiper)">
							<image mode="aspectFill" :src="swiper.img"></image>
						</swiper-item>
					</swiper>
					<view class="keep-out"></view>
				</view>
				<!-- 推荐商品 -->
				<view class="pick">
					<view class="box">
						<view class="title">
							<view class="big">推荐商品</view>
							<view class="small">好货推荐 低价精选</view>
						</view>
						<view class="product-list">
							<view v-for="product in pickList" :key="product.goods_id" @tap="toPick(product)">
								<image mode="widthFix" :src="product.img"></image>
								<view class="price">{{product.price}}</view>
								<view class="slogan">{{product.slogan}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 广告横幅 -->
				<view class="banner">
					<image mode="widthFix" src="../../../static/HM-shophome/banner.jpg"></image>
				</view>
				<!-- 商品列表 -->
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
					<view class="loading-text">{{loadingText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		uniBadge,
		uniIcon
	} from '@dcloudio/uni-ui';
	import mpvuePicker from 'mpvue-picker';
	import topTabMenu from "../../components/common/top_tabMenu.vue";
	import cityData from "../../common/city.data.js";
	export default {
		components: {
			topTabMenu,
			uniIcon,
			uniBadge,
			mpvuePicker
		},
		data() {
			return {
				picker: {
					mode: 'selector',
					deepLength: 0, // 几级联动
					pickerValueDefault: [], // 初始化值
					pickerValueArray: [], // picker 数组值
					pickerText: '全国',
					themeColor: '#000', // 颜色主题
				},
				tabs: {
					// 选项卡
					items: ['全部', '推荐', '手机', '电脑', '箱包', '时装时装', '男装', '女装'],
					current: 0
				},
				//轮播
				swiperList: [],
				//推荐商品 3个
				pickList: [],
				//猜你喜欢列表
				productList: [],
				currentPageindex: 0,
				headerPosition: "fixed",
				loadingText: "正在加载..."

			};
		},
		computed: {
			list() {
				console.log(this.$store.state.list)
				return this.$store.state.list;
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			// uni.showToast({title: '触发上拉加载'});
			let len = this.productList.length;
			if (len >= 40) {
				this.loadingText = "到底了";
				return false;
			}
			let end_goods_id = this.productList[len - 1].goods_id;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: '../../../static/HM-shophome/img/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				};
				this.productList.push(p);
			}
		},
		methods: {
			init(){
				this.swiperList = [{
						sid: 0,
						src: '自定义src0',
						img: '../../../static/img/login/img_login_bg@2x.png'
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '../../../static/img/login/img_login_bg@2x.png'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '../../../static/img/login/img_login_bg@2x.png'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '../../../static/img/login/img_login_bg@2x.png'
					}
				];
				this.pickList = [{
						goods_id: 0,
						img: '../../../static/HM-shophome/pick-img/p1.jpg',
						price: '￥168',
						slogan: '限时抢购'
					},
					{
						goods_id: 1,
						img: '../../../static/HM-shophome/pick-img/p2.jpg',
						price: '￥168',
						slogan: '精选商品'
					},
					{
						goods_id: 2,
						img: '../../../static/HM-shophome/pick-img/p3.jpg',
						price: '￥168',
						slogan: '今日疯抢'
					}
				];
				this.productList = [{
						goods_id: 0,
						img: '../../../static/HM-shophome/img/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
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
						img: '../../../static/HM-shophome/img/p6.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '../../../static/HM-shophome/img/p7.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: '../../../static/HM-shophome/img/p8.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 8,
						img: '../../../static/HM-shophome/img/p9.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 9,
						img: '../../../static/HM-shophome/img/p10.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				];
				
			},
			// 二级联动
			showPicker() {
				this.picker.pickerValueArray = cityData;
				this.picker.mode = 'multiLinkageSelector';
				this.picker.deepLength = 2;
				this.picker.pickerValueDefault = [1, 0];
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				console.log(e);
				// this.pickerText = e.label;
				if (e && e.label) {
					this.pickerText = e.label.split('-')[1];
				}
			},
			onChange(e) {
				console.log(e);
			},
			onCancel(e) {
				console.log(e);
			},
			//消息页跳转
			goMessagesPage() {
				uni.navigateTo({
					url: '../../home/messages'
				})
			},
			//搜索跳转
			toSearch() {
				uni.hideKeyboard();
				uni.navigateTo({
					url: '../../home/search'
				})
			},
			// 切换选项卡
			changeTabs(index) {
				if (this.tabs.current !== index) {
					this.tabs.current = index;
				}
			},
			//轮播图跳转
			toSwiper(e) {
				uni.showToast({
					title: e.src
				});
			},
			//推荐商品跳转
			toPick(e) {
				uni.showToast({
					title: '推荐商品' + e.goods_id
				});
			},
			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: '../../home/goods_detail'
				})
			},
			// 			//更新分类指示器
			// 			categoryChange(event) {
			// 				this.currentPageindex = event.detail.current;
			// 			},
			// 			//分类图片加载完毕
			// 			categoryImgLoad(e){
			// 				this.categoryImg = this.categoryImg?this.categoryImg+1:1;
			// 				//完成加载11个分类图片开始计算分类高度，若分类图片不足10个则修改此处的10。
			// 				if(this.categoryImg==10){
			// 					this.getCategoryHeight();
			// 				}
			// 			},
			// 			//更新分类高度
			// 			getCategoryHeight() {
			// 				let view = uni.createSelectorQuery().select('.category-list');
			// 				view.fields(
			// 					{
			// 						size: true
			// 					},
			// 					data => {
			// 						this.categoryHeight = data.height + 'px';
			// 					}
			// 				).exec();
			// 			}
		},
		onLoad() {
			this.init();
		},
	}
</script>

<style lang="scss">
	.homePage {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;

		.status {
			width: 100%;
			height: 0;
			/*  #ifdef  APP-PLUS  */
			height: var(--status-bar-height); //表示状态栏的高度。
			/*  #endif  */
			background-color: #000;
			position: fixed;
			top: 0;
			z-index: 999;
		}

		.header {
			width: 100%;
			height: 100upx;
			background-color: $uni-bg-color-status;
			color:$uni-text-color-status;
			display: flex;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			z-index: 996;

			.messages {
				width: 100upx;
				height: 100upx;
				flex-shrink: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				.uni-badge {
					position: absolute;
					top: 12upx;
					right: 4upx;
				}
			}

			.search {
				width: calc(100% - 240upx);
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				input {
					width: calc(100% - 60upx);
					height: 60upx;
					background-color: #ffffff;
					border-radius: 60upx;
					padding-left: 60upx;
					font-size: 30upx;
				}

				.icon {
					width: 60upx;
					height: 60upx;
					position: absolute;
					color: #a18090;
					z-index: 996;
					top: 12upx;
					/*  #ifdef  APP-PLUS  */
					top: 0upx;
					/*  #endif  */
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.location {
				width: 140upx;
				height: 100upx;
				font-size: 30upx;
				// padding-left: 20upx;
				.local{
					width: 100%;
					height: 100%;
					flex-shrink: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					.text {
						max-width: 65%;
					}
				}
				
			}
		}

		.place {
			/*  #ifdef  APP-PLUS  */
			margin-top: var(--status-bar-height);
			/*  #endif  */
			background-color: #ff570a;
			height: 100upx;
		}

		.content {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			top: 200upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 200upx);
			/*  #endif  */
			margin-bottom: 120upx;
		}

		.swiper-view {
			.swiper {
				width: 100%;
				height: 280upx;

				image {
					width: 100%;
					height: 280upx;
				}
			}

			.keep-out {
				width: 100%;
				height: 30upx;
				border-radius: 100% 100% 0 0;
				background-color: #ff570a;
				margin-top: -15upx;
				position: absolute;
			}
		}

		.pick {
			width: 95%;
			padding: 0 2.5vw 2.5vw 2.5vw;
			background: linear-gradient(to bottom, #ff570a 0%, #ffffff 105%);

			.box {
				width: 100%;
				border-radius: 20upx;
				background-color: #ffffff;

				.title {
					display: flex;
					justify-content: flex-start;
					align-items: flex-end;
					height: 60upx;
					border-bottom: solid 1upx #eee;
					padding-bottom: 10upx;

					.big {
						font-size: 34upx;
						padding-left: 20upx;
						color: #46434f;
					}

					.small {
						font-size: 24upx;
						padding-left: 20upx;
						color: #827f8b;
					}
				}

				.product-list {
					padding: 15upx 20upx 15upx 20upx;
					column-count: 2;
					column-width: 50%;
					column-gap: 10upx;

					>view {
						display: flex;
						background-color: #f8f8f8;
						position: relative;

						&:nth-child(1) {
							.price {
								color: #e65339;
								font-size: 30upx;
								position: absolute;
								bottom: 8upx;
								left: 8upx;
							}

							.slogan {
								color: #807c87;
								font-size: 30upx;
								position: absolute;
								bottom: 8upx;
								right: 8upx;
							}

							image {
								width: 100%;
								height: 0;
							}
						}

						&:nth-child(2),
						&:nth-child(3) {
							image {
								width: calc(50% - 5upx);
								height: 0;
							}

							.price {
								position: absolute;
								top: 25%;
								left: 55%;
								color: #e65339;
								font-size: 30upx;
							}

							.slogan {
								position: absolute;
								top: 60%;
								left: 55%;
								color: #807c87;
								font-size: 20upx;
							}
						}

						&:nth-child(2) {
							margin-bottom: 10upx;
						}
					}
				}
			}
		}

		.banner {
			image {
				width: 100%;
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
				height: 80upx;
				text-align: center;
				font-size: 28upx;
				color: #979797;

				.info,
				.tel {
					margin: 5upx 0;
				}
			}
		}
	}
</style>
