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
					<view class="shangpin">
						<!-- #ifdef H5 -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<checkBox :isselected="ite.isChecked" @change="proActive(ite)"></checkBox>
						</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view class="uni-inline-item" style="margin-right: 20upx;">
							<van-checkbox :value="ite.isChecked" @change="proActive(ite)"></van-checkbox>
						</view>
						<!-- #endif -->	
						<view class="shangpin-info">
							<view class="img">
								<image :src="ite.pro_img" mode="aspectFit"></image>
							</view>
							<view class="text-info">
								<view class="title-text">
									<text class="name">{{ ite.pro_name }}</text>
									<text class="tags">{{ ite.tags }} </text>
								</view>
								<view class="bottom-price">
									<view class="jiage">
										<text class="danjia">￥{{ ite.now_price }}</text>
										<text class="shuliang">x {{ ite.pro_count }}</text>
									</view>
									<view class="numInput">
										<text class="reduce iconfont" @tap="changeCount(ite,-1)" :class="ite.pro_count == 0 ? 'numbox-disabled' : ''">-</text>
										<input type="number" v-model="ite.pro_count" />
										<text class="plus iconfont" @tap="changeCount(ite,1)">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="hong" @tap="deletePro(ite.pro_id)">删除</view>
				</view>
			</scroll-view>
			<!-- <view class="jiesuan">
				<view class="yuefei">运费：￥{{ item.yunfei }}</view>
				<view class="zongji">总计：￥{{ item.price | totalprice(item.pro_count)}}</view>
			</view> -->
		</view>


		<!-- 底部结算 -->
		<view class="bottom-jiesuan">
			<view class="info">
				<view class="allSelectText">
					<!-- #ifdef H5 -->
					<view class="uni-inline-item">
						<checkBox :isselected="isCheckAll" @change="allCheck"></checkBox>
					</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<view class="uni-inline-item">
						<van-checkbox :value="isCheckAll" @change="allCheck"></van-checkbox>
					</view>
					<!-- #endif -->
					<view class="allText">全选</view>
				</view>
				<view v-show="rightText=='编辑'">
					总计：<text>￥{{ allPrice }}</text>
				</view>
			</view>
			<view class="btn" @tap="jiesuan" :class="rightText=='完成'?'delete':''">{{rightText=='完成'?'删除':'结算'}}</view>
		</view>

	</view>
</template>

