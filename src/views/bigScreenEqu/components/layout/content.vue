<template>
  <div class="content-container">
    <el-row style="height: 100%">
      <el-col style="height: 100%; width: 100%; padding: 1%">
        <el-row :gutter="20" style="height: 50%;">
          <el-tabs
            @tab-click="handleTabClick"
            type="border-card"
            style="height: 45px; background: transparent"
          >
            <el-tab-pane label="SMT二级看板"></el-tab-pane>
            <el-tab-pane label="SMT三级看板"></el-tab-pane>
            <el-tab-pane label="DIP二级看板"></el-tab-pane>
            <el-tab-pane label="DIP三级看板"></el-tab-pane>
          </el-tabs>
          <el-col
            v-for="(equ, index) in equData"
            :key="index"
            :span="3"
            style="height: calc(100% - 45px)"
          >
            <div
              style="
                height: 100%;
                border: 1px solid #637e9b;
                border-radius: 8px;
              "
            >
              <el-row>
                <img
                  style="
                    width: 80%;
                    margin-top: 10%;
                    margin-bottom: 4%;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                  "
                  src="@/assets/images/devices/device1.png"
                  alt="站点设备图片"
                />
              </el-row>
              <el-row style="height: 15%">
                <span class="TopSpan" style="width: 90%">{{
                  equ.equipmentname
                }}</span>
              </el-row>
              <el-row
                style="justify-content: center; display: flex; height: 15%"
              >
                <span
                  class="GreeenSpan"
                  :style="{
                    backgroundColor: getBackGroundColor(equ.equipmentstatus),
                  }"
                >
                  {{ equ.equipmentstatus }}
                </span>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="
            margin-top: 1%;
            height: 49%;
            border: 1px solid #637e9b;
            border-radius: 8px;
            padding: 1%;
          "
        >
          <el-col style="height: 100%;width:48%; padding: 1%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <BarChart :chartData="barData"></BarChart></div
          ></el-col>
          <el-col  style="width:48%;height: 100%; padding: 1%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <LineChart :chartData="lineData"></LineChart></div
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
import {
  GetEquipment_efficiencyData,
  GetEquipment_losttimeData,
  GetEquipment_statusData,
} from "@/api/bigScreenEqu/index.js";
export default {
  components: {
    LineChart,
    BarChart,
  },
  name: "DIPContent",
  data() {
    return {
      bigScreenTimeId: null,
      equData: [],
      selectEquName: "SMT二级看板",
      allEquData: [
        {
          workshop: "SMT二级看板",
          equipmentname: "equ1",
          equipmentstatus: "运行",
        },
        {
          workshop: "SMT二级看板",
          equipmentname: "equ2",
          equipmentstatus: "运行",
        },
        {
          workshop: "SMT二级看板",
          equipmentname: "equ3",
          equipmentstatus: "运行",
        },
        {
          workshop: "SMT二级看板",
          equipmentname: "equ4",
          equipmentstatus: "停线",
        },
        {
          workshop: "SMT二级看板",
          equipmentname: "equ5",
          equipmentstatus: "运行",
        },
        {
          workshop: "SMT二级看板",
          equipmentname: "equ6",
          equipmentstatus: "停线",
        },
        {
          workshop: "SMT三级看板",
          equipmentname: "equ7",
          equipmentstatus: "运行",
        },
        {
          workshop: "SMT三级看板",
          equipmentname: "equ8",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP二级看板",
          equipmentname: "equ9",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP二级看板",
          equipmentname: "equ10",
          equipmentstatus: "故障",
        },
        {
          workshop: "DIP二级看板",
          equipmentname: "equ11",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP二级看板",
          equipmentname: "equ12",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP二级看板",
          equipmentname: "equ13",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP三级看板",
          equipmentname: "equ14",
          equipmentstatus: "故障",
        },
        {
          workshop: "DIP三级看板",
          equipmentname: "equ15",
          equipmentstatus: "运行",
        },
        {
          workshop: "DIP三级看板",
          equipmentname: "equ16",
          equipmentstatus: "停线",
        },
      ],
      completionRateValue: 0, // 完成率初始值为 0
      completionRateWidth: 0, // 初始宽度为 0
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      barData: {
        title: "线体设备效率(%)",
        xData: [],
        yData: [],
      },
      lineData: {
        expectedData: [],
        xData: [],
      },
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
  },
  methods: {
    initData() {
      this.GetEquipment_efficiencyData();
      this.GetEquipment_losttimeData();
      this.GetEquipment_statusData();
    },
    getBackGroundColor(status) {
      const colorMap = {
        运行: "green",
        故障: "red",
        停线: "#f7901c",
      };
      return colorMap[status] || "transparent"; // 默认返回透明色
    },
    handleTabClick(tab) {
      this.selectEquName = tab.label;
      this.changeEqu(tab.label);
    },
    changeEqu(label) {
      this.equData = this.allEquData.filter((r) => r.workshop === label);
    },
    async GetEquipment_efficiencyData() {
      let res = await GetEquipment_efficiencyData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.barData.xData = res.result.map((x) => x.line_body);
        this.barData.yData = res.result.map((x) => x.equipmentefficiency);
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },
    async GetEquipment_losttimeData() {
      let res = await GetEquipment_losttimeData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.lineData.xData = res.result.map((x) => x.line_body);
        this.lineData.expectedData = res.result.map((x) => x.lost_time);
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },
    async GetEquipment_statusData() {
      let res = await GetEquipment_statusData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.equData = this.allEquData.filter(
          (r) => r.workshop === this.selectEquName
        );
        // this.equData = res.result.map((x) => x.line_body);
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
::v-deep.el-tabs--border-card {
  border: none;
}
::v-deep.el-tabs__content {
  border: none;
}
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
  .TopSpan {
    // width: 35%;
    height: 90%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    // border: 1px solid #0a4686;
    margin-left: 5px;
    margin-top: 3px;
  }
  .GreeenSpan {
    display: flex; /* 使用 flexbox */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 80px;
    height: 80px;
    border-radius: 50%; /* 圆形 */
    background-color: green;
    color: white; /* 可以设置文本颜色为白色以便于阅读 */
    alignitems: "center";
    justifycontent: "center";
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
