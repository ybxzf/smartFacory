<template>
  <div class="hw05-content-container">
    <custom-header class="header-container">
      <template #title>
        海外组装生产线可视化看板
      </template>
    </custom-header>
    <div class="content-container">
      <div class="base-info">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="com-part">
              <label>当前工单(国内)</label>
              <el-tooltip effect="dark" v-if="baseInfo.workOrder && baseInfo.workOrder.length > 10"
                :content="baseInfo.workOrder" placement="top">
                <div class="item-value">
                  {{ baseInfo.workOrder.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.workOrder || '-' }}
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="com-part">
              <label>工单数量</label>
              <div class="item-value">{{ baseInfo.workOrderQuantity || '-' }}</div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="com-part">
              <label>客户</label>
              <el-tooltip effect="dark" v-if="baseInfo.customer && baseInfo.customer.length > 10"
                :content="baseInfo.customer" placement="top">
                <div class="item-value">
                  {{ baseInfo.customer.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.customer || '-' }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>产品名称</label>
              <el-tooltip effect="dark" v-if="baseInfo.productName && baseInfo.productName.length > 10"
                :content="baseInfo.productName" placement="top">
                <div class="item-value">
                  {{ baseInfo.productName.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.productName || '-' }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>产品型号规格</label>
              <el-tooltip effect="dark" v-if="baseInfo.productModel && baseInfo.productModel.length > 10"
                :content="baseInfo.productModel" placement="top">
                <div class="item-value">
                  {{ baseInfo.productModel.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.productModel || '-' }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>完成率</label>
              <span>{{ baseInfo.no || '-' }}</span>
            </div>

          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" type="flex" class="chart-container-info">
        <el-col :span="12">
          <LineChart class="chart-content" v-if="lineData.xData.length" height="100%" :chartData="lineData"></LineChart>
          <div class="chart-content" v-else style="height: 100%;">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="6">
          <BarChart class="chart-content" v-if="barData.xData.length" :chartData="barData" height="100%"></BarChart>
          <div class="chart-content" v-else style="height: 100%;">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="6">
          <pieChart3D class="chart-content" v-if="fctDefectStatsList.length" height="100%" :chartData="fctDefectStatsList">
          </pieChart3D>
          <div class="chart-content" v-else style="height: 100%;">
            <Empty></Empty>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom-info" :gutter="20">
        <el-col :span="6">
          <div class="data-info">
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">产能分析</el-col>
              <el-col :span="6" class="item-col">目标值</el-col>
              <el-col :span="6" class="item-col">实际值</el-col>
              <el-col :span="6" class="item-col">达成率</el-col>
            </el-row>
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">每小时产能</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.targetValue || 0 }}</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.actualValue || 0 }}</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.achievementRate || 0 }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">当日产能</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.day.targetValue || 0 }}</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.day.actualValue || 0 }}</el-col>
              <el-col :span="6" class="item-col">{{ productivityAnalysis.day.achievementRate || 0 }}</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <BarChart class="chart-content" v-if="barData1.xData.length" :chartData="barData1" height="100%"></BarChart>
          <div class="chart-content" v-else style="height: 100%;">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="8" class="table-c">
          <el-table v-if="tableData.length" :data="tableData" style="width: 100%; height: 100%;"
            :row-class-name="tableRowClassName" height="100%" header-row-class-name="table-h-bg">
            <el-table-column prop="pcbNumber" label="工单号">
            </el-table-column>
            <el-table-column prop="defectProject" label="生产">
            </el-table-column>
            <el-table-column prop="correspondingWorkOrder" label="目标产能">
            </el-table-column>
            <el-table-column prop="productionTime" label="实际产能">
            </el-table-column>
          </el-table>
          <div class="chart-content" v-else style="height: 100%;">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="person-base-info">
            <div class="info-img">
              <img :src="imageUrl" alt="">
            </div>
            <div class="info-container">
              <div class="item">
                <label>标准定员</label>
                <span>{{ baseInfo.name || '-' }}</span>
              </div>
              <div class="item">
                <label>实际出勤</label>
                <span>{{ baseInfo.workOrder || '-' }}</span>
              </div>
              <div class="item">
                <label>人均产能</label>
                <span>{{ baseInfo.workOrderQuantity || '-' }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Empty from '../bigScreen/components/Empty'
import LineChart from '@/components/chart/LineChart.vue';
import BarChart from './components/chart/BarChart.vue';
import CustomHeader from '@/components/layout/header.vue';
import pieChart3D from './components/chart/pieChart3D.vue';
import {
  getDip2FctDefectStatsList,
} from '@/api/bigScreen/dip2.js';
import {
  getImageUrl,
} from '@/api/bigScreen/dip3';
import { SUCCESS_CODE } from '@/utils/constants.js';
export default {
  components: {
    Empty,
    CustomHeader,
    LineChart,
    pieChart3D,
    BarChart
  },
  data() {
    return {
      imageUrl: '',
      baseInfo: {},
      fctDefectStatsList: [],
      lineData: {
        title: '每日产能',
        data: [
          {
            name: '每日产能',
            color: '#FF005A',
            // seriesData: [],
            seriesData: [120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
            // }, {
            // 	name: '目标产能',
            // 	color: '#3888fa',
            // 	seriesData: [60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          }
        ],
        // xData: [],
        xData: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
      },
      productivityAnalysis: {
        hour: {},
        day: {}
      },
      tableData: [
        {
          pcbNumber: 'PCB-20210101',
          defectProject: 1200,
          correspondingWorkOrder: 1000,
          productionTime: 1000
        }
      ],

      barData: {
        title: "不良数量",
        xData: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6', '项目7', '项目8'],
        yData: [3, 8, 1, 6, 9, 4, 1, 3]
      },
      barData1: {
        title: "损失时间",
        xData: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6', '项目7', '项目8'],
        yData: [3, 8, 1, 6, 9, 4, 1, 3]
      }
    }
  },
  mounted() {
    this.getFctDefectStatsList();
    this.getPersonUrl();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? 'odd-row' : 'even-row';
    },
    getPersonUrl() {
      getImageUrl({
        name: 'dip03'
      }).then(res => {
        const blob = new Blob([res], { type: 'image/png' });
        this.imageUrl = window.URL.createObjectURL(blob);
      })
    },
    getFctDefectStatsList() {
      getDip2FctDefectStatsList().then(res => {
        if (res.code == SUCCESS_CODE) {
          res.data.forEach(item => {
            this.fctDefectStatsList.push({
              name: item.projectName,
              value: item.defectCount,
              realValue: item.defectCount,
              itemStyle: { color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` } // 随机颜色
            });
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.hw05-content-container {
  width: 100%;
  height: calc(100vh - 84px);
  /* 设置背景图片 */
  background-image: url('../../assets/images/bigScreen/bigScreen_bg.png');
  /* 不重复背景图片 */
  background-repeat: no-repeat;
  /* 图片铺满容器 */
  background-size: 100% 120%;
  /* 背景居中显示 */
  background-position: center center;
  // background: #070f20;
  // background-color: #409eff;
  color: #ffffff;

  .header-container {
    margin: 0 10px;
  }

  .content-container {
    height: calc(100% - 40px);
    padding: 10px;
  }

  .base-info {

    .com-part {
      min-height: 40px;
      display: flex;
      line-height: 40px;
      color: #fff;
      font-size: 14px;
      background-color: rgba(25, 129, 246, 0.2);
      border: 1px solid transparent;

      label {
        min-width: max-content;
        padding: 0 8px;
        text-align: center;
        margin-right: 4px;
        border-right: 3px solid #3666e3;
      }

      .item-value {
        width: 100%;
        font-size: 12px;
        text-align: center;
      }

      span {
        flex: 1;
        padding-left: 4px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-value {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
      }

      .item-value-progress {
        width: 60%;
        height: 80%;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 5px;
        position: relative;

        .progress {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .value {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .chart-container-info {
    margin-top: 16px;
    min-height: 420px;


  }

  .chart-content {
    background-color: rgba(25, 129, 246, 0.2);
  }

  .bottom-info {
    margin-top: 16px;
    height: calc(100% - 500px);

    .data-info {
      color: #fff;
      margin-bottom: 4px;
      margin-left: 6px;
      .item {
        margin-bottom: 16px;
        .item-col {
          margin: 0 5px;
          background-color: rgba(25, 129, 246, 0.2);
          height: 50px;
          line-height: 50px;
          text-align: center;
        }
      }


    }

    .table-c {
      background: transparent;
      height: 100%;

      ::v-deep.el-table {
        background: transparent;

        &::before {
          height: 0px !important;
        }

        tr {
          background: transparent;
          color: #fff;

          th,
          td {
            border-bottom: none;
          }
        }

        .table-h-bg {
          th {
            background: rgba(25, 129, 246, 0.2);
            color: #fff;
          }
        }

        .odd-row {
          background: #0e2550;
        }

        .even-row {
          background: #032963;
        }
      }
    }

    .person-base-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(25, 129, 246, 0.2);

      .info-img{
        flex: 1;
        width: 100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 50%;
          height: 80%;
          object-fit: contain;
        }
      }

      .info-container {
        flex: 1;
        width: 100%;
        height: calc(100% - 90px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .item {
          width: 90%;
          display: flex;
          justify-content: space-between;

          label {
            display: inline-block;
            min-width: 100px;
            text-align: center;
            font-weight: 500;
            line-height: 40px;
            font-size: 14px;
            padding: 0 8px;
            background-color: rgba(25, 129, 246, 0.2);
            margin-right: 8px;
          }

          span {
            flex: 1;
            display: inline-block;
            line-height: 40px;
            background-color: rgba(25, 129, 246, 0.2);
            padding-left: 8px;
          }
        }
      }
    }

  }
}
</style>
<style lang="scss">
.hw05-content-container {
  .base-info {
    .el-row {
      &:first-child {
        margin-bottom: 16px;
      }
    }
  }

  .bottom-info {

    .el-col {
      height: 100%;
    }

    .el-table th.gutter {
      display: none;
      width: 0
    }

    .el-table colgroup col[name='gutter'] {
      display: none;
      width: 0;
    }

    .el-table__body {
      width: 100% !important;
    }

    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 0;
        height: 6px;
        border: none;
      }

      &::-webkit-scrollbar-track {
        border: none;
      }
    }

    .el-table--enable-row-hover .el-table__body tr:hover {
      td {
        background-color: #3c4f72 !important;
        color: #478ddb;
      }

    }
  }
}
</style>
