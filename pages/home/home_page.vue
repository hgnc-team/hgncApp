<template>
	<view class="homePage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<!-- 切换地理位置 -->
			<view class="location">
				<view class="local" @tap="showPicker">
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
				<view class="input" @tap="toSearch()">
					名称,类型
				</view>
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
		<!-- <view class="place"></view> -->
		<!-- 内容 -->
		<view class="swiper-content">
			<view class="uni-tab-bar">
				<view class="custom-tabs">
					<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
						<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''" :id="'tar'+index"
						 :data-current="index" @click="tapTab">
							{{tab.name}}
							<view class="bottom-line"></view>
						 </view>
					</scroll-view>
				</view>
				<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
					<swiper-item v-for="(tab,index1) in dataList" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">		
							<!-- 轮播图 -->
							<customSwiper :swiperList="swiperList" @toSwiper="toSwiper" :isDotsInside="false"></customSwiper>
							<view class="goods-list">
								<view class="title">好物热卖</view>
								<!-- 商品列表 -->
								<view class="product-list">
									<view class="product" v-for="(item,index2) in tab.data" :key="index2" @tap="toGoods(item)">		
										<image mode="scaleToFill" lazy-load :src="item.img"></image>
										<view class="name">{{item.name}}</view>
										<view class="info">
											<view class="price">{{item.price}}</view>
											<view class="slogan">{{item.slogan}}</view>
										</view>	
									</view>
								</view>
							</view>
							<bottomInfo></bottomInfo>
							<view class="uni-tab-bar-loading">
								{{tab.loadingText}}
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
				<bottomInfo></bottomInfo>
				<view class="loading-text">{{loadingText}}</view>
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
	import topTabMenu from "../../components/common/topTabMenu.vue";
	import customSwiper from "../../components/common/custom-swiper.vue";
	// import dropDownRefresh from "../../components/common/dropDownRefresh.vue";
	import cityData from "../../common/city.data.js";
	import service from '../../common/service.js';
	const tpl = {
		data0: {
			goods_id: 0,
			img: '/static/img/common/good1.jpg',
			name: '老街口-红糖麻花500g/袋',
			price: '￥58',
			slogan: '1096人付款',
			swiperList: [{
					sid: 0,
					src: '自定义src0',
					img: '/static/img/common/banner1.jpg',
				},
				{
					sid: 1,
					src: '自定义src1',
					img: '/static/img/common/banner2.jpg'
				},
				{
					sid: 2,
					src: '自定义src2',
					img: '/static/img/common/banner3.jpg'
				},
				{
					sid: 3,
					src: '自定义src3',
					img: '/static/img/common/banner4.jpg'
				}
			]
		},
		data1: {
			goods_id: 1,
			img: '/static/img/common/good2.jpg',
			name: '阿玛熊红豆薏米粉480g熟早餐五谷核桃黑豆粉牛奶燕麦熟早餐五谷核桃黑豆粉牛奶燕麦',
			price: '￥68',
			slogan: '686人付款',
			swiperList: [{
					sid: 0,
					src: '自定义src0',
					img: '/static/img/common/banner1.jpg',
				},
				{
					sid: 1,
					src: '自定义src1',
					img: '/static/img/common/banner2.jpg'
				},
				{
					sid: 2,
					src: '自定义src2',
					img: '/static/img/common/banner3.jpg'
				},
				{
					sid: 3,
					src: '自定义src3',
					img: '/static/img/common/banner4.jpg'
				}
			]
		},
		data2: {
			goods_id: 2,
			img: '/static/img/common/good3.jpg',
			name: '刘涛推荐负离子乳胶枕，享有氧睡眠',
			price: '￥368',
			slogan: '1234人付款',
			swiperList: [{
					sid: 0,
					src: '自定义src0',
					img: '/static/img/common/banner1.jpg',
				},
				{
					sid: 1,
					src: '自定义src1',
					img: '/static/img/common/banner2.jpg'
				},
				{
					sid: 2,
					src: '自定义src2',
					img: '/static/img/common/banner3.jpg'
				},
				{
					sid: 3,
					src: '自定义src3',
					img: '/static/img/common/banner4.jpg'
				}
			]
		},
		data3: {
			goods_id: 3,
			img: '/static/img/common/good4.jpg',
			name: '阿迪达斯SUPERSTAR金标贝壳头小白鞋',
			price: '￥668',
			slogan: '678人付款',
			swiperList: [{
					sid: 0,
					src: '自定义src0',
					img: '/static/img/common/banner1.jpg',
				},
				{
					sid: 1,
					src: '自定义src1',
					img: '/static/img/common/banner2.jpg'
				},
				{
					sid: 2,
					src: '自定义src2',
					img: '/static/img/common/banner3.jpg'
				},
				{
					sid: 3,
					src: '自定义src3',
					img: '/static/img/common/banner4.jpg'
				}
			]
		},
		data4: {
			goods_id: 4,
			img: '/static/img/common/good5.jpg',
			name: '【第二件半价】雅思嘉猴头菇饼干整箱750g 早餐休闲零食',
			price: '￥218',
			slogan: '52244人付款',
			swiperList: [{
					sid: 0,
					src: '自定义src0',
					img: '/static/img/common/banner1.jpg',
				},
				{
					sid: 1,
					src: '自定义src1',
					img: '/static/img/common/banner2.jpg'
				},
				{
					sid: 2,
					src: '自定义src2',
					img: '/static/img/common/banner3.jpg'
				},
				{
					sid: 3,
					src: '自定义src3',
					img: '/static/img/common/banner4.jpg'
				}
			]
			
		}
	};
	export default {
		components: {
			topTabMenu,
			uniIcon,
			uniBadge,
			mpvuePicker,
			customSwiper
			// dropDownRefresh
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				dataList: [],
				tabBars: [],
				
				picker: {
					mode: 'selector',
					deepLength: 0, // 几级联动
					pickerValueDefault: [], // 初始化值
					pickerValueArray: [], // picker 数组值
					pickerText: '全国',
					themeColor: '#000', // 颜色主题
				},
				//轮播
				swiperList: [{
						sid: 0,
						src: '自定义src0',
						img: '/static/img/common/banner1.jpg',
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '/static/img/common/banner2.jpg'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '/static/img/common/banner3.jpg'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '/static/img/common/banner4.jpg'
					}
				],
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
			uni.showToast({title: '触发上拉加载'});
			let len = this.productList.length;
			if (len >= 40) {
				this.loadingText = "到底了";
				return false;
			}
			let end_goods_id = this.productList[len - 1].goods_id;
			for (let i = 1; i <= 10; i++) {
				this.productList.push(this.productList[i]);
			}
		},
		methods: {
			init() {
				this.initBar();
			},
			// 初始化navBar
			initBar(){
				let parms = {
					"classScheme": "cat1"
				}
				uni.showLoading({
					title: "加载中..."
				})
				service.getGoodTopClass(parms).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					this.tabBars = data;
					this.dataList = this.randomfn();
					console.log(this.dataList);
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title: "获取顶部导航数据失败"
					})
				})
			},
			// 获取推荐数据
			getHotListByBar(){
				
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
					url: '/pages/home/messages'
				})
			},
			//搜索跳转
			toSearch() {
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/pages/home/search'
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
				this.initBar()
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
					url: `/pages/home/goods_detail?id=${e.id}`
				})
			},
			loadMore(e) {
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				if (this.dataList[e].data.length > 30) {
					this.dataList[e].loadingText = '没有更多了';
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.dataList[e].data.push(tpl['data' + Math.floor(Math.random() * 5)]);
				}
			},
			async changeTab(e) {
				let index = e.target.current;
				if(this.dataList[index].data.length === 0){
					this.addData(index)
				}
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
			
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize('tar'+i);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize('tar'+index),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.current;
				if(this.dataList[tabIndex].data.length === 0){
					this.addData(tabIndex)
				}
				if (this.tabIndex === tabIndex) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = tabIndex;
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingText: '加载更多...',
						data: []
					};
					if(i < 1){
						for (let j = 1; j <= 10; j++) {
							aryItem.data.push(tpl['data' + Math.floor(Math.random() * 5)]);
						}
					}
					ary.push(aryItem);
				}
				console.log(ary);
				return ary;
			}
		},
		created() {
			this.init();
		}
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
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
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

				.input {
					width: calc(100% - 60upx);
					height: 56upx;
					background-color: #ffffff;
					color: #666;
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
			height: 100%;
			position: relative;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/*  #endif  */
			.custom-tabs{	
				.uni-swiper-tab{
					line-height: 88upx;
					height: 88upx;
					border:none;
					background-color: #fff;
					z-index: 100;
					position: fixed;
					/* #ifdef H5 */
					top: 88upx;
					/* #endif */	
					/*  #ifdef  APP-PLUS  */
					top: calc(var(--status-bar-height) + 88upx);
					/* #endif */
					.swiper-tab-list{
						width:auto;
						position: relative;
						font-size: 26upx;
						color: #707070;
						padding: 0 20upx;
						box-sizing: border-box;
						&.active{
							color: #242424;
							font-size: 27upx;
							.bottom-line{
								width: 20%;
								height: 6upx;
								position: absolute;
								bottom: -20upx;
								left: 50%;
								transform: translateX(-50%);
								background-color: #242424;
							}
						}
					}
				}
			}
			
			.swiper-box{
				height: calc(100% - 120upx);
				padding-top: 88upx;
				box-sizing: border-box;
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
							height: 300upx;
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
			.uni-tab-bar-loading{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 60upx;
				color: #979797;
				font-size: 24upx;
				background-color: #f0f0f0;
				padding: 0;
			}
		}
		
	}
</style>
