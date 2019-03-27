<template>
	<view class="addressManagementPage">
		<view class="address-list">
			<radio-group @change="radioChange">
				<view class="address-item" v-for="(item, index) in addressList" :key="index">
					<view class="info">
						<view class="uni-bold uni-h5">
							{{item.name}} &nbsp;&nbsp;{{item.telPhone}}
						</view>
						<view class="uni-text-gray uni-text-small">
							{{item.address}}
						</view>
					</view>
					<view class="btn-group">
						<view class="set-default uni-flex">
							<label class="uni-flex">
								<view class="checkbox uni-flex-item">
									<radio :value="item.default+''" :checked="index === current"></radio>
								</view>
								<text class="uni-text common-pl-20">
									设为默认
								</text>
							</label>
						</view>
						<view class="btn-right uni-flex">
							<view class="edit flex-center-center common-mr-20" @tap="edit(item)">
								<view class="icon">
									<uni-icon type="compose" size="26"></uni-icon>
								</view>
								<text class="uni-text">编辑</text>
							</view>
							<view class="delete flex-center-center" @tap="deleteAddress(item)">
								<view class="icon">
									<uni-icon type="trash" size="26"></uni-icon>
								</view>
								<text class="uni-text">删除</text>
							</view>
						</view>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="bottom-btn" @tap="addAddress">
			<view class="icon">
				<uni-icon type="plus" size="26"></uni-icon>
			</view>
			<text>新增地址</text>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	import service from '../../common/service.js';
	export default{
		components: {
			uniIcon
		},
		data(){
			return {
				addressList: [
					{
						"name": "小米",
						"telPhone": 14587080980808,
						"address": "湖北省 武汉市 江夏区 流芳大道3434号",
						"default": true
					},
					{
						"name": "第三方",
						"telPhone": 1566166666,
						"address": "湖北省 武汉市 江夏区 流芳大道3434号",
						"default": false
					},
					{
						"name": "发给",
						"telPhone": 145537080980808,
						"address": "湖北省 武汉市 江夏区 流芳大道3434号",
						"default": false
					}
				],
				current: 0
			}
		},
		methods:{
			init(){
				let params = {
					// userId: this.$store.state.usrId,
					userId: "660efd50-4c6f-11e9-bc7c-95dfc83db603"
				}
				// 获取用户收获地址列表
				uni.showLoading();
				service.getAddressList(params).then(res=>{
					uni.hideLoading();
					let data = res.data.data;
					console.log(res);
							
				}).catch(err=>{
					console.log(err)
					uni.hideLoading();
					uni.showToast({
						icon: "none",
						title:  err.data.data || err.errMsg,
					})
				})
			},
			radioChange(evt) {
				console.log(evt)
				for (let i = 0; i < this.addressList.length; i++) {
					if (this.addressList[i].default === evt.target.value + '') {
						this.current = i;
						break;
					}
				}
				// 请求设置为默认接口
			},
			edit(item){
				uni.navigateTo({
					url:`address_edit?flag=1&name=${item.name}&telPhone=${item.telPhone}&address=${item.address}`
				})
			},
			deleteAddress(item){
				// 请求删除接口
			},
			addAddress(){
				uni.navigateTo({
					url:"address_edit?flag=0"
				})
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
	}
	.addressManagementPage{
		.address-list{
			.address-item{
				width: 100%;
				height: 214upx;
				margin-bottom: 20upx;
				background-color: #fff;
				.info{
					width: 100%;
					height: 140upx;
					border-bottom: 1upx solid #f5f5f5;
					padding: 30upx;
					box-sizing: border-box;
				}
				.btn-group{
					height: 74upx;
					width: 100%;
					padding: 0 30upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
		.bottom-btn{
			width: 100%;
			height: 100upx;
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			.icon{
				margin-right: 10upx;
				font-weight:600; 
			}
			text{
				font-weight:600; 
			}
		}
	}
</style>
