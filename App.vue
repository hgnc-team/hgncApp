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
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/css/uni.css";
	// 顶部导航栏全局配置
	.uni-navbar{
		color: $uni-text-color-status !important;
		margin-top: 0;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height); //表示状态栏的高度。
		/*  #endif  */
	}
	// 全局多列选择的样式
	.mpvue-picer{
		color: #000;
	}
	.uni-navbar .uni-navbar__content {
		padding: 0 30upx;
		box-sizing: border-box;
	}
	// 全局的button样式
	.btn-primary {
		margin-top: 96upx;
		button{
			height: 100upx;
			width: 100%;
			line-height: 100upx;
			color: #ffffff;
			font-size: 32upx;
			outline: 0;
			display: block;
			margin: 0;
			font-family: inherit;
			background: #242424;
			opacity: 1;
			border-radius: 2upx;
		}
	}
	.text-price{
		color: #59a0fa !important;
		font-size: 28upx;
	}
	.flex-center-center{
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.text-color-white{
		color: #fff !important;
	}
	.common-pa-30{
		padding: 30upx;
	}
	.common-pl-20{
		padding-left: 20upx;
	}
	.common-pr-20{
		padding-right: 20upx;
	}
	.common-ma-30{
		margin: 30upx;
	}
	.common-ml-20{
		margin-left: 20upx;
	}
	.common-mr-20{
		margin-right: 20upx;
	}
	// 字体颜色和大小
	.big-title{
		font-size: $uni-font-size-title;
		color: $uni-color-title;
	}
	.sub-title{
		font-size: $uni-font-size-lg;
		color: $uni-color-title;
	}
	.tab-sub-title{
		font-size: $uni-font-size-lg;
		color: $uni-color-title;
		font-weight: 600;
	}
	
</style>
