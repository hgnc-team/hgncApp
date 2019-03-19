<template>
	<view class="addressManagementPage">
		<view class="input-group">
			<view class="uni-form-item uni-row">
                <view class="title uni-inline-item">收件人姓名：</view>
                <input class="uni-input uni-text-gray" :value="name" />
            </view>
			<view class="uni-form-item uni-row">
			    <view class="title uni-inline-item">联系电话：</view>
			    <input class="uni-input uni-text-gray" :value="telPhone"/>
			</view>
			<view class="uni-form-item uni-row address">
			    <view class="title uni-inline-item">所在地区：</view>
			    <view class="uni-inline-item uni-text-gray">
			    	湖北省 武汉市
			    </view>
				<view class="icon uni-inline-item uni-text-gray">
					<uni-icon type="arrowright" size="26"></uni-icon>
				</view>
			</view>
			<view class="uni-form-item uni-column address-detail">
			    <view class="title uni-inline-item">详细地址：</view>
			    <view class="textarea uni-text-gray">
			    	<textarea :value="address"/>
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
	export default{
		components: {
			uniIcon
		},
		data(){
			return {
				name: "",
				telPhone: "",
				address: ""
			}
		},
		methods:{
			save(){
				
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