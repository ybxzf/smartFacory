<template>
  <div class="content-container">
    <el-row :gutter="20" class="base-info">
      <el-col style="width: calc((100% / 24) * 3.5); height: 100%">
        <div class="com-part">
          <label>当前工单</label>
          <span class="ellipsis-span" :title="basicData.work_order">{{
            basicData.work_order || "-"
          }}</span>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="com-part">
          <label>工单数量</label>
          <span>{{ basicData.work_order_quantity || "-" }}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="com-part">
          <label>客户</label>
          <span class="ellipsis-span" :title="basicData.customer">{{
            basicData.customer || "-"
          }}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="com-part">
          <label>产品名称</label>
          <span class="ellipsis-span" :title="basicData.product_name">{{
            basicData.product_name || "-"
          }}</span>
        </div>
      </el-col>
      <el-col style="width: calc((100% / 24) * 5.5)">
        <div class="com-part">
          <label>产品型号规格</label>
          <span class="ellipsis-span" :title="basicData.product_model">{{
            basicData.product_model || "-"
          }}</span>
        </div>
      </el-col>
      <el-col style="width: calc((100% / 24) * 3.5)">
        <div class="com-part">
          <label>完成率</label>
          <span class="ellipsis-span">{{ completionRateValue }}%</span>
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="com-part" style="margin-right: 20px">
          <label>完成率</label>
          <div class="item-value-progress" style="margin: 5px">
            <transition
              name="expand"
              @before-enter="beforeEnter"
              @enter="enter"
            >
              <div
                class="progress"
                v-if="completionRateWidth > 0"
                :style="{
                  width: `${completionRateWidth}%`,
                  backgroundColor: `rgb(${completionRateColor.r},${completionRateColor.g},${completionRateColor.b})`,
                }"
              ></div>
            </transition>
            <div class="value">{{ completionRateValue }}%</div>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <el-row style="height: calc(100% - 35px); padding: 1%">
      <el-col style="height: 100%; width: 65%">
        <el-row
          :gutter="20"
          style="
            height: 50%;
            <!-- border: 1px solid #637e9b; -->
            border-radius: 8px;
          "
        >
          <el-col :span="8" style="height: 100%">
            <div class="smt-title" style="margin: 20px 0">
              <div>当前工单AOI不良统计</div>
            </div>
            <BarChart
              :chartData="barData"
              v-if="barData.xData.length"
              style="height: calc(100% - 70px)"
              class="chart-content"
            ></BarChart>
            <div class="chart-content" v-else style="height: calc(100% - 70px)">
              <Empty></Empty></div
          ></el-col>
          <el-col :span="16" style="height: 100%" class="table-c">
            <div class="smt-title" style="margin: 20px 0">
              <div>当前工单不良统计明细</div>
            </div>
            <div style="height: calc(100% - 70px)" class="chart-content">
              <el-table
                v-if="tableData.length"
                :data="tableData"
                style="width: 100%"
                height="100%"
                ref="scrollTable"
                @mouseenter.native="handleEnter"
                @mouseleave.native="handleLevel"
                :row-class-name="tableRowClassName"
                header-row-class-name="table-h-bg"
              >
                <el-table-column prop="defect_number" label="不良位号">
                </el-table-column>
                <el-table-column prop="productname" label="物料编码">
                </el-table-column>
                <el-table-column prop="defect_reason" label="不良原因">
                </el-table-column>
                <el-table-column
                  prop="defect_qty"
                  label="不良数量"
                ></el-table-column>
                <el-table-column prop="defect_rate" label="不良比例">
                </el-table-column>
              </el-table>
              <div class="chart-content" v-else style="height: 100%">
                <Empty></Empty>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="
            height: 50%;
            <!-- border: 1px solid #637e9b; -->
            border-radius: 8px;
          "
        >
          <el-col :span="16" style="height: 100%" class="table-c">
            <div class="smt-title" style="margin: 20px 0">
              <div>AOI检测不良统计明细(近15天)</div>
            </div>
            <div style="height: calc(100% - 70px)" class="chart-content">
              <el-table
                v-if="tableData1.length"
                :data="tableData1"
                style="width: 100%; background: transparent"
                :row-class-name="tableRowClassName"
                height="100%"
                ref="scrollTable1"
                @mouseenter.native="handleEnter1"
                @mouseleave.native="handleLevel1"
                header-row-class-name="table-h-bg"
              >
                <el-table-column prop="defect_reason" label="不良原因">
                </el-table-column>
                <el-table-column prop="defect_qty" label="不良数量">
                </el-table-column>
                <el-table-column
                  width="150px"
                  prop="work_order"
                  label="对应工单"
                >
                </el-table-column>
                <el-table-column prop="defect_rate" label="不良比例">
                </el-table-column>
                <el-table-column width="150px" prop="date" label="生产时间">
                </el-table-column>
              </el-table>
              <div class="chart-content" v-else style="height: 100%">
                <Empty></Empty>
              </div></div
          ></el-col>
          <el-col :span="8" style="height: 100%"
            ><div style="height: 100%; width: 100%" ref="myChart">
              <div class="smt-title" style="margin: 20px 0">
                <div>近15天不良数量统计TOP5</div>
              </div>
              <BarChart
                :chartData="barData1"
                v-if="barData1.xData.length"
                class="chart-content"
                style="height: calc(100% - 70px)"
              ></BarChart>
              <div
                class="chart-content"
                v-else
                style="height: calc(100% - 70px)"
              >
                <Empty></Empty>
              </div></div
          ></el-col>
        </el-row>
      </el-col>
      <el-col
        style="
          height: 100%;
          width: 34%;
          margin-left: 1%;
          <!-- border: 1px solid #637e9b; -->
          border-radius: 8px;
        "
      >
        <el-row style="height: 30%">
          <div class="smt-title" style="margin: 20px 0">
            <div>当前工单贴片抛料统计Top5</div>
          </div>
          <div style="height: calc(100% - 70px)" class="data-info">
            <el-row class="item">
              <el-col :span="4" class="item-col">槽位</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 1 ? tableData3[0].holeNo : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 2 ? tableData3[1].holeNo : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 3 ? tableData3[2].holeNo : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 4 ? tableData3[3].holeNo : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 5 ? tableData3[4].holeNo : "-"
              }}</el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="item-col">起料数</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 1 ? tableData3[0].pickedNum : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 2 ? tableData3[1].pickedNum : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 3 ? tableData3[2].pickedNum : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 4 ? tableData3[3].pickedNum : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 5 ? tableData3[4].pickedNum : "-"
              }}</el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="4" class="item-col">抛料率</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 1 ? tableData3[0].throwing_rate : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 2 ? tableData3[1].throwing_rate : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 3 ? tableData3[2].throwing_rate : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 4 ? tableData3[3].throwing_rate : "-"
              }}</el-col>
              <el-col :span="4" class="item-col">{{
                tableData3.length > 5 ? tableData3[4].throwing_rate : "-"
              }}</el-col>
            </el-row>
            <el-row class="item" style="height: 34%">
              <el-col :span="4" class="item-col">预警灯</el-col>
              <el-col :span="4" class="item-col">
                <img
                  src="@/assets/images/bigScreen/red_lamp.png"
                  alt=""
                  style="width: 25px"
              /></el-col>
              <el-col :span="4" class="item-col">
                <img
                  src="@/assets/images/bigScreen/yellow_lamp.png"
                  alt=""
                  style="width: 25px"
              /></el-col>
              <el-col :span="4" class="item-col">
                <img
                  src="@/assets/images/bigScreen/green_lamp.png"
                  alt=""
                  style="width: 25px"
              /></el-col>
              <el-col :span="4" class="item-col">
                <img
                  src="@/assets/images/bigScreen/green_lamp.png"
                  alt=""
                  style="width: 25px"
              /></el-col>
              <el-col :span="4" class="item-col">
                <img
                  src="@/assets/images/bigScreen/green_lamp.png"
                  alt=""
                  style="width: 25px"
              /></el-col>
            </el-row>
          </div>
        </el-row>

        <el-row style="height: 69%; margin-top: 1%" class="table-c">
          <div class="smt-title" style="margin: 20px 0">
            <div>抛料信息</div>
          </div>
          <div style="height: calc(100% - 70px)" class="chart-content">
            <el-table
              :data="tableData3"
              v-if="tableData3.length"
              :style="{ textalign: 'center', width: '100%' }"
              :row-class-name="tableRowClassName"
              height="100%"
              ref="scrollTable2"
              @mouseenter.native="handleEnter2"
              @mouseleave.native="handleLevel2"
              header-row-class-name="table-h-bg"
            >
              <el-table-column prop="holeNo" label="槽位"> </el-table-column>
              <el-table-column prop="componentCode" label="物料信息">
              </el-table-column>
              <el-table-column prop="pickedNum" label="起料数量">
              </el-table-column>
              <el-table-column prop="placedNum" label="抛料数量">
              </el-table-column>
              <el-table-column prop="throwing_rate" label="抛料率">
              </el-table-column>
            </el-table>
            <div class="chart-content" v-else style="height: 100%">
              <Empty></Empty>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Empty from "@/views/bigScreen/components/Empty.vue";
