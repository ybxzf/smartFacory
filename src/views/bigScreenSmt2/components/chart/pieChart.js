const heightProportion = 0.1; // 饼图高度占比

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {

  // 计算
  let midRatio = (startRatio + endRatio) / 3;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.1 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? heightProportion * height : -1;
    }
  };
};

// 生成模拟 3D 饼图的配置项
export function getPie3D(pieData, internalDiameterRatio) {

  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let linesSeries = []; // line3D模拟label指示线
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {

    sumValue += pieData[i].value;

    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {

      let itemStyle = {};

      typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    // console.log(series[i]);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;

    // 计算label指示线的起始和终点位置
    let midRadian = (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
    let posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
    let flag = ((midRadian >= 0 && midRadian <= Math.PI / 2) || (midRadian >= 3 * Math.PI / 2 && midRadian <= Math.PI * 2)) ? 1 : -1;
    let color = pieData[i].itemStyle.color;
    let turningPosArr = [posX * (1.8) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posY * (1.8) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posZ * (2)]
    let endPosArr = [posX * (2.3) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posY * (2.7) + (i * 0.1 * flag) + (flag < 0 ? -0.5 : 0), posZ * (15)]

    linesSeries.push(
      {
        type: 'line3D',//引导线
        lineStyle: {
          color: color,
        },
        data: [[posX, posY, posZ], turningPosArr, endPosArr]
      },
      {
        type: 'scatter3D',//数据框
        label: {
          show: true,
          distance: 0,
          position: 'center',
          textStyle: {
            color: '#ffffff',
            backgroundColor: color,
            borderWidth: 2,
            fontSize: 14,
            padding: 10,
            borderRadius: 4,
          },
          formatter: '{b}'
        },
        symbolSize: 0,
        data: [{
          name: series[i].name + "：" + series[i].pieData.realValue + '\n' +
            "占比：" + series[i].pieData.value + '%', value: endPosArr
        }]
      }
    );
    legendData.push(series[i].name);
  }
  series = series.concat(linesSeries)

  // 最底下圆盘
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 1,
      color: 'rgba(25, 93, 176, 0.1)',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -0 : -1.5;
      },
    },
  });
  return series;
}
