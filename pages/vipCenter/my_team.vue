<template>
	<!-- 我的团队 -->
	<view class="myTeamPage">
		<view class="header">
			<view class="tabs uni-flex" v-if="tabs.length >0">
				<view class="uni-flex-item flex-center-center" v-for="(item, index) in tabs" :key="index" :class="currentTab==item.type?'active':''"
				 @tap="changeTab(item.type)">
					{{item.name}}
					<view class="bottom-line"></view>
				</view>
			</view>
		</view>
		<view class="list-wrap">
			<view class="totalNum uni-text-small text-color-gray">
				共计<text class="num">{{totalNum}}</text>人
			</view>
			<view class="list">
				<view class="list-item uni-flex flex-center-center" v-for="(item, index) in dataList" :key="index">
					<view class="image uni-inline-item">
						<image :src="item.imageUrl || '/static/HM-PersonalCenter/face_default.png'" mode="widthFix"></image>
					</view>
					<view class="info uni-flex-item uni-flex" @tap="toManagerAchievement(item.id)">
						<view class="uni-flex-item uni-flex uni-column" style="justify-content: center;">
							<view class="uni-flex uni-row" style="align-items: center;">
								<text class="">{{item.name}}</text>
								<view class="tag" :class="{'yellow': item.role >= 1}" v-if="currentTab==='member'">
									<view class="iconfont iconicon_member_nor"></view>
									<text>{{item.role >= 1 ? "Vip" : "注册会员"}}</text>
								</view>
							</view>
							<view class="uni-text-small text-color-gray">
								ID: {{item.inviteCode}}
							</view>
						</view>
						<!-- 团队会员 -->
						<block v-if="currentTab==='member'">
							<view class="member uni-flex-item uni-flex uni-row uni-text-small text-color-gray">
								邀请日期： <text class="time">{{item.createTime}}</text>
							</view>
						</block>
						<!-- 销售经理 -->
						<block v-if="currentTab==='manager' || currentTab==='director'">
							<view class="manager uni-flex-item uni-flex uni-column" :class="{'margin-right-30': currentTab==='director'}">
								<view class="uni-text-small text-color-gray" style="text-align: right;">
									业绩：<text class="achievement">￥{{item.achievement}}</text>
								</view>
								<view class="uni-text-small text-color-gray" style="text-align: right;">
									团队人数：<text class="num">{{item.num}}人</text>
								</view>
							</view>
							<view class="icon flex-center-center text-color-gray" v-if="currentTab==='manager'">
								<uni-icon type="arrowright" size="20"></uni-icon>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="hasNoData" v-if="this.dataList===0">
				<noData :text="noDataText"></noData>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	import * as _ from 'lodash';
	import moment from "moment";
	import service from '../../common/service.js';
	import mSearch from '../../components/common/mehaotian-search-revision.vue';
	// 引入暂无数据组件
	import noData from "../../components/common/no-data.vue";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	// 销售经理
	const TABS_FOR_MANAGER = [{
			name: "团队会员",
			type: "member"
		},
		{
			name: "销售经理",
			type: "manager"
		},
	]
	// 业务总监
	const TABS_FOR_MAJORDOMO = [{
			name: "团队会员",
			type: "member"
		},
		{
			name: "销售经理",
			type: "manager"
		},
		{
			name: "业务总监",
			type: "director"
		}
	]
	export default {
		components: {
			uniIcon,
			mSearch,
			noData
		},
		data() {
			return {
				// 输入的关键词
				keyword: "",
				tabs: [],
				currentTab: "member",
				// 团队会员列表
				memberList: [],
				// 销售经理列表
				managerList: [],
				// 业务总监列表
				majordomoList: [],
				// 是否有数据
				hasData: false,
				dataList: []
			}
		},
		computed: {
			...mapState(["userLevel"]),
			totalNum() {
				return this.dataList.length;
			},
			noDataText() {
				let text = "";
				if (this.dataList.length === 0) {
					switch (this.currentTab) {
						case "member":
							text = "您的团队中暂无会员"
							break;
						case "manager":
							text = "您的团队中暂无销售经理"
							break;
						case "director":
							text = "您的团队中暂无业务总监"
							break;
						default:
							break;
					}
				}
				return text
			}
		},
		methods: {
			init() {
				// 设置标题
				this.initTitle();
				// 初始化tabs
				this.initTabs();
				// 获取初始化数据
				this.initList();
			},
			// 初始化标题
			initTitle() {
				let title = this.userLevel === 1 ? "我的客户" : "我的团队";
				uni.setNavigationBarTitle({
					title: title
				})
			},
			// 初始化tabs
			initTabs() {
				// 设置tabs
				if (this.userLevel >= 3) {
					this.tabs = TABS_FOR_MAJORDOMO;
				} else if (this.userLevel === 2) {
					this.tabs = TABS_FOR_MANAGER;
				} else {
					this.tabs = [];
				}
				this.tabs = TABS_FOR_MAJORDOMO;
			},
			// 初始化list
			initList() {
				this.dataList = [];
				uni.showLoading();
				service.getGroupMembers({type: this.currentTab}).then(res => {
						uni.hideLoading();
						let data = res.data.data;
						console.log(data);
						if(data.length > 0) {
							_.forEach(data, item => {
								// 转化时间格式
								item.createTime = moment(item.createTime).format("YYYY/MM/DD");
							})
							this.dataList = data
						}
				}).catch(err => {
				uni.hideLoading();
				uni.showToast({
					icon: "none",
					title: err.errMsg,
				})
			})
		},
		// 切换tabs
		changeTab(type) {
			if (this.currentTab !== type) {
				this.currentTab = type;
				this.initList();
			}
		},
		clear(keyword) {
			if (!keyword) {
				this.keyword = "";
				this.getListByOrder();
			}
		},
		//执行搜索
		doSearch() {
			// 不为空才查询
			if (this.keyword) {
				this.dataList = _.find(this.dataList, item => _.indexOf(item.id, this.keyword) > -1);
			}
		},
		// 经理业绩查询
		toManagerAchievement(id) {
			if (this.currentTab === "manager") {
				uni.navigateTo({
					url: `/pages/vipCenter/performance_management?role=manager&userId=${id}`
				})
			}
		}
	},
	onLoad() {
		this.init();
	}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.myTeamPage {
		.header {
			width: 100%;
			background-color: #f0f0f0;
			z-index: 1000;
			position: fixed;
			/* #ifdef H5 */
			top: 80upx;
			/* #endif */
			/* #ifdef APP-PLUS */
			top: 0;

			/* #endif */
			.search-box {
				width: 100%;
				height: 88upx;
				padding: 20upx 30upx;
				justify-content: center;
				box-sizing: border-box;
				background-color: #fff;
				margin-bottom: 20upx;

				.search .content {
					background-color: #f0f0f0;
				}
			}

			.tabs {
				width: 100%;
				height: 80upx;
				background-color: #fff;
				border-bottom: 1upx solid #f0f0f0;

				.uni-flex-item {
					color: #666;
					position: relative;

					.bottom-line {
						display: none;
					}
				}

				.active {
					color: #242424;
					font-weight: 600;

					.bottom-line {
						display: block;
						width: 20upx;
						height: 6upx;
						position: absolute;
						bottom: 0upx;
						left: 50%;
						transform: translateX(-50%);
						background-color: #242424;
					}
				}
			}
		}

		.list-wrap {
			width: 100%;
			padding-top: 75upx;
			background-color: #f0f0f0;

			.totalNum {
				width: 100%;
				height: 68upx;
				line-height: 68upx;
				padding-left: 30upx;
				box-sizing: border-box;

				.num {
					color: #6896ee;
				}
			}

			.list {
				width: 100%;
				padding-left: 30upx;
				box-sizing: border-box;
				background-color: #fff;

				.list-item {
					width: 100%;
					height: 144upx;

					.image {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						margin-right: 30upx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.info {
						height: 100%;
						border-bottom: 1upx solid #f0f0f0;

						.tag {
							display: inline-block;
							height: 24upx;
							font-size: 16upx;
							padding: 0upx 8upx;
							border-radius: 12upx;
							background-color: #242424;
							color: #fff;
							box-sizing: border-box;
							line-height: 24upx;
							margin-left: 10upx;

							.iconicon_member_nor {
								font-size: 12upx;
								line-height: 24upx;
								margin-right: 2upx;
								color: #fff;
							}

							&.yellow {
								background-color: #ffa41f;
							}
						}

						.member {
							align-items: center;
							justify-content: flex-end;
							margin-right: 30upx;

							.time {
								color: #333;
							}
						}

						.manager {
							justify-content: center;

							&.margin-right-30 {
								margin-right: 30upx;
							}

							.achievement {
								color: #ffa41f;
							}

							.num {
								color: #333;
							}
						}

						.icon {
							width: 60upx;
						}
					}
				}
			}
		}

	}
</style>
