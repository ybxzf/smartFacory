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

		};
	}
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

					.part-h {
						height: 40%;
						font-size: 14px;

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
						height: 60%;
						display: flex;
						align-items: center;
						justify-content: center
					}
				}
			}
		}
	}
}
</style>