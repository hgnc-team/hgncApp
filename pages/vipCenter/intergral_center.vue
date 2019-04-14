<template>
	<view class="intergralCenterPage">
		<!-- 头部 -->
		<view class="header uni-flex">
			<view class="left uni-flex-item uni-column flex-center-center">
				<view class="icon"></view>
				<view class="text">
					<view class="top uni-bold">
						我的积分
					</view>
					<view class="bottom uni-text-small text-color-gray">
						{{jfValue}}
					</view>
				</view>
			</view>
			<view class="middle uni-flex-item uni-column flex-center-center">
				<view class="icon"></view>
				<view class="text">
					<view class="top uni-bold">
						今日释放积分
					</view>
					<view class="bottom uni-text-small text-color-gray">
						{{jfValue}}枚
					</view>
				</view>
			</view>
			<view class="right uni-flex-item uni-column flex-center-center">
				<view class="icon"></view>
				<view class="text">
					<view class="top uni-bold">
						M币钱包>
					</view>
					<view class="bottom uni-text-small text-color-gray">
						{{mbValue}}枚
					</view>
				</view>
			</view>
		</view>
		<view class="place-bar-20" style="height: 16upx;"></view>
		<!-- 时间picker -->
		<mx-date-picker :show="showPicker" :type="'date'" :value="timeValue" :show-tips="true" :show-seconds="true" @confirm="onSelected"
		 @cancel="onSelected" />
		<!-- 时间段查询 -->
		<view class="search">
			<view class="title uni-h4">
				时间段查询
			</view>
			<view class="picker uni-flex">
				<view class="start uni-flex uni-flex-item" @tap="onShowDatePicker('start')">
					<view class="value uni-flex-item flex-center-center">
						{{startDate}}
					</view>
					<view class="arrowdown uni-inline-item">
						<uni-icon type="arrowdown" size="18"></uni-icon>
					</view>
				</view>
				<view class="icon uni-inline-item uni-flex flex-center-center">
					<view class="arrow"></view>
				</view>
				<view class="end uni-flex uni-flex-item" @tap="onShowDatePicker('end')">
					<view class="value uni-flex-item flex-center-center">
						{{endDate}}
					</view>
					<view class="arrowdown uni-inline-item">
						<uni-icon type="arrowdown" size="18"></uni-icon>
					</view>
				</view>
			</view>
			<view class="searchBtn">
				<button class="btn" @tap="search">查询</button>
			</view>
		</view>
		<view class="place-bar-20" style="height: 16upx;"></view>
		<!-- 数据列表 -->
		<view class="list">
			<view class="tabs uni-flex">
				<view class="uni-flex-item flex-center-center" :class="currentTab=='jf'?'active':''" @tap="changeTab('jf')">
					积分
					<view class="bottom-line"></view>
				</view>
				<view class="uni-flex-item flex-center-center" :class="currentTab=='mb'?'active':''" @tap="changeTab('mb')">
					M币
					<view class="bottom-line"></view>
				</view>
			</view>
			<view class="table">
				<!-- 表头 -->
				<view class="table-header table-body  uni-flex uni-row">
					<view class="time">
						操作时间
					</view>
					<view class="changed">
						变更
						<!-- 三角 -->
						<view class="triangle_border_up" :class="currentTab=='price'&&isPriceDesc?'up':''"></view>
						<view class="triangle_border_down" :class="currentTab=='price'&&!isPriceDesc?'down':''"></view>
					</view>
					<view class="balance">
						余额
						<!-- 三角 -->
						<view class="triangle_border_up" :class="currentTab=='price'&&isPriceDesc?'up':''"></view>
						<view class="triangle_border_down" :class="currentTab=='price'&&!isPriceDesc?'down':''"></view>
					</view>
					<view class="remark">
						备住
						<!-- 三角 -->
						<view class="triangle_border_up" :class="currentTab=='price'&&isPriceDesc?'up':''"></view>
						<view class="triangle_border_down" :class="currentTab=='price'&&!isPriceDesc?'down':''"></view>
					</view>
				</view>
				<!-- 内容 -->
				<view class="table-body uni-flex uni-row" v-for="(item, index) in dataList" :key="index" >
					<view class="time">
						{{item.time}}
					</view>
					<view class="changed">
						+{{item.changed}}
					</view>
					<view class="balance">
						{{item.balance}}
					</view>
					<view class="remark">
						{{item.remark}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	import moment from "moment";
	import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			uniIcon,
			MxDatePicker
		},
		data() {
			return {
				// 我的积分
				jfValue: 0,
				// 今日释放积分
				releaseValue: 0,
				// M币钱包
				mbValue: 0,
				showPicker: false,
				// 开始时间
				startDate: '2019年/01月/01日',
				// 结束时间
				endDate: '2019年/04月/01日',
				// 
				type: 'start',
				// picker的返回值
				timeValue: "",
				// 积分|M币
				currentTab: "jf",
				// 数据列表
				dataList: [{
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				}, {
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				}, {
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				},{
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				},{
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				},{
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				},{
					time: "2019/04/07 23:23:19",
					changed: 14,
					balance: 7878,
					remark: "积分转让"
				}]
				
			}
		},
		computed: {
			isNumInvaild() {
				return this.mbValue - 0 < this.num - 0
			}
		},
		methods: {
			init() {
				this.jfValue = 1029;
				this.mbValue = 10299.99;
			},
			// 初始化时间
			initTime(){
				//获取当前时间
				let now = moment();
				// 结束时间为当前
				this.endDate = now.format("YYYY年MM月DD日");
				// 开始时间为7天前
				this.startDate = now.subtract(7, 'days').format("YYYY年MM月DD日");
			},
			onShowDatePicker(type) { //显示
				this.showPicker = true;
				this.type = type;
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this[`${this.type}Date`] = moment(e.value).format("YYYY年MM月DD日");
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			// 
			changeTab(tab){
				this.currentTab = tab;
			},
			// 查询
			search(){
				// 结束时间不早于开始时间
				let start = this.startDate.replace(/年/g, "-").replace(/月/g, "-").replace(/日/g, "");
				let end = this.endDate.replace(/年/g, "-").replace(/月/g, "-").replace(/日/g, "");
				if(moment(end).isBefore(start)) {
					uni.showToast({
						icon: "none",
						title: "结束时间不能早于开始时间"
					})
				}
				
				// 执行查询操作
				
			}
		},
		onLoad() {
			this.init();
			// 
			this.initTime();
		}
	}
