<template>
	<view>
		<view class="uni-page-head">
			<view class="uni-page-head-title">{{title}}</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			</view>
			<view class="uni-helllo-text uni-common-mt uni-center">{{text}}</view>
		</view>
	</view>
</template>

<script>
	import mpvueGestureLock from '../../components/mpvueGestureLock/index.vue';
	import service from '../../common/service.js';
	import { mapMutations } from 'vuex';
	export default {
		components: {
			mpvueGestureLock
		},
		data() {
			return {
				title: "手势图案",
				password: [],
				text: '请设定手势',
				// 页面模式，set-设置二级密码，check-校验二级密码
				mode: "set"		
			}
		},
		computed:{
			
		},
		methods: {
			// 注入vuex的方法
			...mapMutations(['SET_PASSWORD_CHECKSTATUS']),
			onEnd(data) {
				console.log(data);
				console.log(this.password);
				// 设定模式，需要输入两次
				if(this.mode === "set") {
					if (this.password.length) {
						if (this.password.join('') === data.join('')) {						
							// this.setPassword(this.password.join(''));
							// 后续删掉
							this.text = '手势设定完成';
							this.password = [];
						} else {
							this.text = '两次手势设定不一致';
							this.password = [];
						}
					} else {
						this.text = '请确认手势设定';
						this.password = data;
					}
				} else {
					// 校验模式，只需输入一次
					if(this.password.length) {
						// 已经设置密码的，只需输入一次，直接校验
						this.checkPassword(data.join(''))
					} else {
						// 未设置密码的重新设置，需要输入两次
						if (this.password.join('') === data.join('')) {						
							// this.setPassword(this.password.join(''));
							// 后续删掉
							this.text = '手势设定完成';
							this.password = [];
						} else {
							this.text = '两次手势设定不一致';
							this.password = [];
						}
					}
				}
				
			},
			// 设定二级密码
			setPassword(password){
				uni.showLoading();
				service.setSecondPassword(password).then(res=>{
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  "二级密码设定成功",
					})
					this.text = '手势设定完成';
					this.password = [];
					if(this.mode = "check") {
						this.SET_PASSWORD_CHECKSTATUS(true);
						uni.navigateBack();
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
			// 校验二级密码
			checkPassword(password){ 
				if(this.password.join('') === password) {
					// 通过
					uni.showToast({
						icon: "none",
						title:  "二级密码校验成功",
						success: ()=>{
							// 同步校验状态为true，购买完成后重置为false（每次购物都检验）
							this.SET_PASSWORD_CHECKSTATUS(true);
							uni.navigateBack();
						}
					})
					
				} else {
					// 不通过
					uni.showToast({
						icon: "none",
						title:  "手势密码输入有误",
					})
				}
			},
			// 获取用户设定的二级密码
			getSetedPassword(){
				service.getGoodListById(this.$store.state.userId).then(res=>{
					let data = res.data.data;
					if(data.length > 0) {
						// 已经设定密码，校验模式直接校验，设置模式重新设置
						this.password = this.mode === "set" ? [] : data.password;
						this.text = this.mode === "set" ? '请确认手势设定' : '请确认手势校验';
						uni.setNavigationBarTitle({
							title: this.mode === "set" ? "二级密码管理" : "二级密码校验" 
						})
					} else {
						// 用户可能尚未设定密码
						// 校验模式提示并设置
						if(this.mode === "check") {
							uni.showToast({
								icon: "none",
								title:  "您尚未设定二级手势密码，请先设定",
							})
							this.text = '请确认手势设定';
							uni.setNavigationBarTitle({
								title: "二级密码管理"
							})
						}		
					}
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon: "none",
						title:  err.errMsg || err.data.data,
					})
				})
			},
		},
		onLoad(option) {
			this.mode = option.mode;
			// 查看是否已经设置密码
			// this.getSetedPassword();
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100% !important;
	}
</style>
