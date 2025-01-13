<template>
	<div class="content-container">
		<el-row class="base-info row1">
			<el-col :span="4" class="base-info-col col1">
				<div class="base-item">
					<div class="item-key">当前工单</div>
					<el-tooltip effect="dark" v-if="baseInfo.workOrder && baseInfo.workOrder.length > 10"
						:content="baseInfo.workOrder" placement="top">
						<div class="item-value">
							{{ baseInfo.workOrder.slice(0, 10) + '...' || '-' }}
						</div>
					</el-tooltip>
					<div class="item-value" v-else>
						{{ baseInfo.workOrder || '-' }}
					</div>
				</div>
			</el-col>
			<el-col :span="4" class="base-info-col">
				<div class="base-item">
					<div class="item-key">工单数量</div>
					<div class="item-value">{{ baseInfo.workOrderQuantity || '-' }}</div>
				</div>
			</el-col>
			<el-col :span="4" class="base-info-col">
				<div class="base-item">
					<div class="item-key">客户</div>
					<el-tooltip effect="dark" v-if="baseInfo.customer && baseInfo.customer.length > 10"
						:content="baseInfo.customer" placement="top">
						<div class="item-value">
							{{ baseInfo.customer.slice(0, 10) + '...' || '-' }}
						</div>
					</el-tooltip>
					<div class="item-value" v-else>
						{{ baseInfo.customer || '-' }}
					</div>
				</div>
			</el-col>
			<el-col :span="4" class="base-info-col">
				<div class="base-item">
					<div class="item-key">产品名称</div>
					<el-tooltip effect="dark" v-if="baseInfo.productName && baseInfo.productName.length > 10"
						:content="baseInfo.productName" placement="top">
						<div class="item-value">
							{{ baseInfo.productName.slice(0, 10) + '...' || '-' }}
						</div>
					</el-tooltip>
					<div class="item-value" v-else>
						{{ baseInfo.productName || '-' }}
					</div>
				</div>
			</el-col>
			<el-col :span="4" class="base-info-col">
				<div class="base-item">
					<div class="item-key">产品型号规格</div>
					<el-tooltip effect="dark" v-if="baseInfo.productModel && baseInfo.productModel.length > 10"
						:content="baseInfo.productModel" placement="top">
						<div class="item-value">
							{{ baseInfo.productModel.slice(0, 10) + '...' || '-' }}
						</div>
					</el-tooltip>
					<div class="item-value" v-else>
						{{ baseInfo.productModel || '-' }}
					</div>
				</div>
			</el-col>
			<el-col :span="4" class="base-info-col col6">
				<div class="base-item">
					<div class="item-key">完成率</div>
					<div class="item-value">
						<div class="item-value-progress">
							<!-- <transition name="expand" @before-enter="beforeEnter" @enter="enter">
								<div class="progress" v-if="completionRateWidth > 0" :style="{
									width: `${completionRateWidth}%`,
									backgroundColor: `rgb(${completionRateColor.r},${completionRateColor.g},${completionRateColor.b})`
								}"></div>
							</transition> -->
							<div class="value">{{ completionRateValue }}%</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row class="base-info row2">
			<el-col :span="18" class="base-info-col col1">
				<div class="base-item" v-for="(item, index) in processList" :key="index">
					<div class="item-image" v-loading="item.load">
						<!-- <img :src="`/assets/images/devices/${'device1.png'}`" alt=""> -->
						<!-- <img v-if="item.imageUrl" :src="item.imageUrl" alt=""> -->
						<el-image v-if="item.imageUrl" :src="item.imageUrl" fit="fit"></el-image>
					</div>
					<el-image style="width: 50px; height: 50px;position: absolute;bottom: 25px;"
						:style="{ left: index === processList.length - 1 ? '5px' : '15px' }"
						:src="`/assets/dip/dip2_${index + 1}.png`" fit="fit"></el-image>
					<div class="item-key"
						:style="{ width: index === processList.length - 1 ? 'calc(100% - 20px)' : '100%' }">
						<el-image style="width: 19px; height: 19px;margin-right: 5px;"
							:src="`/assets/icons/icon_${index + 1}.svg`" fit="fit"></el-image>
						{{ item.processName }}
					</div>
					<div class="item-value"
						:style="{ width: index === processList.length - 1 ? 'calc(100% - 20px)' : '100%' }">{{
							item.correspondingValue }}</div>
				</div>
				<!-- <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">自动上板</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">插件1</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">波峰焊1</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">检测1</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">插件2</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">波峰焊2</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">检测2</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">FCT</div>
          <div class="item-value">XXX</div>
        </div>
        <div class="base-item">
          <div class="item-image">
            <img src="@/assets/images/devices/device1.png" alt="">
          </div>
          <div class="item-key">入库</div>
          <div class="item-value">XXX</div>
        </div> -->
			</el-col>
			<el-col :span="6" class="base-info-col col2">
				<div class="base-item">
					<!-- <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" height="300"
						header-row-class-name="table-h-bg">
						<el-table-column prop="waveSolderParam" label="波峰焊设备参数">
						</el-table-column>
						<el-table-column prop="setValue" label="设定值">
						</el-table-column>
						<el-table-column prop="actualValue" label="实际值">
						</el-table-column>
					</el-table> -->
					<table class="item-table">
						<thead>
							<tr>
								<th>波峰焊设备参数</th>
								<th>设定值</th>
								<th>实际值</th>
							</tr>
						</thead>
						<tbody class="table-body">
							<tr v-for="(item, i) in paramInfoList" :key="i">
								<td>{{ item.paramName }}</td>
								<td>{{ item.setValue }}</td>
								<td>{{ item.actualValue }}</td>
							</tr>
						</tbody>
					</table>
					<!-- <div>波峰焊设备参数</div>
					<div>设定值</div>
					<div>实际值</div> -->
				</div>
			</el-col>

		</el-row>
		<el-row class="base-info row3">
			<el-col :span="16" class="base-info-col col1">
				<div class="chart-title">每日产能</div>
				<div class="base-item" style="height: calc(100% - 57px);">
					<LineChart v-if="lineData.xData.length" height="100%" :chartData="lineData"></LineChart>
				</div>
			</el-col>
			<el-col :span="8" class="base-info-col col2">
				<div class="base-item">
					<!-- <div class="item-left">
						FCT测试不良统计
					</div> -->
					<div class="item-right">
						<div>
							线体设备运行状态
						</div>
						<img :src="DIPLineStatus | getLineStatus" alt="" style="width:25px;margin-right: 100px;">
						<!-- <el-tag :type="'success'" effect="dark">
              正常{{ DIPLineStatus }}
            </el-tag> -->
					</div>
					<div class="item-chart">
						<!-- <PieChart height="100%" :chartData="pieData"></PieChart> -->
						<pieChart3D v-if="fctDefectStatsList.length" height="100%" :title="'FCT测试不良统计'"
							:chartData="fctDefectStatsList">
						</pieChart3D>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import pieChart3D from '../chart/pieChart3D.vue'
