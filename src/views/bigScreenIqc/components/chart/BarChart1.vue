<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      barChartWidth: 0,
      xData:["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.initChart();
        });
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.barChartWidth =
        this.$parent.$parent.$parent.$parent.$parent.$refs.myChart.clientWidth /
        this.chartData.xData.length /
        2;
      let _markLine = {
        symbol: "none",
        label: {
          show: true,
          position: "start",
          formatter: function (param) {
            return `${param.name} ${param.value}`;
          },
        },
        data: [],
      };
      _markLine.data.push({
        name: "标准值",
        yAxis: 97,
        lineStyle: {
          type: "dashed",color: "red",  width: 2
        },
      });
      this.chart.setOption({
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        //   },
        // },
        tooltip: {
          trigger: "item",
        },
        title: {
          text: this.chartData.title,
          left: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
          },
        },
        grid: {
          top: "10%",
          left: "7%",
          right: "2%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              // alignWithLabel: true,
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            min:Math.min(...this.chartData.yData)>Math.min(...this.chartData.yData1)?Math.min(...this.chartData.yData1)-0.3:Math.min(...this.chartData.yData)-0.3,
          },
        ],
				legend: {
					data: this.chartData.legendData,
					top: 'bottom',
					textStyle: {
						color: '#fff'
					}
				},
        series: [

          {
            name: "电子料合格率",
            type: "bar",
            barWidth: 12,
            data: this.chartData.yData,
            itemStyle: {
              color:'#5ab1ef',
            },
            markLine: _markLine,
            // animationDuration,//动画效果
          },{
            name: "结构料合格率",
            type: "bar",
            barWidth: 12,
            data: this.chartData.yData1,
            itemStyle: {
              color: '#ffb980',
            },
            markLine: _markLine,
            // animationDuration,//动画效果
          },
        ],
      });
    },
  },
};
</script>