</script>

<style lang="scss">
	.intergralCenterPage {
		.header {
			width: 100%;
			height: 210upx;

			.uni-flex-item {
				.icon {
					background-size: 100%;
					margin-bottom: 10upx;
				}

				.text {
					.bottom {
						text-align: center;
					}
				}
			}

			.left {
				border-right: 2upx solid #f0f0f0;

				.icon {
					width: 68upx;
					height: 67upx;
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA+CAMAAACr3TNIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q2NjAxRUE1QzU1MTFFOThENkY4NTdGQjA2N0FCNUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q2NjAxRTk1QzU1MTFFOThENkY4NTdGQjA2N0FCNUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2Ut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");
				}
			}

			.middle {
				border-right: 2upx solid #f0f0f0;

				.icon {
					width: 68upx;
					height: 68upx;
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAMAAABEH1h2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA4MENERDY1QzUzMTFFOThGOURGQTU2MzlBOURENUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA4MENERDU1QzUzMTFFOThGOURGQTU2MzlBOURENUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4YjlhMWJmLTM3YTYtZjM0Yy05ZDA2LTEzOWIzYzFjZWQzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiLz4gPC9y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");
				}
			}

			.right {
				.icon {
					width: 68upx;
					height: 60upx;
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA6CAMAAADYzMR1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzBGQ0EyNkE1QzUzMTFFOUExNUJBMEU4QzE1MzQ4MzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBGQ0EyNjk1QzUzMTFFOUExNUJBMEU4QzE1MzQ4MzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4YjlhMWJmLTM3YTYtZjM0Yy05ZDA2LTEzOWIzYzFjZWQzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nnAp5AAACGVBMVEX///8VYvGTtPjK2vxGgfRcj/VajfXy9f73+v+pw/pJgvSXtviHq/dUivRYjPX1+f+Ss/j7/P/q8P7+/v/8/P8mbfIXY/EeZ/H5+//U4PywyPozdfIucvIiafF9pPaGqvfk7P3F1vxwm/atxfrt8v7u8/7G1/xFgPO6zvvf6P3Q3vwtcfIcZvF7o/aHq/fi6/1pl/a+0vucufmxyPrI2fyauPgkavEnbvIWY/EaZfFPh/QydPIhafFsmfaZuPgobvKMr/c8evMwcvJTifR0nvZnlfY1dvL8/f8ZZPHm7v12oPZQh/T9/v/H1/xznfbx9f6IrPf4+/9Xi/XB1PvX4/zP3fx6ovYxc/LR3/yYt/h2n/Y7efNEf/OApvafu/lik/VdkPWmwflAfPOjv/lekPVllfb19//a5fxcjvVZjfXY5Px5ovaow/pbjvW8z/sbZfH6/P98pPZDf/OyyfqDqffo7v6vxvq80PvY4/xBffPl7f1xnPbz9v6hvflklPaqxPrw9f6gvPlOhfSNr/esxPqbufklbPHJ2fx1n/aauPiUtfjD1fw6efOJrfdSifQqb/Kwx/pjlPWduvnM2/z1+P+CqPf09/+EqvfW4vy5zvvV4fw9e/M5ePPj7P3d5/1gkvWQsvhMhPRNhfTZ5fyhvfnN3Pw+e/Okv/nv9P6/0vvL2/zQ3vyeu/lKg/Ts8v6VtfixyfofZ/FLg/TrrAD5AAACtklEQVR42uyWZ1PbQBCGbx3ACRmQG45NMRjHBgYILZOQhBZCDS3UkN5773XSSHN67z2kkv4Ls3fC0kmWZNl8YRh2RvLu6d7Hp7u9WxESj3m6bheESML2ZvRtCQDMS0zd83yoEURbG7+6dcy2GDibG5+8/Xz5Almc1Iy3TPNqof/oZ1md3fQnSKzonDGndg6EUxZJ6jkbf3wU2/F9MkzIfx1puiv/ecGKkEd6ZMOGZ8bqg9caUrmhd1cFFY/HsDFsIC/acv+vPPTkB7uj3y4DYJeO+ux+XxY/dH+vZrdagDYhurlz+Pcdt6Qu7s7UX/MAduhXtR0L1F6V1CU7K08azlMQOz1VtNSd4tLN3dFgiWWYYFnMiWRWEiRqKZOL8H5G/LZUQUhO4MBInSZMAULeCdu5dLQcPO3ob/ojnuBiG2aT1Ps7i19wekdHVGZaecJMVT1YxsJZMiC0EEwR1kcGDCrCKq3doUX4Nx5aVAR6yMKS0YdPJORsLcJKvMrE8JUYRQhCCwbLt/PTqknwYZmxsWiQ1mmOUIp+qXJhNAmHygHWsMgHkHZFJtirAVrYIe0ZcBgR8gvx5qUKLAyBdzLBi24ddQprALa69Akb7JgrubQjlhyBe4vL6H6izmY6od/0CfvIaiwYTkK2AVwnuTIB3Wr2z8WUUKVPSCN+vM8nVje9c2MIs95o69A50GNEaMXEGyJfcOmdPOEmun7qnO6D+r3EiEAeA+TYP7BF5QgOOs2i+9pOjAk09y7ilacgEFwbGDaRD0ggWMLbAPqIklCJ/qVec4QRth/uqQhOulVfek0RdrDvD0FFIO01tDY336iQys4ePQI5TPcQURNIV3as3U3PqOPsYwj5LPfLIo5oF/JjEExYRf1ECaTza9HgeOX9yebCNV2zphrhliV+a5x035MTI/wXYADMnWCAQc3imwAAAABJRU5ErkJggg==");
				}
			}
		}


		// 时间段查询
		.search {
			width: 100%;
			padding: 20upx 30upx;
			box-sizing: border-box;

			.picker {
				width: 100%;
				height: 64upx;
				margin: 30upx 0;

				.start,
				.end {
					height: 100%;
					border: 2upx solid #eee;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 10upx;
					font-size: 24upx;
					color: #666;
				}

				.icon {
					width: 100upx;
					height: 100%;

					.arrow {
						width: 25upx;
						height: 21upx;
						background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAWCAMAAAACYceEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzU1MTcwMS04N2FlLTRjNGMtYjMzNC1mMjg5NDA2ODgzNWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzY1OEUzRTQ1RDAzMTFFOTkxNTlCRkVEOTQ4NTE3QzgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzY1OEUzRTM1RDAzMTFFOTkxNTlCRkVEOTQ4NTE3QzgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YWU1MWE1MTktOTM1Yi02MzQ5LTljMjktNzEyNzM1MDExNDMzIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MjZlZTkzNWQtNTQ5NS0xMWU5LTg0MDYtZDBjNmE2NDI3ZWRiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bnHWoQAAAJZQTFRF////JCQkkZGR/v7+WlpaJSUlkpKSIyMjWVlZW1tb5ubm9PT0/Pz8Xl5e/f39KCgooqKikJCQvr6+lJSUJiYmVFRU0dHRRUVFQ0ND4eHhhYWFNzc3gYGB7+/vrq6uKysrycnJiIiIuLi4Ojo6Y2NjsLCwLi4uz8/Pw8PDMDAwQUFB1NTU29vbNTU15eXlysrKQkJC7e3t7Ol8IgAAALtJREFUeNp0j4cSwiAQRG+5kB6T2Hvv3f//OQkZNdHzMTcsBwsLkYF3bZ2QAD8u+nAV+hR3oPdm/mqbGgIto/jHtNRYsz3EVQPReYZ+RA2iqqmQ0VHjHviO4wfOG9+ZMmUaBg8aVpRoKKZQucXI82L6MH/dziTCkuafQ/zHX+3eVA3XlqtCIoUanolsCpnZsaLyFbvsRSwkiwNvO2Ap4Rhoiuk2wEJM3U3hNyRLOMJqIn418dJT+exTgAEAyoEHGO24i4YAAAAASUVORK5CYII=");
						background-size: 100%;
					}
				}
			}
			.searchBtn{
				.btn{
					background: #1359ef;
					color: #fff;
					border-radius: 2upx;
				}
			}
		}
		.list{
			.tabs{
				width: 100%;
				height: 80upx;
				.uni-flex-item {
					color:#666;
					position: relative;
					.bottom-line{
						display: none; 
					}
				}
				.active{
					color:#242424;
					.bottom-line{
						display: block;
						width: 20upx;
						height: 6upx;
						position: absolute;
						bottom: 4upx;
						left: 50%;
						transform: translateX(-50%);
						background-color: #242424;
					}
				}
			}
			.table{
				.table-body{
					width: 100%;
					height: 80upx;
					background-color: #fff;
					color: #666;
				}
				.table-header{
					width: 100%;
					height: 80upx;
					background-color: #242424;
					color: #fff;
					// 边框
					.time, .changed, .balance{
						border-right: 1upx solid #fff;
					}
					// 箭头
					.changed, .balance, .remark{
						position: relative;
						/*向上*/
						.triangle_border_up{
							width:0;
							height:0;
							border-width:0 10upx 10upx;
							border-style:solid;
							border-color:transparent transparent #999;/*透明 透明  灰*/
							position:absolute;
							top: 30upx;
							left: 80upx;
							&.up{
								border-color:transparent transparent #333;/*透明 透明  灰*/
							}
						}
						/*向下*/
						.triangle_border_down{
							width:0;
							height:0;
							border-width:10upx 10upx 0;
							border-style:solid;
							border-color:#999 transparent transparent;/*灰 透明 透明 */
							position:absolute;
							top: 44upx;
							left: 80upx;
							&.down{
								border-color:#333 transparent transparent;/*灰 透明 透明 */
							}
						}
					}
				}
				.time, .changed, .balance, .remark{
					display: flex;
					align-items: center;
					box-sizing: border-box;
				}
				.time, .changed, .balance{
					border-right: 1upx solid #f0f0f0;
				}
				.time{
					flex: 0 0 43%;
					padding-left: 30upx; 
				}
				.changed, .balance{
					flex: 0 0 16.7%;
					padding-left: 15upx;
				}
				.remark{
					flex: 0 0 23.6%;
					padding-left: 15upx;
				}
			}
		}
	}
</style>
