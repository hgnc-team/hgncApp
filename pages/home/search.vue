<template>
	<view class="searchPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 头部搜索框 -->
		<view class="header-wrap uni-flex uni-row">
			<view class="back uni-inline-item" @tap="goBack">
				<uni-icon type="back"></uni-icon>
			</view>
			
			<view class="search-box uni-inline-item">
				<!-- mSearch组件 如果使用原样式，删除组件元素-->
				<mSearch :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)"
				 @confirm="doSearch(false)" v-model="keyword" radius="0" @input="clear"></mSearch>
				<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
							
				<!-- <view class="input-box">
					<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
					 placeholder-class="placeholder-class" confirm-type="search">
				</view>
				<view class="search-btn" @tap="doSearch(false)">搜索</view> -->
				
				<!-- 原样式 end -->
			</view>
			<view class="cart uni-inline-item"  :class="isShowIcon?'active':''">
				<uni-icon type="star"></uni-icon>
			</view>
		</view>
		
		<!-- 历史搜索 热门搜索-->
		<view class="search-keyword" @touchstart="blur" v-show="!isShowSearchList">
			<view class="keyword-box">
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="key in oldKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="key in hotKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</view>
		</view>
			
		<!-- 搜索到的商品 -->
		<view class="goods-wrap" v-if="isShowSearchList">
			<view class="tabs filters uni-flex uni-row">
				<view class="default uni-flex-item flex-center-center uni-center" :class="currentTab=='default'?'active':''" @tap="changeTab('default')"> 
					默认
					<view class="bottom-line"></view>
				</view>
				<view class="sales uni-flex-item flex-center-center uni-center" :class="currentTab=='sales'?'active':''" @tap="changeTab('sales')">
					销量
					<view class="bottom-line"></view>
				</view>
				<view class="price uni-flex-item flex-center-center uni-center" :class="currentTab=='price'?'active':''" @tap="changeTab('price')">
					价格
					<view class="bottom-line"></view>
				</view>
			</view>
			<view class="content">
				<view class="hasData" v-if="hasData">
					<view class="total  flex-center-center uni-center uni-text-small">
						共计{{totalNum}}个相关产品
					</view>
					<view class="product-list common-ma-30">
						<view class="product" v-for="(item, index) in goodsList" :key="index" @tap="toGoods(item)">
							<!-- <image lazy-load class="lazy" mode="scaleToFill" :src="item.imageUrl"></image> -->
							<view class="uni-media-list-logo">
								<image class="image" :class="{lazy:!item.show}" :data-index="index" @load="onLoad" :src="item.show?item.imageUrl:''" />
								<image class="image placeholder" :class="{loaded:item.loaded}" :src="placeholderSrc" />
							</view>
							
							<view class="name">{{item.title}}</view>
							<view class="info">
								<view class="price">{{item.price}}</view>
								<view class="slogan">{{item.type}}</view>
							</view>	
						</view>
					</view>
				</view>
				<view class="hasNoData"  v-if="!hasData">
					<view class="notice">
						<view class="icon"></view>
						<view>
							抱歉,未找到{{keyword}}相关产品
						</view>
					</view>
					<view class="place-bar"></view>
					<!-- 推荐商品列表 -->
					<view class="Recommend-goods-list" v-if="RecommendGoodsList.length > 0">
						<view class="title uni-h4">推荐商品</view>
						<view class="product-list common-ma-30">
							<view class="product" v-for="(item, index) in RecommendGoodsList" :key="index" @tap="toGoods(item)">		
								<image mode="widthFix" :src="item.img"></image>
								<view class="name">{{item.name}}</view>
								<view class="info">
									<view class="price">{{item.price}}</view>
									<view class="slogan">{{item.slogan}}</view>
								</view>	
							</view>
						</view>
					</view>
				</view>				
			</view>
			
		</view>
	</view>
</template>