<script>
	var startX = 0;
	var endX = 0;
	import checkBox from '../../components/common/custom-checkbox.vue';
	import {
		uniIcon,
		uniNavBar
	} from '@dcloudio/uni-ui';
	import _ from "lodash";
	export default {
		components: {
			uniIcon,
			uniNavBar,
			checkBox
		},
		data() {
			return {
				rightText: '编辑',
				// 全选，返回
				isCheckAll: false,
				allPrice: 0, //所有价格
				shopData: [{
						pro_id: 1,
						pro_name: ' 香奈儿可可小姐淡香水 50ml',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/logo.png',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					},
					{
						pro_id: 2,
						pro_name: ' 香奈儿可可小姐淡香水 50ml',
						pro_name2: ' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
						tags: '50mi,淡香',
						reduce_price: 16,
						now_price: 100,
						pro_count: 1,
						pro_img: '../../static/img/common/logo.png',
						isChecked: false,
						// 滚动条
						scrollLeft: 0,
					}
				]
			};
		},
		methods: {
			touchS(e) {
				startX = e.mp.changedTouches[0].clientX;
			},
			touchE(e) {
				endX = e.mp.changedTouches[0].clientX;
				if (Math.abs(endX - startX) > 10) {
					if (endX - startX > 0) {
						this.shopData.forEach((item) => {
							item.forEach((goods) => {
								if (goods.pro_id == e.currentTarget.id) {
									goods.scrollLeft = 0;
								}
							})
						})
					} else {
						this.shopData.forEach((item) => {
							item.forEach((goods) => {
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
					if (val.pro_count < 0) {
						val.pro_count = 0;
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
		}
	};
</script>

<style lang="scss">
	.numInput {
		overflow: hidden;
		float: right;

		text {
			float: left;
			color: #999;
			font-size: 22upx;
			line-height: 50upx;
		}

		input {
			display: inline-block;
			width: 80upx;
			float: left;
			text-align: center;
			color: #999;
		}

		.numbox-disabled {
			color: #c0c0c0;
		}
	}

	.shopCartPage {
		background-color: #FAFAFA;
		padding-bottom: 98upx;
	}

	.shopCartPage .content {
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}

	.shopCartPage .content .content-name {
		height: 70upx;
		box-sizing: border-box;
		padding: 20upx 32upx;
		border-bottom: 1px solid #FAFAFA;
		display: flex;
		margin-top: 1upx;
	}

	.shopCartPage .content .select,
	.shopCartPage .content .select-active {
		flex-shrink: 0;
	}

	.shopCartPage .content .content-name .iconfont {
		font-size: 45upx;
		color: #FF6B94;
		line-height: 32upx;
		margin-right: 8upx;
	}

	.shopCartPage .content .content-name .text {
		font-size: 24upx;
		color: #333333;
		line-height: 31upx;
	}

	.shopCartPage .content .shangpin {
		width: 750upx;
		padding: 22upx 32upx;
		display: flex;
		border-bottom: 1px solid #FAFAFA;
	}

	.shopCartPage .content .shangpin .select,
	.shopCartPage .content .shangpin .select-active {
		margin-top: 40upx;
	}

	.shopCartPage .content .shangpin .shangpin-info {
		display: flex;
	}

	.shopCartPage .content .shangpin .shangpin-info .img {
		width: 108upx;
		height: 108upx;
		margin-right: 10upx;
		flex-shrink: 0;
	}

	.shopCartPage .content .shangpin .shangpin-info .img image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 8upx;
	}

	.shopCartPage .content .shangpin .shangpin-info .text-info .title-text {
		line-height: 34upx;
	}

	.shopCartPage .content .shangpin .shangpin-info .text-info .title-text .name {
		color: #333;
		font-size: 24upx;
	}
	
	.shopCartPage .content .shangpin .shangpin-info .text-info .jiage {
		font-size: 22upx;
		color: #999999;
		display: inline-block;
	}

	.shopCartPage .content .shangpin .shangpin-info .text-info .jiage .danjia {
		color: #FD395B;
		margin-right: 10upx;
	}

	.shopCartPage .content .jiesuan {
		padding: 30upx 30upx 30upx;
		color: #333333;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		box-sizing: border-box;
	}

	.shopCartPage .content .jiesuan .yuefei,
	.shopCartPage .content .jiesuan .zongji {
		font-size: 22upx;
		lighting-color: 40upx;
	}

	.shopCartPage .bottom-jiesuan {
		width: 100%;
		height: 98upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 120upx;
		display: flex;
		box-shadow: 0px 0px 4upx 0px rgba(0, 0, 0, 0.1);
	}

	.shopCartPage .bottom-jiesuan .info {
		box-sizing: border-box;
		padding: 0 30upx;
		width: 510upx;
		font-size: 24upx;
		color: #333333;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}

	.shopCartPage .bottom-jiesuan .info view {
		line-height: 105upx;
	}

	.shopCartPage .bottom-jiesuan .info .select,
	.shopCartPage .bottom-jiesuan .info .select-active {
		display: inline-block;
		vertical-align: middle;
	}

	.shopCartPage .bottom-jiesuan .info text {
		line-height: 98upx;
		color: #FD395B;
	}

	.shopCartPage .bottom-jiesuan .btn {
		width: 240upx;
		line-height: 98upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		background-color: #000;

		&.delete {
			background-color: #FD395B;
		}
	}

	/* 全选的文字 */
	.allSelectText {
		float: left;
		overflow: hidden;
		width: 150upx;

		.allText {
			float: left;
		}
	}

// 	.allSelectText>view:first-child {
// 		display: inline-block;
// 		float: left;
// 	}

	.scrollView {
		width: 750upx;
	}

	.scrollView .viewbox {
		width: 900upx;
		display: flex;
	}

	.scrollView .hong {
		width: 150upx;
		background-color: red;
		color: #FFFFFF;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
