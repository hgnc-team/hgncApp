<template>
	<!-- 实名认证 -->
	<view class="setupStorePage">
		<form @submit="formSubmit">
			<view class="uni-h5 uni-bold">
				需提交审核资料
			</view>
			<!-- 姓名 -->
			<view class="uni-form-item uni-row uni-flex">
				<view class="title uni-inline-item text-color-gray">
					<text class="required">*</text>经营者姓名:
				</view>
				<input class="uni-input uni-flex-item" type="text" v-model="name" name="name" />
			</view>
			<view class="tips">
				（注意：必须与会员账号本人真实姓名一致）
			</view>

			<!-- 身份证 -->
			<view class="uni-form-item uni-row uni-flex">
				<view class="title uni-inline-item text-color-gray">
					<text class="required">*</text>身份证号码:
				</view>
				<input class="uni-input uni-flex-item" type="idcard" v-model="card" name="card" />
			</view>
			<view class="tips">
				（注意：必须与会员账号本人真实姓名一致）
			</view>

			<!-- 商家名称 -->
			<view class="uni-form-item uni-row uni-flex">
				<view class="title uni-inline-item text-color-gray">
					<text class="required">*</text>商家名称:
				</view>
				<!-- <input class="uni-input uni-flex-item" type="text" v-model="storeName" name="storeName" /> -->
				<input class="uni-input uni-flex-item" type="file" v-model="card" name="card" />
			</view>

			<!-- 性别 -->
			<view class="uni-form-item uni-row uni-flex gender">
				<view class="title uni-inline-item text-color-gray">
					<text class="required">*</text>性别:
				</view>
				<radio-group @change="radioChange" class="radio-group uni-flex-item uni-flex">
					<label class="uni-list-cell flex-center-center" v-for="(item, index) in genderList" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<!-- 证件上传 -->
			<view class="uni-form-item uni-column uni-flex upload-wrap">
				<view class="title uni-inline-item text-color-gray">
					证件上传:
				</view>
				<view class="upload-body">
					<view class="item">
						<!-- 身份证正面照片 -->
						<upload-image :textContent="'身份证正面照片'" @getImage="getPositiveImg"></upload-image>
					</view>
					<view class="item">
						<!-- 身份证反面扫描件 -->
						<upload-image :textContent="'身份证反面扫描件'" @getImage="getReverseImg"></upload-image>
					</view>
					<view class="item">
						<!-- 营业执照 -->
						<upload-image :textContent="'营业执照'" @getImage="getlicenseImg"></upload-image>
					</view>
					<view class="item">
						<!-- 委托运用书 -->
						<upload-image :textContent="'委托运用书'" :isRequired="false" @getImage="getAttorneyImg"></upload-image>
					</view>
				</view>
				<view class="tips">
					（注意：需上传身份证照片正反面扫描件、营业执照扫描件、另外法人与实际经营人不是同一人需要上传运营委托书）
				</view>
			</view>

			<!-- 商家地址 -->
			<view class="uni-form-item uni-row uni-flex">
				<view class="title uni-inline-item text-color-gray">商家地址:</view>
				<input class="uni-input uni-flex-item" v-model="address" name="address" />
			</view>
			<!-- 邮箱 -->
			<view class="uni-form-item uni-row uni-flex email">
				<view class="title uni-inline-item text-color-gray">邮箱:</view>
				<input class="uni-input uni-flex-item" v-model="email" name="email" />
			</view>
			<view class="uni-btn-v" v-bind:style="{top: positionTop + 'px'}">
				<button formType="submit" class="btn">确认提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	// 定义校验列表
	const checkList = [
		{
			name: "name",
			rules: [
				{
					checkType: "notnull",
					name: "name",
					errorMsg: "请输入经营者姓名"
				}
			]
		},{
			name: "card",
			rules: [
				{
					checkType: "notnull",
					name: "card",
					errorMsg: "请输入身份证号码"
				},
				{
					checkType: "card",
					name: "card",
					errorMsg: "请输入正确的身份证号码"
				}
			]
		},{
			name: "storeName",
			rules: [
				{
					checkType: "notnull",
					name: "storeName",
					errorMsg: "请输入商店名称"
				}
			]
		},
		{
			name: "positiveImg",
			rules: [
				{
					checkType: "notnull",
					name: "positiveImg",
					errorMsg: "请上传身份证正面照片"
				}
			]
		},
		{
			name: "reverseImg",
			rules: [
				{
					checkType: "notnull",
					name: "reverseImg",
					errorMsg: "请上传身份证反面照片"
				}
			]
		},
		{
			name: "licenseImg",
			rules: [
				{
					checkType: "notnull",
					name: "licenseImg",
					errorMsg: "请上传营业执照"
				}
			]
		},	
		{
			name: "address",
			rules: [
				{
					checkType: "notnull",
					name: "address",
					errorMsg: "请输入商家地址"
				}
			]
		},
		{
			name: "email",
			rules: [
				{
					checkType: "email",
					name: "email",
					errorMsg: "请输入正确的邮箱"
				}
			]
		}
	];
	import uploadImage from '../../components/upload-image/upload-image.vue';
	import util from '../../common/util.js';
	export default {
		components: {
			// sunUpImg,
			uploadImage
		},
		data() {
			return {
				// 经营者姓名
				name: "",
				// 身份证
				card: "",
				// 商店名称
				storeName: "",
				// 性别
				gender: "",
				// 商家地址
				address: "",
				// 邮箱
				email: "",
				genderList: [{
					value: "0",
					name: "男"
				}, {
					value: "1",
					name: "女"
				}, {
					value: "x",
					name: "保密"
				}],
				current: 0,
				positionTop: 0,
				// 身份证正面照片
				positiveImg: '' ,
				// 身份证反面扫描件
				reverseImg:'',
				// 营业执照扫描件
				licenseImg: '',
				// 运营委托书扫描件
				attorneyImg: '',
				// imgArr: []
			}
		},
		computed: {

		},
		methods: {
			init() {

			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				// #ifdef H5
				this.positionTop = uni.getSystemInfoSync().windowHeight - 30;
				// #endif
				// #ifdef APP-PLUS
				this.positionTop = uni.getSystemInfoSync().windowHeight - 80;
				// #endif
			},
			// 选择性别
			radioChange(evt) {
				for (let i = 0; i < this.genderList.length; i++) {
					if (this.genderList[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			getPositiveImg(img){
				this.positiveImg = img;
			},
			getReverseImg(img){
				this.reverseImg = img;
			},
			getlicenseImg(img){
				this.licenseImg = img;
			},
			getAttorneyImg(img){
				this.attorneyImg = img;
			},
			// 提交申请
			formSubmit(e){
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
				});
				if( isUserInvalid ) {
					return 
				}
				uni.showLoading()
				let params = {
					name: this.name,
					ide: this.card,
					storeName: this.storeName,
					sex: this.gender,
					front: this.positiveImg,
					back: this.reverseImg,
					license: this.licenseImg,
					entrust: this.attorneyImg,
					address: this.address,
					email: this.email
				}
				service.authentication(params).then(res=>{
					uni.hideLoading();
					console.log(res.data)
					this.dataList = res.data.data;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						icon:"none",
						title: err.errMsg
					})
				})
			},
			// 校验数据是否合法
			isValidFn(name, rules){
				let data = {};
				data[name] = this[name];
				return util.graceChecker.check(data, rules);
			},
		},
		onLoad() {
			this.init();
			this.initPosition();
		}
	}
