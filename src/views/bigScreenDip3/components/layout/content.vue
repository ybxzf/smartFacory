<template>
  <div class="content-container">
    <el-row :gutter="20" class="base-info">
      <el-col :span="4">
        <div class="com-part">
          <label>当前工单</label>
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
          <!-- <span>{{ baseInfo.no || '-' }}</span> -->
          <div class="item-value">
            <div class="item-value-progress">
              <transition name="expand" @before-enter="beforeEnter" @enter="enter">
                <div class="progress" v-if="completionRateWidth > 0" :style="{
                  width: `${completionRateWidth}%`,
                  backgroundColor: `rgb(${completionRateColor.r},${completionRateColor.g},${completionRateColor.b})`
                }"></div>
              </transition>
              <div class="value">{{ completionRateValue }}%</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="project-info">
      <el-col :span="Math.floor(24 / projectInfo.length)" v-for="item, index in projectInfo" :key="index">
        <div class="com-part">
          <label>{{ item.name }}</label>
          <span>{{ item.value || '0' }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="bad-info">
      <el-col :span="12">
        <BarChart :chartData="barData"></BarChart>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="8">
            <PieChart :chartData="pieData"></PieChart>
          </el-col>
          <el-col :span="8">
            <div class="person-info">
              <div class="person-info-item">
                <label>组长</label>
                <span>{{ personInfo.teamLeader || '-' }}</span>
              </div>
              <div class="person-info-item">
                <label>标准定员</label>
                <span>{{ personInfo.standardStaffCount || '-' }}</span>
              </div>
              <div class="person-info-item">
                <label>实际出勤</label>
                <span>{{ personInfo.actualAttendance || '-' }}</span>
              </div>
              <div class="person-info-item">
                <label>人均产能</label>
                <span>{{ personInfo.perCapitaCapacity || '-' }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="person-base-info">
              <img :src="imageUrl" alt="">
              <div class="info-container">
                <div class="item">
                  <label>姓名</label>
                  <span>{{ baseInfo.name || '-' }}</span>
                </div>
                <div class="item">
                  <label>工单</label>
                  <span>{{ baseInfo.workOrder || '-' }}</span>
                </div>
                <div class="item">
                  <label>工单数量</label>
                  <span>{{ baseInfo.workOrderQuantity || '-' }}</span>
                </div>
                <div class="item">
                  <label>已生产数量</label>
                  <span>{{ baseInfo.productNum || '-' }}</span>
                </div>
                <div class="item">
                  <label>合格数量</label>
                  <span>{{ baseInfo.qualifiedNum || '-' }}</span>
                </div>
                <div class="item">
                  <label>不合格数量</label>
                  <span>{{ baseInfo.noQualifiedNum || '-' }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="bottom-info">
      <el-col :span="12" class="table-c">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" height="100%"
          header-row-class-name="table-h-bg">
          <el-table-column prop="pcbNumber" label="PCB板号">
          </el-table-column>
          <el-table-column prop="defectProject" label="不良项目">
          </el-table-column>
          <el-table-column prop="correspondingWorkOrder" label="对应工单">
          </el-table-column>
          <el-table-column prop="productionTime" label="生产时间">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12" class="data-info-c">
        <el-row>
          <el-col :span="24">
            <div class="data-info">
              <el-row :gutter="20" class="item">
                <el-col :span="6" class="item-col">产能分析</el-col>
                <el-col :span="6" class="item-col">目标值</el-col>
                <el-col :span="6" class="item-col">实际值</el-col>
                <el-col :span="6" class="item-col">达成率</el-col>
              </el-row>
              <el-row :gutter="20" class="item">
                <el-col :span="6" class="item-col">每小时产能</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.targetValue || 0 }}</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.actualValue || 0 }}</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.hour.achievementRate || 0 }}</el-col>
              </el-row>
              <el-row :gutter="20" class="item">
                <el-col :span="6" class="item-col">当日产能</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.day.targetValue || 0 }}</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.day.actualValue || 0 }}</el-col>
                <el-col :span="6" class="item-col">{{ productivityAnalysis.day.achievementRate || 0 }}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-chart-c-row">
          <el-col :span="24" class="line-chart-c-col">
            <LineChart height="100%" :chart-data="lineData" v-if="lineData.xData.length"></LineChart>
            <Empty v-else></Empty>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Empty from '../../../bigScreen/components/Empty'
