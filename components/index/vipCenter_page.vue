<template>
	<view class="vipCenterPage">
		<!-- 状态栏 -->
		<statusBar></statusBar>
		<view class="header">
			<view class="title" v-if="title">
				{{title}}
			</view>
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">
						<text class="icon"></text>
						{{ userinfo.telPhone }}
					</view>
				</view>
				<view class="info2 uni-text-small" @tap="copyId">
					<text class="id"></text>
					<text class="text">{{userinfo.id}}</text>
					<view class="icon">
						<uni-icon type=""></uni-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="table">
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center">
					<view class="icon">
						<text class="img"></text>
					</view>
					<view class="top">
						我的积分
					</view>
					<view class="bottom">
						999
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center">
					<view class="top">
						9.88枚
					</view>
					<view class="bottom">
						今日释放M币
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(1)">
					<view class="top">
						9999.99枚
					</view>
					<view class="bottom">
						M币钱包>
					</view>
				</view>
			</view>
			
			<view class="row uni-flex">
				<view class="row-item uni-flex-item uni-center" @tap="toMyOrder">
					<view class="top">
						我的订单
					</view>
					<view class="bottom">
						购买记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toIntegralCenter(0)">
					<view class="top">
						积分中心
					</view>
					<view class="bottom">
						数据详情
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toMyTeam">
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
					<view class="top">
						资金管理
					</view>
					<view class="bottom">
						佣金提现
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toSalesManagement">
					<view class="top">
						销售管理
					</view>
					<view class="bottom">
						销售记录
					</view>
				</view>
				<view class="row-item uni-flex-item uni-center" @tap="toPerformanceManagement">
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
				<uni-list-item title="邀请会员" @click="inviteMembers" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="积分转让" @click="transferIntergral" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="实体加盟" @click="setupStore" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" show-badge="true" badge-text="需要实名"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon,
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	import { mapState, mapMutations, mapActions } from 'vuex';
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
					id:"1234567",
					levelName:"销售经理",
					telPhone: '1435*****2132'
				}
			};
		},
		computed: {
			...mapState(['userName', 'userLevel', 'userFace', 'userPhone', 'userInviteCode']),
			title() {
				let title = "业务总监，你好！";
				switch (this.userLevel){
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
				//用户信息
				this.userinfo = {
					face: '../../static/HM-PersonalCenter/face.jpeg',
					username: 'VIP会员10240',
					telPhone: '1435*****2132'
				};
			},
			// 复制id
			copyId(){
				uni.setClipboardData({
					data: this.userinfo.id,
					success:  () => {
						uni.showToast({
							title:"成功复制内容到剪切板"
						});
					}
				});
			},
			// 我的订单
			toMyOrder(){
				uni.navigateTo({
					url: '../../mine/order_list?index=0'
				})
			},
			// 积分中心
			toIntegralCenter(index){
				// 根据index的不同展示不同的tab
				uni.navigateTo({
					url: '../../vipCenter/intergral_center'
				})
			},
			// 我的团队
			toMyTeam(){
				uni.navigateTo({
					url: '../../vipCenter/my_team'
				})
			},
			// 资金管理
			toFundManagement(){
				uni.navigateTo({
					url: '../../vipCenter/fund_management'
				})
			},
			// 销售管理
			toSalesManagement(){
				uni.navigateTo({
					url: '../../vipCenter/sales_management'
				})
			},
			// 业绩管理
			toPerformanceManagement(){
				uni.navigateTo({
					url: '../../vipCenter/performance_management'
				})
			},
			// 邀请会员
			inviteMembers(){
				uni.showToast({
					title: "邀请会员"
				})
			},
			// 积分转让
			transferIntergral(){
				uni.navigateTo({
					url: '../../vipCenter/intergral_transfer'
				})
			},
			// 实体加盟（我要开店）
			setupStore(){
				uni.navigateTo({
					url: '../../vipCenter/setup_store'
				})
			}
		}
	};
</script>