import LineChart from "../chart/LineChart";
import PieChart from "../chart/PieChart";
import BarChart from "../chart/BarChart";
import moment from "moment";
import {
  GetSmt_basic_infoData,
  Getsmt03_patch_infoData,
  GetSmt03_mo_defect_projectData,
} from "@/api/bigScreenSmt2/index.js";
export default {
  components: { Empty, LineChart, PieChart, BarChart },
  name: "DIPContent",
  data() {
    return {
      bigScreenTimeId: null,
      basicData: {},
      baseInfo: {},
      personInfo: {},
      tableData: [],
      tableData1: [],
      tableData3: [],
      completionRateValue: 0, // 完成率初始值为 0
      completionRateWidth: 0, // 初始宽度为 0
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      barData: {
        title: "",
        xData: [],
        yData: [],
      },
      barData1: {
        title: "",
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
        legendData: ["物料异常", "设备异常", "软件异常"],
        yData: [
          { value: 1.5, name: "软件异常" },
          { value: 1, name: "物料异常" },
          { value: 0.5, name: "设备异常" },
        ],
      },
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
    setInterval(() => {
      this.completionRateWidth = this.basicData.completion_rate;
      this.getcompletionRate(this.completionRateWidth);
    }, 1000);
    if (!this.bigScreenTimeId) {
      this.initData();
    }
    this.bigScreenTimeId = setInterval(() => {
      this.initData();
    }, 60000 * 1);
    this.$nextTick(() => {
      if (this.tableData.length) {
        this.autoScroll();
      }
      if (this.tableData.length) {
      this.autoScroll1();}
      if (this.tableData3.length) {
      this.autoScroll2();}
    });
  },
  methods: {
    initData() {
      this.GetSmt_basic_infoData();
      this.GetSmt03_mo_defect_projectData1();
    },
    async GetSmt_basic_infoData() {
      let res = await GetSmt_basic_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.basicData = res.result[0];
        this.Getsmt03_patch_infoData();
        this.GetSmt03_mo_defect_projectData();
      } else {
        this.isQuery = false;
        this.isSuccess = false;
      }
    },

    async Getsmt03_patch_infoData() {
      let res = await Getsmt03_patch_infoData(this.basicData.work_order || 0);
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.tableData3 = res.result;
      } else {
        this.isQuery = false;
        // this.$message.error(res1.msg);
        this.isSuccess = false;
      }
    },

    async GetSmt03_mo_defect_projectData() {
      let res = await GetSmt03_mo_defect_projectData(this.basicData.work_order);
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.tableData = res.result;
        this.barData.xData = this.tableData.map((item) => item.defect_reason);
        this.barData.yData = this.tableData.map((item) => item.defect_qty);
      } else {
        this.isQuery = false;
        // this.$message.error(res1.msg);
        this.isSuccess = false;
      }
    },

    async GetSmt03_mo_defect_projectData1() {
      const now = new Date();
      now.setDate(now.getDate() - 15);
      let res = await GetSmt03_mo_defect_projectData(
        "",
        moment(now).format("YYYY-MM-DD")
      );
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.tableData1 = res.result;
        this.barData1.xData = this.tableData1.map((item) => item.defect_reason);
        this.barData1.yData = this.tableData1.map((item) => item.defect_qty);
      } else {
        this.isQuery = false;
        // this.$message.error(res1.msg);
        this.isSuccess = false;
      }
    },

    tableRowClassName({ row, rowIndex }) {
      return rowIndex % 2 === 0 ? "odd-row" : "even-row";
    },
    handleLevel() {
      this.autoScroll(false);
    },
    handleEnter() {
      this.autoScroll(true);
    },
    autoScroll(stop) {
      if (!this.tableData.length) return;
      const table = this.$refs.scrollTable;
      // 拿到表格中承载数据的div元素
      const divData = table.$refs.bodyWrapper;
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      if (stop) {
        //再通过事件监听，监听到 组件销毁 后，再执行关闭计时器。
        window.clearInterval(this.scrollTimer);
      } else {
        this.scrollTimer = window.setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 1;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0;
            // 重置table距离顶部距离。值=(滚动到底部时，距离顶部的大小) - 整个高度/2
            // divData.scrollTop = divData.scrollTop - divData.scrollHeight / 2
          }
        }, 150); // 滚动速度
      }
    },

    handleLevel1() {
      this.autoScroll1(false);
    },
    handleEnter1() {
      this.autoScroll1(true);
    },
    autoScroll1(stop) {
      if (!this.tableData1.length) return;
      const table = this.$refs.scrollTable1;
      // 拿到表格中承载数据的div元素
      const divData = table.$refs.bodyWrapper;
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      if (stop) {
        //再通过事件监听，监听到 组件销毁 后，再执行关闭计时器。
        window.clearInterval(this.scrollTimer);
      } else {
        this.scrollTimer = window.setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 1;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0;
            // 重置table距离顶部距离。值=(滚动到底部时，距离顶部的大小) - 整个高度/2
            // divData.scrollTop = divData.scrollTop - divData.scrollHeight / 2
          }
        }, 150); // 滚动速度
      }
    },

    handleLevel2() {
      this.autoScroll2(false);
    },
    handleEnter2() {
      this.autoScroll2(true);
    },
    autoScroll2(stop) {
       if (!this.tableData3.length) return;
      const table = this.$refs.scrollTable2;
      // 拿到表格中承载数据的div元素
      const divData = table.$refs.bodyWrapper;
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      if (stop) {
        //再通过事件监听，监听到 组件销毁 后，再执行关闭计时器。
        window.clearInterval(this.scrollTimer);
      } else {
        this.scrollTimer = window.setInterval(() => {
          // 元素自增距离顶部1像素
          divData.scrollTop += 1;
          // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            // 重置table距离顶部距离
            divData.scrollTop = 0;
            // 重置table距离顶部距离。值=(滚动到底部时，距离顶部的大小) - 整个高度/2
            // divData.scrollTop = divData.scrollTop - divData.scrollHeight / 2
          }
        }, 150); // 滚动速度
      }
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
  beforeDestroy() {
    this.autoScroll(true);
    this.autoScroll1(true);
    this.autoScroll2(true);
  },
};
</script>

