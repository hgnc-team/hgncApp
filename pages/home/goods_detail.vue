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
			<customSwiper :swiperList="good.flowImages" @toSwiper="toSwiper" :height="520"></customSwiper>
			<view class="goods-info">
				<!-- 商品文字描述 -->
				<view class="info-item">
					<view class="uni-h4">
						{{good.title}}
					</view>
					<view class="uni-text-small text-color-gray">
						<text>日本直邮本土版 CPB肌肤之钥 2018钻光奢华气垫粉霜BB 12g日本直邮本土版 CPB肌肤之钥 2018钻光奢华气垫粉霜BB 12g日本直邮本土版 CPB肌肤之钥 2018钻光奢华气垫粉霜BB 12g</text>
					</view>
				</view>
				<!-- 商品价格积分 -->
				<view class="price-info info-item uni-flex">
					<view class="price uni-flex">
						<view class="uni-inline-item text-price uni-h4" style="font-size: 36upx;">
							￥{{good.price}}
						</view>
						<text class="uni-inline-item tag uni-text-small">
							可获双倍积分
						</text>
					</view>
					<!-- <view class="number uni-flex text-color-gray">
						<view class="icon uni-inline-item">
							<uni-icon type="plus"></uni-icon>
						</view>
						<view class="uni-inline-item">
							123
						</view>
					</view> -->
				</view>
				
				<!-- 优惠 -->
				<!-- <view class="preferential uni-flex">
					<view class="title uni-inline-item text-color-gray">
						优惠
					</view>
					<view class="uni-inline-item">
						可获得1,2324个积分
					</view>
				</view> -->
			</view>
			
			<!-- 商品详情图 -->
			<view class="detail-image common-pa-30">
				<view class="title uni-h4">
					商品详情
				</view>
				<rich-text :nodes="detailImage"></rich-text>
				<view class="image">
					<image src="/static/img/common/goodDetail.png" mode="widthFix"></image>
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
				<uni-icon type="star" @tap="toCart"></uni-icon>
				<uni-badge :text="total_num" type="primary" v-if="total_num - 0 > 0"></uni-badge>
			</view>
			<view class="btn add-to-cart uni-flex-item uni-center" @tap="selectSpecAction('toCart')">
				加入购物车
			</view>
			<view class="btn to-buy uni-flex-item uni-center" @tap="selectSpecAction('toBuy')">
				立即购买
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t uni-flex">
					<image class="uni-inline-item" :src="good.imageUrl"></image>
					<view class="right uni-flex-item uni-column">
						<text class="price text-price">¥328.00</text>
						<view class="selected uni-text-small">
							请选择
							<text class="selected-text" v-for="(sItem, sIndex) in specList" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text class="uni-bold">{{item.name}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected, disabled:childItem.disabled}"
							@click="selectSpec(childIndex, childItem.pid,childItem.disabled)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view>
				<view  class="attr-list uni-flex uni-row flex-right" style="padding-bottom: 150upx">
					<text class="uni-bold" style="padding-bottom: 20upx;">商品数量</text>
					<view class="number-box">
						<uni-number-box :min="1" @change="changeNum" :value="numberValue"></uni-number-box>
					</view>
				</view>
				<button class="btn" @click="specSeleted">确 定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniBadge,
		uniNavBar,
		uniNumberBox
	} from '@dcloudio/uni-ui';
	import { mapState, mapMutations, mapGetters} from 'vuex';
	import service from '../../common/service.js';
	import util from '../../common/util.js';
	import customSwiper from "../../components/common/custom-swiper.vue";
	import _ from "lodash";
	import share from "../../components/common/share.vue";
	export default {
		components: {
			uniIcon,
			uniBadge,
			uniNavBar,
			customSwiper,
			uniNumberBox,
			share
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				// 加入购物车数量
				numberValue: 1,
				// 加入购物车|直接购买
				type: "",
				// 商品内容
				good: {
					id:"",
					title: "",
					price: 0,
					detail: "",
					pointRate: "",
					imageUrl: "",
					flowImages: [],
				},
				// 图文详情
				detailImage: [],
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
				//猜你喜欢列表
				productList: [{
						goods_id: 0,
						img: '/static/img/common/good1.jpg',
						name: '老街口-红糖麻花500g/袋',
						price: '￥58',
						slogan: '1096人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/common/good2.jpg',
						name: '阿玛熊红豆薏米粉480g熟早餐五谷核桃黑豆粉牛奶燕麦熟早餐五谷核桃黑豆粉牛奶燕麦',
						price: '￥68',
						slogan: '686人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/common/good3.jpg',
						name: '刘涛推荐负离子乳胶枕，享有氧睡眠',
						price: '￥368',
						slogan: '1234人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/common/good4.jpg',
						name: '阿迪达斯SUPERSTAR金标贝壳头小白鞋',
						price: '￥668',
						slogan: '678人付款'
					}
				],
				specList: [
					{
						id: 1,
						name: '尺码',
					},
					{	
						id: 2,
						name: '颜色',
					},
				],
				specChildList: [
					{
						id: 1,
						pid: 1,
						name: '46',
						disabled: false
					},
					{
						id: 2,
						pid: 1,
						name: '45',
						disabled: true
					},
					{
						id: 3,
						pid: 1,
						name: '44',
						disabled: false
					},
					{
						id: 4,
						pid: 1,
						name: '43',
						disabled: true
					},
					{
						id: 5,
						pid: 1,
						name: '42',
						disabled: false
					},
					{
						id: 6,
						pid: 1,
						name: '41.5',
						disabled: true
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
						disabled: false
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
						disabled: true
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
						disabled: false
					},
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(this.good.id) {
				// 定义分享内容
				this.shareObj = {
					// 分享链接
					strShareUrl: "https://uniapp.dcloud.io",
					// 分享标题
					strShareTitle: this.good.title,
					// 内容描述
					strShareSummary: this.good.detail,
					// 分享图标
					strShareImageUrl: this.good.imageUrl
				}
				// 调用分享组件里面的分享方法
				if(e.index === 0) {
					this.$refs.shareChild.openShareBox();
				}
			}
		},
		computed:{
			...mapState(['userId', 'shopCart_store']),
			...mapGetters(["total_num"]),
			goodsList(){
				return this.shopCart_store.goodsList;
			}
		},
		methods: {
			...mapMutations(['ADD_GOODS']),
			init(id){
				let ids = [];
				ids.push(id)
				uni.showLoading();
				service.getGoodListById({ids: ids}).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					if(data.length > 0) {
						this.good = data[0];
						// 获取图文详情
						this.initDetailImage(this.good.detailImages);
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
			// 初始化图文详情
			initDetailImage(images){
				let imagsNodes = [];
				_.forEach(images, item => {
					imagsNodes.push(`<img style="width:100%;display:block;" src="${item.img}" />`)
				})
				this.detailImage = imagsNodes;
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
					// 模拟底部跳转
					util.switchTab("shopCart");
				}).catch(()=>{});
			},
			// 打开规格选择弹框
			selectSpecAction(type){
				// 判断是否登录
				this.$guardToLogin().then(()=>{
					// 选择规格
					this.specClass = 'show';
					this.type = type;
				}).catch(()=>{});
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, pid, disabled){
				if(disabled) {
					return
				}
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})
			
				this.$set(list[index], 'selected', true);
				//存储已选择
				this.specSelected.forEach(item=>{
					if(item.pid === pid){
						item = list[index];
					}
				})
			},
			// 修改加入购物车产品数量
			changeNum(value){
				this.numberValue = value;
			},
			stopPrevent(){},
			// 加入购物车
			addToCart(){
				// 查询商品是否已经存在于购物车
				let isExist = _.findIndex(this.goodsList, item => item.goodsId === this.good.id) > -1;
				console.log(isExist);
				console.log(this.goodsList.length);
				// 购物车增加长度限制 最多50个
				if(!isExist && this.goodsList.length >= 2) {
					uni.showToast({
						icon:"none",
						title: "亲，购物车商品数量超出了限制哦，请删除部分后在添加"
					})
					return
				}
				let parms = {
					userId: this.userId,
					goodsId: this.good.id
				}
				uni.showLoading();
				service.addToCart(parms).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title:"加入购物车成功"
					});
					let data = res.data.data;
					// 同一个商品加入购物城时，不增加数量
					if(!isExist) {
						// 同步vuex数据
						this.ADD_GOODS({
							goodsId: this.good.id
						});
					}
					
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title: err.errMsg || err.data.data
					})
				})
			},
			// 创建订单；
			creatOrder(){
				// 创建订单；
				
				uni.navigateTo({
					url: '/pages/shopCart/pay'
				});
			},
			// 规格选定后
			specSeleted(){
				
				if(this.type === "toCart") {
					// 加入购物车
					this.addToCart();
				} else {
					// 直接购买
					this.creatOrder();
				}
				// 关闭弹框
				this.specClass = 'none';
			}
			
		},
		onLoad(e) {
			this.init(e.id);
			//规格 默认选中第一条
			this.specList.forEach(item=>{
				for(let cItem of this.specChildList){
					if(cItem.pid === item.id){
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			})
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
		/*  弹出层 */
		.popup {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
			&.show {
				display: block;
				.mask{
					animation: showPopup 0.2s linear both;
				}
				.layer {
					animation: showLayer 0.2s linear both;
				}
			}
			&.hide {
				.mask{
					animation: hidePopup 0.2s linear both;
				}
				.layer {
					animation: hideLayer 0.2s linear both;
				}
			}
			&.none {
				display: none;
			}
			.mask{
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				background-color: rgba(0, 0, 0, 0.4);
			}
			.layer {
				position: fixed;
				z-index: 99;
				bottom: 0;
				width: 100%;
				min-height: 40vh;
				background-color: #fff;
				padding: 30upx;
				box-sizing: border-box;
				.a-t{
					position: relative;
					top: -80upx;
					left: 0;
					image{
						width:240upx;
						height: 240upx;
						margin-right: 50upx;
					}
					.right{
						display: flex;
						justify-content: flex-end;
						.price{
							font-size: 36upx;
							font-weight: 600;
						}
						.selected{
							.selected-text{
								margin-left: 20upx;
							}
						}
					}
				}
				.attr-list{
					display: flex;
					flex-direction: column;
					font-size: 30upx;
					color: #666;
					padding-bottom: 20upx;
					.number-box{
						.uni-numbox{
							transform: scale(0.85);
							transform-origin: left;
						}
					}
				}
				.item-list{
					padding: 20upx 0 0;
					display: flex;
					flex-wrap: wrap;
					text{
						display: flex;
						align-items: center;
						justify-content: center;
						background: #eee;
						margin-right: 20upx;
						margin-bottom: 20upx;
						min-width: 60upx;
						height: 60upx;
						padding: 0 20upx;
						font-size: 28upx;
						color: #242424;
					}
					.selected{
						background: #242424;
						color: #fff;
					}
					.disabled{
						color: #ccc;
					}
				}
				.btn{
					position: absolute;
					width: 100%;
					bottom: 0;
					height: 100upx;
					line-height: 100upx;
					background: #242424;
					font-size: 30upx;
					color: #fff;
					border-radius: 0;
					margin:0 -30upx;
				}
			}
			@keyframes showPopup {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}
			@keyframes hidePopup {
				0% {
					opacity: 1;
				}
				100% {
					opacity: 0;
				}
			}
			@keyframes showLayer {
				0% {
					transform: translateY(120%);
				}
				100% {
					transform: translateY(0%);
				}
			}
			@keyframes hideLayer {
				0% {
					transform: translateY(0);
				}
				100% {
					transform: translateY(120%);
				}
			}
		}
	}
</style>
