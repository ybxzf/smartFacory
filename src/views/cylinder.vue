<template>
	<div class="cylinder" id="cylinderId"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
	props: {
		yData: {
			typeof: Array,
			default: () => [300, 498, 778, 382, 299, 372, 2332, 2331, 233, 533, 733, 233]
		},
		xData: {
			typeof: Array,
			default: () => ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		},
	},
	data() {
		return {
			cylinderChart: null,
		}
	},
	mounted() {
		this.cylinderChart = echarts.init(document.getElementById('cylinderId'));
		this.drawChart();
		window.addEventListener('resize', this.chartResize);
	},
	methods: {
		drawChart() {
			const option = {
				grid: {
					left: '12%',
					right: '3%',
					bottom: '10%',
					containerLabel: true
				},
				tooltip: {
					trigger: 'item',
					formatter: function (params) {
						return `${params.name}`;
					}
				},
				xAxis: {
					type: 'category',
					show: true,
					data:this.xData,
					axisTick: {
						show: false
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255, 255, 255, 0.15)'
						}
					},
					axisLabel: {
						interval: 0,
						color: '#ffffff',
						fontSize: 12,
					}
				},
				yAxis: {
					type: 'value',
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						fontSize: 12
					},
					splitLine: {
						lineStyle: {
							color: 'rgba(255, 255, 255, 0.15)'
						}
					}
				},
				series: [
					{
						type: 'pictorialBar',
						symbolSize: [15, 10],
						symbolOffset: [0, 5],
						z: 12,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgba(31, 155, 255, 1)'
								},
								{
									offset: 1,
									color: 'rgba(0, 229, 255, 1)'
								}
							])
						},
						data: this.yData
					},
					{
						type: 'bar',
						barWidth: 15,
						barGap: '0%',
						itemStyle: {
							color: {
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								type: 'linear',
								global: false,
								colorStops: [
									{
										offset: 0,
										color: 'rgba(0, 229, 255, 0.5)'
									},
									{
										offset: 0,
										color: '#1F9BFF'
									}
								]
							}
						},
						data: this.yData
					},
					{
						type: 'pictorialBar',
						symbolSize: [15, 10],
						symbolOffset: [0, -5],
						symbolPosition: 'end',
						z: 12,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: 'rgba(31, 155, 255, 1)'
									},
									{
										offset: 1,
										color: 'rgba(0, 229, 255, 1)'
									}
								],
								false
							)
						},
						data: this.yData
					}
				]
			};
			this.cylinderChart.setOption(option);
		},
		chartResize() {
			this.cylinderChart && this.cylinderChart.resize();
		}
	},
}
</script>

<style>
#cylinderId {
	width: 100%;
	height: 100%;
}
</style>