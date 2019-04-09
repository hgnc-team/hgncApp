<template>
	<view class="shopCartPage" :style="setStyle">
	<!-- <view class="shopCartPage"> -->
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor"
		 title="购物车" :rightText="rightText" @click-right="onClickRight"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<view class="no-data" v-if="showNoData">
				<image src="/static/img/common/emptyCart.jpg" mode="aspectFit"></image>
				<view class="empty-tips flex-center-center">
					空空如也
					<view class="navigator" v-if="hasLogin" @tap="navToIndex"> 随便逛逛 ></view>
					<view class="navigator" v-if="!hasLogin" @tap="navToLogin"> 去登陆></view>
				</view>
			</view>
			<scroll-view scroll-x="true" class="scrollView" v-for="(item,index) in goodsList" :key="index" :id="item.id"
			 :scroll-left="item.scrollLeft" @touchstart="touchS" @touchend="touchE" >
				<view class="viewbox">
					<view class="shangpin uni-flex">
						<!-- #ifdef H5 -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<checkbox  :value="item.isChecked+ ''" @change="proActive(item)"></checkbox >
						</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<van-checkbox :value="item.isChecked" @change="proActive(item)"></van-checkbox>
						</view>
						<!-- #endif -->	
						<view class="shangpin-info uni-flex-item">
							<view class="img uni-inline-item" @tap="toDetail(item.id)">
								<image :src="item.imgUrl" mode="aspectFit"></image>
							</view>
							<view class="text-info uni-flex-item">
								<view class="title-text uni-ellipsis">
									<text class="name uni-h5">{{ item.name }}</text>
									<text class="tags uni-flex uni-text-small uni-text-gray">{{ item.tags }} </text>
								</view>
								<view class="bottom-price">
									<view class="jiage uni-flex">
										<text class="danjia uni-inline-item">￥{{ item.price }}</text>
										<text class="shuliang uni-inline-item uni-text-small">x {{ item.num }}</text>
									</view>
									<view class="numInput">
										<text class="reduce iconfont" @tap="changeCount(item,-1)" :class="item.num == 0 ? 'numbox-disabled' : ''">-</text>
										<input class="input" type="number" v-model="item.num" />
										<text class="plus iconfont" @tap="changeCount(item,1)">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="delete-view" @tap="deleteSingle(index, item.goodsId)">删除</view>
				</view>
			</scroll-view>
			<view class="place"></view>
			<!-- 商品推荐 -->
			<view class="goods-list">
				<view class="title">商品推荐</view>
				<view class="product-list">
					<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toDetail(product.goods_id)">
						<image mode="widthFix" :src="product.img"></image>
						<view class="name">{{product.name}}</view>
						<view class="info">
							<view class="price">{{product.price}}</view>
							<view class="slogan">{{product.slogan}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<!-- 底部结算 -->
		<view class="bottom-jiesuan uni-flex" v-if="!showNoData">
			<view class="info uni-flex">
				<view class="allSelectText uni-flex">
					<!-- #ifdef H5 -->
					<view class="uni-inline-item">
						<checkbox  :value="isCheckAll + ''" @change="allCheck" style="margin-right: 20upx;"></checkbox >
					</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<view class="uni-inline-item">
						<van-checkbox :value="isCheckAll" @change="allCheck" style="margin-right: 20upx;z-index: 100;"></van-checkbox>
					</view>
					<!-- #endif -->
					<view class="allText">全选</view>
				</view>
				<view class="total-price" v-if="rightText=='编辑'">
					总计：<text class="text-price uni-bold">￥{{ allPrice }}</text>
				</view>
			</view>
			<view class="btn uni-flex-item" @tap="done(rightText=='完成')" :class="rightText=='完成'?'delete':''">{{rightText=='完成'?'删除':'结算'}}</view>
		</view>
		
	</view>
</template>

<script>
	var startX = 0;
	var endX = 0;
	import service from '../../common/service.js';
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import _ from "lodash";
	import { mapState, mapMutations, mapActions } from 'vuex';
	export default {
		components: {
			uniIcon,
			uniNavBar
		},
		data() {
			return {
				rightText: '',
				// 全选，返回
				isCheckAll: false,
				allPrice: 0, //所有价格
				//猜你喜欢列表
				productList: [
					{
						goods_id: 1,
						img: '/static/img/common/good2.jpg',
						name: '阿玛熊红豆薏米粉480g熟早餐五谷核桃黑豆粉牛奶燕麦熟早餐五谷核桃黑豆粉牛奶燕麦',
						price: '￥68',
						slogan: '686人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/common/good6.jpg',
						name: 'VKE 小爱早教智能机器人语音互动 听故事儿童玩具wifi版',
						price: '￥288',
						slogan: '232人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/common/good7.jpg',
						name: '进口智利三文鱼400g',
						price: '￥216',
						slogan: '3235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/common/good8.jpg',
						name: '【赠送小黄人杯子】意大利进口科砾霖牙膏2支',
						price: '￥58',
						slogan: '35人付款'
					}
				]
			};
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 pullToRefresh
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		computed: {
			...mapState(['hasLogin', 'userId', 'shopCart_store']),
			setStyle() {
				let paddingBottom = this.hasLogin ? 98 : 0;
				return `padding-bottom:${paddingBottom}upx`;
			},
			showNoData(){
				return !this.hasLogin || this.goodsList.length == 0
			},
			goodsList(){
				return this.shopCart_store.goodsList;
			}
		},
		methods: {
			// 注入vuex的两个方法
			...mapMutations(['INIT_GOODS']), 
			...mapActions(['deleteGoods']),
			init(){
				// 获取购物车商品列表
				this.getCartList();
			},
			getCartList(){
				uni.showLoading();
				let userId = this.userId;
				// let userId = "660efd50-4c6f-11e9-bc7c-95dfc83db603";
				service.getCartList(userId).then(res=>{
					uni.hideLoading();
					const data = res.data.data.data;
					_.forEach(data, item => {
						item.scrollLeft = 0;
						item.isChecked = false;
					})
					// 同步购物车数据;
					this.INIT_GOODS(data);
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.errMsg || err.data.data,
					});
				})
			},
			// 获取商品推荐列表
			getRecommendList(){
				uni.showLoading();
				let userId = this.userId;
				service.getCartList(userId).then(res=>{
					uni.hideLoading();
					const data = res.data.data;
					console.log(res)
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.errMsg || err.data.data,
					});
				})
			},
			touchS(e) {
				startX = e.mp.changedTouches[0].clientX;
			},
			touchE(e) {
				endX = e.mp.changedTouches[0].clientX;
				if (Math.abs(endX - startX) > 10) {
					if (endX - startX > 0) {
						_.forEach(this.shopData, (item)=>{
							_.forEach(item, (goods) => {
								if (goods.pro_id == e.currentTarget.id) {
									goods.scrollLeft = 0;
								}
							})
						})
					} else {
						_.forEach(this.shopData, (item)=>{
							_.forEach(item, (goods) => {
								if (goods.pro_id == e.currentTarget.id) {
									goods.scrollLeft = 75;
								}
							})
						})
					}
				}
			},
			// 编辑
			onClickRight() {
				if(this.showNoData) {
					return
				}
				if (this.rightText == "编辑") {
					this.rightText = "完成";

				} else {
					this.rightText = "编辑";
					// 执行删除逻辑
				}
			},
			// 点击取消选中商品
			proActive(pro) {
				pro.isChecked = !pro.isChecked;
				pro.isChecked ?
					this._checkTrue(pro) :
					this._checkFalse(pro);
				// 计算商品价格
				this._totalPrice();
				
			},
			// 选择商品
			_checkTrue() {
				let listLen = this.shopData.length;
				let allCount = 0;
				_.forEach(this.shopData, (item)=>{
					if(item.isChecked) {
						allCount++;
					}
				})
				if(allCount == listLen) {
					this.isCheckAll = true;
				}
			},
			// 取消商品
			_checkFalse() {
				this.isCheckAll = false;
			},
			// 全选
			allCheck() {	
				this.isCheckAll = !this.isCheckAll;
				this.isCheckAll ?
					this.shopData.forEach((item) => {
						item.isChecked = true;
					}) :
					this.shopData.forEach((item) => {
						item.isChecked = false;
					});
			},
			changeCount(val, way) {
				if (way > 0) {
					val.pro_count++;
				} else {
					val.pro_count--;
					if (val.pro_count < 1) {
						val.pro_count = 1;
					}
				}
			},
			// 每次调用此方法，将初始值为0，便利价格并累加
			_totalPrice() {
				this.allPrice = 0;
				this.shopData.forEach(item => {
					this.allPrice += item.isChecked && item.now_price * item.pro_count;
				});
				if(this.allPrice <= 0) {
					this.isCheckAll = false;
				}
			},
			// 单个删除
			deleteSingle(index, id) {
				let ids = [{
					id: id, 
					index: index
				}]
				this.deletePro(ids);
			},
			// 多个删除
			deleteMultiple() {
				let ids = [];
				_.forEach(this.shopData, (item, index) => {
					if(item.isChecked) {
						ids.push({
							id:item.goodsId, 
							index: index
						})
					}
				})
				this.deletePro(ids);
			},
			// 删除商品
			deletePro(idsArr) {
				let ids = [];
				let indexs = [];
				_.forEach(idsArr, item => {
					ids.push(item.id);
					indexs.push(item.index)
				})
				let params = {
					userId: this.userId,
					ids: ids
				}
				uni.showLoading({
					title: "删除中..."
				})
				service.deleteFromCart(params).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title: "删除成功"
					})
					// 分发删除动作
					this.deleteGoods(idsArr);
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.errMsg || err.data.data,
					});
				})
			},
			// 底部按钮（结算 | 删除）
			done(isDelete) {
				// 删除
				if(isDelete) {
					this.deleteMultiple();
				} else {
					// 结算
					console.log('跳转到支付详情页面');
					uni.navigateTo({
						url: '/pages/shopCart/pay'
					});
				}
			},
			// 去商品详情页
			toDetail(id){
				uni.navigateTo({
					url: `/pages/home/goods_detail?id=${id}`
				})
			},
			// 去首页
			navToIndex(){
				this.$store.dispatch("change_page", "home");
				uni.navigateTo({
					url: "/pages/index"
				})
			},
			// 去登录
			navToLogin(){
				uni.navigateTo({
					url: `/pages/login/login?pageCode=shopCart`
				})
			}
		},
