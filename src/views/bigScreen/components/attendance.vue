<template>
	<div class="section">
		<div class="attendance common-section">
			<div class="title">
				<span>出勤数据</span>
			</div>
			<div class="top-content">
				<div class="top">
					<span>预计出勤: {{ num }}</span>
					<span>实际出勤: {{ finialNum }}</span>
				</div>
			</div>
			<div class="middle-content">
				<div class="middle">
					<span class="date">{{ date }}</span>
					<span class="time">{{ time }}</span>
				</div>
			</div>
			<div class="bottom-content">
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_expect.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">120</span>
						<span class="desc">预计出勤人数</span>
					</div>
				</div>
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_actual.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">105</span>
						<span class="desc">实际出勤人数</span>
					</div>
				</div>
				<div class="common-part">
					<div class="img-icon">
						<img src="../../../assets/images/bigScreen/attend_rate.png" alt="">
					</div>
					<div class="data-content">
						<span class="num">87.50%</span>
						<span class="desc">出勤率</span>
					</div>
				</div>
			</div>
		</div>

		<div class="attendance common-section">
			<div class="title">
				<span>产能数据</span>
			</div>
			<div class="top-content">
				<div class="top">
					<span>当日计划产能: {{ dailyPlanNum }}</span>
					<span>当日完成产能: {{ dailyCompleteNum }}</span>
				</div>
			</div>
			<div class="pie-content" id="chart3DRef" style="margin:0 5% 5%;height: 65%;"></div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import { getPie3D } from "../../../utils/generator/pieChart";

