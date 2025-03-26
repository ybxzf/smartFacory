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
			default: '100%'
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

			this.chart.setOption({
				// tooltip: {
				// 	trigger: 'axis',
				// 	axisPointer: { // 坐标轴指示器，坐标轴触发有效
				// 		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				// 	}
				// },
        tooltip: {
          trigger: "item",
        },
				title: {
					// text: this.chartData.title,
					left: 'center',
					textStyle: {
					  color: '#fff',
						fontSize: 16
					}
				},
				grid: {
					top: "10%",
					left: '2%',
					right: '2%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: this.chartData.xData,
					axisTick: {
						alignWithLabel: true
					}
				}],
				yAxis: [{
					type: 'value',
					axisTick: {
						show: false
					}
				}],
				series: [

          {
            type: "pictorialBar",
            label: { show: false },
            symbolSize: [15, 10],
            symbolOffset: [0, 5],
            z: 12,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(31, 155, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 229, 255, 1)",
                },
              ]),
            },
            data: this.chartData.yData,
          },{
            type: "bar",
            barMaxWidth: 15,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 229, 255, 0.5)",
                  },
                  {
                    offset: 0,
                    color: "#1F9BFF",
                  },
                ],
              },
            },
					data: this.chartData.yData,
            // animationDuration,//动画效果
				},
          {
            type: "pictorialBar",
            symbolSize: [15, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
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
                    color: "rgba(31, 155, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 229, 255, 1)",
                  },
                ],
                false
              ),
            },
            data: this.chartData.yData,
          },]
			})
		}
	}
}
</script>
