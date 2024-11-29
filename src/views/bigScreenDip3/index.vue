<template>
	<div class="dip-three-container">
		<custom-header class="header-container">
			DIP-3生产线可视化看板
		</custom-header>
	</div>
</template>

<script>
import CustomHeader from './components/layout/header';
export default {
	name: "bigScreenDip3",
	components: {
		CustomHeader
	},
	data() {
		return {

		}
	},
	mounted() {

	},
	methods: {

	},
}
</script>
<style lang="scss" scoped>
.dip-three-container {
	width: 100%;
	height: calc(100vh-84px);
	background: #0070C0;
	.header-container {}
}
</style>