</script>

<style lang="scss">
	.setupStorePage {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;

		.uni-h5 {
			margin-bottom: 30upx;
		}

		.required {
			color: #f41e28;
			margin-left: 0;
		}

		.tips {
			color: #f9a315;
			font-size: 22upx;
		}

		.uni-form-item {
			align-content: center;
			border-bottom: 1upx solid #f0f0f0;

			.title {
				padding: 0;
			}

			.uni-input {
				// height: 40upx;
				// padding: 10upx 20upx;
				// box-sizing: border-box;
			}

			// 性别
			&.gender {
				height: 60upx;
				margin-top: 20upx;

				.radio-group {
					.uni-list-cell {
						width: 120upx;

						&::after {
							display: none;
						}
					}
				}
			}

			// 证件上传
			&.upload-wrap {
				width: 100%;

				.upload-body {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.item {
						width: 47.75%;
						background-color: #fff;
						margin: 0 0 15upx 0;
						height: 220upx;

						/deep/ .sunsin_picture_list {
							box-sizing: border-box;
							padding: 0;
							width: 100%;
							height: 220upx;
							.sunsin_picture_item {
								width: inherit;
								height: 220upx;

								.sunsin-add-image {
									width: inherit;
									height: inherit;
									background-color: #f0f0f0 !important;
									color: #242424;
									margin: 0;
									.icon-cameraadd, .icon-text{
										color: #666 !important;
									}
									image {
										width: inherit;
										height: inherit;
									}
								}
								uni-image image {
									width: inherit;
									height: inherit;
								}
							}
						}

					}
				}

			}

			&.email {
				margin-bottom: 200upx;
			}
		}

		.invaild {
			color: #f41e28;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon {
				background-color: #f41e28;
				border-radius: 50%;

				.uni-icon {
					color: #f0f0f0;
					width: 22upx;
					height: 22upx;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;

					&::before {
						font-size: 36upx;
					}
				}
			}
		}

		.uni-btn-v {
			width: 100%;
			height: 140upx;
			margin: 0 -30upx;
			position: fixed;
			bottom: 0upx;
			left: 30upx;
			z-index: 1000;
			padding: 0 30upx;
			box-sizing: border-box;
			display: flex;
			align-items: flex-start;
			background-color: #fff;

			.btn {
				background: #242424;
				width: 100%;
				color: #fff;
				border-radius: 2upx;
			}
		}
	}
</style>
