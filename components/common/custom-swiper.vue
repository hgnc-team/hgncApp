<template>
	<view class="custom-swiper">
		<view class="swiper-wrap">
			<swiper class="swiper" autoplay="true" circular="true" :current="swiperCurrent">
				<swiper-item v-for="(swiper, index) in swiperList" :key="index" @tap="toSwiper(swiper)">
					<image mode="aspectFill" :src="swiper.img" lazy-load></image>
				</swiper-item>
			</swiper>	
		</view>
		
		<view class="dots">		
			 <view class="dot" :class="index == swiperCurrent ? 'active' : ''" v-for="(swiper,index) in swiperList"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'custom-swiper',
		props: {
			swiperList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				swiperCurrent: 0
			}
		},
		computed: {
		
		},
		methods: {
			//点击其中一个 menu
			toSwiper(swiper) { 
				this.$emit("toSwiper", swiper)
			}
		
		},
	}
</script>

<style lang="scss">
	.custom-swiper{
		.swiper-wrap {
			width: 100%;
			height: 346upx;
			background-color: #fff;
		
			.swiper {
				width: 100%;
				height: 280upx;
				background-color: #f0f0f0;
		
				image {
					width: 100%;
					height: 280upx;
				}
			}
		}
		.dots{
			width: 100%;
			height: 66upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.dot{
				width: 16upx;
				height: 16upx;
				background-color: #dadada;
				margin:8upx;
				&.active{
					width: 40upx;
					background-color: #242424;
				}
			}
			
		}
	}
</style>