import LineChart from '../chart/LineChart';
import PieChart from '../chart/PieChart';
import BarChart from '../chart/BarChart';
import {
  getDip3BasicInfo,
  getImageUrl,
  getListData,
  getGroupInfo,
  getHourData,
  getBadData,
  getPieData,
  getCompareData
} from '@/api/bigScreen/dip3';
import { SUCCESS_CODE } from '@/utils/constants.js';
export default {
  components: {
    Empty,
    LineChart,
    PieChart,
    BarChart
  },
  name: 'DIPContent',
  data() {
    return {
      baseInfo: {},
      personInfo: {},
      tableData: [],
      completionRateWidth: 0, // 初始宽度为 0
      completionRateValue: 0, // 完成率初始值为 0
      intervalId: null,
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      barData: {
        xData: [],
        yData: []
      },
      lineData: {
        legendData: ['实际产能', '目标产能'],
        expectedData: [],
        actualData: [],
        xData: []
      },
      productivityAnalysis: {
        hour: {},
        day: {}
      },
      pieData: {
        legendData: [],
        yData: []
      },
      projectInfo: [],
      imageUrl: ''
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      this.getBasicInfo();
      this.getPersonUrl();
      this.getTableData();
      this.getGroupData();
      this.getHourlyData();
      this.getBadListData();
      this.getPieCharData();
      this.getCompareInfo();
    },
    getCompareInfo() {
      getCompareData().then(res => {
        if (res.code === SUCCESS_CODE) {
          const result = res.data.length ? res.data.filter(item => item) : [];
          if (result.length) {
            const hour = result.filter(item => item.type === '小时');
            const day = result.filter(item => item.type === '当日');
            this.productivityAnalysis.hour = hour[0] || {};
            this.productivityAnalysis.day = day[0] || {};
          }
        }
      })
    },
    getPieCharData() {
      getPieData().then(res => {
        if (res.code === SUCCESS_CODE) {
          const colorMap = ['rgba(18, 76, 154, 1)', 'rgba(15, 176, 255, 1)', 'rgba(0, 244, 188, 1)']
          this.pieData.legendData = res.data.map(item => item.name);
          this.pieData.yData = res.data.map((item, index) => {
            return {
              val: item.lossCount,
              name: item.name,
              itemStyle: {
                color: colorMap[index]
              }
            }
          });
        }
      })
    },
    getBadListData() {
      getBadData().then((res) => {
        if (res.code === SUCCESS_CODE) {
          const count = res.data.reduce((acc, curr) => {
            return acc + curr.defectCount;
          }, 0);
          const defectObj = {
            name: '不良总数',
            value: count
          };
          const defectScale = {
            name: '不良比例',
            value: ((count / this.baseInfo.workOrderQuantity) * 100).toFixed(2) + '%'
          }
          let result = res.data.map(item => ({ name: item.projectName, value: item.defectCount }));
          this.barData.xData = res.data.map(item => item.projectName);
          this.barData.yData = res.data.map(item => item.defectCount);
          result.push(defectObj);
          result.push(defectScale);
          this.projectInfo = result;
        }
      });
    },
    getHourlyData() {
      getHourData().then((res) => {
        if (res.code === SUCCESS_CODE) {
          this.lineData.xData = res.data.map(item => item.belongingTime.split(' ')[1]);
          this.lineData.actualData = res.data.map(item => item.actualValue);
          this.lineData.expectedData = res.data.map(item => item.targetValue);
        }
      });
    },
    getGroupData() {
      getGroupInfo().then(res => {
        if (res.code === SUCCESS_CODE) {
          this.personInfo = res.data[0] || {};
        }
      })
    },
    getTableData() {
      getListData().then((res) => {
        if (res.code === SUCCESS_CODE) {
          this.tableData = res.data;
        }
      });
    },
    getPersonUrl() {
      getImageUrl({
        name: 'dip03'
      }).then(res => {
        const blob = new Blob([res], { type: 'image/png' });
        this.imageUrl = window.URL.createObjectURL(blob);
      })
    },
    getBasicInfo() {
      getDip3BasicInfo().then(res => {
        if (res.code === SUCCESS_CODE) {
          this.baseInfo = res.data[0] || {};
          setInterval(() => {
            this.completionRateWidth = this.baseInfo.completionRate;
            this.getcompletionRate(this.completionRateWidth);
          }, 1000);
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? 'odd-row' : 'even-row';
    },
    getcompletionRate(targetValue = 0) {
      const duration = 1000;  // 动画时长 2 秒
      const stepValue = Math.round(targetValue / (duration / 20));  // 每次增加的值
      const colorValue = (255 / (duration / 20));  // 每次增加的值

      this.intervalId = setInterval(() => {
        if (this.completionRateValue < targetValue) {
          this.completionRateValue = Math.min(this.completionRateValue + stepValue, targetValue);  // 防止超出目标值
          this.completionRateColor.r -= colorValue;
          this.completionRateColor.g += colorValue;
        } else {
          clearInterval(this.intervalId);  // 停止定时器
        }
      }, 20);
    },
    beforeEnter(el) {
      el.style.width = '0%'; // 在进入之前先把宽度设为 0
    },
    // 进入过渡动画
    enter(el, done) {
      el.offsetHeight; // 触发重绘
      el.style.transition = 'width 1s ease-in-out'; // 动画生效
      el.style.width = `${this.completionRateWidth}%`; // 设置目标宽度
      done(); // 完成过渡
    }
  },
  beforeDestroy() {
    this.intervalId && clearInterval(this.intervalId);
  }
}
</script>

<style scoped lang="scss">
$minHeight: 300px;

.content-container {
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
        min-width: 100px;
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

  .project-info {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    ::deep(.el-row) {
      margin-left: 0;
      margin-right: 0;
    }

    .com-part {
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 14px;

      label,
      span {
        line-height: 36px;
        width: 100%;
        text-align: center;
        background-color: rgba(25, 129, 246, 0.2);
        border: 1px solid transparent;
      }
    }
  }

  .bad-info {
    min-height: $minHeight;
    margin-top: 16px;

    .person-info {
      display: flex;
      flex-direction: column;
      color: #fff;
      padding: 16px;
      align-items: center;

      .person-info-item {
        width: 100%;
        height: 36px;
        margin-top: 16px;
        line-height: 36px;
        background-color: rgba(25, 129, 246, 0.2);
        border: 1px solid transparent;

        label {
          min-width: 100px;
          text-align: center;
          margin-right: 4px;
          font-weight: 500;
          font-size: 14px;
          padding: 0 8px;
          border-right: 3px solid #3666e3;
        }

        span {
          padding-left: 8px;
        }
      }
    }

    .person-base-info {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 60px;
        height: 90px;
        object-fit: contain;
      }

      .info-container {
        width: 100%;

        .item {
          width: 100%;
          height: 27px;
          line-height: 27px;
          margin-top: 8px;
          background-color: rgba(25, 129, 246, 0.2);
          border: 1px solid transparent;

          label {
            min-width: 100px;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            padding: 0 8px;
            border-right: 3px solid #3666e3;
          }

          span {
            padding-left: 8px;
          }
        }
      }
    }
  }

  .bottom-info {
    height: calc(100% - 472px);
    margin-top: 16px;

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

    .data-info-c {
      height: 100%;

      .line-chart-c-row {
        height: calc(100% - 100px);

        .line-chart-c-col {
          height: 100%;
        }
      }
    }

    .data-info {
      color: #fff;
      background-color: rgba(25, 129, 246, 0.2);
      margin-bottom: 4px;

      .item-col {
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
  }


}
</style>
<style lang='scss'>
.content-container {
  height: calc(100% - 40px);

  ::-webkit-scrollbar {
    // display: none;
  }

  .bottom-info {
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

    // .el-table__body-wrapper::-webkit-scrollbar {
    // 	width: 0;
    // 	height: 6px;
    // }

    // .el-table__body-wrapper:hover::-webkit-scrollbar {
    // 	width: 6px;
    // 	height: 6px;
    // }

    // .el-table__body-wrapper::-webkit-scrollbar-track-piece {
    // 	background-color: transparent;
    // }

    .el-table--enable-row-hover .el-table__body tr:hover {
      td {
        background-color: #3c4f72 !important;
        color: #478ddb;
      }

    }
  }
}
</style>