import RedLampUrl from "../../../../assets/images/bigScreen/red_lamp.png";
import YellowLampUrl from "../../../../assets/images/bigScreen/yellow_lamp.png";
import GreenLampUrl from "../../../../assets/images/bigScreen/green_lamp.png";
import {
	getDip2BaseInfo,
	getDip2ProcessList,
	getDip2ParamInfoList,
	getDip2FctDefectStatsList,
	getDip2DailyCapacityAnalysisList,
	getDip2LastLineInfo,
	getDip2Picture,
} from '@/api/bigScreen/dip2.js';
import { SUCCESS_CODE } from '@/utils/constants.js';
import { colors } from '@/components/chart/pieChartColor.js'

export default {
	components: {
		LineChart,
		PieChart,
		pieChart3D,
	},
	name: "",
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
			baseInfo: {},
			processList: [],
			paramInfoList: [],
			fctDefectStatsList: [],
			DIPLineStatus: "故障",
			tableData: [
				{ waveSolderParam: "运行速度", setValue: "XXX", actualValue: "XXX" },
				{ waveSolderParam: "预热区温度（℃ ）", setValue: "XXX", actualValue: "XXX" },
				{ waveSolderParam: "焊接区温度（℃ ）", setValue: "XXX", actualValue: "XXX" },
				{ waveSolderParam: "锡炉温度（℃ ）", setValue: "XXX", actualValue: "XXX" },
				{ waveSolderParam: "链速", setValue: "XXX", actualValue: "XXX" },
				// { waveSolderParam: "链速", setValue: "XXX", actualValue: "XXX" },
			],
			completionRateValue: 0, // 完成率初始值为 0
			completionRateWidth: 0, // 初始宽度为 0
			//初始背景色
			completionRateColor: {
				r: 255,
				g: 0,
				b: 0,
			},
			intervalId: null,
			lineData: {
				title: '每日产能',
				data: [
					{
						name: '每日产能',
						color: '#FF005A',
						seriesData: [],
						// seriesData: [120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
						// }, {
						// 	name: '目标产能',
						// 	color: '#3888fa',
						// 	seriesData: [60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
					}
				],
				xData: [],
				// xData: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
			},
			// pieData: [
			//   { value: 23, name: '项目1', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 3, name: '项目2', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 17, name: '项目3', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 26, name: '项目4', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 11, name: '项目5', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 3, name: '项目6', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 9, name: '项目7', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			//   { value: 8, name: '项目8', itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } },
			// ],
		}
	},
	mounted() {
		console.log(colors);

		// setInterval(() => {
		//   this.completionRateWidth = 87;
		//   this.getcompletionRate(this.completionRateWidth);
		// }, 1000);
		this.init();
	},
	computed: {

	},
	methods: {
		init() {
			this.getBaseInfo();
			this.getProcessList();
			this.getParamInfoList();
			this.getFctDefectStatsList();
			this.getdailyCapacityAnalysisList();
			this.getLastLineInfo();

		},
		getBaseInfo() {
			getDip2BaseInfo().then(res => {
				if (res.code == SUCCESS_CODE) {
					this.baseInfo = res.data[0] || {};
					console.log('this.baseInfo', this.baseInfo);
					setInterval(() => {
						this.completionRateWidth = this.baseInfo.completionRate;
						this.getcompletionRate(this.completionRateWidth);
					}, 1000);
				}
			})
		},
		getProcessList() {
			getDip2ProcessList().then(res => {
				if (res.code == SUCCESS_CODE) {
					this.processList = JSON.parse(JSON.stringify(res.data) || []);
					this.processList.forEach(item => {
						item.load = false; // 添加一个加载状态
					})
					console.log('this.processList', this.processList);

					this.processList.forEach(item => {
						item.load = true;
						getDip2Picture(item.processName).then(res => {
							const blob = new Blob([res], { type: 'image/png' });
							const imageUrl = window.URL.createObjectURL(blob);
							item.imageUrl = imageUrl;
						}).finally(() => {
							item.load = false;
						})
					})
				}
			})
		},
		getParamInfoList() {
			getDip2ParamInfoList().then(res => {
				if (res.code == SUCCESS_CODE) {
					this.paramInfoList = res.data || [];
				}
			})
		},
		getFctDefectStatsList() {
			getDip2FctDefectStatsList().then(res => {
				if (res.code == SUCCESS_CODE) {
					res.data.forEach((item, i) => {
						this.fctDefectStatsList.push({
							name: item.projectName,
							value: item.defectCount,
							realValue: item.defectCount,
							itemStyle: { color: colors[i] }
							// itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } // 随机颜色
						});
					})
				}
			})
		},
		getdailyCapacityAnalysisList() {
			getDip2DailyCapacityAnalysisList().then(res => {
				if (res.code == SUCCESS_CODE) {
					res.data.forEach(item => {
						this.lineData.xData.push(item.belongingDate);
						this.lineData.data[0].seriesData.push(item.actualValue);
					})
				}
			})
		},
		getLastLineInfo() {
			getDip2LastLineInfo().then(res => {
				if (res.code == SUCCESS_CODE) {
					res.data.forEach(item => {
						if (item.lineName == 'DIP') {
							this.DIPLineStatus = item.status;
						}
					})

				}
			})
		},
		getcompletionRate(targetValue = 0) {
			const duration = 1000;  // 动画时长 2 秒
			const stepValue = Math.round(targetValue / (duration / 20));  // 每次增加的值
			const colorValue = (255 / (duration / 20));  // 每次增加的值

			this.intervalId = setInterval(() => {
				if (this.completionRateValue < targetValue) {
					this.completionRateValue = Math.min(this.completionRateValue + stepValue, targetValue);  // 防止超出目标值
					this.completionRateColor.r -= colorValue;
					this.completionRateColor.g += colorValue;
				} else {
					clearInterval(this.intervalId);  // 停止定时器
				}
			}, 20);
		},
		// 在过渡进入前，给元素设置初始宽度
		beforeEnter(el) {
			el.style.width = '0%'; // 在进入之前先把宽度设为 0
		},
		// 进入过渡动画
		enter(el, done) {
			el.offsetHeight; // 触发重绘
			el.style.transition = 'width 1s ease-in-out'; // 动画生效
			el.style.width = `${this.completionRateWidth}%`; // 设置目标宽度
			done(); // 完成过渡
		}
	},
	beforeDestroy() {
		if (this.intervalId) {
			clearInterval(this.intervalId);  // 清除定时器
		}
	},
}
</script>
<style lang="scss" scoped>
* {
	border-radius: 1px;
}

