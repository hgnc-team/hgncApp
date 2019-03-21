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
					 :themeColor="picker.themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel"
					 :pickerValueArray="picker.pickerValueArray"></mpvue-picker>
				</view>
			</view>
			<!-- 搜索 -->
			<view class="search">
				<view class="icon">
					<uni-icon type="search" size="20"></uni-icon>
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
		<!--  #ifdef  H5  -->
		<!-- 选项卡分类选择 -->
		<view class="custom-tabs">
			<topTabMenu :current="tabs.current" :values="tabs.items" @clickItem="changeTabs"></topTabMenu>
		</view>
		<!--  #endif    -->
		<!-- 主体内容 -->
		<view class="swiper-content">
			<!-- <dropDownRefresh :on-refresh="onRefresh"></dropDownRefresh> -->
			<!--  #ifdef  APP-PLUS  -->
			<van-tabs :active="active" z-index="10000" animated swipeable swipe-threshold="6" custom-class="custom-class" nav-class="nav-class" tab-class="tab-class" tab-active-class="tab-active-class">
				<van-tab :title="tab" v-for="(tab, i) in tabs.items" :key="i">
			<!--  #endif    -->
					<!-- 轮播图 -->
					<view class="swiper-list">
						<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#242424"
						 indicator-color="#dadada">
							<swiper-item v-for="swiper in swiperList" :key="swiper.sid" @tap="toSwiper(swiper)">
								<image mode="aspectFill" :src="swiper.img"></image>
							</swiper-item>
						</swiper>
					</view>
					<view class="goods-list">
						<view class="title">好物热卖</view>
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
			<!--  #ifdef  APP-PLUS  -->
				</van-tab>
			</van-tabs>
			<!--  #endif    -->
			<bottomInfo></bottomInfo>
			<view class="loading-text">{{loadingText}}</view>
			
		</view>
	</view>
</template>
<script>
	import {
		uniBadge,
		uniIcon
	} from '@dcloudio/uni-ui';
	import mpvuePicker from 'mpvue-picker';
	import topTabMenu from "../../components/common/topTabMenu.vue";
	// import dropDownRefresh from "../../components/common/dropDownRefresh.vue";
	import cityData from "../../common/city.data.js";
	export default {
		components: {
			topTabMenu,
			uniIcon,
			uniBadge,
			mpvuePicker,
			// dropDownRefresh
		},
		data() {
			return {
				active: 0,
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
					},
					{
						goods_id: 4,
						img: '../../static/img/common/good5.jpg',
						name: '【第二件半价】雅思嘉猴头菇饼干整箱750g 早餐休闲零食',
						price: '￥218',
						slogan: '52244人付款'
					},
					{
						goods_id: 5,
						img: '../../static/img/common/good6.jpg',
						name: 'VKE 小爱早教智能机器人语音互动 听故事儿童玩具wifi版',
						price: '￥288',
						slogan: '232人付款'
					},
					{
						goods_id: 6,
						img: '../../static/img/common/good7.jpg',
						name: '进口智利三文鱼400g',
						price: '￥216',
						slogan: '3235人付款'
					},
					{
						goods_id: 7,
						img: '../../static/img/common/good8.jpg',
						name: '【赠送小黄人杯子】意大利进口科砾霖牙膏2支',
						price: '￥58',
						slogan: '35人付款'
					}
				],
				currentPageindex: 0,
				headerPosition: "fixed",
				loadingText: "正在加载..."

			};
		},
		computed: {

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
// 				let goods_id = end_goods_id + i;
// 				let p = {
// 					goods_id: goods_id,
// 					img: '../../static/img/common/' + ((goods_id + 1) % 10 == 0 ? 10 : (goods_id + 1) % 10) + '.jpg',
// 					name: '商品名称商品名称商品名称商品名称商品名称',
// 					price: '￥168',
// 					slogan: '1235人付款'
// 				};
				this.productList.push(this.productList[i]);
			}
		},
		methods: {
			init() {
				
			},
			// 二级联动
			showPicker() {
				this.picker.pickerValueArray = cityData;
				this.picker.mode = 'multiLinkageSelector';
				this.picker.deepLength = 2;
				// this.picker.pickerValueDefault = [1, 0];
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				console.log(e);
				// this.pickerText = e.label;
				if (e && e.label) {
					this.picker.pickerText = e.label.split('-')[1];
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
	page {
		width: 100%;
		height: 100%;
		background-color: #f0f0f0 !important;
	}

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
			height: 88upx;
			background-color: $uni-bg-color-status;
			color: $uni-text-color-status;
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
				width: calc(100% - 246upx);
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				input {
					width: calc(100% - 60upx);
					height: 56upx;
					background-color: #ffffff;
					padding-left: 50upx;
					font-size: 30upx;
				}

				.icon {
					width: 50upx;
					height: 50upx;
					position: absolute;
					color: #a18090;
					z-index: 996;
					top: 16upx;
					/*  #ifdef  APP-PLUS  */
					top: 4upx;
					/*  #endif  */
					left: 16upx;
					/*  #ifdef  APP-PLUS  */
					left: 10upx;
					/*  #endif  */
				}
			}

			.location {
				width: 146upx;
				height: 100%;
				font-size: 30upx;

				.local {
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
			height: 88upx;
		}

		.swiper-content {
			width: 100%;
			position: relative;
			top: 88upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/*  #endif  */
			margin-bottom: 120upx;
			/*  #ifdef  APP-PLUS  */
			.custom-class{
				background-color: #f0f0f0;
				position: relative;
				.nav-class{
					.tab-class{
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.nav-class{
					z-index: 20000;
					
				}
				/*  #endif  */
				.swiper-list {
					width: 100%;
					height: 346upx;
					background-color: #fff;
				
					.swiper {
						width: 100%;
						height: 280upx;
						background-color: #f0f0f0;
				
						image {
							width: 100%;
							height: 280upx;
						}
					}
				}
				.goods-list {
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
				/*  #ifdef  APP-PLUS  */
			}
			/*  #endif  */
		}
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
			background-color: #f0f0f0;
		}
	}
</style>
