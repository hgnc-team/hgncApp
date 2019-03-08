<template>
	<view class="homePage">
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<!-- 消息 -->
			<view class="messages" @tap="goMessagesPage">
				<uni-icon class="icon" type="email" size="30"></uni-icon>
				<uni-badge text="2" type="error" size="small"></uni-badge>
			</view>
			<!-- 搜索 -->
			<view class="input">
				<uni-icon class="icon" type="search" size="24"></uni-icon>
				<input placeholder="名称,类型" @tap="toSearch()" />
			</view>
			<!-- 切换地理位置 -->
			<view class="local">
				<view class="text">武汉</view>
				<uni-icon class="icon" type="arrowdown" size="18"></uni-icon>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 选项卡分类选择 -->
		<view class="tabs">
			<topTabMenu :current="tabs.current" :values="tabs.items" @clickItem="changeTabs"></topTabMenu>
		</view>
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
	import topTabMenu from "../../components/common/top_tabMenu.vue";
	import { uniBadge, uniIcon } from '@dcloudio/uni-ui'
	export default {
		components: {
			topTabMenu,
			uniIcon,
			uniBadge
		},
		data() {
			return {
				tabs: {
					// 选项卡
					items: ['全部','推荐','手机','电脑','箱包'],
					current: 0
				},
				//轮播
				swiperList:[
					{sid:0,src:'自定义src0',img:'../../../static/HM-shophome/swiper-img/0.jpg'},
					{sid:1,src:'自定义src1',img:'../../../static/HM-shophome/swiper-img/1.jpg'},
					{sid:2,src:'自定义src2',img:'../../../static/HM-shophome/swiper-img/2.jpg'},
					{sid:3,src:'自定义src3',img:'../../../static/HM-shophome/swiper-img/3.jpg'}
				],

				//推荐商品 3个
				pickList:[
					{ goods_id: 0, img: '../../../static/HM-shophome/pick-img/p1.jpg', price: '￥168', slogan:'限时抢购' },
					{ goods_id: 1, img: '../../../static/HM-shophome/pick-img/p2.jpg', price: '￥168', slogan:'精选商品' },
					{ goods_id: 2, img: '../../../static/HM-shophome/pick-img/p3.jpg', price: '￥168', slogan:'今日疯抢' }
				],
				//猜你喜欢列表
				productList:[
					{ goods_id: 0, img: '../../../static/HM-shophome/img/p1.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 1, img: '../../../static/HM-shophome/img/p2.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 2, img: '../../../static/HM-shophome/img/p3.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 3, img: '../../../static/HM-shophome/img/p4.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 4, img: '../../../static/HM-shophome/img/p5.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 5, img: '../../../static/HM-shophome/img/p6.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 6, img: '../../../static/HM-shophome/img/p7.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 7, img: '../../../static/HM-shophome/img/p8.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 8, img: '../../../static/HM-shophome/img/p9.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' },
					{ goods_id: 9, img: '../../../static/HM-shophome/img/p10.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' }
				],
				currentPageindex: 0,
				headerPosition:"fixed",
				loadingText:"正在加载..."
				
			};
		},
		computed:{
			list(){
				console.log(this.$store.state.list)
				return this.$store.state.list;
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom(){
			// uni.showToast({title: '触发上拉加载'});
			let len = this.productList.length;
			if(len>=40){
				this.loadingText="到底了";
				return false;
			}
			let end_goods_id = this.productList[len-1].goods_id;
			for(let i=1;i<=10;i++){
				let goods_id = end_goods_id+i;
				let p = { goods_id: goods_id, img: '../../../static/HM-shophome/img/p'+(goods_id%10==0?10:goods_id%10)+'.jpg', name: '商品名称商品名称商品名称商品名称商品名称', price: '￥168', slogan:'1235人付款' };
				this.productList.push(p);
			}
		},
		onLoad() {},
		methods: {
			//消息页跳转
			goMessagesPage(){
				uni.scanCode({
					success:(res)=>{
						uni.showToast({title: '条码内容：' + res.result});
					}
				});
			},
			//搜索跳转
			toSearch(){
				uni.hideKeyboard();
				uni.navigateTo({
					url: '../../home/search'
				})
			},
			// 切换选项卡
			changeTabs(index){
				if (this.tabs.current !== index) {
					this.tabs.current = index;
				}
			},
			//轮播图跳转
			toSwiper(e){
				uni.showToast({title: e.src});
			},
			//推荐商品跳转
			toPick(e){
				uni.showToast({title: '推荐商品'+e.goods_id});
			},
			//商品跳转
			toGoods(e){
				uni.showToast({title: '商品'+e.goods_id});
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
		}
	}
</script>

<style lang="scss">
.homePage{
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
		height: var(--status-bar-height);//表示状态栏的高度。
		/*  #endif  */
		background-color: #ff570a;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff570a;
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
			color:#fff;
			.uni-badge{
				position: absolute;
				top:12upx;
				right:4upx;
			}
		}
		.input {
			width: calc(100% - 220upx);
			display: flex;
			justify-content: center;
			align-items: center;
			position:relative;
			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;			
			}
			.icon{
				width: 60upx;
				height: 60upx;
				position: absolute;
				color: #a18090;
				z-index: 996;
				top: 20upx;
				/*  #ifdef  APP-PLUS  */
				top: 0upx;
				/*  #endif  */
				left: 0;
				/*  #ifdef  APP-PLUS  */
				left: 30upx;
				/*  #endif  */
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.local {
			width: 120upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			color:#fff;
		}
	}
	.place{
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		height: 100upx;
	}
	.tabs{
		width: 100%;
		height: 100upx;
		position: fixed;  /* 固定位置 */
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap; /* white-space 属性设置如何处理元素内的空白 */
		background-color: #eee;
		top: 100upx;
		/*  #ifdef  APP-PLUS  */
		top: calc(var(--status-bar-height) + 100upx);
		/*  #endif  */	
	}
	.content{
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
	.pick{
		width: 95%;
		padding: 0 2.5vw 2.5vw 2.5vw;
		background: linear-gradient(to bottom, #ff570a 0%,#ffffff 105%);
		.box{
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;
			.title{
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
				height: 60upx;
				border-bottom: solid 1upx #eee;
				padding-bottom: 10upx;
				.big{
					font-size: 34upx;
					padding-left: 20upx;
					color: #46434f;
				}
				.small{
					font-size: 24upx;
					padding-left: 20upx;
					color: #827f8b;
				}
			}
			.product-list{
				padding: 15upx 20upx 15upx 20upx;
				column-count: 2;
				column-width: 50%;
				column-gap: 10upx;
				>view{
					display: flex;
					background-color: #f8f8f8;
					position:relative;
					&:nth-child(1){
						.price{
							color: #e65339;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							left: 8upx;
						}
						.slogan{
							color: #807c87;
							font-size: 30upx;
							position: absolute;
							bottom: 8upx;
							right: 8upx;
						}
						image{
							width: 100%;
							height: 0;
						}
					}
					&:nth-child(2),&:nth-child(3){
						image{
							width: calc(50% - 5upx);
							height: 0;
						}
						.price{
							position: absolute;
							top: 25%;
							left: 55%;
							color: #e65339;
							font-size: 30upx;
						}
						.slogan{
							position: absolute;
							top: 60%;
							left: 55%;
							color: #807c87;
							font-size: 20upx;
						}
					}
					&:nth-child(2){
						margin-bottom: 10upx;
					}
				}
			}
		}
	}
	.banner{
		image{
			width: 100%;
		}
	}
	.goods-list{
		background-color: #f4f4f4;
		.title{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
		.loading-text{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
		.product-list{
			width: 95%;
			padding: 0 2.5% 2.5vw 2.5%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product{
				width: 48.75%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				image{
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}
				.name{
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
					
					.price{
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
					.slogan{
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
			
		}
		.bottom-info{
			width: 100%;
			height:80upx;
			text-align: center;
			font-size: 28upx;
			color:#979797;
			.info,.tel{
				margin: 5upx 0;
			}
		}
	}
}
</style>
