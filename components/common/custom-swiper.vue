<template>
	<view class="custom-swiper">
		<view class="swiper-wrap">
			<swiper class="swiper" autoplay="true" circular="true" current="swiperCurrent" @change="changeSwiper">
				<swiper-item v-for="(swiper, index) in swiperList" :key="index" @tap="toSwiper(swiper)">
					<image mode="aspectFill" :src="swiper.img" lazy-load></image>
				</swiper-item>
			</swiper>
			<view class="dots">		
				 <view class="dot" :class="index == swiperCurrent ? 'active' : ''" v-for="(swiper,index) in swiperList" :key="index"></view>
			</view>
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
			},
			changeSwiper(event){
				this.swiperCurrent = event.detail.current;
			}
		},
	}
</script>

<style lang="scss">
	.custom-swiper{
		.swiper-wrap {
			width: 100%;
			height: 396upx;
			background-color: #fff;
		
			.swiper {
				width: 100%;
				height: 346upx;
				background-color: #f0f0f0;
		
				image {
					width: 100%;
					height: 346upx;
				}
			}
		}
		.dots{
			width: 100%;
			height: 50upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.dot{
				width: 8upx;
				height: 8upx;
				background-color: #dadada;
				margin:8upx;
				&.active{
					width: 24upx;
					background-color: #242424;
				}
			}
			
		}
	}
</style>
