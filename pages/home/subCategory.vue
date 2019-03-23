<template>
	<view class="subCategoryPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="search" :title="title"></uni-nav-bar>
		<!--  #ifdef  H5  -->
		<!-- 选项卡分类选择 -->
		<view class="custom-tabs uni-flex">
			<topTabMenu :current="tabs.current" :values="tabs.items" @clickItem="changeTabs" class="uni-inline-item" ></topTabMenu>
		</view>
		<!--  #endif    -->
		<view class="content">
			<!--  #ifdef  APP-PLUS  -->
			<van-tabs :active="active" z-index="10000" animated swipeable swipe-threshold="5" custom-class="custom-class" nav-class="nav-class" tab-class="tab-class" tab-active-class="tab-active-class">
				<van-tab :title="tab.name" v-for="(tab, i) in tabs.items" :key="i">
			<!--  #endif    -->
					<!-- 过滤 -->
					<view class="filter-wrap uni-flex">
						<view class="hot uni-flex-item uni-center">
							热门
						</view>
						<view class="price uni-flex-item uni-center">
							价格
						</view>
					</view>
					<!-- 商品列表 -->
					<view class="goods-list">
						<view class="product-list">
							<view class="product" v-for="product in productList" :key="product.id" @tap="toGoodDetail(product)">
								<image mode="widthFix" :src="product.img"></image>
								<view class="name">{{product.title}}</view>
								<view class="info">
									<view class="price">{{product.id}}</view>
									<view class="slogan">{{product.type}}</view>
								</view>
							</view>
						</view>
					</view>
			<!--  #ifdef  APP-PLUS  -->
				</van-tab>
			</van-tabs>
			<!--  #endif    -->
		</view>
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
		data(){
			return {
				title:"",
				tabs: {
					// 选项卡
					items: [],
					current: 0
				},
				page: 1,
				productList: [],
				currentPageindex: 0,
				
			}
		},
		onReachBottom() {
			uni.showToast({title: '触发上拉加载'});
// 			let len = this.productList.length;
// 			if (len >= 40) {
// 				this.loadingText = "到底了";
// 				return false;
// 			}
// 			let end_goods_id = this.productList[len - 1].goods_id;
// 			for (let i = 1; i <= 10; i++) {
// 				this.productList.push(this.productList[i]);
// 			}
		},
		methods: {
			// 获取顶部分类列表
			getSubCategory(id){
				let idArr = [];
				idArr.push(id);
				service.getGoodSecondClass({"topClass": idArr}).then(res=>{
					console.log(res);
					uni.hideLoading();
					let data = res.data.data;
					if(data.length > 0) {
						this.tabs.items = data;
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  err.data.data || err.errMsg,
					})
				})
			},
			// 获取商品列表
			getGoodsList(id){
				let params = {
					type: id,
					page: this.page
				};
				uni.showLoading();
				service.getGoodListByType(params).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					console.log(data);
					if(data.data.length > 0) {
						_.forEach(data.data, item=>{
							this.productList.push(item)
						})
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  err.data.data || err.errMsg,
					})
				})
			},
			// 返回
			onClickLeft(){
				uni.navigateBack()
			},
			// 跳转搜索页面
			onClickRight(){
				uni.navigateTo({
					url: "/pages/home/search"
				})
			},
			// 切换商品类型
			changeTabs(index){
				this.productList = [];
				this.getGoodsList(this.tabs.items[index].id);
			},
			// 跳转商品分类页面
			toGoodDetail(product){
				let id = product.id;
				uni.navigateTo({
					url: `/pages/home/goods_detail?${id}`
				})
			}
		},
		onLoad(options){
			this.title = options.name;
			this.getSubCategory(options.id);
			//  39有数据
			options.subId = "39";
			this.getGoodsList(options.subId);
		}
	}
</script>

<style lang="scss">
	.subCategoryPage{
		.content{
			position: relative;
			/* #ifdef H5 */
			top: 88upx;
			/* #endif */	
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/*  #endif  */
			
			.filter-wrap {
				height: 88upx;
				border-top: 1px solid #f0f0f0;
				align-items: center;
			}
			.goods-list {
// 				background-color: #f0f0f0;
// 				font-weight: 600;
						
				.product-list {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 30upx 30upx 0;
					box-sizing: border-box;
			
					.product {
						width: 47.75%;
						border-radius: 10upx;
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
	}
</style>
