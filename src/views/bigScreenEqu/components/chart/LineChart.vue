<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
			default: '100%'
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
		setOptions({ expectedData, actualData } = {}) {
			this.chart.setOption({
				xAxis: {
					data: this.chartData.xData,
					boundaryGap: false,
					axisTick: {
						show: false
					}
				},
			 grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true,
        },
				title: {
					text: '线体损失工时（小时）',
					left: 'center',
					textStyle: {
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
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
					data: this.chartData.legendData,
					top: 'bottom',
					textStyle: {
						color: '#fff'
					}
				},
				series: [
					{
						itemStyle: {
							// normal: {
							// 	color: '#FF005A',
							// 	lineStyle: {
							// 		color: '#FF005A',
							// 		width: 2
							// 	}
							// }
						},
						smooth: true,
						type: 'line',
						data: expectedData,
						animationDuration: 2800,
						animationEasing: 'cubicInOut'
					}]
			})
		}
	}
}
</script>
