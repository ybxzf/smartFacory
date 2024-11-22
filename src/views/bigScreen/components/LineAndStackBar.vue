<template>
	<div class="section">
		<div class="title">
			<span>当日产能统计</span>
		</div>
		<div class="myChart" id="myChart" v-if="xData.length"></div>
		<DataEmpty v-else></DataEmpty>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import DataEmpty from './empty.vue'
import { mapGetters } from 'vuex';
export default {
	components: {
		DataEmpty
	},
	props: {
		yDataLeft: {
			typeof: Array,
			default: () => [6000, 4100, 6005, 8000, 6100]
		},
		yDataRight: {
			typeof: Array,
			default: () => [60, 70, 65, 80, 61]
		},
		xData: {
			typeof: Array,
			default: () => ['姓名\nSMT', '姓名\nDIP', '姓名\n组装', '姓名\n检验', '姓名\n包装']
		},
	},
	data() {
		return {
			myChart: null,
		}
	},
	computed: {
		...mapGetters([
			'sidebar',
		]),
	},
	watch: {
		"sidebar.opened"(newVal) {
			setTimeout(() => {
				this.chartResize();
			}, 150);
		}
	},
	watch: {
		xData: {
			handler: function (newVal) {
				if (newVal.length) {
					this.$nextTick(()=>{
						this.init();
					});
				}
			},
			deep: true,
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.myChart = echarts.init(document.getElementById('myChart'));
			this.drawChart();
			window.addEventListener('resize', this.chartResize);
		},
		drawChart() {
			const option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				// toolbox: {
				//   feature: {
				//     dataView: { show: true, readOnly: false },
				//     magicType: { show: true, type: ['line', 'bar'] },
				//     restore: { show: true },
				//     saveAsImage: { show: true }
				//   }
				// },
				legend: {
					data: ['直通率', '产能'],
					textStyle: {
						color: "#fff"
					}
				},
				grid: {
					top: 30,
					left: 15,
					right: 15,
					bottom: 20,
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						axisPointer: {
							type: 'shadow'
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							color: '#fff',
						},
						data: this.xData,
					}
				],
				yAxis: [
					{
						type: 'value',
						// name: '直通率',
						min: 0,
						max: 10000,
						interval: 2000,
						axisLabel: {
							color: '#fff',
							formatter: '{value} '
						},
						splitLine: {
							show: false,  // 显示 Y 轴的网格线（横线）
							lineStyle: {
								color: '#ccc',  // 设置网格线的颜色
								type: 'solid',   // 设置网格线的类型：solid, dashed, dotted
								width: 1         // 设置网格线的宽度
							}
						},
					},
					{
						type: 'value',
						// name: '产能',
						min: 0,
						max: 100,
						interval: 20,
						axisLabel: {
							color: '#fff',
							formatter: '{value} %'
						},
						splitLine: {
							show: true,  // 显示 Y 轴的网格线（横线）
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.15)',  // 设置网格线的颜色
								type: 'solid',   // 设置网格线的类型：solid, dashed, dotted
								width: 1         // 设置网格线的宽度
							}
						},
					}
				],
				series: [
					{
						name: '直通率',
						type: "pictorialBar",
						symbol: "roundRect",
						symbolSize: [15, 4],
						symbolRepeat: true,
						symbolMargin: 1,
						stack: "total",
						yAxisIndex: 1,
						emphasis: {
							focus: "series",
						},
						showBackground: true,
						tooltip: {
							valueFormatter: function (value) {
								return value + ' %';
							}
						},
						data: this.yDataLeft,
					},
					{
						name: '产能',
						type: 'line',
						smooth: true,
						yAxisIndex: 0,
						tooltip: {
							valueFormatter: function (value) {
								return value + '';
							}
						},
						data: this.yDataRight,
					}
				]
			};
			this.myChart.setOption(option);
		},
		chartResize() {
			this.myChart && this.myChart.resize();
		}
	},
}
</script>

<style lang="scss" scoped>
.section {
	width: 100%;
	height: 100%;
}

.title {
	width: 100%;
	height: 15%;
	background-image: url("../../../assets/images/bigScreen/title_bg.png");
	background-repeat: no-repeat;
	background-size: 90% 75%;
	background-position: center center;
	position: relative;

	span {
		position: absolute;
		top: 50%;
		left: 8%;
		transform: translateY(-50%);

	}

}

.myChart {
	width: 100%;
	height: 85%;
}
</style>