// 		onReachBottom() {
// 			uni.showToast({title: '触发上拉加载'});
// 		},
		// 单间商品的价格 x 数量
		filters: {
			totalprice(price, count) {
				console.log('当前项', price, count);
				return price * count;
			}
		},
		watch: { //深度监听所有数据，每次改变重新计算总价和总数
			shopData: {
				deep: true,
				handler(val, oldval) {
					this._totalPrice();
				}
			},
			showNoData(){
				
			}
		},
		created() {
			this.rightText = this.showNoData ? "" : "编辑";
			this.init();
		}
	};
</script>

<style lang="scss">
	.shopCartPage{
		background-color: #f0f0f0;
		padding-bottom: 98upx;
		.content{
			margin-bottom: 150upx;
			background-color: #fff;
			.no-data{
				width: 100%;
				height: 300upx;
				padding-top: 200upx;
				text-align: center;
				color: #666;
				image{
					width: 240upx;
					height: 160upx;
					margin-bottom:30upx;
				}
				.empty-tips{
					display:flex;
					font-size: 28upx;
					color: #666;
					text-align: center;
					.navigator{
						color: #4c9bfa;
						margin-left: 16upx;
					}
				}
			}
			.scrollView{
				width: 100%;
				height: 200upx;
				.viewbox {
					width: 900upx;
					height: 200upx;
					display: flex;
					.shangpin{
						width: 760upx;
						padding: 36upx 30upx;
						display: flex;
						border-bottom: 1px solid #f0f0f0;
						box-sizing: border-box;
						.shangpin-info{
							display: flex;
							.img {
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
							.text-info {
								width: 400upx;
								.title-text{
									
								}
								.bottom-price{
									position: relative;
									.danjia{
										color: #59a0fa;
										margin-right: 10upx ;
									}
									.shuliang{
										color:#666;
									}
									.numInput{
										position: absolute;
										right: 0upx;
										top: -10upx;
										text {
											float: left;
											color: #999;
											font-size: 22upx;
											line-height: 50upx;
										}
										.iconfont{
											font-size: 42upx;
										}
										
										input {
											display: inline-block;
											height: 40upx;
											width: 56upx;
											margin: 0 20upx;
											float: left;
											text-align: center;
											line-height: 40upx;
											font-size: 24upx;
											color: #999;
											border: 1upx solid #f0f0f0;
										}
										
										.numbox-disabled {
											color: #c0c0c0;
										}
									}
								}
							}
						}
					}
					.delete-view{
						width: 150upx;
						background-color: #f44938;
						color: #FFFFFF;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.place{
				width: 100%;
				height: 30upx;
				background-color: #F0F0F0;
			}
			.goods-list {
				background-color: #fff;
				font-weight: 600;
				padding-top: 20upx;
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
		.jiesuan {
			padding: 30upx 30upx 30upx;
			color: #333333;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			box-sizing: border-box;
		}
		.bottom-jiesuan {
			width: 100%;
			height: 98upx;
			box-sizing: border-box;
			position: fixed;
			bottom: 120upx;
			display: flex;
			z-index: 1000;
			box-shadow: 0px 0px 4upx 0px rgba(0, 0, 0, 0.1);
			.info {
				box-sizing: border-box;
				padding-left: 14upx;
				width: calc(100% - 166upx);
				font-size: 24upx;
				color: #333333;
				background-color: #FFFFFF;
				/* 全选的文字 */
				.allSelectText {
					width: 150upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.total-price{
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20upx;
				}
			}
			
			.btn {
				width: 166upx;
				line-height: 98upx;
				color: #FFFFFF;
				font-size: 30upx;
				text-align: center;
				background-color: #000;
			
				&.delete {
					background-color: #f44938;
				}
			}
		}
	}
</style>
