<template>
	<view class="nearbyPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<!-- 导航栏 -->
		<uni-nav-bar fixed="true" :background-color="$store.state.titleNView.bg" color="$store.state.titleNView.textColor" left-icon="back" @click-left="onClickLeft"
		 @click-right="onClickRight" right-icon="search">
			<view  slot class="uni-flex" style="height: 100%;align-items:center;">
				<view class="uni-inline-item title" style="height: 100%;" @tap="showPicker">
					<text>{{barTitle}}</text>
					<view class="icon" v-if="barType == 'SHOP'">
						<uni-icon type="arrowdown" size="18"></uni-icon>
					</view>
				</view>
				<view class="mpvue-picer">
					<mpvue-picker ref="mpvuePicker" :mode="picker.mode" :deepLength="picker.deepLength" :pickerValueDefault="picker.pickerValueDefault"
					 :themeColor="picker.themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="picker.pickerValueArray"></mpvue-picker>
				</view>
			</view>
		 </uni-nav-bar>
		 <!-- 探店 -->
		 <view class="content" v-if="barType=='SHOP'">
		 	<!-- 轮播图 -->
		 	<view class="swiper-view" style="border: 1px solid #999;">
		 		<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
		 			<swiper-item v-for="swiper in swiperList" :key="swiper.sid" @tap="toSwiper(swiper)">
		 				<image mode="aspectFill" :src="swiper.img"></image>
		 			</swiper-item>
		 		</swiper>
		 		<view class="keep-out"></view>
		 	</view> 	
			
			<!-- 附近热店 -->
			<view class="hot-shop">
				<view class="uni-h4">
					附近热店
				</view>
				<view class="shop-list" v-for="(item, index) in shopList" :key="index" @tap="toShopIndex">
					<view class="img">
						<!-- <image :src="item.img" mode="aspectFit"></image> -->
					</view>
					<view class="info">
						<view class="name">
							<text>{{item.name}}</text>
							<view class="tag">
								{{item.tag}}
							</view>
						</view>
						<view class="location">
							{{item.location}}
							<view class="distance">
								{{item.distance}}
							</view>
						</view>
					</view>
				</view>
			</view>
		 </view>
		 <!-- 订单 -->
		 <view class="content" v-if="barType=='ORDER'">
		 	<view class="uni-flex" style="height:100upx;border-bottom: 1px solid #eee;padding: 20upx 0;box-sizing: border-box;">
		 		<text class="uni-flex-item uni-center">全部</text>
				<text class="uni-flex-item uni-center">到店消费</text>
				<text class="uni-flex-item uni-center">代付款</text>
		 	</view>
			<view class="shop-list" v-for="(item, index) in shopList" :key="index" @tap="toShopIndex">
				<view class="img">
					<!-- <image :src="item.img" mode="aspectFit"></image> -->
				</view>
				<view class="info">
					<view class="name">
						<text>{{item.name}}</text>
						<view class="tag">
							{{item.tag}}
						</view>
					</view>
					<view class="location">
						{{item.location}}
						<view class="distance">
							{{item.distance}}
						</view>
					</view>
				</view>
			</view>
		 </view>
		 <view class="footer uni-flex">
		 	<view class="shop uni-flex-item uni-center" @tap="changeBar('SHOP')" :class="barType=='SHOP'?'actived':''">
				<view class="icon">
					<uni-icon type="eye" size="24"></uni-icon>
				</view>
				<view class="text">
					探店
				</view>
		 	</view>
			<view class="order uni-flex-item uni-center" @tap="changeBar('ORDER')" :class="barType=='ORDER'?'actived':''">
				<view class="icon">
					<uni-icon type="eye" size="24"></uni-icon>
				</view>
				<view class="text">
					订单
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
	export default {
		components: {
			uniIcon,
			uniNavBar,
			mpvuePicker
		},
		data() {
			return {
				// 底部导航类型 SHOP-探店，ORDER-订单
				barType: 'SHOP',
				barTitle: '',
				picker: {
					mode: 'multiLinkageSelector',
					deepLength: 2, // 几级联动
					pickerValueDefault: [], // 初始化值
					pickerValueArray: [], // picker 数组值
					pickerText: '武汉·徐东社区',
					themeColor: '#000', // 颜色主题
				},	
				//轮播
				swiperList: [{
						sid: 0,
						src: '自定义src0',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '../../../static/img/login/img_login_bg@3x.png'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '../../../static/img/login/img_login_bg@3x.png'
					}
				],
				shopList: [{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
					{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
					{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
					{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
					{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
					{
						shop_id: 0,
						img: '../../../static/img/common/logo.png',
						name: '商品名称商品名',
						tag: '休闲会所',
						location: '中南说了对方记录积分来的数据烦死了肯德基分类独守空房',
						distance: '16.8km'
					},
				]
			};
		},
		onLoad() {
			this.barTitle = this.picker.pickerText;
		},
		methods:{
			/**  
			 * 左侧按钮点击事件  
			 */
			onClickLeft() {
				uni.navigateBack({
			
				})
			},
			/**  
			 * 右侧按钮点击事件  
			 */
			onClickRight() {
				// 跳转搜索页
				uni.navigateTo({
					url: "../home/search"
				})
			},
			//轮播图预览
			toSwiper(e) {
				uni.previewImage({
					urls: [e.img]
				});
			},
			// 二级联动
			showPicker() {
				if(this.barType == 'ORDER') {
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
			// 店铺首页
			toShopIndex(){
				uni.navigateTo({
					url: './shop_index'
				})
			},
			// 切换底部导航
			changeBar(type){
				this.barType = type;
				if(type == 'ORDER') {
					this.barTitle = "我的订单"
				} else {
					this.barTitle = this.picker.pickerText;
				}
			}
		}
	}
</script>

<style lang="scss">
	.nearbyPage{
		.content{
			margin-bottom: 100upx; 
			// .hot-shop{
				.shop-list{
					display: flex;
					height: 200upx;
					border: 1upx solid #eee;
					padding: 20upx;
					box-sizing: border-box;
					.img{
						width: 150upx;
						height: 150upx;
						border: 1upx solid #eee;
						uni-image{
							width: 100%;
							height:100%;
							img{
								width: 100%;
								height:100%;
								
							}
						}
						
					}
					.info{
						width: calc(100% - 150upx);
						padding-left: 20upx;
						.name{
							line-height: 1;
							font-weight: 600;
							.tag{
								font-weight: 100;
								font-size: 24upx;
								color: #333;
							}
						}
						.location{
							line-height: 1;
							font-size: 24upx;
							color: #999;
							position: relative;
							padding-right: 100upx;
							box-sizing: border-box;
							.distance{
								position: absolute;
								right: 0;
								bottom: 0;
							}
						}
					}
				}
			// }
		}
		.footer{
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #eee;
			color: #999;
			.actived{
				color: #000;
			}
		}
	}
</style>
