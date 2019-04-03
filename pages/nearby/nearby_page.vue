<template>
	<view class="nearbyPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<view class="nav-bar uni-row">
			<view class="left uni-flex uni-row">
				<text>{{picker.pickerText}}</text>
				<view class="icon">
					<uni-icon type="arrowdown" size="18"></uni-icon>
				</view>
			</view>
			<view class="mpvue-picer">
				<mpvue-picker ref="mpvuePicker" :mode="picker.mode" :deepLength="picker.deepLength" :pickerValueDefault="picker.pickerValueDefault"
				 :themeColor="picker.themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="picker.pickerValueArray"></mpvue-picker>
			</view>
			<view class="right">
				<uni-icon type="list" size="22"></uni-icon>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search-wrap">
			<view class="search uni-flex" @tap="toSearch()">
				<view class="icon uni-inline-item flex-center-center">
					<uni-icon type="search" size="20"></uni-icon>
				</view>
				<view class="input uni-flex-item">
					名称,类型
				</view>
			</view>
		</view>
		<!-- 探店 -->
		<view class="content">
			<!-- 轮播图 -->
			<customSwiper :swiperList="swiperList" @toSwiper="toSwiper" :isDotsInside="false"></customSwiper>

			<!-- 附近热店 -->
			<view class="hot-shop">
				<view class="uni-h4">
					附近热店
				</view>
				<view class="shop-list flex-center-center" v-for="(item, index) in shopList" :key="index" @tap="toShopIndex">
					<view class="img">
						<image :src="item.img" mode="aspectFit" style="opacity: 0.1;"></image>
					</view>
					<view class="info">
						<view class="name">
							<text>{{item.name}}</text>
							<text class="distance">{{item.distance}}m</text>
						</view>
						<view class="tags">
							<view class="tag" v-for="(tag, index2) in item.tags" :key="index2">
								{{item.tag}}
							</view>
						</view>
						<view class="location uni-flex uni-row" @tap="toMap(item.location)">
							<view class="icon uni-inline-item">
								<uni-icon type="location" size="16"></uni-icon>
							</view>
							<text class="location uni-flex-item">{{item.cityname}}&nbsp;{{item.adname}}&nbsp;{{item.address}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import mpvuePicker from 'mpvue-picker';
	import cityData from "../../common/city.data.js";
	import customSwiper from "../../components/common/custom-swiper.vue";
	//高德SDK
	import amap from '../../common/SDK/amap-wx.js';
	
	var swiperList = [{
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
	export default {
		components: {
			uniIcon,
			uniNavBar,
			mpvuePicker,
			customSwiper
		},
		data() {
			return {
				// 底部导航类型 SHOP-探店，ORDER-订单
				markers: [],
				shopList: [],
				picker: {
					mode: 'multiLinkageSelector',
					deepLength: 2, // 几级联动
					pickerValueDefault: [], // 初始化值
					pickerValueArray: [], // picker 数组值
					pickerText: '',
					themeColor: '#000', // 颜色主题
				},
				//轮播
				swiperList: [],
			};
		},
		created() {
			this.swiperList = swiperList;
			this.getPosition();
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 pullToRefresh
		onPullDownRefresh() {
			this.shopList =  [];
			this.swiperList = [];
			setTimeout(() => {
				this.swiperList = swiperList;
				this.getPosition();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 获取当前地图定位
			getPosition(){
				uni.showLoading({
					title: "加载中..."
				})
				// #ifdef APP-PLUS
				this.amapPlugin = new amap.AMapWX({
					//高德地图KEY，参考：http://ask.dcloud.net.cn/article/35070
					key: '7da2bb476a91a511d0c3b6626f7be558'
				});
				//定位地址
				this.amapPlugin.getRegeo({
					success: data => {
						this.picker.pickerText = data[0].name;
						// this.picker.pickerText = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
					}
				});
				this.amapPlugin.getPoiAround({
					success: (data) => {
						//成功回调
						this.shopList = data.poisData;
						console.log("data:" + JSON.stringify(this.shopList));
						_.forEach(this.shopList, item => {
							item.img = '/static/img/logo.png',
							item.tags = item.type.split(";");
						})
						uni.hideLoading()
					},
					fail: (info) => {
						//失败回调
						uni.hideLoading()
						console.log("info", info)
					}
				})
				// #endif
			},
			//轮播图预览
			toSwiper(e) {
				uni.previewImage({
					urls: [e.img]
				});
			},
			// 二级联动
			showPicker() {
				if (this.barType == 'ORDER') {
					return
				}
				this.picker.pickerValueArray = cityData;
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				console.log(e);
				// this.pickerText = e.label;
				if (e && e.label) {
					this.picker.pickerText = e.label.replace('-', '·');
				}
			},
			onChange(e) {
				console.log(e);
			},
			onCancel(e) {
				console.log(e);
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: '/pages/home/search'
				})
			},
			// 跳转地图
			toMap(location){
				console.log(location);
				let arr =  location.split(",")
				let latitude = arr[1] || 30.503974;
				let longitude = arr[0] || 114.424647;
				uni.navigateTo({
					url: `/pages/nearby/map?latitude=${latitude}&longitude=${longitude}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.nearbyPage {
		.nav-bar {
			position: fixed;
			width: 100%;
			height: 88upx;
			background-color: $uni-bg-color-status;
			color: $uni-text-color-status;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			z-index: 996;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;
			box-sizing: border-box;
		}

		.search-wrap {
			width: 100%;
			height: 112upx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 88upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(var(--status-bar-height) + 88upx);
			/*  #endif  */
			z-index: 996;
			background-color: #fff;
			padding: 0 30upx;
			box-sizing: border-box;

			.search {
				width: 100%;
				height: 56upx;
				line-height: 56upx;
				background-color: #f0f0f0;
				color: #999;
				font-size: 28upx;
				border-radius: 4upx;

				.icon {
					width: 56upx;
					height: 56upx;
					color: #666;
				}

				.input {
					line-height: 56upx;
				}
			}
		}

		.content {
			width: 100%;
			margin-top: 200upx;
			/*  #ifdef  APP-PLUS  */
			margin-top: calc(var(--status-bar-height) + 200upx);
			/*  #endif  */
			padding-bottom: 120upx;

			.hot-shop {
				background-color: #fff;
				padding: 20upx 30upx;
				box-sizing: border-box;

				.shop-list {
					display: flex;
					border-bottom: 1upx solid #eee;
					padding: 20upx 0;
					box-sizing: border-box;

					.img {
						width: 150upx;
						height: 150upx;

						image {
							width: 100%;
							height: 100%;

						}

					}

					.info {
						width: calc(100% - 150upx);
						padding-left: 20upx;

						.name {
							display: flex;
							align-items: center;
							justify-content: space-between;
							line-height: 1;
							font-weight: 600;
							font-size: 32upx;

							.distance {
								font-weight: 100;
								font-size: 24upx;
							}
						}

						.tag {
							max-width: max-content;
							background-color: #e6f2ff;
							color: #037dfa;
							font-size: 22upx;
							margin: 16upx 0;
							padding: 0 8upx;
							box-sizing: border-box;
						}

						.location {
							width: 100%;
							line-height: 1;
							font-size: 24upx;
							color: #999;
							position: relative;
							box-sizing: border-box;
						}
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #eee;
			color: #999;

			.actived {
				color: #000;
			}
		}
	}
</style>
