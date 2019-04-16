<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			uni.request({
				url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				},
				success: (res) => {
					console.log('success', res);
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 捕获 app error
		onError(err) {
			console.log(err)
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/css/uni.css";
	// 引入字体文件
	@import "./static/css/font/iconfont.css";

	// 顶部导航栏全局配置
	.uni-navbar {
		color: $uni-text-color-status !important;
		margin-top: 0;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height); //表示状态栏的高度。

		/*  #endif  */
		.uni-navbar__content {
			padding: 0 20upx;
			box-sizing: border-box;
			box-shadow: none;
			border: none;
		}
	}

	// 全局多列选择的样式
	.mpvue-picker-view {
		color: #000;
	}

	// 全局swiper的样式
	.swiper {
		.uni-swiper-wrapper {
			overflow: visible !important;

			.uni-swiper-dots {
				bottom: -40upx !important;

				.uni-swiper-dot {
					border-radius: 0 !important;
				}

				.uni-swiper-dot-active {
					width: 30upx !important;
				}
			}
		}
	}
	.uni-list .uni-list-item .uni-list-item__icon .uni-list-item__icon-img{
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
		image{
			width: 100%;
			height: 100%;
		}
	}

	// 全局的button样式
	.btn-primary {
		margin-top: 96upx;

		button {
			height: 100upx;
			width: 100%;
			line-height: 100upx;
			color: #ffffff;
			font-size: 30upx;
			outline: 0;
			display: block;
			margin: 0;
			font-family: inherit;
			background: #242424;
			opacity: 1;
			border-radius: 2upx;
		}
	}
	// 全局 蓝色价格字体样式
	.text-price {
		color: #59a0fa !important;
		font-size: 28upx;
	}
	// 水平垂直居中
	.flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;

	}
	// 右对齐
	.flex-right {
		justify-content: flex-end;
	}

	// 占位条
	.place-bar {
		width: 100%;
		height: 30upx;
		background-color: #f0f0f0;
	}
	// 占位条-20upx
	.place-bar-20 {
		width: 100%;
		height: 20upx;
		background-color: #f0f0f0;
	}
	// 灰色字体
	.text-color-gray {
		color: #888 !important;
	}
	// 白色字体
	.text-color-white {
		color: #fff !important;
	}

	.common-pa-30 {
		padding: 30upx;
		box-sizing: border-box;
	}

	.common-pl-20 {
		padding-left: 20upx;
		box-sizing: border-box;
	}

	.common-pr-20 {
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.common-ma-30 {
		margin: 30upx;
	}

	.common-ml-20 {
		margin-left: 20upx;
	}

	.common-mr-20 {
		margin-right: 20upx;
	}

	// 字体颜色和大小
	.big-title {
		font-size: $uni-font-size-title;
		color: $uni-color-title;
	}

	.sub-title {
		font-size: $uni-font-size-lg;
		color: $uni-color-title;
	}

	.tab-sub-title {
		font-size: $uni-font-size-lg;
		color: $uni-color-title;
		font-weight: 600;
	}
</style>
