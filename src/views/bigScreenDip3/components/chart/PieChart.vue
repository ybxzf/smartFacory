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

			this.chart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				title: {
					text: '损失时间(小时h)',
					left: 'center',
					textStyle: {
					  color: '#fff',
						fontSize: 16
					}
				},
				grid: {
					top: "10%",
					left: 0,
					right: '5%',
					bottom: '3%',
					containLabel: true
				},
				legend: {
					orient: "vertical",
					left: '70%',
					top: 'center',
					textStyle: {
					  color: '#fff',
					},
					data: this.chartData.legendData,
				},
				series: [
					{
						name: '损失时间(小时h)',
						type: 'pie',
						radius: '50%',
						center: ['40%', '50%'],
						itemStyle: {
							// borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 1
						},
						label: {
							normal: {
								show: false
							}
						},
						data: this.chartData.yData,
						animationEasing: 'cubicInOut',
						animationDuration: 2600
					}
				]
			})
		}
	}
}
</script>
