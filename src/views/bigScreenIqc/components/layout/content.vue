<template>
  <div class="content-container">
    <el-row style="height: 100%">
      <el-col
        style="height: 100%; width: 65%; margin-left: 1%; margin-right: 1%"
      >
        <el-row
          :gutter="20"
          style="height: 50%; border: 1px solid #637e9b; border-radius: 8px"
        >
          <el-col :span="24" style="height: 100%" class="table-c">
            <IqcYield :list="tableData"></IqcYield>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="
            height: 50%;
            border: 1px solid #637e9b;
            border-radius: 8px;
            padding: 1%;
          "
        >
          <el-col :span="12" style="height: 100%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <BarChart :chartData="barData1"></BarChart></div
          ></el-col>
          <el-col :span="12" style="height: 100%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <BarChart :chartData="barData2"></BarChart></div
          ></el-col>
        </el-row>
      </el-col>
      <el-col style="height: 100%; width: 33%">
        <el-row
          style="
            height: 50%;
            border: 1px solid #637e9b;
            border-radius: 8px;
            padding: 1%;
          "
        >
          <el-col :span="24" style="height: 100%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <BarChart1 :chartData="barData3"></BarChart1></div
          ></el-col>
        </el-row>

        <el-row
          style="height: 50%; border: 1px solid #637e9b; border-radius: 8px"
          class="table-c"
        >
          <div
            style="margin-right: 1%; margin-top: 4%; width: 100%; height: 90%"
          >
            <PieChart :chart-data="pieData"></PieChart>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "../chart/LineChart";
