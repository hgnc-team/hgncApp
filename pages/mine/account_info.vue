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
		
		<!-- 模态框 修改昵称-->
		<neil-modal :show="showModal" @close="closeModal()" @confirm="changeNickName" title="修改昵称" class="nick-name-modal">
		    <view class="input-wrap">	
		    	<input type="text" v-model="nickName.newName" placeholder="请输入昵称" class="nick-name" />
		    </view>
		</neil-modal>
	</view>
</template>

<script>
	import neilModal from '../../components/neil-modal/neil-modal.vue';
	import myList from "../../components/common/my-list";
	import { mapMutations } from 'vuex';
	import service from "../../common/service.js";
	import util from "../../common/util.js";
	export default {
		components: {
			myList,
			neilModal
		},
		data() {
			return {
				userinfo: {
					
				},
				showModal: false,
				nickName: {
					oldName: '',
					newName: ''
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
							text: util.currency(242234234, "￥"),
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
				let userinfo = uni.getStorageSync('USERS_INFO')
				if(userinfo) {
					// 初始化头像
					// 初始化昵称
					this.pageList1[1].extra.text = userinfo.userName;
					this.nickName.oldName = userinfo.userName;
					// 初始化id
					this.pageList1[2].extra.text = userinfo.inviteCode;
				}
			},
			// 关闭modal
			closeModal(){
				this.showModal = false;
			},
			// 修改昵称
			changeNickName(){
				// 请求接口
				this.nickName.oldName = this.nickName.newName;
				this.pageList1[1].extra.text = this.nickName.newName;
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
					this.showModal = true;
					this.nickName.newName = this.nickName.oldName;
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
							uni.showLoading({
								title: "退出中..."
							});
							service.logout().then(res=>{
								uni.hideLoading();
								this.$store.dispatch('logout');
								uni.reLaunch({
									url: "/pages/login/login"
								})
							}).catch(err=>{
								uni.hideLoading();
								uni.showToast({
									icon: "none",
									title:  err.errMsg,
								})
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
		.nick-name-modal{
			/deep/ .neil-modal__container {
				top: 30% !important;
			}
			.input-wrap{
				padding: 40upx 20upx;
			}
		}	
		.neil-modal__container {
			top: 30% !important;
		}
	}
</style>