<style scoped lang="scss">
$minHeight: 300px;

.content-container {
  height: 100%;
  width: 100%;

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
    height: 40px !important;
    .com-part {
      min-height: 40px;
      display: flex;
      line-height: 40px;
      color: #fff;
      font-size: 11px;
      // background-color: rgba(25, 129, 246, 0.2);
      // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
      // box-shadow: 0 0 3px 3px rgba(25, 129, 246, 0.7);
      border: 1px solid transparent;
      .ellipsis-span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        text-align: center;
      }
      label {
        min-width: 100px;
        text-align: center;
        margin-right: 4px;
        font-size: 15px;
        // border-right: 3px solid #3666e3;
      }
      .text-container {
        display: inline-block; /* 使容器宽度自适应内容 */
        max-width: 150px; /* 设置最大宽度 */
        overflow: hidden; /* 超出部分隐藏 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 超出部分用省略号表示 */
      }
      span {
        flex: 1;
        font-size: 12px;
        font-weight: 400;
        padding-left: 4px;
        background-color: rgba(25, 129, 246, 0.2);
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
  .chart-content {
    background-color: rgba(25, 129, 246, 0.2);
  }
  .smt-title {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    background-image: url("../../../../assets/images/bigScreen/title_bg.png");
    background-repeat: no-repeat;
    background-size: 300px 100%;
    background-position: 0 center;
    justify-content: space-between;
    padding-left: 20px;
    font-size: 15px;
    font-weight: 700;
  }
}
</style>
