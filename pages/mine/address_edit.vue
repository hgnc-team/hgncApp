<template>
	<view class="addressManagementPage">
		<view class="input-group">
			<view class="uni-form-item uni-row">
                <view class="title uni-inline-item">收件人姓名：</view>
                <input class="uni-input uni-text-gray" v-model="receiver" />
            </view>
			<view class="uni-form-item uni-row">
			    <view class="title uni-inline-item">联系电话：</view>
			    <input class="uni-input uni-text-gray" v-model="phone"/>
			</view>
			<view class="uni-flex uni-row address uni-form-item">
			    <view class="title uni-inline-item">所在地区：</view>
			    <view class="uni-flex uni-flex-item uni-text-gray flex-right">
					<view class="uni-inline-item">
						{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.district}}&nbsp;{{address.street}}
					</view>
					<view class="icon uni-inline-item uni-text-gray">
						<uni-icon type="arrowright" size="26"></uni-icon>
					</view>
			    </view>
			</view>
			<view class="uni-form-item uni-column address-detail">
			    <view class="title uni-inline-item">详细地址：</view>
			    <view class="textarea uni-text-gray">
			    	<textarea v-model="addresses"/>
			    </view>
			</view>
		</view>
		<view class="save-btn btn-primary" @tap="save">
			<button>保&nbsp;存</button>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	import _  from 'lodash';
	import service from '../../common/service.js';
	import util from '../../common/util.js';
	export default{
		components: {
			uniIcon
		},
		data(){
			return {
				receiver: "",
				phone: "",
				// 定位信息
				address: {
					country: "中国",
					province: "湖北省",
					city: "武汉市",
					district: "洪山区",
					street: "佳园路"
				},
				// 详细地址
				addresses: ""
			}
		},
		methods:{
			init(){
				// 
				this.getLocation();
			},
			// 获取当前定位信息
			getLocation(){
				// 使用h5+ api 可以直接过去中文位置信息
				uni.showLoading({
					title:"获取定位中..."
				})
				plus.geolocation.getCurrentPosition((res)=>{
					uni.hideLoading();
					console.log(JSON.stringify(res));
					const address = res.address;
					this.address = {
						country: address.country,
						province: address.province,
						city: address.city,
						district: address.district,
						street: address.street
					};
					this.addresses = res.addresses;
				}, (err)=>{
					uni.hideLoading();
					uni.showToast({
						title: err.message
					})
				})
			},
			// 校验数据是否合法
			isValidFn(name, rules){
				let data = {};
				data[name] = this[name];
				return util.graceChecker.check(data, rules);
			},
			save(){
				// 定义校验列表
				const checkList = [{
						name: "receiver",
						rules: [
							{
								checkType: "notnull",
								name: "receiver",
								errorMsg: "收件人姓名不能为空"
							}
						]
					},{
						name: "phone",
						rules: [
							{
								checkType: "notnull",
								name: "phone",
								errorMsg: "请输入手机号"
							},{
								checkType: "phoneno",
								name: "phone",
								errorMsg: "请输入正确的手机号"
							}
						]
					},{
						name: "addresses",
						rules: [
							{
								checkType: "notnull",
								name: "addresses",
								errorMsg: "详细地址不能为空"
							}
						]
					}
				];
				// 校验数据
				let isUserInvalid = false;
				_.forEach(checkList, (item) => {
					const isValid = this.isValidFn(item.name, item.rules);
					if (!isValid) {
					    uni.showToast({
					        icon: 'none',
					        title: util.graceChecker.error
					    });
						isUserInvalid = true;
					    return false;
					}
				})
				if(isUserInvalid) {
					return
				}
			},
			// 新增收获地址
			addAddress(){
				let params = {
					userId: "660efd50-4c6f-11e9-bc7c-95dfc83db603",
					province: params.province,
					city: params.city,
					region:  params.region,
					street:  params.street,
					detail:  params.detail,
					receiver:  params.receiver,
					phone:  params.phone,
					default: false,
					tag: "",
				}
				// 获取用户收获地址列表
				uni.showLoading();
				service.addAddress(params).then(res=>{
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
			}
		},
		onLoad(option) {
			console.log(option); //打印出上个页面传递的参数。
			let title = option.flag === "1" ? "地址编辑" : "新增地址";
			uni.setNavigationBarTitle({
				title: title
			});
			if(option.flag==="1") {
				this.name = option.name;
				this.telPhone = option.telPhone;
				this.address = option.address;
			}	
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
		.input-group{
			background-color: #fff;
			padding: 10upx 30upx 30upx;
			.uni-form-item{
				margin-top: 10upx;
				border-bottom: 1px solid #f5f5f5;
				.title{
					padding: 0;
				}
			}
			.address{
				height: 88upx;
				justify-content: space-between;
			};
			.address-detail{
				.title{
					margin-top: 20upx;
				}
				.textarea textarea{
					width: 100%;
					height: auto;
					height: 120upx;
				}
			}
			
		}
		.save-btn{
			width: 100%; 
			padding:0 30upx; 
			box-sizing: border-box;
		}
		.uni-text-gray{
			color: #666 !important;
		}
	}
</style>