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
      if (this.barChartWidth > 15) this.barChartWidth = 15;
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
          type: "dashed",
          color: "red",
          width: 2,
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
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min:Math.min(...this.chartData.yData)-0.5,
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "pictorialBar",
            label: { show: false },
            symbolSize: [this.barChartWidth, this.barChartWidth / 2],
            symbolOffset: [0, this.barChartWidth / 4],
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
          },
          {
            name: "不良数量",
            type: "bar",
            barWidth: this.barChartWidth,
            data: this.chartData.yData,
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
            markLine: _markLine,
            // animationDuration,//动画效果
          },
          {
            type: "pictorialBar",
            symbolSize: [this.barChartWidth, this.barChartWidth / 2],
            symbolOffset: [0, -this.barChartWidth / 4],
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
          },
        ],
      });
    },
  },
};
</script>
