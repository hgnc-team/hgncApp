<template>
	<view class="accountInfoPage">
		<view class="content">
			<uni-list>
				<uni-list-item title="头像" @click="changeHeadImage" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="昵称" @click="changeHeadImage" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" show-badge="true" badge-text="电饭锅k"></uni-list-item>
				<uni-list-item title="ID" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" show-arrow="false" show-badge="true" badge-text="12"></uni-list-item>
				<uni-list-item title="密码管理" @click="setSecondaryPassword" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item title="换绑手机" @click="changeTelphone" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
				<uni-list-item title="累计消费" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}" show-arrow="false" show-badge="true" badge-text="1222.2元"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				userinfo: {},
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {

			},
			// 更换头像
			changeHeadImage(){
				uni.showToast({
					title:"更换头像"
				})
			},
			// 更换头像
			changenickname(){
				uni.showToast({
					title:"修改昵称"
				})
			},
			// 设置二级密码
			setSecondaryPassword(){
				uni.navigateTo({
					url: "secondary_password"
				})
			},
			//换绑手机
			changeTelphone() {
				uni.navigateTo({
					url: `change_telphone`
				})
			},
			
		}
	}
</script>

<style lang="scss">
</style>
