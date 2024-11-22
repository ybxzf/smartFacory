<template>
	<div class="status-container">
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
					<div class="part">
						<div class="part-h">
							<div>SMT</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div>DIP</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>四楼组装线</span>
								<span>(自动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>四楼组装线</span>
								<span>(手动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/red_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title"> <span>四楼包装线</span>
								<span>(自动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">

							<div class="more-title"> <span>四楼包装线</span>
								<span>(手动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="content-part">
				<div class="content-t">
				</div>
				<div class="content-b">
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>国内检定线</span>
								<span>(自动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title"><span>国内检定线</span>
								<span>(手动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>海外检定线</span>
								<span>(自动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>海外检定线</span>
								<span>(手动)</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title"> <span>五楼</span>
								<span>组装线</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/green_lamp.png" alt="">
						</div>
					</div>
					<div class="part">
						<div class="part-h">
							<div class="more-title">
								<span>五楼</span>
								<span>包装线</span>
							</div>
						</div>
						<div class="part-value">
							<img src="../../../assets/images/bigScreen/yellow_lamp.png" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
	},
	data() {
		return {
			fontSizeRatio: 12 / 1920,//缩放比例
			lightRatio: 34 / 1920,//缩放比例
		};
	},
	mounted() {
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
				element.style.fontSize = `${ this.fontSizeRatio * width }px`;
			});
			partValueelements.forEach(element => {
				element.style.width = `${ this.lightRatio * width }px`;
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
					img{
						width: 100%;
					}
				}
			}
		}
	}
}
</style>