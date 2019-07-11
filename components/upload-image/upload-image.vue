<!-- 上传图片组件 -->
<template>
	<view class="upload-image">
		<block v-if="imageSrc">
			<view class="previewImage" @tap="previewImage">
				<image :src="imageSrc" class="image" mode="aspectFill"></image>
				<!-- 删除按钮 -->
				<view class="iconfont iconicon_fork_fill" @tap.stop="deleteImage"></view>
			</view>
		</block>
		<block v-else>
			<view class="chooseImage" @tap="chooseImage">
				<!-- 图标 -->
				<view class="iconfont iconicon_add"></view>
				<view class="addfile">
					<text v-if="isRequired">*</text>{{textContent}}{{imageSrc}}
				</view>
			</view>

		</block>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			textContent: {
				type: String,
				default: '上传图片'
			},
			isRequired: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				imageSrc: '',
				imageFile: null,

			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0];
						this.imageSrc = imageSrc;
						// console.log('chooseImage', res)
						// console.log('imageSrc', imageSrc)
						// this.readFile(imageSrc)
						const uploadTask = uni.uploadFile({
						  url : 'http://server.maiyidesan.cn/v1/api/user/store/apply',
						  filePath: imageSrc,
						  name: 'image',
						  formData: {
						   'user': 'test'
						  },
						  success: function (uploadFileRes) {
						   console.log(uploadFileRes.data);
						  }
						 });
					}
				});
			},
			// 预览图片
			previewImage() {
				uni.previewImage({
					urls: [this.imageSrc]
				});
			},
			// 删除图片
			deleteImage(e) {
				e.pro
				this.imageSrc = '';
			},
			readFile(p) {
				const _this = this
				// return new Promise((resolve, reject) => {
				// 	// this.compress(p).then((p) => {
				plus.io.resolveLocalFileSystemURL(p, function(fs) {
					fs.file(function(file) {
						// _this.checkSize(file.size)
						// 	.then(() => {
						// 		resolve(_this.turnToFile(fs, file))
						// 	})
						// 	.catch(error => {
						// 		console.log(error)
						// 	})
						// var fileReader = new plus.io.FileReader();
						// console.log("getFile:" + JSON.stringify(file));
						// fileReader.readAsText(file, 'utf-8');
						// fileReader.onloadend = function(evt) {
						// 	console.log("11" + evt);
						// 	console.log("evt.target" + evt.target);
						// 	console.log(evt.target.result);
						// }
						// console.log(file.size + '--' + file.name);
						_this.turnToFile(fs, file).then(res => {
							let imageFile = res
							console.log('imageFile', imageFile)
							// 导出图片信息
							_this.$emit('getImage', imageFile)
						})
					});
				});
				// })

				// });
			},
			// 转化为文件
			turnToFile(fs, oldFile) {
				return new Promise((resolve, reject) => {
					var reader = new plus.io.FileReader();
					reader.readAsDataURL(oldFile)
					reader.onloadend = function(e) {
						// e.target.result  
						let data = e.target.result
						console.log("11" + e);
						console.log("evt.target" + e.target);
						console.log(e.target.result);
						// object专成file  
						let file = (function(path, name) {
							let arr = path.split(',')
							let mime = arr[0].match(/:(.*?);/)[1]
							let bstr = atob(arr[1])
							let n = bstr.length
							let u8arr = new Uint8Array(n)
							while (n--) {
								u8arr[n] = bstr.charCodeAt(n);
							}
							return new File([u8arr], name, {
								type: mime
							});
						})(e.target.result, fs.name);
						resolve({
							data: data,
							file: file
						})
					};
				})
			}
		}
	}
</script>

<style lang="scss">
	.upload-image {
		width: 100%;
		height: 100%;
		background: #eee;
		border-radius: 5px;
		display: flex;
		// flex-direction: column;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;

		.previewImage {
			width: 100%;
			height: 100%;
			position: relative;
			border: 1upx solid #eee;
			box-shadow: 0px 1upx 1upx 1upx #eee;

			image {
				width: 100%;
				height: 100%;
			}

			.iconicon_fork_fill {
				position: absolute;
				right: 8upx;
				top: 0upx;
				color: #f44837;
				opacity: 0.6;
			}
		}

		.chooseImage {
			width: 100%;
			height: 100%;
			padding-top: 40upx;
			box-sizing: border-box;
			.iconicon_add {
				color: #666;
			}

			.addfile {
				text {
					color: #666;
					margin-right: 4upx;
					color: #f44837;
				}
			}
		}

	}
</style>