<style lang="scss">
.vipCenterPage {
	.header {
		background-color: #242424;
		width: 100%;
		padding: 10upx;
		.title{
			text-align: center;
			color: #fff;
			padding: 10upx;
			height: 70upx
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
				border-radius: 100%;
				border: 2upx solid #fff;
				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
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
					.icon{
						width: 18upx;
						height: 20upx;
						margin-right: 10upx;
						display: block;
						background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REVDQkI5QjE1QzU4MTFFOThBODA4RTlCQjFCMTgzMzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REVDQkI5QjA1QzU4MTFFOThBODA4RTlCQjFCMTgzMzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ljT+eQAAAHtQTFRF////JCQkJSUlIyMj/v7+kpKSl5eXlpaWLi4uW1tbLS0tLy8vlZWVk5OTWlpaLCwskZGRMDAwIiIi3t7ecXFxfHx8fX19/f39NjY2gYGBmJiYenp6oKCgtLS0RkZG9fX1xsbGXFxcRUVF1tbWb29vcHBwlJSUJiYm8PDwEpdIfQAAAMtJREFUeNpckYdywjAQRPcKtgwBF1oakFAS/v8L2bOEJ5NTs5531/II8jabasmxU1wBx9+6ocK/egl0VhONYXIE6kBzgkFFxTSNyNFKLhNLxTjnJjqF/Z6qGk7jUHQLeI13qpg8EpU0xU9o8USmOUyUqAqU1LR8tIePqJVfy0bryyHSE0xZTiPTNOYUh6DqY9U07M13s9oWYy4vc50Rt5+Hgsffxh74ErlkVhHG6uv29c4HD9WmZKxP8YZtA9nFLSy7uI3uZ9Zt5SHAADx6B1TVH33cAAAAAElFTkSuQmCC");
						background-size: 100%; 
					}
				}
			}
			
			.info2{
				height: 48upx;
				padding: 0 20upx;
				background: linear-gradient(to right, #e5bd77, #c09853);
				border-top-left-radius: 24upx ;
				border-bottom-left-radius: 24upx ;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.id{
					width: 20upx;
					height: 20upx;
					display: inline-block;
					background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjAwZGU1Yi03YmNmLTNkNDctYjg2OC0wMWQxM2NmYTZlOGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENBQ0M1NEQ1QzU2MTFFOUI0MDVFMTZCNzRBNzNEOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENBQ0M1NEM1QzU2MTFFOUI0MDVFMTZCNzRBNzNEOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzIyM2I1NTktMWEzZS03YjRkLWI0N2ItMWJjMzA1MDRjNjAxIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjgyNmRmNjktNTU1Mi0xMWU5LTkzN2UtYzA5MGE2NzQ5MGNmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PULEQAAAAchQTFRFJCQk5b13JSQiJCQmJCQiIyUktphiJSMkJSUlIyMjtZdhtZdjIyMhIyUiIyQmJiQl5b11JSUj5b145Lx2JCIjJCIlJSMmJCYlfmtLJCMotphktJZg57x3t5ljIyMls5hj4712inZRindPi3VO5L14OzcujHZPWVE8JyMkJCUqtZhgr5Ffbl9C2LJxJCUgtpdhWk85rJJfXVA9yqdtISUktZZgcWFH5L53XE886L15tJZiup1jIyUgs5hhKSgmuJljh3FK47x3tpZjmYBYzKhsq5FgfmtKNzMqf2pLspdiMy4rzKpttpVge2tKLC0oj3lSISIkpotcJCMhm4Jat5llPjouy6dp5r55JiIjPzkt5rx05r1707BwODQrs5dl5L51XVE51a9uJCYjWlE/JCUnyqhrm4RYtZViMy4qpYlaeWlI5L16Tkc1JSUngGtMtJZkoIVat5hiiXdRt5pis5hg5bp2JiYm5Lx3ICQjODUsuJZot5doIiYluJdikn1SX08/tplhuZhjy6drdWZHLCsneWhKi3dSIyInJiUjIyQoPDgstJliVUw6IiQhVk07IiQjqI5d5b94tZdlgnJOJiQne2hIs5pk4Ll2uNO0TQAAAW9JREFUeNpckPVTlGEAhPftr6/7uDtQUkrpbgNpUCzSbkRKOhQBRUUQ/l3OGWYYmP1td3aenUU8VVY789dsbT0ejf2oqJAl7cSLVClFaAA2NJfiXGEBawSbHgsWoJiydt8HuJ87uI+oiORDcDGZmLNAIzu2Xt4EU1OFhpF8VWnUvnw9/QWWRpuwHihv9tZ4b2WRg0fDpOjdkQhEIRnPriO3G7fdbb+6i6qefKU0Axlcz7vmq8YV900ndG+WbPUxCcPDWAfJLc7xhaFjamw1uL8CSWFfJzdYpjdc7xL/4n/8oY1L5rf5fju4dF4nYU3Hi5ZD8UBeAIm9k7cP/R55NulDY6a77eebCfeg9pua+BxYbiY1vpEscjUt2eMwKmHCVWjGGjorC5Ife5+GaFAkPmFIsP+HMOrXoKxnygMRRbsGrgPBhEuBpvlQ/C5aSimzKU1HEM53FXH4OEG8qizWYN5JFhiLXbLEkObz1ONTAQYAPBI76R8ilmkAAAAASUVORK5CYII=");
					background-size: 100%;
				}
				.text{
					font-size: 20upx;
					font-weight: 700;
					padding: 10upx;
					color: #242424;
				}
				.icon{
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
	.table{
		width: 100%;
		.row{
			height: 212upx;
			border-bottom: 2upx solid #f0f0f0;
			&:last-child{
				border-bottom:none; 
			}
			.row-item{
				border-right: 1upx solid #f0f0f0;
				&:last-child{
					border-right:none; 
					margin-bottom: none;
				}
				.icon{
					width: 100%;
					height: 118upx;
					.img{
						width: 68upx;
						height: 68upx;
						display: block;
						background-size: 100%;
					}
					
				}
				.top{
					color: #333;
					font-weight: 600;
				}
				.bottom{
					color: #999;
					font-size:24upx;
				}
			}
		}
		// .row
	}
}
</style>
