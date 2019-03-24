<template>
	<view class="indexPage">
		<homePage v-if="page_code=='home'"></homePage>
		<nearbyPage v-if="page_code=='nearby'"></nearbyPage>
		<vipCenterPage v-if="page_code=='vipCenter'"></vipCenterPage>
		<shopCartPage v-if="page_code=='shopCart'"></shopCartPage>
		<minePage v-if="page_code=='mine'"></minePage>
		<!-- <myloading></myloading> -->
		<footerNav></footerNav>
	</view>
</template>

<script>
	import homePage from "./home/home_page.vue";
	import nearbyPage from "./nearby/nearby_page.vue";
	import vipCenterPage from "./vipCenter/vipCenter_page.vue";
	import shopCartPage from "./shopCart/shopCart_page.vue";
	import minePage from "./mine/mine_page.vue";
	import footerNav from "../components/global/footer_nav.vue";
	export default {
		data() {
			return {}
		},
		components: {
			homePage,
			nearbyPage,
			vipCenterPage,
			shopCartPage,
			minePage,
			footerNav
		},	
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			}
		},
		onLoad() {

		},
		methods: {
			open_loading() {
				this.$loading()
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.indexPage {
		width: 100%;
		height: 100%;;
	}
</style>
