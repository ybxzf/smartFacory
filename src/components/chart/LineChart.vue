<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

/**
	基础折线图封装

	传值示例：
	chartData: {
		title: '小时产能',
		data: [
			{
				name: '小时产能',
				color: '#FF005A',
				seriesData: [120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
			}, {
				name: '目标产能',
				color: '#3888fa',
				seriesData: [60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
			}
		],
		xData: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
	}
 */
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
			default: '350px'
		},
		autoResize: {
			type: Boolean,
			default: true
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
				this.setOptions(val)
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
			this.setOptions(this.chartData)
		},
		setOptions(chartData = []) {
			const seriesList = chartData.data.map((item) => {
				return {
					name: item.name,
					smooth: true,
					type: 'line',
					itemStyle: {
						normal: {
							color: item.color,
							lineStyle: {
								color: item.color,
								width: 2
							}
						}
					},
					data: item.seriesData,
					animationDuration: 1000,
				}
			})
			this.chart.setOption({
				xAxis: {
					data: chartData.xData,
					boundaryGap: false,
					axisTick: {
						show: false
					}
				},
				dataZoom: {
					start: 0,
					end: 100,
					type: "inside",
					realtime: true,
				},
				grid: {
					left: 20,
					right: 45,
					bottom: 40,
					top: "20%",
					containLabel: true
				},
				title: {
					text: chartData.title,
					left: '20',
					top: 10,
					textStyle: {
						color: '#fff',
						fontSize: 16
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					padding: [5, 10]
				},
				yAxis: {
					axisTick: {
						show: false
					}
				},
				legend: {
					data: chartData.data.map(item => item.name),
					right: '20',
					top: '10',
					// bottom: 10,
					textStyle: {
						color: '#fff'
					}
				},
				series: seriesList
			})
		}
	}
}
</script>