<script>
	import { uniIcon } from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	//引用mSearch组件，如不需要删除即可
	import mSearch from '../../components/common/mehaotian-search-revision.vue';
	export default {
		components: {
			uniIcon,
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				goodsList: [],
				RecommendGoodsList:[],
				forbid: '',
				currentTab: 'default',
				isShowSearchList: false,
				isShowIcon: false,
				hasData: false,
				totalNum: 0,
				page:1,
				// 图片懒加载
				show: false,
				// 图片默认路径
				placeholderSrc: "/static/img/logo@2x.png",
				// 设备屏幕高度
				windowHeight: 0
			}
		},
		onLoad() {
			this.init();
			// 获取设备高度
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
		},
		onPageScroll() {
			this.load()
		},
		computed:{
// 			totalNum(){
// 				return this.goodsList.length;
// 			}
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur() {
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "输入商品名称、类型";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['键盘', '鼠标', '显示器', '电脑主机', '蓝牙音箱', '笔记本电脑', '鼠标垫', 'USB', 'USB3.0'];
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			clear(keyword){
				if(!keyword){
					console.log(123);
					this.isShowSearchList = false;
					this.keyword = "";
				}
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
// 				console.log("key",key);
// 				console.log("this.keyword",this.keyword)
// 				console.log("this.defaultKeyword",this.defaultKeyword)
				this.keyword = key;
				this.saveKeyword(key); //保存为历史 
				this.isShowIcon = true;
				this.getGoodsList(key);
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						// console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			changeTab(type){
				if(this.currentTab != type){
					this.currentTab = type;
					this.getGoodsList(this.keyword);
				}
			},
			// 查询产品列表
			getGoodsList(key){
				this.goodsList = [];
				const data = {
					title: key,
					page: this.page
				}
				this.isShowSearchList = true;
				uni.showLoading({
					title: "加载中..."
				});
				service.getGoodListBySearch(data).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					this.totalNum = data.total;
					// console.log(this.totalNum);
					if(data.data.length > 0) {
						this.hasData = true;
						const  goodsList = data.data;
						this.goodsList = _.concat(goodsList, goodsList, goodsList,goodsList, goodsList);
						_.forEach(this.goodsList, item => {
							item.show = false;
							item.loaded = false;
						});
						setTimeout(() => {
							this.load();
						}, 100)
					} else {
						this.hasData = false;
						this.getRecommendGoodsList();
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  err.errMsg || err.data.data,
					})
				})
			},
			// 获取推荐产品列表
			getRecommendGoodsList(key){
				const data = {
					title: key,
					page: this.page
				}
				uni.showLoading();
// 				service.getGoodListBySearch(data).then(res=>{
// 					uni.hideLoading();
// 					let data = res.data.data;
// 					this.RecommendGoodsList = data.data;
// 				}).catch(err=>{
// 					uni.hideLoading();
// 					uni.showToast({
// 						icon: "none",
// 						title:  err.errMsg || err.data.data,
// 					})
// 				})
				
				setTimeout(()=>{
					uni.hideLoading();
					this.RecommendGoodsList = [{
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
					]
				}, 1000);
			},
			toGoods(item){
				uni.navigateTo({
					url: `/pages/home/goods_detail?id=${item.id}`
				})
			},
			// 图片懒加载
			load() {
				uni.createSelectorQuery().selectAll('.lazy').boundingClientRect((images) => {
					_.forEach(images, (image, index)=>{
						if (image.top <= this.windowHeight) {
							let item = Object.assign({}, this.goodsList[image.dataset.index]);
							item.show = true;
							// 重新刷新数据
							this.$set(this.goodsList, image.dataset.index, item);
						}
					})
				}).exec()
			},
			onLoad(e) {
				// 图片url为空就不会执行这里
				let item = Object.assign({}, this.goodsList[e.target.dataset.index]);
				item.loaded = true;
				this.$set(this.goodsList, e.target.dataset.index, item);
			},
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>
<style lang="scss">
	page{
		width: 100%;
		height: 120%;
		background-color: #fff;
	}
	.searchPage{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.header-wrap{
			width: 100%;
			height:88upx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid #f6f6f6;
			background-color: #fff;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			z-index: 1000;
			.back {
				width: 80upx;
				height: 100%;
				justify-content: center;
			}
			.search-box{
				flex: 1 1 0%;
				height: 88upx;
				padding: 10upx;
				justify-content: center;
				box-sizing: border-box;
				.search .content{
					background-color: #f0f0f0;
				}
			}
			.cart {
				width: 0upx;
				justify-content: center;
				transition: all 0.2s linear;
				visibility: hidden;
				&.active{
					width: 100upx;
					visibility: visible;
					transform-origin:center left;
				}
			}
		}
		
		.search-box .input-box {
			width: 85%;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.search-box .search-btn {
			width: 15%;
			margin: 0 0 0 2%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			font-size: 14px;
			color: #fff;
			background: linear-gradient(to right, #ff9801, #ff570a);
			border-radius: 30px;
		}

		.search-box .input-box>input {
			width: 100%;
			height: 30px;
			font-size: 16px;
			border: 0;
			border-radius: 30px;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			padding: 0 3%;
			margin: 0;
			background-color: #ffffff;
			box-sizing: border-box;
		}

		.placeholder-class {
			color: #9e9e9e;
		}

		.search-keyword {
			width: 100%;
			// background-color: rgb(242, 242, 242);
			padding-top: 88upx;
			/*  #ifdef  APP-PLUS  */
			padding-top: calc(var(--status-bar-height) + 88upx);
			/*  #endif  */
			box-sizing: border-box;
		}

		.keyword-box {
			// height: calc(100vh - 88upx);
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
		}

		.keyword-box .keyword-block {
			padding: 5upx 0;
			box-sizing: border-box;
		}

		.keyword-box .keyword-block .keyword-list-header {
			width: 94%;
			padding: 5px 3%;
			font-size: 13.5px;
			color: #333;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
		}

		.keyword-box .keyword-block .keyword-list-header image {
			width: 20px;
			height: 20px;
		}

		.keyword-box .keyword-block .keyword {
			width: 94%;
			padding: 3px 3%;
			display: flex;
			flex-flow: wrap;
			justify-content: flex-start;
			box-sizing: border-box;
		}

		.keyword-box .keyword-block .hide-hot-tis {
			display: flex;
			justify-content: center;
			font-size: 14px;
			color: #6b6b6b;
		}

		.keyword-box .keyword-block .keyword>view {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 10px;
			margin: 5px 10px 5px 0;
			height: 30px;
			font-size: 14px;
			background-color: rgb(242, 242, 242);
			color: #6b6b6b;
			box-sizing: border-box;
		}
		.goods-wrap{
			.tabs{
				width: 100%;
				height: 80upx;
				background-color: #fff;
				position: fixed;
				top: 88upx;
				/*  #ifdef  APP-PLUS  */
				top: calc(var(--status-bar-height) + 88upx);
				/*  #endif  */
				z-index: 1000;
				border-bottom: 1upx solid #f0f0f0;
				.uni-flex-item {
					color:#666;
					position: relative;
					.bottom-line{
						display: none; 
					}
				}
				.active{
					color:#242424;
					.bottom-line{
						display: block;
						width: 10%;
						height: 6upx;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						background-color: #242424;
					}
				}
			}
			.content{
				padding-top: 168upx;
				/*  #ifdef  APP-PLUS  */
				padding-top: calc(var(--status-bar-height) + 168upx);
				/*  #endif  */
				.hasData{
					.total{
						height: 50upx;
						background-color: #f0f0f0;
						color: #666;
					}	
				}
				.hasNoData{
					.notice{
						width: 100%;
						height: 264upx;
						text-align: center;
						color: #999;
						.icon{
							width: 100%;
							height: 196upx;
						}
					}
					.Recommend-goods-list{
						.title{
							padding: 20upx 30upx;
							box-sizing: border-box;
						}
					}
				}
				.product-list{
					background-color: #fff;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					box-sizing: border-box;			
					.product {
						width: 47.75%;
						// border-radius: 20upx;
						background-color: #fff;
						margin: 0 0 15upx 0;
						.placeholder {
							opacity: 0.3;
							transition: opacity 0.4s linear;
						}
						
						.placeholder.loaded {
							opacity: 0;
						}
						
						.uni-media-list-logo {
							width: 100%;
							height: 246upx;
							position: relative;
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
	}
</style>
