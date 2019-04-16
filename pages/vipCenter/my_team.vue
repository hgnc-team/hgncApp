<template>
	<!-- 我的团队 -->
	<view class="myTeamPage">
		<view class="header">
			<view class="search-box uni-inline-item">
				<!-- mSearch组件 如果使用原样式，删除组件元素-->
				<mSearch :mode="2" button="inside" :placeholder="'搜索用户ID'" @search="doSearch(false)" @confirm="doSearch(false)"
				 v-model="keyword" radius="0" @input="clear"></mSearch>
			</view>
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
						<image :src="item.imageUrl" mode="widthFix"></image>
					</view>
					<view class="info uni-flex-item uni-flex" @tap="toManagerAchievement">
						<view class="uni-flex-item uni-flex uni-column" style="justify-content: center;">
							<view class="uni-flex uni-row" style="align-items: center;">
								<text class="">{{item.name}}</text>
								<view class="tag" :class="{'yellow': item.userLevel >= 1}" v-if="currentTab==='member'">
									<view class="iconfont iconicon_member_nor"></view>
									<text>{{item.userLevel >= 1 ? "Vip" : "注册会员"}}</text>
								</view>
							</view>
							<view class="uni-text-small text-color-gray">
								ID: {{item.id}}
							</view>
						</view>
						<!-- 团队会员 -->
						<block v-if="currentTab==='member'">
							<view class="member uni-flex-item uni-flex uni-row uni-text-small text-color-gray">
								邀请日期： <text class="time">{{item.time}}</text>
							</view>
						</block>
						<!-- 销售经理 -->
						<block v-if="currentTab==='manager' || currentTab==='majordomo'">
							<view class="manager uni-flex-item uni-flex uni-column" :class="{'margin-right-30': currentTab==='majordomo'}">
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
		</view>
	</view>
</template>

<script>
	import {
		uniIcon
	} from '@dcloudio/uni-ui';
	import mSearch from '../../components/common/mehaotian-search-revision.vue';
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
			type: "majordomo"
		}
	]
	export default {
		components: {
			uniIcon,
			mSearch
		},
		data() {
			return {
				// 输入的关键词
				keyword: "",
				// 
				tabs: [],
				currentTab: "member",
				// 共计人数
				dataList: []
			}
		},
		computed: {
			...mapState(["userLevel"]),
			totalNum() {
				return this.dataList.length;
			}
		},
		methods: {
			init() {
				// 设置标题
				this.initTitle();
				// 初始化tabs
				this.initTabs();
				// 获取初始化数据
				this.getListByOrder();
			},
			initTitle() {
				let title = this.userLevel === 1 ? "我的客户" : "我的团队";
				uni.setNavigationBarTitle({
					title: title
				})
			},
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
			// 切换tabs
			changeTab(type) {
				if (this.currentTab !== type) {
					this.currentTab = type;
					this.dataList = [];

					this.getListByOrder();
				}
			},
			//执行搜索
			doSearch(key) {
				this.keyword = key;
				this.getListByOrder();
			},
			// 获取列表数据
			getListByOrder() {
				this.dataList = [{
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "辅导费",
					id: 29472923,
					time: "2019/04/15",
					userLevel: 0,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "公公公",
					id: 23455555,
					time: "2019/04/18",
					userLevel: 2,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2039/04/15",
					userLevel: 3,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2079/04/15",
					userLevel: 4,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2099/04/15",
					userLevel: 5,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2119/04/15",
					userLevel: 0,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2219/04/15",
					userLevel: 3,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2099/04/15",
					userLevel: 5,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2119/04/15",
					userLevel: 3,
					num: 302,
					achievement: 4002.89
				}, {
					imageUrl: "/static/HM-PersonalCenter/face_default.png",
					name: "热特瑞",
					id: 757575,
					time: "2219/04/15",
					userLevel: 3,
					num: 302,
					achievement: 4002.89
				}]
			},
			// 经理业绩查询
			toManagerAchievement(){
				if(this.currentTab === "manager") {
					uni.navigateTo({
						url: "/pages/vipCenter/manager_achievement"
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
		background-color: #f0f0f0;
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
			padding-top: 188upx;
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
							&.margin-right-30{
								margin-right: 30upx;
							}
							.achievement {
								color: #ffa41f;
							}
							.num {
								color: #333;
							}
						}
						.icon{
							width: 60upx;
						}
					}
				}
			}
		}

	}
</style>
