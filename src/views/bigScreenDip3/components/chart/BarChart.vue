<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
		},
		chartData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			chart: null
		}
	},
	watch: {
		chartData: {
			deep: true,
			handler(val) {
				this.$nextTick(() => {
					this.initChart()
				})
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart()
		})
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el, 'macarons')
			const option = {
				grid: {
					top: 30,
					left: 5,
					right: 0,
					bottom: 25,
					containLabel: true,
				},
				tooltip: {
					trigger: 'item',
				},
				title: {
					text: '不良数量',
					left: 'center',
					textStyle: {
						color: '#fff',
						fontSize: 16
					}
				},
				xAxis: {
					type: 'category',
					show: true,
					data: this.chartData.xData,
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
						// interval: 0,
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
						data: this.chartData.yData
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
						data: this.chartData.yData
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
						data: this.chartData.yData
					}
				]
			};
			this.chart.setOption(option)
		}
	}
}
</script>