import PieChart from "../chart/PieChart";
import BarChart from "../chart/BarChart";
import BarChart1 from "../chart/BarChart1";
import IqcYield from "../chart/IqcYield";
import moment from "moment";
import {
  GetSmt_basic_infoData,
  GetSmt03_mo_defect_projectData,
  GetSmt02_aoi_defect_statsData,
} from "@/api/bigScreenSmt2/index.js";
import {
  GetIqc_checkitemData,
  GetIqc_defect_infoData,
  GetIqc_pass_infoData,GetIqc_pass_sum_infoData
} from "@/api/bigScreenIqc/index.js";
export default {
  components: {
    LineChart,
    PieChart,
    BarChart,
    IqcYield,
    BarChart1,
  },
  name: "DIPContent",
  data() {
    return {
      bigScreenTimeId: null,
      baseInfo: {},
      personInfo: {},
      tableData: [],
      completionRateValue: 0, // 完成率初始值为 0
      completionRateWidth: 0, // 初始宽度为 0
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      barData3: {
        title: "每月来料检验合格率",
        xData: [],
        yData: [],
        yData1: [],
      },
      barData1: {
        title: "电子来料检验批合格率",
        xData: [],
        yData: [],
      },
      barData2: {
        title: "结构来料检验批合格率",
        xData: [],
        yData: [],
      },
      lineData: {
        legendData: ["实际产能", "目标产能"],
        expectedData: [
          120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150, 150,
          150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
        ],
        actualData: [
          60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150,
          80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130,
        ],
        xData: [
          "0时",
          "1时",
          "2时",
          "3时",
          "4时",
          "5时",
          "6时",
          "7时",
          "8时",
          "9时",
          "10时",
          "11时",
          "12时",
          "13时",
          "14时",
          "15时",
          "16时",
          "17时",
          "18时",
          "19时",
          "20时",
          "21时",
          "22时",
          "23时",
        ],
      },
      pieData: {
        title: "当月来料不良统计",
        showLabel: true, //是否显示标签
        yData: [0],
      },
      // pieData: {
      //   legendData: ["物料异常", "设备异常", "软件异常"],
      //   yData: [
      //     { value: 1.5, name: "软件异常" },
      //     { value: 1, name: "物料异常" },
      //     { value: 0.5, name: "设备异常" },
      //   ],
      // },
      projectInfo: [
        {
          name: "测试项目1",
          value: 100,
        },
        {
          name: "测试项目2",
          value: 100,
        },
        {
          name: "测试项目3",
          value: 100,
        },
        {
          name: "测试项目4",
          value: 100,
        },
        {
          name: "测试项目5",
          value: 100,
        },
        {
          name: "测试项目6",
          value: 100,
        },
        {
          name: "测试项目7",
          value: 100,
        },
        {
          name: "测试项目8",
          value: 100,
        },
        {
          name: "不良总数",
          value: 100,
        },
        {
          name: "不良比例",
          value: "100%",
        },
      ],
    };
  },
  mounted() {
    // setInterval(() => {
    //   this.completionRateWidth = this.basicData.completion_rate;
    //   this.getcompletionRate(this.completionRateWidth);
    // }, 1000);
    if (!this.bigScreenTimeId) {
      this.initData();
    }
    this.bigScreenTimeId = setInterval(() => {
      this.initData();
    }, 60000 * 1);
    // for (let index = 0; index < 100; index++) {
    //   const obj = {
    //     orderStatus: "xxx",
    //     bad: "xxx",
    //     order: "xxx",
    //     time: "xxxx",
    //   };
    //   this.tableData.push(obj);
    // }
  },
  methods: {
    initData() {
      this.GetIqc_checkitemData();
      this.GetIqc_defect_infoData();
      this.GetIqc_pass_infoData();
      this.GetIqc_pass_sum_infoData();
    },

    async GetIqc_checkitemData() {
      let res = await GetIqc_checkitemData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.tableData = res.result;
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },
    async GetIqc_defect_infoData() {
      let res = await GetIqc_defect_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.pieData.yData = res.result;
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },

    async GetIqc_pass_infoData() {
      let res = await GetIqc_pass_infoData("'电子料','结构件'");
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.barData1.xData = res.result.filter((r) => (r.producttype === "电子料")).map(y=>y.month);
        this.barData1.yData = res.result.filter((r) => (r.producttype === "电子料")).map(y=>y.pass_rate);
        this.barData2.xData = res.result.filter((r) => (r.producttype === "结构件")).map(y=>y.month);
        this.barData2.yData = res.result.filter((r) => (r.producttype === "结构件")).map(y=>y.pass_rate);
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },

    async GetIqc_pass_sum_infoData() {
      let res = await GetIqc_pass_sum_infoData("'电子料','结构件'");
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.barData3.xData = res.result.filter((r) => (r.producttype === "电子料")).map(y=>y.month);
        this.barData3.yData = res.result.filter((r) => (r.producttype === "电子料")).map(y=>y.pass_rate);
        this.barData3.yData1 = res.result.filter((r) => (r.producttype === "结构件")).map(y=>y.pass_rate);
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },

    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? "odd-row" : "even-row";
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
    }, // 在过渡进入前，给元素设置初始宽度
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
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
$minHeight: 300px;

.content-container {
  // height: 100%;
  width: 100%;
  height: calc(100% - 40px);

  .table-c {
    background: transparent;

    text-align: center;
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
          text-align: center;
        }
      }

      .table-h-bg {
        th {
          background: rgba(25, 129, 246, 0.5);
          color: #fff;
          text-align: center;
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
  .item-value-progress {
    width: 90%;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 5px;
    position: relative;

    .progress {
      height: 100%;
      // background-color: rgb(255, 0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      // animation: expandWidth 2s forwards;
    }

    .value {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .GreeenSpan {
    display: flex; /* 使用 flexbox */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 50px;
    height: 50px;
    border-radius: 50%; /* 圆形 */
    background-color: green;
    color: white; /* 可以设置文本颜色为白色以便于阅读 */
  }
  .data-info {
    color: #fff;
    // background-color: rgba(25, 129, 246, 0.5);
    // margin-bottom: 4px;

    border-right: 1px solid #0a4686;
    border-bottom: 1px solid #0a4686;
    height: 95%;
    .item {
      height: 22%;
    }
    .item-col {
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      height: 100%;
      text-align: center;
      border-left: 1px solid #0a4686;
      border-top: 1px solid #0a4686;
    }
  }
  .base-info {
    .com-part {
      min-height: 40px;
      display: flex;
      line-height: 40px;
      color: #fff;
      font-size: 11px;
      background-color: rgba(25, 129, 246, 0.2);
      box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
      // box-shadow: 0 0 3px 3px rgba(25, 129, 246, 0.7);
      border: 1px solid transparent;
      .ellipsis-span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      label {
        min-width: 100px;
        text-align: center;
        margin-right: 4px;
        border-right: 3px solid #3666e3;
      }
      .text-container {
        display: inline-block; /* 使容器宽度自适应内容 */
        max-width: 150px; /* 设置最大宽度 */
        overflow: hidden; /* 超出部分隐藏 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 超出部分用省略号表示 */
      }
    }
  }
  .table-title {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 100% !important;
  }
}
</style>
<style lang='scss'>
.content-container {
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
</style>
