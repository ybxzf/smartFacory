<template>
  <div class="hw01-content-container">
    <!-- <custom-header class="header-container">
      <template #title> 海外组装生产线可视化看板 </template>
</custom-header> -->
    <div class="content-container">
      <div class="base-info">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="com-part">
              <label>当前工单(海外)</label>
              <!-- <el-tooltip effect="dark" v-if="baseInfo.currentWorkOrder && baseInfo.currentWorkOrder.length > 10"
                :content="baseInfo.currentWorkOrder" placement="top">
                <div class="item-value">
                  {{ baseInfo.currentWorkOrder.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip> -->
              <div class="item-value">
                {{ baseInfo.currentWorkOrder || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="com-part">
              <label>工单数量</label>
              <div class="item-value">
                {{ baseInfo.workOrderQuantity || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="com-part">
              <label>客户</label>
              <!-- <el-tooltip effect="dark" v-if="baseInfo.customer && baseInfo.customer.length > 10"
                :content="baseInfo.customer" placement="top">
                <div class="item-value">
                  {{ baseInfo.customer.slice(0, 10) + '...' || '-' }}
                </div>
              </el-tooltip> -->
              <div class="item-value">
                {{ baseInfo.customer || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>产品名称</label>
              <el-tooltip effect="dark" v-if="baseInfo.productName && baseInfo.productName.length > 20"
                :content="baseInfo.productName" placement="top">
                <div class="item-value">
                  {{ baseInfo.productName.slice(0, 20) + "..." || "-" }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.productName || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>产品型号规格</label>
              <el-tooltip effect="dark" v-if="
                baseInfo.productModel && baseInfo.productModel.length > 20
              " :content="baseInfo.productModel" placement="top">
                <div class="item-value">
                  {{ baseInfo.productModel.slice(0, 20) + "..." || "-" }}
                </div>
              </el-tooltip>
              <div class="item-value" v-else>
                {{ baseInfo.productModel || "-" }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="com-part">
              <label>完成率</label>
              <div class="item-value">
                <div class="item-value-progress">
                  <div class="value">{{ completionRateValue }}%</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" type="flex" class="chart-container-info">
        <el-col :span="10">
          <div class="chart-title">产能分析</div>
          <LineChart class="chart-content" v-if="lineData.xData.length" style="height: calc(100% - 50px)"
            :chartData="lineData"></LineChart>
          <div class="chart-content" v-else style="height: calc(100% - 50px)">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="chart-title">不良数量及占比</div>
          <BarChart class="chart-content" v-if="barData.xData.length" :chartData="barData"
            style="height: calc(100% - 50px);background-color: transparent;"></BarChart>
          <div class="chart-content" v-else style="height: calc(100% - 50px)">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="person-base-info">
            <div class="info-img">
              <img :src="imageUrl" alt="" />
            </div>
            <div class="info-container">
              <div class="item">
                <label>组长</label>
                <span>{{ groupInfo.teamLeader || "-" }}</span>
              </div>
              <div class="item">
                <label>标准定员</label>
                <span>{{ groupInfo.standardStaffCount || "-" }}</span>
              </div>
              <div class="item">
                <label>实际出勤</label>
                <span>{{ groupInfo.actualAttendance || "-" }}</span>
              </div>
              <div class="item">
                <label>人均产能</label>
                <span>{{ groupInfo.perCapitaCapacity || "-" }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom-info" :gutter="20">
        <el-col :span="10">
          <div class="data-info">
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">产能分析</el-col>
              <el-col :span="6" class="item-col">目标值</el-col>
              <el-col :span="6" class="item-col">实际值</el-col>
              <el-col :span="6" class="item-col">达成率</el-col>
            </el-row>
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">每小时产能</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.hour.targetValue || 0
              }}</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.hour.actualValue || 0
              }}</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.hour.achievementRate || 0
              }}</el-col>
            </el-row>
            <el-row :gutter="20" class="item" type="flex">
              <el-col :span="6" class="item-col">当日产能</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.day.targetValue || 0
              }}</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.day.actualValue || 0
              }}</el-col>
              <el-col :span="6" class="item-col">{{
                productivityAnalysis.day.achievementRate || 0
              }}</el-col>
            </el-row>
          </div>
          <div class="table-c">
            <div class="chart-title">产能统计</div>
            <el-table v-if="tableData.length" :data="tableData" style="height: calc(100%);"
              :row-class-name="tableRowClassName" height="100%" header-row-class-name="table-h-bg">
              <el-table-column prop="workOrderNumber" label="工单号">
              </el-table-column>
              <el-table-column prop="productionType" label="生产表型">
              </el-table-column>
              <el-table-column prop="targetCapacity" label="目标产能">
              </el-table-column>
              <el-table-column prop="actualCapacity" label="实际产能">
              </el-table-column>
            </el-table>
            <div class="chart-content" v-else style="height: calc(100%);">
              <Empty></Empty>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <pieChart3D class="chart-content" v-if="fctDefectStatsList.length" style="height: calc(100%);"
            :chartData="fctDefectStatsList" :title="'不良占比'">
          </pieChart3D>
          <div class="chart-content" v-else style="height: calc(100%)">
            <Empty></Empty>
          </div>
        </el-col>
        <el-col :span="6">
          <BarChart class="chart-content" v-if="barData1.xData.length" :chartData="barData1" height="100%"></BarChart>
          <div class="chart-content" v-else style="height: 100%">
            <Empty></Empty>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Empty from "../bigScreen/components/Empty";
import LineChart from "@/components/chart/LineChart.vue";
import BarChart from "./components/chart/BarChart.vue";
import CustomHeader from "@/components/layout/header.vue";
import pieChart3D from "./components/chart/pieChart3D.vue";
import { colors } from '@/components/chart/pieChartColor.js';
import {
  getInfoData,
  getTableData,
  getGroupInfo,
  getImageUrl,
  getProjectInfoList,
  getLossTime,
  getCapacityList,
  getHourList
} from "@/api/bigScreen/hw";
import { SUCCESS_CODE } from "@/utils/constants.js";
export default {
  components: {
    Empty,
    CustomHeader,
    LineChart,
    pieChart3D,
    BarChart,
  },
  data() {
    return {
      completionRateValue: 0, // 完成率初始值为 0
      completionRateWidth: 0, // 初始宽度为 0
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      imageUrl: "",
      baseInfo: {},
      fctDefectStatsList: [],
      lineData: {
        title: "小时产能",
        data: [
          {
            name: "小时产能",
            color: "#FF005A",
            seriesData: [],
            // seriesData: [
            //   120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150,
            //   150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
            // ],
            // }, {
            // 	name: '目标产能',
            // 	color: '#3888fa',
            // 	seriesData: [60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          },
        ],
        xData: [],
        // xData: [
        //   "0时",
        //   "1时",
        //   "2时",
        //   "3时",
        //   "4时",
        //   "5时",
        //   "6时",
        //   "7时",
        //   "8时",
        //   "9时",
        //   "10时",
        //   "11时",
        //   "12时",
        //   "13时",
        //   "14时",
        //   "15时",
        //   "16时",
        //   "17时",
        //   "18时",
        //   "19时",
        //   "20时",
        //   "21时",
        //   "22时",
        //   "23时",
        // ],
      },
      productivityAnalysis: {
        hour: {},
        day: {},
      },
      tableData: [],

      barData: {
        title: "不良数量",
        xData: [],
        yData: [],
      },
      barData1: {
        title: "损失时间",
        xData: [],
        yData: [],
      },
      groupInfo: {},
      requestParams: {
        processType: "组装",
        workshop: "海外",
      },
    };
  },
  mounted() {
    this.getInfoList();
    this.getTableList();
    this.getGroupInfoList();
    this.getProjectList();
    this.getLossTimeList();
    this.getCapacityData();
    this.getHourData();
  },
  methods: {
    getHourData() {
      getHourList(this.requestParams).then((res) => {
        if (res.code === SUCCESS_CODE) {
          const data = res.data;
          this.lineData.xData = data.map((item) => item.belongingTime.split(' ')[1]);
          this.lineData.data[0].seriesData = data.map((item) => item.actualValue);
        }
      });
    },
    getCapacityData() {
      getCapacityList(this.requestParams).then((res) => {
        if (res.code === SUCCESS_CODE) {
          const result = res.data.length ? res.data.filter(item => item) : [];
          if (result.length) {
            const hour = result.filter(item => item.type === '小时');
            const day = result.filter(item => item.type === '当日');
            this.productivityAnalysis.hour = hour[0] || {};
            this.productivityAnalysis.day = day[0] || {};
          }
        }
      });
    },
    getLossTimeList() {
      getLossTime(this.requestParams).then((res) => {
        if (res.code === SUCCESS_CODE) {
          const data = res.data;
          this.barData1.xData = data.map((item) => item.name);
          this.barData1.yData = data.map((item) => item.lossCount);
        }
      });
    },
    getProjectList() {
      getProjectInfoList(this.requestParams).then((res) => {
        if (res.code === SUCCESS_CODE) {
          const data = res.data;
          this.barData.xData = data.map((item) => item.projectName);
          this.barData.yData = data.map((item) => item.defectCount);
          this.fctDefectStatsList = data.map((item, i) => ({
            name: item.projectName,
            value: item.defectRatio,
            realValue: item.defectRatio,
            itemStyle: { color: colors[i] },
            // itemStyle: {
            //   color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255
            //     })`,
            // }, // 随机颜色
          }));
        }
      });
    },
    getGroupInfoList() {
      getGroupInfo(this.requestParams).then((res) => {
        if (res.code === SUCCESS_CODE) {
          this.groupInfo = res.data.length ? res.data[0] : {};
          Object.keys(this.groupInfo) && this.getPersonUrl(this.groupInfo.teamLeader);
        }
      });
    },
    getTableList() {
      getTableData(this.requestParams).then((res) => {
        if (res.code == SUCCESS_CODE) {
          this.tableData = res.data;
        }
      });
    },
    beforeEnter(el) {
      el.style.width = "0%"; // 在进入之前先把宽度设为 0
    },
    // 进入过渡动画
    enter(el, done) {
      el.offsetHeight; // 触发重绘
      el.style.transition = "width 1s ease-in-out"; // 动画生效
      el.style.width = `${this.completionRateWidth}%`; // 设置目标宽度
      done(); // 完成过渡
    },
    getcompletionRate(targetValue = 0) {
      const duration = 1000; // 动画时长 2 秒
      const stepValue = Math.round(targetValue / (duration / 20)); // 每次增加的值
      const colorValue = 255 / (duration / 20); // 每次增加的值

      this.intervalId = setInterval(() => {
        if (this.completionRateValue < targetValue) {
          this.completionRateValue = Math.min(
            this.completionRateValue + stepValue,
            targetValue
          ); // 防止超出目标值
          this.completionRateColor.r -= colorValue;
          this.completionRateColor.g += colorValue;
        } else {
          clearInterval(this.intervalId); // 停止定时器
        }
      }, 20);
    },
    getInfoList() {
      getInfoData(this.requestParams).then((res) => {
        if (res.code == SUCCESS_CODE) {
          this.baseInfo = res.data.length ? res.data[0] : {};
          setInterval(() => {
            this.completionRateWidth = this.baseInfo.completionRate;
            this.getcompletionRate(this.completionRateWidth);
          }, 1000);
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? "odd-row" : "even-row";
    },
    getPersonUrl(name) {
      getImageUrl({
        groupLeader: name,
      }).then((res) => {
        const blob = new Blob([res], { type: "image/png" });
        this.imageUrl = window.URL.createObjectURL(blob);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hw01-content-container {
  width: 100%;
  height: calc(100vh - 84px);
  /* 设置背景图片 */
  background-image: url("../../assets/images/bigScreen/kb_bg.png");
  /* 不重复背景图片 */
  background-repeat: no-repeat;
  /* 图片铺满容器 */
  background-size: 100% 100%;
  /* 背景居中显示 */
  background-position: center center;
  // background: #070f20;
  // background-color: #409eff;
  color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;

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
      font-size: 15px;
      //background-color: rgba(25, 129, 246, 0.2);
      border: 1px solid transparent;

      label {
        min-width: max-content;
        padding: 0 8px;
        text-align: center;
        margin-right: 4px;
        // border-right: 3px solid #3666e3;
      }

      .item-value {
        width: 100%;
        font-size: 12px;
        text-align: center;
        display: flex;
        justify-content: center;
        background-color: rgba(25, 129, 246, 0.2);
        font-weight: 400;
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
        white-space: nowrap;
        overflow: hidden;
      }

      .item-value-progress {
        width: 60%;
        height: 80%;
        // border: 1px solid rgb(255, 255, 255);
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
    min-height: 320px;

    .person-base-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // background-color: rgba(25, 129, 246, 0.2);

      .info-img {
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          // width: auto;
          height: 140px;
          object-fit: contain;
        }
      }

      .info-container {
        flex: 1;
        height: 100%;
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
          margin-bottom: 8px;

          label {
            display: inline-block;
            min-width: 100px;
            text-align: end;
            font-weight: 500;
            line-height: 30px;
            font-size: 14px;
            padding: 0 8px;
            // background-color: rgba(25, 129, 246, 0.2);
            margin-right: 8px;
          }

          span {
            flex: 1;
            display: inline-block;
            line-height: 30px;
            background-color: rgba(25, 129, 246, 0.2);
            text-align: center;
            padding-left: 8px;
          }
        }
      }
    }
  }

  .chart-title {
    height: 30px;
    background-image: url('../../assets/images/bigScreen/title_bg.png');
    background-repeat: no-repeat;
    background-size: 300px 100%;
    background-position: 0 center;
    padding-left: 20px;
    font-size: 15px;
    line-height: 30px;
    margin: 10px 0;
  }

  .chart-content {
    background-color: rgba(25, 129, 246, 0.2);
  }

  .bottom-info {
    margin-top: 16px;
    height: calc(100% - 400px);

    .data-info {
      color: #fff;
      margin-bottom: 4px;
      margin: 0 8px;

      .item {
        margin-bottom: 5px;

        .item-col {
          margin: 0 2px;
          // border: 1px solid #fff;
          background-color: rgba(25, 129, 246, 0.2);
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
        }
      }
    }

    .table-c {
      background: transparent;
      height: calc(100% - 150px);

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
  }
}
</style>
<style lang="scss">
.hw01-content-container {
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
      width: 0;
    }

    .el-table colgroup col[name="gutter"] {
      display: none;
      width: 0;
    }

    .el-table__body {
      width: 100% !important;
    }

    .el-table__body-wrapper {
      background: rgba(25, 129, 246, 0.2);

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
      td {background-color: #3c4f72 !important;
        color: #478ddb;
      }
    }
  }
}
</style>
