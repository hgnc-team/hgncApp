<template>
	<view class="vipCenterPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<view class="header">
			<view class="title" v-if="title">
				{{title}}
			</view>
			<view class="userinfo">
				<view class="face">
					<image :src="userinfo.face"></image>
				</view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">
						<text class="icon"></text>
						{{ userinfo.telPhone }}
					</view>
				</view>
				<view class="info2 uni-text-small" @tap="copyId">
					<text class="id"></text>
					<text class="text">{{userInviteCode}}</text>
					<view class="icon">
						<uni-icon type=""></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="table">
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center">
					<view class="icon flex-center-center">
						<text class="img wdjf"></text>
					</view>
					<view class="top">
						我的积分
					</view>
					<view class="bottom">
						999
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center">
					<view class="icon flex-center-center">
						<text class="img sfmb"></text>
					</view>
					<view class="top">
						今日释放M币
					</view>
					<view class="bottom">
						9.88枚
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(1)">
					<view class="icon flex-center-center">
						<text class="img mbqb"></text>
					</view>
					<view class="top">
						M币钱包>
					</view>
					<view class="bottom">
						9999.99枚
					</view>
				</view>
			</view>

			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center" @tap="toMyOrder">
					<view class="icon flex-center-center">
						<text class="img wddd"></text>
					</view>
					<view class="top">
						我的订单
					</view>
					<view class="bottom">
						购买记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(0)">
					<view class="icon flex-center-center">
						<text class="img jfzx"></text>
					</view>
					<view class="top">
						积分中心
					</view>
					<view class="bottom">
						数据详情
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toMyTeam">
					<view class="icon flex-center-center">
						<text class="img wdtd"></text>
					</view>
					<view class="top">
						我的团队
					</view>
					<view class="bottom">
						团队数据
					</view>
				</view>
			</view>

			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center" @tap="toFundManagement">
					<view class="icon flex-center-center">
						<text class="img zjgl"></text>
					</view>
					<view class="top">
						资金管理
					</view>
					<view class="bottom">
						佣金提现
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toSalesManagement">
					<view class="icon flex-center-center">
						<text class="img xsgl"></text>
					</view>
					<view class="top">
						销售管理
					</view>
					<view class="bottom">
						销售记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toPerformanceManagement">
					<view class="icon flex-center-center">
						<text class="img yjgl"></text>
					</view>
					<view class="top">
						业绩管理
					</view>
					<view class="bottom">
						业绩详情
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item :title="pageList[0].title" @click="handleClick(0)" :thumb="pageList[0].thumbUrl"></uni-list-item>
				<uni-list-item :title="pageList[1].title" @click="handleClick(1)" :thumb="pageList[1].thumbUrl"></uni-list-item>
				<uni-list-item :title="pageList[2].title" @click="handleClick(2)" :thumb="pageList[2].thumbUrl" :show-badge="true"
				 :badge-text="'需实名认证'"></uni-list-item>
			</uni-list>
		</view>
		<!-- 客服电话 -->
		<view class="telphone flex-center-center uni-row uni-text-small text-color-gray">
			<view class="iconfont iconicon_telephone"></view>
			<text>客服电话：</text>
			<text>{{customerTelephone}}</text>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import util from "../../common/util.js";
	export default {
		components: {
			uniIcon,
			uniList,
			uniListItem
		},
		data() {

			return {
				userinfo: {
					face: '/static/HM-PersonalCenter/face_default.png',
					username: 'VIP会员2312',
					id: "1234567",
					levelName: "销售经理",
					telPhone: '1435*****2132'
				},
				// 跳转其他功能页面列表
				pageList: [{
						index: 0,
						title: '邀请会员',
						thumbUrl: '/static/img/vipcenter/yqhy.png'
					},
					{
						index: 1,
						title: '积分转让',
						thumbUrl: '/static/img/vipcenter/jfzr.png'
					},
					{
						index: 2,
						title: '实体加盟',
						thumbUrl: '/static/img/vipcenter/stjm.png'
					}
				]
			};
		},
		computed: {
			...mapState(['userName', 'userLevel', 'userFace', 'userPhone', 'userInviteCode', 'customerTelephone']),
			title() {
				let title = "业务总监，你好！";
				switch (this.userLevel) {
					case 4:
						title = "大区经理，你好！"
						break;
					case 3:
						title = "业务总监，你好！"
						break;
					case 2:
						title = "销售经理，你好！"
						break;
					case 1:
						title = ""
						break;
					default:
						break;
				}
				return title;
			}
		},
		methods: {
			init() {

			},
			// 复制id
			copyId() {
				uni.setClipboardData({
					data: this.userinfo.id,
					success: () => {
						uni.showToast({
							icon: "none",
							title: "成功复制内容到剪切板"
						});
					}
				});
			},
			// 我的订单
			toMyOrder() {
				uni.navigateTo({
					url: '../../mine/order_list?index=0'
				})
			},
			// 积分中心
			toIntegralCenter(index) {
				// 根据index的不同展示不同的tab
				uni.navigateTo({
					url: '../../vipCenter/intergral_center'
				})
			},
			// 我的团队
			toMyTeam() {
				uni.navigateTo({
					url: '../../vipCenter/my_team'
				})
			},
			// 资金管理
			toFundManagement() {
				uni.navigateTo({
					url: '../../vipCenter/fund_management'
				})
			},
			// 销售管理
			toSalesManagement() {
				uni.navigateTo({
					url: '../../vipCenter/sales_management'
				})
			},
			// 业绩管理
			toPerformanceManagement() {
				uni.navigateTo({
					url: '../../vipCenter/performance_management'
				})
			},
			// 点击跳转
			handleClick(index) {
				// 邀请会员
				if (index === 0) {
					uni.navigateTo({
						url: "/pages/mine/change_telphone"
					})
					// 积分转让
				} else if (index === 1) {
					uni.navigateTo({
						url: '/pages/vipCenter/intergral_transfer'
					})
					// 实体加盟（我要开店）
				} else if (index === 2) {
					uni.navigateTo({
						url: '/pages/vipCenter/setup_store'
					})

				}
			}
		},
		created() {
			// 关闭下拉刷新
			util.closePullToRefresh();
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #f0f0f0 !important;
	}

	.vipCenterPage {
		.header {
			background-color: #242424;
			width: 100%;
			margin-top: 0;
			/*  #ifdef  APP-PLUS  */
			margin-top: var(--status-bar-height);

			/*  #endif  */
			.title {
				text-align: center;
				color: #fff;
				padding: 30upx 10upx 0;
				height: 50upx
			}

			.userinfo {
				width: 100%;
				height: 200upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30upx 0 30upx 30upx;
				box-sizing: border-box;

				.face {
					flex-shrink: 0;
					width: 136upx;
					height: 136upx;
					border-radius: 50%;
					border: 4upx solid #fff;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.info {
					display: flex;
					flex-flow: wrap;
					padding-left: 30upx;

					.username {
						width: 100%;
						color: #fff;
						font-size: 32upx;
					}

					.integral {
						display: flex;
						align-items: center;
						height: 40upx;
						color: #fff;
						background-color: rgba(0, 0, 0, 0.1);
						border-radius: 20upx;
						font-size: 24upx;
						display: flex;
						align-items: center;

						.icon {
							width: 18upx;
							height: 20upx;
							margin-right: 10upx;
							display: block;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REVDQkI5QjE1QzU4MTFFOThBODA4RTlCQjFCMTgzMzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REVDQkI5QjA1QzU4MTFFOThBODA4RTlCQjFCMTgzMzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ljT+eQAAAHtQTFRF////JCQkJSUlIyMj/v7+kpKSl5eXlpaWLi4uW1tbLS0tLy8vlZWVk5OTWlpaLCwskZGRMDAwIiIi3t7ecXFxfHx8fX19/f39NjY2gYGBmJiYenp6oKCgtLS0RkZG9fX1xsbGXFxcRUVF1tbWb29vcHBwlJSUJiYm8PDwEpdIfQAAAMtJREFUeNpckYdywjAQRPcKtgwBF1oakFAS/v8L2bOEJ5NTs5531/II8jabasmxU1wBx9+6ocK/egl0VhONYXIE6kBzgkFFxTSNyNFKLhNLxTjnJjqF/Z6qGk7jUHQLeI13qpg8EpU0xU9o8USmOUyUqAqU1LR8tIePqJVfy0bryyHSE0xZTiPTNOYUh6DqY9U07M13s9oWYy4vc50Rt5+Hgsffxh74ErlkVhHG6uv29c4HD9WmZKxP8YZtA9nFLSy7uI3uZ9Zt5SHAADx6B1TVH33cAAAAAElFTkSuQmCC");
							background-size: 100%;
						}
					}
				}

				.info2 {
					height: 48upx;
					padding: 0 20upx;
					background: linear-gradient(to right, #e5bd77, #c09853);
					border-top-left-radius: 24upx;
					border-bottom-left-radius: 24upx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;

					.id {
						width: 20upx;
						height: 20upx;
						display: inline-block;
						background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENBQ0M1NEQ1QzU2MTFFOUI0MDVFMTZCNzRBNzNEOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENBQ0M1NEM1QzU2MTFFOUI0MDVFMTZCNzRBNzNEOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PULEQAAAAchQTFRFJCQk5b13JSQiJCQmJCQiIyUktphiJSMkJSUlIyMjtZdhtZdjIyMhIyUiIyQmJiQl5b11JSUj5b145Lx2JCIjJCIlJSMmJCYlfmtLJCMotphktJZg57x3t5ljIyMls5hj4712inZRindPi3VO5L14OzcujHZPWVE8JyMkJCUqtZhgr5Ffbl9C2LJxJCUgtpdhWk85rJJfXVA9yqdtISUktZZgcWFH5L53XE886L15tJZiup1jIyUgs5hhKSgmuJljh3FK47x3tpZjmYBYzKhsq5FgfmtKNzMqf2pLspdiMy4rzKpttpVge2tKLC0oj3lSISIkpotcJCMhm4Jat5llPjouy6dp5r55JiIjPzkt5rx05r1707BwODQrs5dl5L51XVE51a9uJCYjWlE/JCUnyqhrm4RYtZViMy4qpYlaeWlI5L16Tkc1JSUngGtMtJZkoIVat5hiiXdRt5pis5hg5bp2JiYm5Lx3ICQjODUsuJZot5doIiYluJdikn1SX08/tplhuZhjy6drdWZHLCsneWhKi3dSIyInJiUjIyQoPDgstJliVUw6IiQhVk07IiQjqI5d5b94tZdlgnJOJiQne2hIs5pk4Ll2uNO0TQAAAW9JREFUeNpckPVTlGEAhPftr6/7uDtQUkrpbgNpUCzSbkRKOhQBRUUQ/l3OGWYYmP1td3aenUU8VVY789dsbT0ejf2oqJAl7cSLVClFaAA2NJfiXGEBawSbHgsWoJiydt8HuJ87uI+oiORDcDGZmLNAIzu2Xt4EU1OFhpF8VWnUvnw9/QWWRpuwHihv9tZ4b2WRg0fDpOjdkQhEIRnPriO3G7fdbb+6i6qefKU0Axlcz7vmq8YV900ndG+WbPUxCcPDWAfJLc7xhaFjamw1uL8CSWFfJzdYpjdc7xL/4n/8oY1L5rf5fju4dF4nYU3Hi5ZD8UBeAIm9k7cP/R55NulDY6a77eebCfeg9pua+BxYbiY1vpEscjUt2eMwKmHCVWjGGjorC5Ife5+GaFAkPmFIsP+HMOrXoKxnygMRRbsGrgPBhEuBpvlQ/C5aSimzKU1HEM53FXH4OEG8qizWYN5JFhiLXbLEkObz1ONTAQYAPBI76R8ilmkAAAAASUVORK5CYII=");
						background-size: 100%;
					}

					.text {
						display: block;
						height: 100%;
						line-height: 48upx;
						font-size: 20upx;
						font-weight: 700;
						padding: 0 10upx;
						color: #242424;
						box-sizing: border-box;
					}

					.icon {
						width: 18upx;
						height: 18upx;
						display: inline-block;
						background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzcxODE3OUY1QzU3MTFFOThEMjJEM0JGOEI5MUMzNDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzcxODE3OUU1QzU3MTFFOThEMjJEM0JGOEI5MUMzNDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+AzmqqwAAAcJQTFRF//////7////9/v///v7+/v78/f/+y6twwJpTy6NeyqNe1bWC1beD///7//780q910rSA0rJ/1riG0bN/1LaE07WB17mFzKReyqJd8ubYwZpX1reIza107+jWzKxzzalt/v7/8uvb/v/7//3+//3/0raE/v/6wppV/v/9/vz9yqNg/v3/9OfX2LmD+//+69/H7N3I0attw5dW/Pv2z690zaJd7ODI17mDx6NlzKRfza9z17mHwJpZzqtzxJ1YwZ5ewJdXy6Ve+/v5+/f26+DO0baB8ufVz692xJlVz6NmvZtT7Obayqpx7+bUwZlU1bqLwJlW/f/8wZhWyadq1raDzap0zKt12bmGzKlx0a508enU7ODK/P//zaRixaNczrF50K1z1rqKzKptzqps//z5zq13zaVn+vv207WD8OfWw5xb7t/K6+DK0reC8ubWzKdwyqZozqpuyqJc/P/907B2zq512LiF8+3h0K11zapy8+jU1LaA+/z3xqJmzKlv07OC2buJ0bOB/f39zKpq1riE8eXX8OTU8OfY0a9y1raF1LSBzapwyqVhwJdVwJlU//v48ejW1bmHxZ9g0LB38OnZ8ebUb5NwywAAATFJREFUeNocjlVXQlEUhGfvc+6lUURQwUAwwO7u7u7u7u7uzv/rXT7My6xvfTMoDAvbyr3Od/e7zXuhIaumuTJUGpOSGrMZQvgJKiMwhlFDuKEIzNTJxJxAFIlwg9GYmbIW8TF0XxfxrojkWbw8pBY7bz6dPSGhx9PjAS9N4FkCTIKEBV6l4E5BNIIASEIcSBLH1EBGYgcaJvwWqDSCwxX8U4TY36PbqH1OwEAe0KdVvqqLx1qzOb7aCl06ZC++QYrmh5UEpG5YohT1IBYCQluQrMtgbCIHvvlJk8nhaD9hblmmq3IciG3E/iy2RjXPQMTobKdt2AURSy3MKs5cHW8NGEyDUODR7loJ64l6fRc2YGFAFUKFR/nKKtFXYGlqIf7Jdn4ZbA+2d7uaEl/1fwIMADVBME8p3UUbAAAAAElFTkSuQmCC");
						background-size: 100%;
					}
				}
			}

			.setting {
				flex-shrink: 0;
				width: 6vw;
				height: 6vw;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.table {
			width: 100%;
			margin-bottom: 20upx;
			border-bottom: 1upx solid #f0f0f0;
			background-color: #fff;

			.row {
				height: 212upx;
				border-bottom: 1upx solid #f0f0f0;

				&:last-child {
					border-bottom: none;
				}

				.row-item {
					border-right: 1upx solid #f0f0f0;

					&:last-child {
						border-right: none;
						margin-bottom: none;
					}

					.icon {
						width: 100%;
						height: 110upx;

						.img {
							display: block;
							background-size: 100%;
						}

						.wdjf {
							width: 68upx;
							height: 67upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA+CAMAAACr3TNIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Q2NjAxRUE1QzU1MTFFOThENkY4NTdGQjA2N0FCNUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Q2NjAxRTk1QzU1MTFFOThENkY4NTdGQjA2N0FCNUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2Ut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");
						}

						.sfmb {
							width: 68upx;
							height: 68upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAMAAABEH1h2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA4MENERDY1QzUzMTFFOThGOURGQTU2MzlBOURENUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA4MENERDU1QzUzMTFFOThGOURGQTU2MzlBOURENUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4YjlhMWJmLTM3YTYtZjM0Yy05ZDA2LTEzOWIzYzFjZWQzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiLz4gPC9y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");
						}

						.mbqb {
							width: 68upx;
							height: 60upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA6CAMAAADYzMR1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzBGQ0EyNkE1QzUzMTFFOUExNUJBMEU4QzE1MzQ4MzYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBGQ0EyNjk1QzUzMTFFOUExNUJBMEU4QzE1MzQ4MzYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmM4YjlhMWJmLTM3YTYtZjM0Yy05ZDA2LTEzOWIzYzFjZWQzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpjOGI5YTFiZi0zN2E2LWYzNGMtOWQwNi0xMzliM2MxY2VkM2EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nnAp5AAACGVBMVEX///8VYvGTtPjK2vxGgfRcj/VajfXy9f73+v+pw/pJgvSXtviHq/dUivRYjPX1+f+Ss/j7/P/q8P7+/v/8/P8mbfIXY/EeZ/H5+//U4PywyPozdfIucvIiafF9pPaGqvfk7P3F1vxwm/atxfrt8v7u8/7G1/xFgPO6zvvf6P3Q3vwtcfIcZvF7o/aHq/fi6/1pl/a+0vucufmxyPrI2fyauPgkavEnbvIWY/EaZfFPh/QydPIhafFsmfaZuPgobvKMr/c8evMwcvJTifR0nvZnlfY1dvL8/f8ZZPHm7v12oPZQh/T9/v/H1/xznfbx9f6IrPf4+/9Xi/XB1PvX4/zP3fx6ovYxc/LR3/yYt/h2n/Y7efNEf/OApvafu/lik/VdkPWmwflAfPOjv/lekPVllfb19//a5fxcjvVZjfXY5Px5ovaow/pbjvW8z/sbZfH6/P98pPZDf/OyyfqDqffo7v6vxvq80PvY4/xBffPl7f1xnPbz9v6hvflklPaqxPrw9f6gvPlOhfSNr/esxPqbufklbPHJ2fx1n/aauPiUtfjD1fw6efOJrfdSifQqb/Kwx/pjlPWduvnM2/z1+P+CqPf09/+EqvfW4vy5zvvV4fw9e/M5ePPj7P3d5/1gkvWQsvhMhPRNhfTZ5fyhvfnN3Pw+e/Okv/nv9P6/0vvL2/zQ3vyeu/lKg/Ts8v6VtfixyfofZ/FLg/TrrAD5AAACtklEQVR42uyWZ1PbQBCGbx3ACRmQG45NMRjHBgYILZOQhBZCDS3UkN5773XSSHN67z2kkv4Ls3fC0kmWZNl8YRh2RvLu6d7Hp7u9WxESj3m6bheESML2ZvRtCQDMS0zd83yoEURbG7+6dcy2GDibG5+8/Xz5Almc1Iy3TPNqof/oZ1md3fQnSKzonDGndg6EUxZJ6jkbf3wU2/F9MkzIfx1puiv/ecGKkEd6ZMOGZ8bqg9caUrmhd1cFFY/HsDFsIC/acv+vPPTkB7uj3y4DYJeO+ux+XxY/dH+vZrdagDYhurlz+Pcdt6Qu7s7UX/MAduhXtR0L1F6V1CU7K08azlMQOz1VtNSd4tLN3dFgiWWYYFnMiWRWEiRqKZOL8H5G/LZUQUhO4MBInSZMAULeCdu5dLQcPO3ob/ojnuBiG2aT1Ps7i19wekdHVGZaecJMVT1YxsJZMiC0EEwR1kcGDCrCKq3doUX4Nx5aVAR6yMKS0YdPJORsLcJKvMrE8JUYRQhCCwbLt/PTqknwYZmxsWiQ1mmOUIp+qXJhNAmHygHWsMgHkHZFJtirAVrYIe0ZcBgR8gvx5qUKLAyBdzLBi24ddQprALa69Akb7JgrubQjlhyBe4vL6H6izmY6od/0CfvIaiwYTkK2AVwnuTIB3Wr2z8WUUKVPSCN+vM8nVje9c2MIs95o69A50GNEaMXEGyJfcOmdPOEmun7qnO6D+r3EiEAeA+TYP7BF5QgOOs2i+9pOjAk09y7ilacgEFwbGDaRD0ggWMLbAPqIklCJ/qVec4QRth/uqQhOulVfek0RdrDvD0FFIO01tDY336iQys4ePQI5TPcQURNIV3as3U3PqOPsYwj5LPfLIo5oF/JjEExYRf1ECaTza9HgeOX9yebCNV2zphrhliV+a5x035MTI/wXYADMnWCAQc3imwAAAABJRU5ErkJggg==");
						}

						.wddd {
							width: 68upx;
							height: 82upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA+CAMAAABeI7j4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEI4M0E5NTE1QzU0MTFFOUEyRkJEN0JCQ0I5NzA2QjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEI4M0E5NTA1QzU0MTFFOUEyRkJEN0JCQ0I5NzA2QjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Vl3fkgAAAF1QTFRF////E1jviKv3TYHz1uL91+P91eH8w9X7/P3/YY/0mLb4GVzvGl3vXYz0pb/5han3/f7/ssj6psD5iaz3sMf6rsb6zNv8/v7/XIv0N3HxdJz1ja73F1vvjK33GFvvRCxG2AAAAJ5JREFUeNrslskOgjAURS8VURyKA8go//+ZpCaghmtpCOkC39m2J+3r2RQYOAYWTmB4UwpFKSzKjS5Afyvh5/G/lTdbj4reGRqb0r626EEJ+/HLDaXsx4/GylSXBZSnslBTxYE1K4mpdgGurOadKmfz/nvgwLrESymZSZYDD5YylZSSUlJKSkk5W5lxsT9PuQ6lUo5U47+lC56UToABAP24EJNHfTUaAAAAAElFTkSuQmCC");
						}

						.jfzx {
							width: 68upx;
							height: 63upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA6CAMAAADfjhpgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjNDOEU2NDk1QzU0MTFFOUIxMkY5MTRERDQyOTJGM0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjNDOEU2NDg1QzU0MTFFOUIxMkY5MTRERDQyOTJGM0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pUbr9QAAAGZQTFRF////E1jvV4jziKv3bpj1p8H58/f/us77P3fyTYHz4On9HV/v3Of9kLH4vtH7QnnyOHLxg6f3NXDxw9X7zNv8VYfzm7j4aJT1z938gqb2QHjyvdD7UYTz2uX9b5n1Mm7xPXby5u3+yUOBQwAAAJlJREFUeNrs1ssOgyAQQFEErVK1aunLV9X//0mZpAkY4oJxQWLnbgDD2RgjMLZbEpk48y48b4TujuYXmHDiZ+aZ9ZWl/8djGK/EXZ5b77YIwQf4eb3RvITxRpz4Mf5RajzAqx8iTpy4P3fO982d1p9vbtSaT1I3o7lzxhn+laaHXvfWuoUNT+vB4nBUwXknsL2A46vD8lWAAQDN3hVhI5wCIgAAAABJRU5ErkJggg==");
						}

						.wdtd {
							width: 68upx;
							height: 68upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAMAAABEH1h2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjhCRTBGMEU1QzU0MTFFOTgyNEJGOTM0OTgwRUM3QkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjhCRTBGMEQ1QzU0MTFFOTgyNEJGOTM0OTgwRUM3QkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hlo0DAAAAitQTFRF////E1jviKv3KWfwKmjwgKX2gab2OnTxRHry/v7/LWvwj7D3HF7v/P3/vND7+fv/+Pr/eaD2xdb7GFvvYY/05+7+cJr1ToLzF1vvpsD5WInzWYn0Wor07fL+JWXwl7X48PT++vz/2+b9I2Pw9vn/oLz5TYHzZZL0tsz6cZr1dp72nbr4GVzv2OP9a5f1XYz0K2nw5u3+bJf13+n9g6j3JmXwJ2bwqsP5/f7/u8/7HV/v8vb/P3fyRHvygqb29/r/NXDxc5z1R33yRnzyv9L7xNb7+/z/6O/+6/H+lrX4fKL2Y5H0U4Xzydn8wNL7krL4vtH70t/8JGTwUYPzhqr3G13vMW3xVYfzSX7yFFnvLGrwS4DzPnbyGl3vfaP2tcr68/f/jK33eqH2UIPzZ5P1tcv6z938Q3ryTIDzf6T26vD+r8b6pL/5qcL5yNj8nLn4YI/0Lmvwscj6FVnvPHXxkbH4T4LzaJT1SH7y5Oz+9Pj/5ez+wtT77vP+rMT6bpj1NG/xo775q8T5IGHv9fj/wdP7Sn/yQXjyaZX17/T+4uv9dZ32IWLwOHLxe6L22uX9KGfwZJH0vdD7qMH54+v9O3Txapb1X470ssj6Hl/viaz3YpD03ef9VofzzNv8ZpP02eT9ImPwmbf48fX+M27xXY30cpv1Xo30Flrv8/b/zt38h6r3sMf6fqT2ztz8OXPxUYTzL2zxmrf4RXzyQHjyi633uM36k7P4s8n6olFMIAAAAzNJREFUeNrElmVDG0EQhnfSQtwIECA4BHeKFGlxdytSaPHi1N3d3d3d9ed1NkKOkN3cpR86H2735p3nbu92d2YJYdnenWZ5VtpgltzcGkQkmnJuCwgsoUAphV57E9ys5JpoePNDO9JvyfCfyrH02+/C3oqjsz/T6KLkaseAldWHi6hHXiuGTr+CoXGyaKHvoOwCOrPSvdN1KgxURLi7IxToVtV5o2NoWKB+paAPRKE0xgu+G4Nue5Yof8vLjGHIpMGzZihBUcfFdwCE5LLEByEAG3n0OD7fjy0PoTzOwV8DRJ5gy8V5AItsWd8NsIY3unUAGi33xz3i4fMYUMVUfwJ0cLeW8jjAMFMNBhjlT6wZ4BVT3ABwn48v4s5jinKA83y8nDfzFwHK+Xgy7lumuAsgk4+HA3xhiokAFXwc9+MZpngJk4yWR2s1vEU9g6viAA9vwYBtTDXeBPCRh48AmOLZsgWz3D7OlnnK/7ebgLtn/FBO4o2uFGAwmyUGYbo4zZ2YAFqRGPkwphLFZv7ENmHIY89SI/AWvGOAKl6iVnmttbn5HsvENM3/+bkiihR9f561UOgrtEai8+sTMUUuYo+tIFr3Ox03rHLqGYgWV2JrcuwlucySsW4qw1Jmv0vRiq7wbSXux4MfbZIOJwVhGherCZN2OLGVtCpZSuKLI4kp91r0RLoZmn+/xKqSn9k6b5CI1v4ZqjC5Bm+qbLgzLY7Uti+M9YAH6xlbaC/kotG6rk6NEPluNC47393t7NI994heDg2WCwI1CQl4jcVFhM0pc7dAkgeHxi7LUQHq8DiBrmp89k5LGvCbqYrL1UhqJr5d3SoI6QhXB6y3JRijYrvLHaIwzgQtVaxJ2g4ANDkOfB9GSt8si00iq5ZuI51PtBu+LMdRWFSska524O7fgydT9NbTTj123CY+1vmfbPiornjlr/yE6kna0WFnwtMsmR24v6eZuI7UWdo5h505Rt5l4/5IqWlnmJW8ufgx+m2hhByl7SHJOJlFrO9XUh82s0Q6TlIRTEvDSyrxBbfxaFHEN5xE8WjvOOXVxHecqN+Tf8F55sR7ZT5Zr2vL+Gj/Gf8rwACb1Gw8yb427QAAAABJRU5ErkJggg==");
						}

						.zjgl {
							width: 68upx;
							height: 68upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkNERUU1N0Q1QzUzMTFFOUE0REJFMEIwMzEwNjFCOTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkNERUU1N0M1QzUzMTFFOUE0REJFMEIwMzEwNjFCOTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2Ut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");
						}

						.xsgl {
							width: 68upx;
							height: 68upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAMAAABEH1h2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTg2RkY3ODA1QzUzMTFFOThFMDlERENGQzZCMDAzRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTg2RkY3N0Y1QzUzMTFFOThFMDlERENGQzZCMDAzRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++M9+5wAAAU1QTFRF////E1fviKr3w9X7wdP7TYDz+vz/+fv/6O/+7/T+0t/8zNv8xdb72OP9pb/5y9r80+D8gaX2lLP44er9/v7/8PT+N3DxJWTwImLw4ur9apX1hqn3W4r0KGbwxNX7iqz3R3zyjK33Glzv/f7/JGPwo735x9f7ztz89Pj/tMn69/r/0N78nbr45+7+FFjvSX3y0d78Q3nyZJH0faL2/P3/bpj12+b9IGDvH1/v7vP+FlnvMGzxYI70sMf6RHry8fX+u8/7or35H2Dvj7D3haj3pr/5s8n6aZT1a5b1rsX6NnDxeqD2zdv85ez+7PL+n7v5scf6S3/z9fj/NG7xOnPxuM36ytn8M27xt8z61uL93Ob9e6H24On9k7L4uc36VYbzXIv0JmTwQXjyY5D0K2jwQHfyF1rvRnvy3uj9TH/zHV7vLWrwr8b63+j9lrT4xiHjJAAAAbFJREFUeNrsl/dTwjAUx5MWcYFaZCNLQBBQhgw37r333nv9/z/6kg6OttwV8ETv+v2heS8vn0vy8poCQqrqxjL1oFrUfHyEEcTVhbeJTruOqyrRoqZHIAKikwInozosjQy4ARl+AvcwdWhBwo2oDrXqeBlPRPxJn1WI+liWlt0eKxgIlVhRG0r87JUe5f4AT4OZJ4YZjC4eN0nnbVfgLq8QmiuQoW6w3mLa8Xlob3ed8FwBL9aPBUwjDtM5jCiUwXgNvG06KqXEB6ukzgJtOLv4Be8RZG8a4yfo6FXg97RgjxT4ZphOOO5+AacAlh/Wz1VZvEWZ+fQDHypC6tehnXqG7YQ04jaG8Vjy7yTmQMaiOO5Ejh/Qa+JDjg+R9xYuqTtoXTvSNDdaU+fA2Lkajy6De3Et4cNbBOdoqZ0SPMiXXVyOT0qIl6wkK8x2aZb6+8p7J0ciq7pjcUJDEJ5X0GWFQrRrxNEYN0oCgRnrBOwjR7rOwY9oxBHKfZqiNv2y+k28ud+4BnAbq6ZZiC2JziE4SdVh1YqsQ/7rorOmtOq4juv4P8Mr/ojVjlfoT+LfAgwAfMstlb/2uX0AAAAASUVORK5CYII=");
						}

						.yjgl {
							width: 68upx;
							height: 68upx;
							background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA+CAMAAACr3TNIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REIyMkYwRjU1QzUzMTFFOUE1OTBFMzc4ODQ0OUZCRkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REIyMkYwRjQ1QzUzMTFFOUE1OTBFMzc4ODQ0OUZCRkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N2IxNWMwMjgtMjkwNC01MDRmLThiNTQtMzcwMjgwZjNmZGVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGNmZTM3NGItNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+sVRpMgAAAXFQTFRF////E1fvTYDz/f7/v9H7ztz8H1/v1OD8xdb7lbT4h6r3KWbwaJP1tcr6dp32L2vxPnby3uj9fKL2/v7/z938GlzviKr3rsX6GFrv9vn/e6H2lLP4V4fz8PT+H2DvWYn05u3+Xo30x9f7uM36oLz5zNv8QXjy+fv/KGbwQnjyG1zv7PL+FFjvFVjvVIXzjq731+L9us77RnvyF1rvHF3vY5D04+v96/H+qMH5/P3/TH/z9fj/2uX9+/z/K2jwmLb4mbb46fD+apX1PXXyImLw4ur9+vz/7/T+IWHwy9r82eT93ef9JWTwS3/zvdD78fX+1eH8j7D3cZr1WIjzytn8dp72M27xp8D53+j9aZT1gqb2wtT7kLD4obz5k7L45+7+g6b30N78tMn6JGPwNnDxi6z39/r/Sn7yFlnvcJn1JmTw5ez++Pr/8vb/OnPxkrL4OHHxxtf7eaD2gaX2XYv0I2LwMm3x8/f/T4HzOXLxUILzP71algAAAh9JREFUeNrslmdT20AQhvdwwCYmCLBxATeasSmh94TeO6QACSQBUugpJAHy67MrG+skrcSAhxmG0X3x6n33ka/t6QBu3eYLtAZ3aA1Ca1Y5q8158cGmZNi+/4M2/MsqdCI+uzEMxa35viXVqrLBxyas++/3Zr16S9w9jHb3K5avD6E8u9YqREuHBb7cjSnD7mqGb9yify6bgg38qVxl8dEW9NJjwPDHacJ7TjB8h0EqYaZdh5QS/woM/3MfpYPRzMNvjH+cGvGL54Sf0+KY+A84aHE0dz2UTnwanNbjiSsUu/rV+HUgEJCscA29Of0xJ8y8pbHo1yaF0mQtNyvlZ4SvN0rS1CIqXyShrhKFv5vsmsTQCvXrxV3KD+Yev9M/fJthaF+ALK/fqHfgUnV5MvHAOOWMTzN4VJ3UpT5mN6EeW6Bo5ZJytrm+tytk/RrgPColBYu59zNtqDq+WNFqCvJ71RdBMxluoKlM+a2KVSjtVrUSTqLdSUUxkeD8N4T/i2pLLJ1uERKalUw5xoeyPZISCl5A7x8hPrm09z2RTqciVVmYpLji+jxxSQmiEMAT082KmYe5kGjd0QrIwEMUjLybgqc5HvZm34OOL6bAk+XhRh5WID8eHP6x8jVSNdRyfJuUMGLmvdJufsbxJVJC6b3wFer5bcOXqQNXHN7hHd7hHf5h8abzX3d/4s5/6f6UL2/8/pnuj8bvn/7++F+AAQDCBEV/nyDCOgAAAABJRU5ErkJggg==");
						}

					}

					.top {
						color: #242424;
						font-weight: 600;
						font-size: 26upx;
					}

					.bottom {
						color: #999;
						font-size: 24upx;
					}
				}
			}
		}

		.list {
			
			.uni-list{
				&::before, &::after{
					display: none;
				}
			}
			.uni-list-item {
				.uni-list-item__container {
					.uni-list-item__extra {
						width: 50%;
						.uni-badge-success {
							color: #fd9c67 !important;
							background-color: #fff !important;
						}
					}
				}
			}
			.uni-list-item:nth-last-child(1){
				.uni-list-item__container::after {
					display: none;
				}
			}
		}
		.telphone{
			margin-bottom: 100upx;
		}
	}
</style>
