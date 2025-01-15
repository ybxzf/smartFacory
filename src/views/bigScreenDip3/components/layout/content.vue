<template>
  <div class="content-container">
    <el-row class="base-info row1">
      <el-col :span="4" class="base-info-col col1">
        <div class="base-item">
          <div class="item-key">当前工单</div>
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
      <el-col :span="4" class="base-info-col">
        <div class="base-item">
          <div class="item-key">工单数量</div>
          <div class="item-value">{{ baseInfo.workOrderQuantity || '-' }}</div>
        </div>
      </el-col>
      <el-col :span="4" class="base-info-col">
        <div class="base-item">
          <div class="item-key">客户</div>
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
      <el-col :span="4" class="base-info-col">
        <div class="base-item">
          <div class="item-key">产品名称</div>
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
      <el-col :span="4" class="base-info-col">
        <div class="base-item">
          <div class="item-key">产品型号规格</div>
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
      <el-col :span="4" class="base-info-col col6">
        <div class="base-item">
          <div class="item-key">完成率</div>
          <div class="item-value">
            <div class="item-value-progress">
              <!-- <transition name="expand" @before-enter="beforeEnter" @enter="enter">
								<div class="progress" v-if="completionRateWidth > 0" :style="{
									width: `${completionRateWidth}%`,
									backgroundColor: `rgb(${completionRateColor.r},${completionRateColor.g},${completionRateColor.b})`
								}"></div>
							</transition> -->
              <div class="value">{{ completionRateValue }}%</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="main-base-info" type="flex">
      <el-col :span="12">
        <el-row class="base-info row2">
          <el-col :span="24" class="base-info-col col1">
            <div class="base-item" v-for="(item, index) in projectInfo" :key="index">
              <!-- <el-image style="width: 40px; height: 40px;position: absolute;bottom: 32px;"
                :style="{ left: index === projectInfo.length - 1 ? '-24px' : '-5px' }"
                :src="`/assets/dip/dip2_${(index % 5) + 1}.png`" fit="fit"></el-image> -->
              <div class="item-key" :style="{ width: index === projectInfo.length - 1 ? 'calc(100% - 20px)' : '100%' }">
                <el-image style="width: 19px; height: 19px;margin-right: 5px;"
                  :src="`/assets/icons/icon_${index + 1}.svg`" fit="fit"></el-image>
                {{ item.name }}
              </div>
              <div class="item-value"
                :style="{ width: index === projectInfo.length - 1 ? 'calc(100% - 20px)' : '100%' }">
                {{
                  item.value }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row class="base-info row3">
          <el-col :span="24" class="base-info-col col1">
            <div class="chart-title">不良数量及占比</div>
            <div class="base-item" style="height: calc(100% - 57px);">
              <BarChart :chartData="barData" class="chart-content"></BarChart>
            </div>
          </el-col>
        </el-row>
        <el-row class="base-info row4" type="flex">
          <el-col :span="24" class="table-c">
            <div class="chart-title">产能统计</div>
            <div class="table-list chart-content" style="height: calc(100% - 50px);">
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
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20" class="base-info row5">
          <el-col :span="16">
            <el-row :gutter="20" type="flex">
              <el-col :span="16">
                <BarChart :chartData="barData1" class="chart-content"></BarChart>
              </el-col>
              <el-col :span="8" class="person-info chart-content">
                <el-image style="width: 100px; height: 100px" :src="imageUrl" fit="fit"></el-image>
                <div class="title-item">
                  <label>组长</label>
                  <span>{{ personInfo.teamLeader || "-" }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="info-container">
              <div class="item">
                <label>标准定员</label>
                <span>{{ personInfo.standardStaffCount || "-" }}</span>
              </div>
              <div class="item">
                <label>实际出勤</label>
                <span>{{ personInfo.actualAttendance || "-" }}</span>
              </div>
              <div class="item">
                <label>人均产能</label>
                <span>{{ personInfo.perCapitaCapacity || "-" }}</span>
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
          </el-col>
        </el-row>
        <el-row :gutter="20" class="base-info row6" type="flex">
          <el-col :span="24">
            <div class="chart-title">产能分析</div>
            <div style="height:calc(100% - 50px)" class="chart-content" v-if="lineData.xData.length">
              <LineChart :chart-data="lineData" height="100%"></LineChart>
            </div>
            <div class="chart-content" v-else style="height: calc(100% - 50px)">
              <Empty></Empty>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="base-info row7">
          <el-col :span="24">
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
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20" class="project-info">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="Math.floor(24 / projectInfo.length)" v-for="item, index in projectInfo" :key="index">
            <div class="com-part">
              <label>{{ item.name }}</label>
              <span>{{ item.value || '0' }}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>

    </el-row> -->
    <!-- <el-row :gutter="20" class="bad-info">
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
    </el-row> -->
    <!-- <el-row :gutter="20" class="bottom-info">
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
    </el-row> -->
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
        title: "不良数量",
        xData: [],
        yData: []
      },
      barData1: {
        title: "损失时间",
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
          // const colorMap = ['rgba(18, 76, 154, 1)', 'rgba(15, 176, 255, 1)', 'rgba(0, 244, 188, 1)']
          this.barData1.xData = res.data.map(item => item.name);
          this.barData1.yData = res.data.map(item => item.lossCount);
          // this.barData1.yData = res.data.map((item, index) => {
          //   return {
          //     val: item.lossCount,
          //     name: item.name,
          //     itemStyle: {
          //       color: colorMap[index]
          //     }
          //   }
          // });
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

* {
  border-radius: 1px;
}

.chart-title {
  height: 30px;
  background-image: url('../../../../assets/images/bigScreen/title_bg.png');
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



.content-container {
  font-size: 14px;
  font-weight: 700;

  .main-base-info {
    height: calc(100% - 66px);
  }

  .base-info {
    padding: 0 10px;
    // margin: 5px 0;

    &.row1 {
      margin-bottom: 16px;

      .base-info-col {
        height: 50px;
        padding: 5px 10px;

        .base-item {
          width: 100%;
          height: 100%;
          display: flex;

          .item-key {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 35%;
            margin-right: 5%;
            font-size: 15px;
          }

          .item-value {
            background-color: rgba(25, 129, 246, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60%;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            font-weight: 400;
          }
        }
      }

      .col1 {
        padding: 5px 10px 5px 0;
      }

      .col6 {
        padding: 5px 0 5px 10px;

        .item-value-progress {
          width: 60%;
          height: 80%;
          // border: 1px solid rgb(255, 255, 255);
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

        // @keyframes expandWidth {
        // 	0% {
        // 		width: 0%;
        // 	}

        // 	100% {
        // 		width: 100%;
        // 	}
        // }
      }
    }

    &.row2 {
      .base-info-col {
        // height: 300px;
      }

      .col1 {
        padding: 5px 0;
        display: flex;

        .base-item {
          // margin: 0 20px 0 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;

          .item-image {
            height: 174px;
            width: 100%;
            width: calc(100% - 20px);
            background-color: rgba(25, 129, 246, 0.2);
            // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
            border: 1px solid rgba(25, 129, 246, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;

            img {
              width: 100%;
              height: 100%;
            }

            .el-image {
              width: 100%;
              height: 100%;
            }
          }

          .item-key,
          .item-value {
            // margin-top: 20px;
            width: 100%;
            // background-color: rgba(25, 129, 246, 0.2);
            // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
            // border: 1px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .item-key {
            height: 38px;
            border-top: 1px solid rgba(255, 255, 255);
          }

          .item-value {
            height: 58px;
            font-size: 24px;
            border-bottom: 1px solid rgba(255, 255, 255);
          }
        }
      }

      .col2 {
        .base-item {

          width: 100%;
          height: 100%;
          overflow: hidden;
          overflow-y: scroll;
          position: relative;

          &::-webkit-scrollbar {
            /* 隐藏垂直滚动条 */
            width: 0px;
          }

          .item-table {
            width: 100%;
            height: 100%;
            /* 设置单元格之间的间隔为 10px */
            // border-spacing: 10px;
            /* 使用 separate 模式来启用单元格之间的间隔 */
            // border-collapse: separate;
            border-spacing: 0;
            /* 移除单元格之间的空隙 */
            border-collapse: collapse;
            /* 合并表格边框 */
            font-size: 15px;

            th {
              padding: 10px 0;
              width: 33.33%;
            }

            th,
            td {
              border: 1px solid rgba(255, 255, 255, 0.8);
              background-color: rgba(25, 129, 246, 0.2);
              // box-shadow: 0 0 3px 3px rgba(25, 129, 246, 0.5);
              // border: 1px solid transparent;
              text-align: center;
              vertical-align: middle;
              height: 35px;
            }

            .table-body {

              tr> :not(:first-child) {
                font-size: 12px;
                font-weight: 400;
              }
            }

          }

        }
      }
    }

    &.row3 {

      .col2 {
        padding: 5px 0 5px 10px;

        .base-item {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          font-size: 15px;

          .item-left,
          .item-right {
            height: 30px;
            // background-color: rgba(25, 129, 246, 0.2);
            // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
            // border: 1px solid transparent;
            display: flex;
            align-items: center;
          }

          .item-left {
            flex: 3;
            margin-right: 10px;
            justify-content: center;
          }

          .item-right {
            flex: 2;
            width: 100%;
            // margin-left: 10px;
            background-image: url('../../../../assets/images/bigScreen/title_bg.png');
            background-repeat: no-repeat;
            background-size: 300px 100%;
            background-position: 0 center;
            justify-content: space-between;
            padding: 0 20px;
          }

          .item-chart {
            width: 100%;
            margin-top: 20px;
            height: calc(100% - 56px);
            background-color: rgba(25, 129, 246, 0.2);
            // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);
            // border: 1px solid transparent;
          }
        }
      }
    }

    &.row4 {
      height: calc(100% - 461px);

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
    }

    &.row5 {
      .person-info {
        display: flex;
        height: auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .title-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        label {
          display: inline-block;
          // min-width: 100px;
          text-align: end;
          font-weight: 500;
          line-height: 30px;
          font-size: 14px;
          padding: 0 8px;
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

      .info-container {
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

    &.row6 {
      height: calc(100% - 433px);
    }

    &.row7 {
      margin-top: 24px;

      .data-info {
        color: #fff;
        margin-bottom: 4px;
        margin: 0 8px;

        .item {
          margin-bottom: 5px;

          .item-col {
            margin: 0 2px;
            background-color: rgba(25, 129, 246, 0.2);
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
          }
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

  .table-c {
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
      td {
        background-color: #3c4f72 !important;
        color: #478ddb;
      }

    }
  }
}
</style>
