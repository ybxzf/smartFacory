<template>
  <div class="section">
    <div class="title">
      <span>成品检验</span>
    </div>
    <div class="content">成品合格率（%）</div>
    <div class="cuboidBar" id="cuboidBar"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    yData: {
      typeof: Array,
      default: () => [300, 498, 778, 382, 299, 372, 2332, 2331, 233, 533, 733, 233]
    },
    xData: {
      typeof: Array,
      default: () => ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    barWidth: {
      typeof: Number,
      default: 5
    },
  },
  data() {
    return {
      cuboidChart: null,
    }
  },
  mounted() {
    this.cuboidChart = echarts.init(document.getElementById('cuboidBar'));
    this.drawShape(this.barWidth);
    window.addEventListener('resize', this.chartResize);
  },
  methods: {
    drawShape(width) {
      const leftShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
          const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
          // 侧面宽度
          const WIDTH = width;
          // 斜角高度
          const OBLIQUE_ANGLE_HEIGHT = 3.6;

          const p1 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
          const p2 = [basicsXAxis - WIDTH, bottomYAxis];
          const p3 = [basicsXAxis, bottomYAxis];
          const p4 = [basicsXAxis, topBasicsYAxis];

          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
        },
      });

      const rightShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
          const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
          // 侧面宽度
          const WIDTH = width;
          // 斜角高度
          const OBLIQUE_ANGLE_HEIGHT = 3.6;

          const p1 = [basicsXAxis, topBasicsYAxis];
          const p2 = [basicsXAxis, bottomYAxis];
          const p3 = [basicsXAxis + WIDTH, bottomYAxis];
          const p4 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
        },
      });

      const topShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
          const { topBasicsYAxis, basicsXAxis } = shape;
          // 侧面宽度
          const WIDTH = width;
          // 斜角高度
          const OBLIQUE_ANGLE_HEIGHT = 3.6;

          const p1 = [basicsXAxis, topBasicsYAxis];
          const p2 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
          const p3 = [basicsXAxis, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT * 2];
          const p4 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
        },
      });

      echarts.graphic.registerShape("leftShape", leftShape);
      echarts.graphic.registerShape("rightShape", rightShape);
      echarts.graphic.registerShape("topShape", topShape);
      this.drawChart();
    },
    drawChart() {
      const that = this;
      const option = {
        legend: {
          data: [
            {
              name: "国内",
              textStyle: {
                color: "#fff"
              }
            },
            {
              name: "国外",
              textStyle: {
                color: "#fff"
              }
            }, {
              name: '平均线',
              lineStyle: {
                type: 'dotted',
                width: 3,
                color: '#06C039'
              },
              textStyle: {
                color: "#fff"
              }
            }],
        },
        grid: {
          top: 30,
          left: 15,
          right: 20,
          bottom: 5,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.xData,
          axisTick: {
            show: false,
          },
          axisLine: {
            // show: false,
          },
          axisLabel: {
            interval: 0,
            color: "#04CDD6",
          }
        },

        yAxis: {
          type: "value",
          axisLabel: {
            color: "#04CDD6",
          },
          splitLine: {
            lineStyle: {
              color: "#222",
            },
          },
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            type: "custom",
            data: this.yData,
            name: '国内',
            renderItem(params, api) {
              // 基础坐标
              const basicsCoord = api.coord([api.value(0), api.value(1)]);
              // 顶部基础 y 轴
              const topBasicsYAxis = basicsCoord[1];
              // 基础 x 轴
              const basicsXAxis = basicsCoord[0];
              // 底部 y 轴
              const bottomYAxis = api.coord([api.value(0), 0])[1];
              return {
                type: "group",
                children: [
                  {
                    type: "leftShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(0, 192, 238,0.8)',
                        },

                        {
                          offset: 0.8,
                          color: 'rgb(0, 194, 239,0.2)',
                        },
                        {
                          offset: 1,
                          color: 'rgb(0, 194, 239,0)',
                        },
                      ]),
                      emphasis: {
                        fill: 'yellow', // 鼠标高亮时的填充颜色
                      },
                    },
                  },
                  {
                    type: "rightShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#00CCF5',
                        },

                        {
                          offset: 0.8,
                          color: 'rgb(4, 88, 115,0.8)',
                        },
                        {
                          offset: 1,
                          color: 'rgb(4, 88, 115,0.6)',
                        },
                      ]),
                    },
                  },
                  {
                    type: "topShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0.3,
                          color: '#6DF0FF',
                        },
                        {
                          offset: 1,
                          color: '#6DF0FF',
                        },
                      ]),
                    },
                  },
                ],
              };
            }
          },
          {
            name: '国外',
            type: "custom",
            data: [100, 498, 778, 382, 299, 372, 200, 300, 233, 533, 733, 233],
            renderItem(params, api) {
              // 基础坐标
              const basicsCoord = api.coord([api.value(0), api.value(1)]);
              console.log(basicsCoord);
              // 顶部基础 y 轴
              const topBasicsYAxis = basicsCoord[1];
              console.log(topBasicsYAxis);
              // 基础 x 轴
              const basicsXAxis = basicsCoord[0] + that.barWidth * 1.5;
              // 底部 y 轴
              const bottomYAxis = api.coord([api.value(0), 0])[1];
              console.log(bottomYAxis)
              return {
                type: "group",
                children: [
                  {
                    type: "leftShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(0, 29, 24,0.8)',
                        },

                        {
                          offset: 0.8,
                          color: 'rgb(0, 34, 24,0.2)',
                        },
                        {
                          offset: 1,
                          color: 'rgb(0, 34, 24,0)',
                        },
                      ]),
                      emphasis: {
                        fill: 'yellow', // 鼠标高亮时的填充颜色
                      },
                    },
                  },
                  {
                    type: "rightShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#00DCF5 ',
                        },

                        {
                          offset: 0.8,
                          color: 'rgb(4, 55, 24,0.8)',
                        },
                        {
                          offset: 1,
                          color: 'rgb(4, 55, 24,0.6)',
                        },
                      ]),
                    },
                  },
                  {
                    type: "topShape",
                    shape: {
                      topBasicsYAxis,
                      basicsXAxis,
                      bottomYAxis,
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0.3,
                          color: '#6EFFFF',
                        },
                        {
                          offset: 1,
                          color: '#6EFFFF',
                        },
                      ]),
                    },
                  },
                ],
              };
            }
          },
          { /* TIP: 增加的series */
            type: 'line',
            symbol: 'none',
            name: '平均线',
            markLine: {
              symbol: "none",   //是否显示首尾箭头
              data: [
                //第一条线
                {
                  yAxis: 200,
                  name: "平均线",
                  lineStyle: {
                    type: "solid",
                    color: "#FA6400",
                    width: 2,
                  },
                  label: {
                    //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                    position: "middle",
                    fontSize: 14,
                    formatter: "",
                  },
                }]
            },
          }
        ],
      };
      this.cuboidChart.setOption(option);
    },
    chartResize() {
      this.cuboidChart && this.cuboidChart.resize();
    }
  },
}
</script>

<style lang="scss" scoped>
.section {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 15%;
  background-image: url("../../../assets/images/bigScreen/title_bg.png");
  background-repeat: no-repeat;
  background-size: 90% 75%;
  background-position: center center;
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 8%;
    transform: translateY(-50%);

  }

}

.content {
  height: 5%;
  font-size: 10%;
  text-align: center;
  color: #04CDD6;
}

#cuboidBar {
  width: 100%;
  height: 80%;
}
</style>
