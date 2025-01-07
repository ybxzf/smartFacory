<template>
	<div :class="className"  style="height:100%;width:100%;"/>
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'


/**
	基础饼图封装
	传值示例：
	chartData: {
		title: '不良占比',
		showLabel: true, //是否显示标签
		yData: [
			{ value: 23, name: '项目1' },
			{ value: 3, name: '项目2' },
			{ value: 17, name: '项目3' },
			{ value: 26, name: '项目4' },
			{ value: 11, name: '项目5' },
			{ value: 3, name: '项目6' },
			{ value: 9, name: '项目7' },
			{ value: 8, name: '项目8' },
		]
	},
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
			this.chart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				title: {
					text: chartData.title,
					left: 'center',
					textStyle: {
						color: '#fff',
						fontSize: 16
					}
				},
				// grid: {
				// 	top: "10%",
				// 	left: 0,
				// 	right: '5%',
				// 	bottom: '3%',
				// 	containLabel: true
				// },
				legend: {
					orient: "horizontal",
					// left: '70%',
					left: 'center',
					bottom: '10px',
					textStyle: {
						color: '#fff',
              fontSize: 6,
					},
					// data: chartData.yData.map(item => item.name),
				},
				series: [
					{
						name: chartData.title,
						type: 'pie',
						radius: '60%',
						itemStyle: {
							// borderRadius: 10,
							// borderColor: '#fff',
							borderWidth: 1
						},
						label: {
							show: chartData.showLabel,
							position: 'outside',  // 标签位置可以是 'outside' 或 'inside'
							formatter: '{b}',  //'{b}: {d}%'  格式化标签显示内容，{b} 为名称，{d} 为百分比
							color: '#fff',
              fontSize:12
						},
						labelLine: {
							show: true,  // 显示连接线
							length: 10,  // 连接线的长度
							length2: 4, // 连接线的第二段长度
							smooth: true, // 设置引导线是否平滑
						}, emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
					 data: [
                {
                  value: chartData.yData,
                  name: "已完成",
                  itemStyle: { color: "#06b1fa" },
                },
                { value: (100-chartData.yData).toFixed(2), name: "未完成", itemStyle: { color: "#ED7D31" } },
              ],
						animationEasing: 'cubicInOut',
						animationDuration: 1000
					}
				]
			})
		}
	}
}
</script>
