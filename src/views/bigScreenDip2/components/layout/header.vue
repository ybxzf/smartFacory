<template>
	<div class="container" :style="{ '--height': `${height}px` }">
		<div class="left">
			<img src="../../../../assets/images/bigScreen/logo.png" alt="">
		</div>
		<div class="center">
			<slot>测试</slot>
		</div>
		<div class="right">
			<span>{{ dateTime }}</span>
			<el-button type="success" round size="mini" @click="nextLevel">下一级</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DIPHeader',
	props: {
		height: {
			typeof: Number,
			default: 40
		}
	},
	data() {
		return {
			dateTime: '',
			timeId: null,
		}
	},
	mounted() {
		this.timeId = setInterval(() => {
			this.dateTime = new Date().toLocaleString()
		}, 1000)
	},
	methods: {
		nextLevel() {
			this.$router.push('BigScreenDip3')
		}
	},
	beforeDestroy() {
		clearInterval(this.timeId)
	}
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	height: var(--height);
	align-items: center;
	color: #fff;

	.left {
		flex: 1;
		line-height: 15px;
		// padding-left: 10px;
		padding-top: 10px;
	}

	.center {
		flex: 2;
		text-align: center;
		font-size: 25px;
		font-weight: 550;
	}

	.right {
		flex: 1;
		text-align: right;
		padding-right: 20px;
		font-size: 14px;
		.el-button{
			margin-left: 10px;
			margin-top: 10px;
		}
	}
}
</style>