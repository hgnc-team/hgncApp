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
	.t-c-w{
		color: #fff;
	}
	.pd-10{
		padding: 10upx;
	}
	.pd-20{
		padding: 20upx;
	}
	.pd-30{
		padding: 30upx;
	}
	.mg-10{
		margin: 10upx;
	}
	.mg-20{
		margin: 20upx;
	}
	.mg-t-20{
		margin-top: 20upx;
	}
</style>
