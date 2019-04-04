<template>
	<view class="subCategoryPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		
		<!-- 分类导航 -->
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="'tar'+index" :data-current="index" @tap="tapTab">
				{{tab.name}}
				<view class="bottom-line"></view>
			</view>
		</scroll-view>
		<!-- 筛选条件 -->
		<view class="filters uni-flex uni-row">
			<view class="default uni-flex-item flex-center-center uni-center" :class="currentFilter=='hot'?'active':''" @tap="changeFilter('hot')">
				热门
				<view class="bottom-line"></view>
			</view>
			<view class="price uni-flex-item flex-center-center uni-center" :class="currentFilter=='price'?'active':''" @tap="changeFilter('price')">
				价格
				<view class="bottom-line"></view>
			</view>
		</view>
		<!-- 商品内容 -->
		<swiper :current="tabIndex" class="content" :duration="300" @change="swiperChangeTab">
			<swiper-item v-for="(tab,index1) in dataList" :key="index1">
				<scroll-view class="list" :class="'list'+ index1" scroll-y @scrolltolower="loadMore(index1)" scroll-top="0" @scroll="onPageScroll">		
					<view class="goods-list">
						<!-- 商品列表 -->
						<view class="product" v-for="(item,index2) in tab.data" :key="index2" @tap="toGoods(item)" :id="'swiper'+index1">		
							<view class="uni-media-list-logo">
								<image class="image" lazy-load :class="{lazy:!item.show}" :data-index="index2" @load="onLoad" :src="item.show?item.imageUrl:''" />
								<image class="image placeholder" :class="{loaded:item.loaded}" :src="placeholderSrc" />
							</view>
							<view class="name">{{item.title}}</view>
							<view class="info">
								<view class="price">{{item.price}}</view>
								<!-- <view class="slogan">{{item.slogan}}</view> -->
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
	</view>
</template>