.content-container {
	font-size: 14px;
	font-weight: 700;

	.base-info {
		padding: 10px;
		margin: 5px 0;

	}

	.chart-title {
		height: 30px;
		background-image: url('../../../../assets/images/bigScreen/title_bg.png');
		background-repeat: no-repeat;
		background-size: 300px 100%;
		background-position: 0 center;
		padding-left: 20px;
		font-size: 15px;
		line-height: 30px;
		margin-bottom: 24px;
	}

	.row1 {
		.base-info-col {
			height: 50px;
			padding: 5px 10px;

			.base-item {
				// background-color: rgba(25, 129, 246, 0.2);
				// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
				// border: 1px solid transparent;
				width: 100%;
				height: 100%;
				display: flex;

				.item-key {
					// border-right: 3px solid rgb(54, 102, 227);
					display: flex;
					align-items: center;
					justify-content: end;
					width: 35%;
					margin-right: 5%;
					font-size: 15px;
				}

				.item-value {
					background-color: rgba(25, 129, 246, 0.2);
					display: flex;
					align-items: center;
					justify-content: center;
					width: 60%;
					font-size: 12px;
					white-space: nowrap;
					overflow: hidden;
					font-weight: 400;
				}
			}
		}

		.col1 {
			padding: 5px 10px 5px 0;
		}

		.col6 {
			padding: 5px 0 5px 10px;

			.item-value-progress {
				width: 60%;
				height: 80%;
				// border: 1px solid rgb(255, 255, 255);
				border-radius: 5px;
				position: relative;

				.progress {
					height: 100%;
					// background-color: rgb(255, 0, 0);
					display: flex;
					justify-content: center;
					align-items: center;
					// animation: expandWidth 2s forwards;
				}

				.value {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			// @keyframes expandWidth {
			// 	0% {
			// 		width: 0%;
			// 	}

			// 	100% {
			// 		width: 100%;
			// 	}
			// }
		}
	}

	.row2 {
		.base-info-col {
			height: 300px;
		}

		.col1 {
			padding: 5px 0;
			display: flex;

			.base-item {
				// margin: 0 20px 0 0;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				position: relative;

				.item-image {
					height: 174px;
					width: 100%;
					width: calc(100% - 20px);
					background-color: rgba(25, 129, 246, 0.2);
					// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
					border: 1px solid rgba(25, 129, 246, 0.8);
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20px;

					img {
						width: 100%;
						height: 100%;
					}

					.el-image {
						width: 100%;
						height: 100%;
					}
				}

				.item-key,
				.item-value {
					// margin-top: 20px;
					width: 100%;
					// background-color: rgba(25, 129, 246, 0.2);
					// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
					// border: 1px solid transparent;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.item-key {
					height: 38px;
					border-top: 1px solid rgba(255, 255, 255);
				}

				.item-value {
					height: 58px;
					font-size: 40px;
					border-bottom: 1px solid rgba(255, 255, 255);
				}
			}
		}

		.col2 {
			.base-item {

				width: 100%;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				position: relative;

				&::-webkit-scrollbar {
					/* 隐藏垂直滚动条 */
					width: 0px;
				}

				.item-table {
					width: 100%;
					height: 100%;
					/* 设置单元格之间的间隔为 10px */
					// border-spacing: 10px;
					/* 使用 separate 模式来启用单元格之间的间隔 */
					// border-collapse: separate;
					border-spacing: 0;
					/* 移除单元格之间的空隙 */
					border-collapse: collapse;
					/* 合并表格边框 */
					font-size: 15px;

					th {
						padding: 10px 0;
						width: 33.33%;
					}

					th,
					td {
						border: 1px solid rgba(255, 255, 255, 0.8);
						background-color: rgba(25, 129, 246, 0.2);
						// box-shadow: 0 0 3px 3px rgba(25, 129, 246, 0.5);
						// border: 1px solid transparent;
						text-align: center;
						vertical-align: middle;
						height: 35px;
					}

					.table-body {

						tr> :not(:first-child) {
							font-size: 12px;
							font-weight: 400;
						}
					}

				}

			}
		}
	}

	.row3 {
		height: calc(100vh - 540px);

		.base-info-col {
			height: 100%;
		}

		.col1 {
			padding: 5px 10px 5px 0;

			.base-item {
				background-color: rgba(25, 129, 246, 0.2);
				// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
				// border: 1px solid transparent;
				width: 100%;
				height: 100%;
				display: flex;
			}
		}

		.col2 {
			padding: 5px 0 5px 10px;

			.base-item {
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: wrap;
				font-size: 15px;

				.item-left,
				.item-right {
					height: 30px;
					// background-color: rgba(25, 129, 246, 0.2);
					// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
					// border: 1px solid transparent;
					display: flex;
					align-items: center;
				}

				.item-left {
					flex: 3;
					margin-right: 10px;
					justify-content: center;
				}

				.item-right {
					flex: 2;
					width: 100%;
					// margin-left: 10px;
					background-image: url('../../../../assets/images/bigScreen/title_bg.png');
					background-repeat: no-repeat;
					background-size: 300px 100%;
					background-position: 0 center;
					justify-content: space-between;
					padding: 0 20px;
				}

				.item-chart {
					width: 100%;
					margin-top: 20px;
					height: calc(100% - 56px);
					background-color: rgba(25, 129, 246, 0.2);
					// box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
					// border: 1px solid transparent;
				}
			}
		}
	}
}
</style>
