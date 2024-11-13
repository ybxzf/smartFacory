<template>
	<div class="section">
		<div class="attendance common-section">
			<div class="title">
				<span>出勤数据</span>
			</div>
			<div class="top-content">
				<div class="top">
					<span>预计出勤: {{ num }}</span>
					<span>实际出勤: {{ finialNum }}</span>
				</div>
			</div>
			<div class="middle-content">
				<div class="middle">
					<span class="date">{{ date }}</span>
					<span class="time">{{ time }}</span>
				</div>
			</div>
			<div class="bottom-content">
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_expect.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">120</span>
						<span class="desc">预计出勤人数</span>
					</div>
				</div>
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_actual.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">120</span>
						<span class="desc">实际出勤人数</span>
					</div>
				</div>
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_rate.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">120</span>
						<span class="desc">出勤率</span>
					</div>
				</div>
			</div>
		</div>

		<div class="attendance common-section">
			<div class="title">
				<span>产能数据</span>
			</div>
			<div class="top-content">
				<div class="top">
					<span>当日计划产能: {{ dailyPlanNum }}</span>
					<span>当日完成产能: {{ dailyCompleteNum }}</span>
				</div>
			</div>
			<div id="pieContent">饼图区域</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	data() {
		return {
			num: 120,
			finialNum: 105,
			date: '',
			time: '',
			timerId: null,
			dailyPlanNum: 20000,
			dailyCompleteNum: 10500,
		}
	},
	created() {
		this.setDateTime();
	},
	mounted() {
		this.timeId = setInterval(() => { //初始化定时器
			this.setDateTime();
		}, 1000);
	},
	methods: {
		setDateTime() {
			const { date, time } = this.getNowTime();
			this.date = date;
			this.time = time;
		},
		getNowTime() {
			const date = moment(Date.now()).format("YYYY年MM月DD日");
			const time = moment(Date.now()).format("HH:mm:ss");
			return {
				date, time
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.section {
	width: 100%;
	height: 100%;
	display: flex;
	background: transparent;
	// backdrop-filter: blur(10px);
}

.common-section {
	width: 50%;

	.title {
		width: 100%;
		height: 15%;
		background-image: url("../../../assets/images/bigScreen/second_title_bg.png");
		background-repeat: no-repeat;
		background-size: 102% 55%;
		background-position: center center;
		position: relative;

		span {
			position: absolute;
			top: 45%;
			left: 3%;
			transform: translateY(-50%);
		}

	}

	.top-content {
		width: 100%;
		height: 15%;
		background-image: url("../../../assets/images/bigScreen/text_bg.png");
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;

		.top {
			width: max-content;
			position: absolute;
			top: 50%;
			left: 50%;
			color: #01b9f1;
			transform: translateX(-50%) translateY(-50%);

			span {
				margin-right: 8px;
			}
		}
	}

	.middle-content {
		width: 100%;
		height: 15%;
		margin-top: 6px;
		background-image: url("../../../assets/images/bigScreen/time_bg.png");
		background-repeat: no-repeat;
		background-size: 80%;
		background-position: center center;
		position: relative;

		.middle {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);

			.date {
				color: #0fb2bc;
				font-size: 14px;
			}

			.time {
				color: #fff;
				font-size: 24px;
			}
		}
	}

	.bottom-content {
		margin-top: 16px;
		display: flex;
		flex-wrap: wrap;

		.common-part {
			width: 42%;
			display: flex;
			align-items: center;
			padding-left: 40px;
			margin-top: 2vh;

			.data-content {
				margin-left: 16px;
				display: flex;
				flex-direction: column;
				font-weight: 550;

				.num {
					color: #1cf6ee;
					margin-bottom: 4px;
				}
			}
		}
	}
}


.table-c {
	width: 90%;
	height: 80%;
	margin: 0 24px;
}
</style>