<script>
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import _ from 'lodash';
	import service from '../../common/service.js';
	import topTabMenu from "../../components/common/topTabMenu.vue";
	export default {
		components: {
			uniIcon,
			uniNavBar,
			topTabMenu
		},
		data() {
			return {
				// 导航栏标题
				title: "",
				tabBars: [],
				tabIndex: 0,
				scrollLeft: 0,
				// 筛选条件
				currentFilter: 'hot',
				page: 1,
				dataList: [],
				// 图片默认路径
				placeholderSrc: "/static/img/logo@0.5x.png",

			}
		},
		onReachBottom() {
			uni.showToast({
				title: '触发上拉加载'
			});
		},
		methods: {
			// 初始化顶部分类
			initSubCategory(id) {
				let idArr = [];
				idArr.push(id);
				service.getGoodSecondClass({
					"topClass": idArr
				}).then(res => {
					uni.hideLoading();
					let data = res.data.data;
					if (data.length > 0) {
						this.tabBars = data;
						// 设置当前tab
						this.tabIndex = this.getCurrentTab(id);
						// 处理产品列表
						this.initDataList(this.tabBars);
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg || err.data.data,
					})
				})
			},
			// 获取当前tabIndex
			getCurrentTab(id){
				let index = _.findIndex(this.tabBars, item => item.id === id);
				return index > -1 ? index : 0;
			},
			// 初始化产品列表
			initDataList(tabBars){
				_.forEach(tabBars, item => {
					this.dataList.push({
						loadingText: '加载更多...',
						data: [],
					})
				})
			},
			// 获取商品列表
			getGoodsList(id, orderBy) {
				let params = {
					type: id,
					page: this.page,
					pageSize: 10,
					orderBy: orderBy
				};
				uni.showLoading();
				service.getGoodListByType(params).then(res => {
					uni.hideLoading();
					let data = res.data.data;
					console.log(data);
					if (data.data.length > 0) {
						_.forEach(data.data, item => {
							// 初始化懒加载相关配置
							item.show = false;
							item.loaded = false;
						})
						this.dataList[this.tabIndex].data = _.concat(this.dataList[this.tabIndex].data, data.data);
					} else {
						this.dataList[this.tabIndex].loadingText = '没有更多了';
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title: err.errMsg || err.data.data,
					})
				})
			},
			// 返回
			onClickLeft() {
				uni.navigateBack()
			},
			// 跳转搜索页面
			onClickRight() {
				uni.navigateTo({
					url: "/pages/home/search"
				})
			},
			// 修改筛选条件
			changeFilter(type){
				// type： deafult sales  price
				// 价格可以切换升降序
				if(type === "price") {
					this.currentFilter = type;
					this.goodsList = [];
					this.getGoodsListByOrder();
					this.isPriceDesc = !this.isPriceDesc;
					return
				}
				
				// 热门
				if(this.currentFilter != type){
					this.currentFilter = type;
					this.goodsList = [];
					this.getGoodsListByOrder();
				}
			},
			// 跳转商品详情
			toGoodDetail(product) {
				let id = product.id;
				uni.navigateTo({
					url: `/pages/home/goods_detail?${id}`
				})
			},
			loadMore(e) {
				// console.log(123123)
				// setTimeout(() => {
					this.addData(e);
				// }, 500);
				let timer = setTimeout(()=>{
					this.load();
					timer = null;
				},30)	
			},
			addData(e) {
				if (this.dataList[e].data.length > 30) {
					this.dataList[e].loadingText = '没有更多了';
					return;
				}
// 				for (let i = 1; i <= 10; i++) {
// 					this.dataList[e].data.push(tpl['data' + Math.floor(Math.random() * 5)]);
// 				}
			},
			// 滑动切换商品类型
			async swiperChangeTab(e) {
				let index = e.target.current;
				if (this.dataList[index].data.length === 0) {
					this.addData(index)
				}
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				this.setScrollLeft(index);
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题

				let timer = setTimeout(() => {
					this.load();
					timer = null;
				}, 100)
			},
			//得到元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			//点击切换tab-bar
			async tapTab(e) {
				let tabIndex = e.target.dataset.current;
				if (this.dataList[tabIndex].data.length === 0) {
					this.addData(tabIndex)
				}
				if (this.tabIndex === tabIndex) {
					return false;
				} else {
					this.setScrollLeft(tabIndex);
					this.isClickChange = true;
					this.tabIndex = tabIndex;
				}
				let timer = setTimeout(() => {
					this.load();
					timer = null;
				}, 100)
			},
			// 设置顶部nav的滚动距离
			async setScrollLeft(index) {
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				// let subCategoryNavWidth = uni.upx2px(100);
				let width = 0;
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize('tar' + i);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize('tar' + index),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
			},
			// 图片懒加载
			load() {
				uni.createSelectorQuery().in(this).selectAll(`#swiper${this.tabIndex} .lazy`).boundingClientRect((images) => {
					images.forEach((image, index) => {
						if (image.top <= this.windowHeight) {
							// this.dataList[this.tabIndex].data[image.dataset.index].show = true;
							let item = Object.assign({}, this.dataList[this.tabIndex].data[image.dataset.index]);
							item.show = true;
							// 重新刷新数据
							this.$set(this.dataList[this.tabIndex].data, image.dataset.index, item);
						}
					})
				}).exec()
			},
			// 图片加载完毕的回调
			onLoad(e) {
				// 图片url为空就不会执行这里
				// this.dataList[this.tabIndex].data[e.target.dataset.index].loaded = true;
				let item = Object.assign({}, this.dataList[this.tabIndex].data[e.target.dataset.index]);
				item.loaded = true;
				this.$set(this.dataList[this.tabIndex].data, e.target.dataset.index, item);
			},
			// Scroll-view组件的滚动监听
			onPageScroll: _.throttle(function(){
				// 控制图片懒加载
				this.load();
				// 控制刷新开启关闭
				this.isSupportRefresh();
			}, 100)
		},
		onLoad(options) {
			// 获取设备高度
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			// 获取标题
			this.title = options.name;
			// 初始化分类列表
			this.initSubCategory(options.id);
			//  39有数据
			options.subId = "39";
			// 获取分类下的商品列表
			let orderBy = [["createTime", "desc"]];
			this.getGoodsList(options.subId, orderBy);
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
	}
	.subCategoryPage {
		width: 100%;
		height: 100%;
		#tab-bar {
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			border: none;
			background-color: #fff;
			z-index: 1000;
			position: fixed;
			border-bottom: 1upx solid #f0f0f0;
			left: 0;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/* #endif */
			.swiper-tab-list {
				width: auto;
				position: relative;
				font-size: 26upx;
				color: #707070;
				padding: 0 20upx;
				box-sizing: border-box;

				&.active {
					color: #242424;
					font-size: 27upx;

					.bottom-line {
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
		
		.filters{
			width: 100%;
			height: 88upx;
			background-color: #fff;
			z-index: 100;
			position: fixed;
			left: 0;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/* #endif */
			border-bottom: 1upx solid #f0f0f0;
			.uni-flex-item {
				color:#aaa;
				position: relative;
			}
			.active{
				color:#242424;
				font-size: 32upx;
			}
		}
		.content {
			width: 100%;
			height: calc(100% - 170upx);
			/* #ifdef H5 */
			padding-top: 258upx;
			/* #endif */
			/*  #ifdef  APP-PLUS  */
			padding-top: calc(var(--status-bar-height) + 258upx);
			/*  #endif  */

			.filter-wrap {
				height: 88upx;
				border-top: 1px solid #f0f0f0;
				align-items: center;
			}

			.goods-list {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 0 30upx;
				box-sizing: border-box;
				.product {
					width: 47.75%;
					background-color: #fff;
					padding: 10upx;
					box-sizing: border-box;
					.placeholder {
						opacity: 0.1;
						// transition: opacity 0.2s linear;
					}
					
					.placeholder.loaded {
						opacity: 0;
					}
					
					.uni-media-list-logo {
						width: 100%;
						height: 300upx;
						position: relative;
						image{
							width: 100%;
							height: 100%;
						}
					}
					
					.uni-media-list-logo .image {
						position: absolute;
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
</style>
