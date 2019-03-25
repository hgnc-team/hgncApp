<template>
	<view class="shopCartPage" :style="minHeight">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor"
		 title="订单列表" :rightText="rightText" @click-right="onClickRight"></uni-nav-bar>
		<!-- 内容 -->
		<view class="content">
			<scroll-view scroll-x="true" class="scrollView" v-for="(ite,ind) in shopData" :key="ind" :id="ite.pro_id"
			 :scroll-left="ite.scrollLeft" @touchstart="touchS" @touchend="touchE">
				<view class="viewbox">
					<view class="shangpin uni-flex">
						<!-- #ifdef H5 -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<checkbox  :value="ite.isChecked+ ''" @change="proActive(ite)"></checkbox >
						</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<van-checkbox :value="ite.isChecked" @change="proActive(ite)"></van-checkbox>
						</view>
						<!-- #endif -->	
						<view class="shangpin-info uni-flex-item">
							<view class="img uni-inline-item" @tap="toDetail(ite.pro_id)">
								<image :src="ite.pro_img" mode="aspectFit"></image>
							</view>
							<view class="text-info uni-flex-item">
								<view class="title-text uni-ellipsis">
									<text class="name uni-h5">{{ ite.pro_name }}</text>
									<text class="tags uni-flex uni-text-small uni-text-gray">{{ ite.tags }} </text>
								</view>
								<view class="bottom-price">
									<view class="jiage uni-flex">
										<text class="danjia uni-inline-item">￥{{ ite.now_price }}</text>
										<text class="shuliang uni-inline-item uni-text-small">x {{ ite.pro_count }}</text>
									</view>
									<view class="numInput">
										<text class="reduce iconfont" @tap="changeCount(ite,-1)" :class="ite.pro_count == 0 ? 'numbox-disabled' : ''">-</text>
										<input class="input" type="number" v-model="ite.pro_count" />
										<text class="plus iconfont" @tap="changeCount(ite,1)">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="delete-view" @tap="deletePro(ite.pro_id)">删除</view>
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
		<view class="bottom-jiesuan uni-flex">
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
			<view class="btn uni-flex-item" @tap="jiesuan" :class="rightText=='完成'?'delete':''">{{rightText=='完成'?'删除':'结算'}}</view>
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
	export default {
		components: {
			uniIcon,
			uniNavBar
		},
		data() {
			return {
				rightText: '编辑',
				// 全选，返回
				isCheckAll: false,
				allPrice: 0, //所有价格
				shopData: [{
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
					},{
						pro_id: 3,
						pro_name: '刘涛推荐负离子乳胶枕，享有氧睡眠',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/good3.jpg',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					},{
						pro_id: 4,
						pro_name: '阿迪达斯SUPERSTAR金标贝壳头小白鞋 ',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/good4.jpg',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					},{
						pro_id: 3,
						pro_name: '刘涛推荐负离子乳胶枕，享有氧睡眠',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/good3.jpg',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					},{
						pro_id: 4,
						pro_name: '阿迪达斯SUPERSTAR金标贝壳头小白鞋 ',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/good4.jpg',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					}
				],
				//猜你喜欢列表
				productList: [
					{
						goods_id: 1,
						img: '../../static/img/common/good2.jpg',
						name: '阿玛熊红豆薏米粉480g熟早餐五谷核桃黑豆粉牛奶燕麦熟早餐五谷核桃黑豆粉牛奶燕麦',
						price: '￥68',
						slogan: '686人付款'
					},
					{
						goods_id: 2,
						img: '../../static/img/common/good6.jpg',
						name: 'VKE 小爱早教智能机器人语音互动 听故事儿童玩具wifi版',
						price: '￥288',
						slogan: '232人付款'
					},
					{
						goods_id: 3,
						img: '../../static/img/common/good7.jpg',
						name: '进口智利三文鱼400g',
						price: '￥216',
						slogan: '3235人付款'
					},
					{
						goods_id: 4,
						img: '../../static/img/common/good8.jpg',
						name: '【赠送小黄人杯子】意大利进口科砾霖牙膏2支',
						price: '￥58',
						slogan: '35人付款'
					}
				]
			};
		},
		methods: {
			init(){
				// 获取购物车商品列表
				this.getCartList();
			},
			getCartList(){
				uni.showLoading();
				// let userId = this.$store.state.userId;
				let userId = "e8b46f10-43c8-11e9-9de7-55194d563065";
				service.getCartList(userId).then(res=>{
					uni.hideLoading();
					const data = res.data.data;
					console.log(res)
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.data.data || err.errMsg,
					});
				})
			},
			// 获取商品推荐列表
			getRecommendList(){
				uni.showLoading();
				let userId = this.$store.state.userId;
				service.getCartList(userId).then(res=>{
					uni.hideLoading();
					const data = res.data.data;
					console.log(res)
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.data.data || err.errMsg,
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
				if (this.rightText == "编辑") {
					this.rightText = "完成";

				} else {
					this.rightText = "编辑";
					// 执行删除逻辑
				}
			},
			// 单击结算
			jiesuan() {
				console.log('跳转到支付详情页面');
				uni.navigateTo({
					url: '/pages/my/zhifu',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
			// 删除商品
			deletePro(id) {

			},
			// 去商品详情页
			toDetail(id){
				uni.navigateTo({
					url: `home/goods_detail?id=${id}`
				})
			}
			
		},
		// 单间商品的价格 x 数量
		filters: {
			totalprice(price, count) {
				console.log('当前项', price, count);
				return price * count;
			}
		},
		computed: {
			minHeight() {
				var systemInfo = uni.getSystemInfoSync();
				return `min-height:${systemInfo.windowHeight}px`;
			}
		},
		watch: { //深度监听所有数据，每次改变重新计算总价和总数
			shopData: {
				deep: true,
				handler(val, oldval) {
					this._totalPrice()
				}
			}
		},
		created() {
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
