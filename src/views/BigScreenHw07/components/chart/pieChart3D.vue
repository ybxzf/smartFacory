<template>
  <div class="" ref="pieChart" style="width: 100%;height: 100%;"></div>
</template>

<script>

import * as echarts from 'echarts';
import 'echarts-gl';
import { getPie3D } from './pieChart.js';

export default {
  name: "",
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null,
      heightProportion: 0.1// 柱状扇形的高度比例
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.pieChart);

    this.init();
    // 监听 legend 选择事件
    this.myChart.on('legendselectchanged', function (params) {
      console.log(params);
      this.myChart.setOption(option);
    });
  },
  methods: {
    init() {
      const legendsSelected = {};//用于判断legend初始是否显示
      this.chartData.map(item => {
        legendsSelected[item.name] = Number(item.value) === 0 ? false : true;
      })
      let total = 0
      this.chartData.map(item => {
        total += item.value
      })
      const cdata = this.chartData.map(item => {
        item.value = Number((item.value / total * 100).toFixed(2))
        return item
      })
      const series = getPie3D(this.chartData.map(item => {
        item.value = Number((item.value / total * 100).toFixed(2))
        return item
      }), 0, 240, 28, 26, 1);
      const option = {
        legend: {
          type: 'scroll',//设置图例翻页
          pageIconColor: '#ff781f', // 设置翻页箭头颜色
          // selected: {//设置默认选择
          //     '办公费': true,
          //     '差旅费': false,
          // },
          width: '80%',//图例宽度
          pageIconSize: 20,//箭头大小
          pageButtonItemGap: 172,//箭头间隔
          pageButtonGap: -350,//图例拓展位置
          pageTextStyle: {
            color: 'transparent' // 设置翻页数字颜色
          },

          selected: legendsSelected,
          tooltip: {
            show: true,
          },
          data: this.chartData.map(item => item.name),
          orient: 'horizontal',
          top: '10%',
          left: '14%',
          icon: 'circle',
          textStyle: {
            color: '#fff',
            fontSize: 13,
          },
        },
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
              const value = this.chartData.filter(item => item.name == params.seriesName)[0].value;
              const realValue = this.chartData.filter(item => item.name == params.seriesName)[0].realValue;
              return `${params.seriesName}<br/>
                                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};">
                                </span>
                                ${realValue}
                            `
            }
          },
        },
        animation: true,
        backgroundColor: 'transparent',//背景透明
        // title: [
        //     {
        //         x: 'center',
        //         top: '40%',
        //         text: total,
        //         textStyle: {
        //             color: '#fff',
        //             fontSize: 42,
        //             fontWeight: 'bold'
        //         },
        //     },
        //     {
        //         x: 'center',
        //         top: '48%',
        //         text: '还款总额',
        //         textStyle: {
        //             color: '#fff',
        //             fontSize: 22,
        //             fontWeight: 400
        //         },
        //     },
        // ],
        labelLine: {
          show: true,
          lineStyle: {
            color: '#7BC0CB',
          },
        },
        label: {
          show: false,
        },
        xAxis3D: {
          min: -1.5,
          max: 1.5,
        },
        yAxis3D: {
          min: -1.5,
          max: 1.5,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: 12,
          width: "100%",
          top: "20%",
          viewControl: {
            distance: 300,
            alpha: 30,
            beta: 110,
            autoRotate: true, // 自动旋转
          },
        },

        series: series,
      };

      this.myChart.setOption(option);
      this.myChart.resize();

    },

  },
}
</script>
<style scoped lang="scss"></style>