import moment from 'moment';
export default {
	data() {
		return {
      num: 120,
      finialNum: 105,
      date: '',
      time: '',
      timerId: null,
      dailyPlanNum: 20000,
      dailyCompleteNum: 10500,
      myChart: null,
      optionsData: [
        {
          name: '当日计划产能',
          value: 20000,
          itemStyle: {
            // opacity: 1,
            color: 'rgb(43, 177, 241, 1)',
            // iconColor: 'rgb(255, 166, 0)',
          },
        },
        {
          name: '当日完成产能',
          value: 10500,
          itemStyle: {
            // opacity: 1,
            color: 'rgb(0, 215, 233, 1)',
            // iconColor: 'rgb(255, 38, 27)',
          },
        },
      ]
    }
	},
	created() {
		this.setDateTime();
	},
	mounted() {
    this.myChart = echarts.init(document.getElementById('chart3DRef'));
    this.drawChart();
    window.addEventListener('resize', this.chartResize);

		this.timeId = setInterval(() => { //初始化定时器
			this.setDateTime();
		}, 1000);
	},
  methods: {
    drawChart() {
      //设置柱体高度，最大值越大时，boxHeight应越小，10000-0.01
      const maxVal = (this.optionsData.reduce((max, current) => {
        return current.value > max.value ? current : max;
      }, this.optionsData[0])).value;
      //获取最小值
      const minVal = (this.optionsData.reduce((min, current) => {
        return current.value < min.value ? current : min;
      }, this.optionsData[0])).value;
      //数据<1时图像渲染异常,所以用value去画图，realValue用于显示
      let minNum = minVal;
      if (minNum < 1 && minNum > 0) {
        let count = 0;
        while (minNum < 1) {
          minNum *= 10;
          count++;
        }
        this.optionsData[0].realValue = Number(this.optionsData[0].value);
        this.optionsData[1].realValue = Number(this.optionsData[1].value);
        this.optionsData[0].value = Number(this.optionsData[0].value) * 10 ** count;
        this.optionsData[1].value = Number(this.optionsData[1].value) * 10 ** count;
      }
      const series = getPie3D(this.optionsData, 0);
      series.push({
        name: 'pie2d',
        type: 'pie',
        label: {
          opacity: 1,
          lineHeight: 20,
          textStyle: {
            fontSize: '12px',
            color: '#fff',
          },
          formatter: '{b}\n{d}%',
        },
        labelLine: {
          length: '10rem',
          length2: '30rem',
        },
        startAngle: -30, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['0%', '50%'],
        center: ['50%', '60%'],
        data: this.optionsData,
        itemStyle: {
          opacity: 0,
        },
      })
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        // legend: {
        //     show: true,
        //     tooltip: {
        //         show: true,
        //     },
        //     orient: 'vertical',
        //     data: ['待办', '已办', '未处理', '忽略'],
        //     top: 'center',
        //     itemGap: 14,
        //     itemHeight: 8,
        //     itemWidth: 17,
        //     right: '2%',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: 12,
        //     },
        // },
        animation: true,
        tooltip: {
          position: 'right',
          borderColor: 'transparent',
          backgroundColor: 'rgb(101, 211, 255, 0.9)',
          borderRadius: '2',
          textStyle: {
            color: "#fff", // 文字的颜色
            border: 'none',
          },
          formatter: (params) => {
            if (
              params.seriesName !== 'mouseoutSeries' &&
              params.seriesName !== 'pie2d'
            ) {
              // console.log(params);
              const value = option.series[params.seriesIndex]?.pieData.realValue ?
                option.series[params.seriesIndex]?.pieData.realValue :
                option.series[params.seriesIndex]?.pieData.value
              return `${params.seriesName}<br/>
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};">
                  </span>
                  ${value}
              `
            }
          },
        },
        // title: {
        //     x: 'center',
        //     top: '20',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: 22,
        //     },
        // },
        backgroundColor: 'transparent',//背景透明
        // labelLine: {
        //     show: true,
        //     lineStyle: {
        //         color: '#fff',
        //     },
        //     normal: {
        //         show: true,
        //         length: 10,
        //         length2: 10,
        //     },
        // },
        // label: {
        //     show: true,
        //     position: 'outside',
        //     formatter: '{b} \n{d}%',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: '1rem',
        //     },
        // },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          // boxHeight: 100/(maxVal/minVal),    //3D图高,
          boxHeight: maxVal > 1 ? (90 / maxVal) : 90,    //3D图高,
          top: "15%",
          // left: '2%',
          // bottom: '60%',
          // environment: "rgba(255,255,255,0)",
          viewControl: {
            distance: 350,
            alpha: 40,
            beta: 30,
            autoRotate: false, // 自动旋转
          },
        },
        series: series,
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      this.myChart.resize();
    },
    //获取3d丙图的最高扇区的高度
    getHeight3D(series, height) {
      series.sort((a, b) => {
          return (b.pieData.value - a.pieData.value);
      })
      return height * 25 / series[0].pieData.value;
    },
    chartResize() {
      this.myChart && this.myChart.resize();
    },
		setDateTime() {
			const { date, time } = this.getNowTime();
			this.date = date;
			this.time = time;
		},
		getNowTime() {
			const date = moment(Date.now()).format("YYYY年MM月DD日");
			const time = moment(Date.now()).format("HH:mm:ss");
			return {
				date, time
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.section {
	width: 100%;
	height: 100%;
	display: flex;
	background: transparent;
	// backdrop-filter: blur(10px);
}

.common-section {
	width: 50%;
  height: 100%;

	.title {
		width: 100%;
		height: 15%;
		background-image: url("../../../assets/images/bigScreen/second_title_bg.png");
		background-repeat: no-repeat;
		background-size: 102% 55%;
		background-position: center center;
		position: relative;

		span {
			position: absolute;
			top: 45%;
			left: 3%;
			transform: translateY(-50%);
		}

	}

	.top-content {
		width: 100%;
		height: 15%;
		background-image: url("../../../assets/images/bigScreen/text_bg.png");
		background-repeat: no-repeat;
		background-position: center center;
		position: relative;

		.top {
			width: max-content;
			position: absolute;
			top: 50%;
			left: 50%;
			color: #01b9f1;
			transform: translateX(-50%) translateY(-50%);

			span {
				margin-right: 8px;
			}
		}
	}

	.middle-content {
		width: 100%;
		height: 15%;
		margin-top: 6px;
		background-image: url("../../../assets/images/bigScreen/time_bg.png");
		background-repeat: no-repeat;
		background-size: 80%;
		background-position: center center;
		position: relative;

		.middle {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);

			.date {
				color: #0fb2bc;
				font-size: 14px;
			}

			.time {
				color: #fff;
				font-size: 24px;
			}
		}
	}

	.bottom-content {
		margin-top: 16px;
		display: flex;
		flex-wrap: wrap;

		.common-part {
			width: 42%;
			display: flex;
			align-items: center;
			padding-left: 40px;
			margin-top: 2vh;

			.data-content {
				margin-left: 16px;
				display: flex;
				flex-direction: column;
				font-weight: 550;

				.num {
					color: #1cf6ee;
					margin-bottom: 4px;
				}

        .desc {
  				font-size: 12px;
        }
			}
		}
	}
}


.table-c {
	width: 90%;
	height: 80%;
	margin: 0 24px;
}
</style>
