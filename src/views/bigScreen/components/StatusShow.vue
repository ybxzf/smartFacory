<template>
	<div class="status-container">
		<template v-if="!isEmpty">
			<div class="top">
				<div class="part">
					<img src="../../../assets/images/bigScreen/yellow_lamp.png" alt="">
					<span>停线</span>
				</div>
				<div class="part">
					<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
					<span>运行</span>
				</div>
				<div class="part">
					<img src="../../../assets/images/bigScreen/red_lamp.png" alt="">
					<span>故障</span>
				</div>
			</div>
			<div class="content">
				<div class="content-part">
					<div class="content-t">
					</div>
					<div class="content-b">
						<div class="part" :style="{
			'--width': `calc(100% / ${topList.length})`
		}" v-for="item in topList" :key="item.lineNumber">
							<div class="part-h">
								<div>{{ item.lineName }}</div>
							</div>
							<div class="part-value">
								<img :src="item.status | getLineStatus" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="content-part">
					<div class="content-t">
					</div>
					<div class="content-b">
						<div class="part" :style="{
			'--width': `calc(100% / ${topList.length})`
		}" v-for="item in bottomList" :key="item.lineNumber">
							<div class="part-h">
								<div>{{ item.lineName }}</div>
							</div>
							<div class="part-value">
								<img :src="item.status | getLineStatus" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<Empty v-else></Empty>
	</div>
</template>

<script>
import Empty from './empty'
import RedLampUrl from "../../../assets/images/bigScreen/red_lamp.png";
import YellowLampUrl from "../../../assets/images/bigScreen/yellow_lamp.png";
import GreenLampUrl from "../../../assets/images/bigScreen/green_lamp.png";
export default {
	components: { Empty },
	props: {
		list: {
			typeof: Array,
			default: () => []
		}
	},
	filters: {
		getLineStatus(status) {
			const statusMap = {
				"故障": RedLampUrl,
				"运行": GreenLampUrl,
				"停线": YellowLampUrl,
			};
			return statusMap[status];
		}
	},
	data() {
		return {
			fontSizeRatio: 12 / 1920,//缩放比例
			lightRatio: 34 / 1920,//缩放比例
			topList: [],
			bottomList: [],
			isEmpty: false,
		};
	},
	watch: {
		list: {
			handler: function (newVal) {
				this.isEmpty = !newVal.length;
				if (newVal.length) {
					const len = newVal.length;
					const remainder = len % 2;
					const argv = parseInt(len / 2);
					const index = remainder ? argv + remainder : argv;
					this.topList = newVal.slice(0, index);
					this.bottomList = newVal.slice(index);
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		console.log(this.list);
		// 监听窗口大小变化
		window.addEventListener('resize', this.handleResize);
		// 初始执行一次，设置窗口加载时的样式
		this.handleResize();
	},
	methods: {
		handleResize() {
			// 获取窗口宽度
			const width = window.innerWidth;
			// 获取所有 class="part-h" 的元素
			const partHelements = document.querySelectorAll('.part-h');
			const partValueelements = document.querySelectorAll('.part-value');
			// 根据窗口宽度动态修改样式
			partHelements.forEach(element => {
				element.style.fontSize = `${this.fontSizeRatio * width}px`;
			});
			partValueelements.forEach(element => {
				element.style.width = `${this.lightRatio * width}px`;
			});
		}
	},
	destroyed() {
		// 组件销毁时移除事件监听
		window.removeEventListener('resize', this.handleResize);
	},
}
</script>

<style lang="scss" scoped>
.status-container {
	width: calc(100% - 10%);
	height: 100%;
	margin: 0 5%;

	.top {
		display: flex;
		justify-content: flex-end;

		.part {
			display: flex;
			align-items: center;
			margin-left: 30px;
			line-height: 22px;
			font-size: 14px;

			img {
				width: 16px;
				height: 16px;
				margin-right: 8px;
			}
		}
	}

	.content {
		height: calc(100% - 40px);
		margin-top: 16px;

		.content-part {
			height: 50%;
			position: relative;

			.content-t {
				width: 100%;
				height: 40%;
				background-position: center center;
				position: relative;
				background-size: cover;
				background-image: url('../../../assets/images/bigScreen/text_bg.png');
				background-repeat: no-repeat;
			}

			.content-b {
				width: 100%;
				position: absolute;
				top: 0;
				height: 100%;
				display: flex;
				justify-content: space-between;

				.part {
					height: 100%;
					position: relative;
					width: var(--width);

					.part-h {
						height: 40%;
						font-size: 12px;

						div {
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							&.more-title {
								display: flex;
								flex-direction: column;
								align-items: center;
							}
						}
					}

					.part-value {
						// height: 60%;
						// display: flex;
						// align-items: center;
						// justify-content: center
						width: 34px;
						height: 34px;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 55%;

					}

					// .part-value :first-child {
					// 	width: 34px;
					// }
					img {
						width: 100%;
					}
				}
			}
		}
	}
}
</style>