<template>
	<view class="accountInfoPage">
		<!-- 跳转列表1 -->
		<myList :pageList="pageList1" @handleClick="handleClick"></myList>
		
		<view class="place-bar-20"></view>
		<!-- 跳转列表2 -->
		<myList :pageList="pageList2" @handleClick="handleClick"></myList>
		<view class="bottom-btn" @tap="logout">
			<button type="primary">退出当前账号</button>
		</view>
	</view>
</template>

<script>
	import myList from "../../components/common/my-list";
	import { mapMutations } from 'vuex';
	export default {
		components: {
			myList
		},
		data() {
			return {
				userinfo: {
					
				},
				pageList1: [{
						type: "face",
						title: '头像',
						iconfont: 'iconchracter',
						extra: {},
						isShowExtra: false,
						isShowArrow: true
					},
					{
						type: "nikeName",
						title: '昵称',
						iconfont: 'iconicon_mine_nor',
						extra: {
							text: "地方讲故事搭建开发",
							color: "#999"
						},
						isShowExtra: true,
						isShowArrow: true
					},
					{
						type: "id",
						title: 'ID',
						iconfont: 'iconid',
						extra: {
							text: "242234234",
							color: "#999"
						},
						isShowExtra: true,
						isShowArrow: false
					},
					{
						type: "password",
						title: '密码管理',
						iconfont: 'iconpssword_management',
						extra: {},
						isShowExtra: true,
						isShowArrow: true
					}
				],
				pageList2: [{
						type: "telphone",
						title: '换绑手机',
						iconfont: 'iconshouji',
						extra: {},
						isShowExtra: false,
						isShowArrow: true
					},
					{
						type: "money",
						title: '累计消费',
						iconfont: 'iconmoney',
						extra: {
							text: "￥242234234",
							color: "#999"
						},
						isShowExtra: true,
						isShowArrow: false
					}
				]
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {

			},
			
			// 点击跳转
			handleClick(data) {
				// 更换头像
				if (data.item.type === "face") {
					uni.showToast({
						title:"更换头像"
					})
					// 修改昵称
				} else if (data.item.type === "nikeName") {
					uni.showToast({
						title:"修改昵称"
					})
					// 管理密码
				} else if (data.item.type === "password") {
					uni.navigateTo({
						url: "/pages/mine/gesture_lock?mode=set"
					})
			
				} else if (data.item.type === "telphone") {
					uni.navigateTo({
						url: `/pages/mine/change_telphone`
					})
				}
			},
			// 退出当前账号
			logout(){
				uni.showModal({
					// title: '提示',
					content: '是否确定退出登录？',
					success:  (res) => {
						if (res.confirm) {
							this.$store.commit('LOGOUT');
							uni.reLaunch({
								url: "/pages/login/login"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
	}
	.accountInfoPage{
		.bottom-btn{
			width: 100%;
			position: fixed;
			bottom: 0;
			border-radius: 0upx; 
			button{
				color: #f45444;
				background-color: #f6f6f6;
				border-radius:0upx; 
				&::after{
					border-radius:0upx;
					border: none;
				}
			}
		}
	}
</style>
