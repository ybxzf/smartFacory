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
		setOptions({ hlhData, spiData,aoiData } = {}) {
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
					left: '2%',
					right: '2%',
					bottom: '20',
					containLabel: true
				},
				title: {
					// text: '产量曲线图',
					left: 'center',
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
						show: false ,
					},
            max:200
				},
				legend: {
					data: this.chartData.legendData,
					top: 'top',
					textStyle: {
						color: '#fff'
					}
				},
				series: [
					{
						name: '回流焊',
						itemStyle: {
							normal: {
								color: '#06b1fa',
								lineStyle: {
									color: '#06b1fa',
									width:3
								}
							}
						},
						smooth: true,
						type: 'line',
						data: hlhData,
						animationDuration: 2800,
						animationEasing: 'cubicInOut'
					},
					{
						name: 'SPI',
						smooth: true,
						type: 'line',
						itemStyle: {
							normal: {
								color: '#ED7D31',
								lineStyle: {
									color: '#ED7D31',
									width: 3
								},
							}
						},
						data: spiData,
						animationDuration: 2800,
						animationEasing: 'quadraticOut'
					},
					{
						name: 'AOI',
						smooth: true,
						type: 'line',
						itemStyle: {
							normal: {
								color: '#c1232b',
								lineStyle: {
									color: '#c1232b',
									width: 3
								},
							}
						},
						data: aoiData,
						animationDuration: 2800,
						animationEasing: 'quadraticOut'
					}]
			})
		}
	}
}
</script>
