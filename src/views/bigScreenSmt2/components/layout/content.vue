<template>
  <div class="content-container" style="height: 100%; width: 100%">
    <el-row :gutter="20" class="base-info">
      <el-col style="width: calc((100% / 24) * 3.5)">
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
          <span class="ellipsis-span" :title="basicData.work_order_quantity">{{
            basicData.work_order_quantity || "-"
          }}</span>
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
    <div
      style="
        display: flex;
        margin-top: 1%;
        margin-left: 1%;
        margin-right: 1%;
        height: 91%;
      "
    >
      <div style="width: 73%">
        <div
          style="
            display: flex;
            height: 45%;
            /* border: 1px solid #0a4686; */
            border-radius: 8px;
            padding: 1%;
          "
          class="chart-content"
        >
          <div style="display: flex; width: 33.33%">
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 15px;
                font-weight: 700;
                width: 25%;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >当前站点</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >过站数</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >完成率</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >计划产能</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >产能达成率</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 12px;
                font-weight: 400;
                width: 33.34%;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >SPI</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.spiData.corresponding_value || "-" }}</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.spiData.completion_rate || "-" }}%</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.spiData.plancapacity || "-" }}pcs/h</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.spiData.achievement_rate || "-" }}%</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                width: 33.33%;
                height:100%;
                align-items: center;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <!-- <span
                class="TopSpan"
                style="width: 90%; height: 20%; text-align: center"
                >站点设备图片</span
              > -->
              <img
                style="
                  width: 80%;
                  margin-top: 2%;
                  margin-bottom: 4%;
                  height:calc( 47% - 25px)
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                "
                src="@/assets/images/devices/device1.png"
                alt="站点设备图片"
              />
              <div style="width: 90%; height: 52%">
                <PieChart1 :chart-data="pieData1"></PieChart1>
              </div>
              <div
                style="
                  display: flex;
                  align-items: end;
                  justify-content: center;
                  width: 25px;
                  height: 25px;
                "
              >
                <img
                  :src="
                    processData.spiData.achievement_rate > 80
                      ? '正常'
                      : '异常' | getLineStatus
                  "
                  alt=""
                  style="width: 25px"
                />
              </div>
              <!-- <span
                class="GreeenSpan"
                :style="{
                  marginTop: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    processData.spiData.achievement_rate > 80 ? 'green' : 'red',
                }"
              >
                {{
                  processData.spiData.achievement_rate > 80 ? "正常" : "异常"
                }}
              </span> -->
            </div>
          </div>

          <div style="display: flex; width: 33.34%">
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 15px;
                font-weight: 700;
                width: 25%;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >当前站点</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >过站数</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >完成率</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >计划产能</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >产能达成率</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 12px;
                font-weight: 400;
                width: 33.34%;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >回流焊</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.hlhData.corresponding_value || "-" }}</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.hlhData.completion_rate || "-" }}%</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.hlhData.plancapacity || "-" }} pcs/h</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.hlhData.achievement_rate || "-" }}%</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                width: 33.33%;
                height:100%;
                align-items: center;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <!-- 添加 align-items: center -->
              <!-- <span
                class="TopSpan"
                style="width: 90%; height: 20%; text-align: center"
                >站点设备图片</span
              > -->

              <img
                style="
                  width: 80%;
                  height:calc( 47% - 25px)
                  margin-top: 2%;
                  margin-bottom: 4%;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                "
                src="@/assets/images/devices/device1.png"
                alt="站点设备图片"
              />
              <div  style="width: 90%; height: 53%">
                <PieChart1 :chart-data="pieData2" ></PieChart1>
              </div>
              <div
                style="
                  display: flex;
                  align-items: end;
                  justify-content: center;
                  width: 25px;
                  height: 25px;
                "
              >
                <img
                  :src="
                    processData.spiData.achievement_rate > 80
                      ? '正常'
                      : '异常' | getLineStatus
                  "
                  alt=""
                  style="width: 25px"
                />
              </div>
              <!-- <span
                class="GreeenSpan"
                :style="{
                  marginTop: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    processData.spiData.achievement_rate > 80 ? 'green' : 'red',
                }"
              >
                {{
                  processData.spiData.achievement_rate > 80 ? "正常" : "异常"
                }}
                /* border-right: 1px solid #0a4686; */
              </span> -->
            </div>
          </div>
          <div style="display: flex; width: 33.33%">
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 15px;
                font-weight: 700;
                width: 25%;
              "
            >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >当前站点</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >过站数</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >完成率</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >计划产能</span
              >
              <span
                class="TopSpan"
                style="width: 90%; height: 40px; justify-content: end"
                >产能达成率</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 12px;
                font-weight: 400;
                width: 33.34%;
                /* border-right: 1px solid #0a4686; */
              "
            >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >AOI</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.aoiData.corresponding_value || "-" }}</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.aoiData.completion_rate || "-" }}%</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.aoiData.plancapacity || "-" }}PCS/h</span
              >
              <span
                class="TopSpan"
                style="
                  background-color: rgba(25, 129, 246, 0.2);
                  width: 90%;
                  height: 40px;
                "
                >{{ processData.aoiData.achievement_rate || "-" }}%</span
              >
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                width: 33.33%;
                align-items: center;
              "
            >
              <!-- <span
                class="TopSpan"
                style="width: 90%; height: 20%; text-align: center"
                >站点设备图片</span
              > -->
              <img
                style="
                  width: 80%;
                  margin-top: 2%;
                  height:calc( 47% - 25px)
                  margin-bottom: 4%;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                "
                src="@/assets/images/devices/device1.png"
                alt="站点设备图片"
              />
              <div style="width: 90%; height: 53%">
                <PieChart1 :chart-data="pieData3"></PieChart1>
              </div>
              <div
                style="
                  display: flex;
                  align-items: end;
                  justify-content: center;
                  width: 25px;
                  height: 25px;
                "
              >
                <img
                  :src="
                    processData.spiData.achievement_rate > 80
                      ? '正常'
                      : '异常' | getLineStatus
                  "
                  alt=""
                  style="width: 25px"
                />
              </div>
              <!-- <span
                class="GreeenSpan"
                :style="{
                  marginTop: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    processData.spiData.achievement_rate > 80 ? 'green' : 'red',
                }"
              >
                {{
                  processData.spiData.achievement_rate > 80 ? "正常" : "异常"
                }}
              </span> -->
            </div>
          </div>
        </div>
        <div style="height: 47%; margin-top: 2%; width: 100%; display: flex">
          <div style="margin-right: 1%; width: 26%; height: 90%">
            <div class="smt-title" style="margin: 20px 0">
              <div>当日AOI检测不良统计</div>
            </div>
            <!-- <pieChart3D v-if="pieData.length" height="100%" :chartData="pieData"></pieChart3D> -->
            <PieChart
              :chart-data="pieData"
              v-if="pieData.yData.length"
              class="chart-content"
            ></PieChart>
            <div class="chart-content" v-else style="height: calc(100% - 50px)">
              <Empty></Empty>
            </div>
          </div>
          <div style="margin-right: 1%; width: 29%; height: 90%">
            <div class="smt-title" style="margin: 20px 0">
              <div>近15天AOI检测不良数量统计TOP5</div>
            </div>
            <BarChart
              :chartData="barData"
              v-if="barData.xData.length"
              class="chart-content"
            ></BarChart>
            <div class="chart-content" v-else style="height: calc(100% - 50px)">
              <Empty></Empty>
            </div>
          </div>
          <div style="width: 43%; height: 90%">
            <div class="smt-title" style="margin: 20px 0">
              <div>产量曲线图</div>
            </div>
            <LineChart
              v-if="lineData.xData.length"
              height="100%"
              :chartData="lineData"
              class="chart-content"
            ></LineChart>
            <div class="chart-content" v-else style="height: calc(100% - 50px)">
              <Empty></Empty>
            </div>
            <!-- <LineChart :chart-data="lineData"></LineChart> -->
          </div>
        </div>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          width: 25%;
          margin-left: 1%;
                height:100%;
          /* border: 1px solid #0a4686; */
          border-radius: 8px;
        "
      >
        <div
          style="
            display: flex;
            width: 100%;
            height: 30%;
            background-color: rgba(25, 129, 246, 0.2);
            /* border-bottom: 1px solid #0a4686; */
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              width: 40%;
              font-size: 15px;
              font-weight: 700;
              /* border-right: 1px solid #0a4686; */
            "
          >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >回流焊设备参数</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >运行速度</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >升温区温度（℃）</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >恒温区温度（℃）</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >焊接区温度（℃）</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >冷却区温度（℃）</span
            >
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              width: 30%;
              font-size: 15px;
              font-weight: 700;
              /* border-right: 1px solid #0a4686; */
            "
          >
            <span
              class="TopSpan"
              style="
                margin: 0;
                border: 1px solid rgba(255, 255, 255, 0.8);
                font-size: 13px;
                font-weight: 400;
              "
              >设定值</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
            >
              {{
                this.tabData.yxsdData.length > 0
                  ? this.tabData.yxsdData[0].set_value
                  : "-"
              }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{
                this.tabData.swqwdData.length > 0
                  ? this.tabData.swqwdData[0].set_value
                  : "-"
              }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{
                this.tabData.hwqwdData.length > 0
                  ? this.tabData.hwqwdData[0].set_value
                  : "-"
              }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{
                this.tabData.hjqwdData.length > 0
                  ? this.tabData.hjqwdData[0].set_value
                  : "-"
              }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{
                this.tabData.lqqwdData.length > 0
                  ? this.tabData.lqqwdData[0].set_value
                  : "-"
              }}</span
            >
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              width: 30%;
              font-size: 15px;
              font-weight: 700;
            "
          >
            <span
              class="TopSpan"
              style="
                margin: 0;
                border: 1px solid rgba(255, 255, 255, 0.8);
                font-size: 13px;
                font-weight: 400;
              "
              >实际值</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{  this.tabData.yxsdData.length > 0
                  ?this.tabData.yxsdData[0].actual_value : "-" }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{  this.tabData.swqwdData.length > 0
                  ?this.tabData.swqwdData[0].actual_value : "-" }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{ this.tabData.hwqwdData.length > 0
                  ? this.tabData.hwqwdData[0].actual_value :"-" }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{  this.tabData.hjqwdData.length > 0
                  ?this.tabData.hjqwdData[0].actual_value : "-" }}</span
            >
            <span
              class="TopSpan"
              style="margin: 0; border: 1px solid rgba(255, 255, 255, 0.8)"
              >{{ this.tabData.lqqwdData.length > 0
                  ? this.tabData.lqqwdData[0].actual_value : "-" }}</span
            >
          </div>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            width: 100%;
            height: 10%;
            /* border-bottom: 1px solid #0a4686; */
          "
        >
          <div class="smt-title">
            <div>SMT线体设备运行状态</div>
            <img
              :src="'正常' | getLineStatus"
              alt=""
              style="width: 25px; margin-right: 50px"
            />
            <!-- <span
            class="GreeenSpan"
            style="display: flex; align-items: center; justify-content: center"
            >正常</span
            > -->
          </div>
        </div>

        <div style="width: 100%; height: 13%" class="chart-content">
          <div
            style="display: flex; flex-direction: row; width: 100%; height: 48%"
          >
            <span
              class="TopSpan"
              style="
                width: 40%;
                height: 35px;
                font-size: 15px;
                font-weight: 700;
                justify-content: right;
              "
              >当前工单槽位总数：</span
            >
            <span
              class="TopSpan"
              style="
                width: 15%;
                height: 35px;
                background-color: rgba(25, 129, 246, 0.2);
                justify-content: center;
              "
              >{{ patchData.mostationstotalno || "-" }}</span
            >
            <span
              class="TopSpan"
              style="
                width: 35%;
                height: 35px;
                font-size: 15px;
                font-weight: 700;
                justify-content: right;
              "
              >平均抛料率：</span
            >
            <span
              class="TopSpan"
              style="
                width: 15%;
                height: 35px;
                background-color: rgba(25, 129, 246, 0.2);
                justify-content: center;
              "
              >{{ patchData.total_throwing_rate || "-" }}%</span
            >
          </div>
          <div
            style="display: flex; flex-direction: row; width: 100%; height: 48%"
          >
            <span
              class="TopSpan"
              style="
                width: 40%;
                height: 35px;
                font-size: 15px;
                font-weight: 700;
                justify-content: right;
              "
              >当日槽位总数：</span
            >
            <span
              class="TopSpan"
              style="
                width: 15%;
                height: 35px;
                background-color: rgba(25, 129, 246, 0.2);
                justify-content: center;
              "
              >{{ patchData.datestationstotalno || "-" }}</span
            >
            <span
              class="TopSpan"
              style="
                width: 35%;
                height: 35px;
                font-size: 15px;
                font-weight: 700;
                justify-content: right;
              "
              >平均抛料率：</span
            >
            <span
              class="TopSpan"
              style="
                width: 15%;
                height: 35px;
                background-color: rgba(25, 129, 246, 0.2);
                justify-content: center;
              "
              >{{ patchData.daliy_throwing_rate || "-" }}%</span
            >
          </div>
        </div>

        <div style="width: 98%; height: 45%; padding-bottom: 10px">
          <div class="smt-title" style="margin: 20px 0">
            <div>近10日抛料率统计TOP5</div>
          </div>
          <BarChart1
            ref="barChartRef"
            v-if="barData1.xData.length"
            :chartData="barData1"
            class="chart-content"
          ></BarChart1>
          <div class="chart-content" v-else style="height: calc(100% - 50px)">
            <Empty></Empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Empty from "@/views/bigScreen/components/Empty.vue";
import LineChart from "../../components/chart/LineChart.vue";
import PieChart from "../../components/chart/PieChart.vue";
import pieChart3D from "../chart/pieChart3D.vue";
import PieChart1 from "../../components/chart/PieChart1.vue";
import BarChart from "../../components/chart/BarChart.vue";
import BarChart1 from "../../components/chart/BarChart1.vue";
import {
  GetSmt_basic_infoData,
  GetSmt02_processData,
  GetSmt02_aoi_defect_statsData,
  GetSmt02_hourly_capacityData,
  GetSmt02_patch_infoData,
  GetSmt02_date_patch_infoData,
  GetSmt02_param_infoData,
} from "@/api/bigScreenSmt2/index.js";
import RedLampUrl from "../../../../assets/images/bigScreen/red_lamp.png";
import YellowLampUrl from "../../../../assets/images/bigScreen/yellow_lamp.png";
import GreenLampUrl from "../../../../assets/images/bigScreen/green_lamp.png";

export default {
  components: {
    Empty,
    LineChart,
    PieChart,
    pieChart3D,
    BarChart,
    BarChart1,
    PieChart1,
  },
  name: "",
  filters: {
    getLineStatus(status) {
      const statusMap = {
        异常: RedLampUrl,
        正常: GreenLampUrl,
        停线: YellowLampUrl,
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      bigScreenTimeId: null,
      completionRateValue: 0, // 完成率初始值为 0
      completionRateWidth: 0, // 初始宽度为 0
      //初始背景色
      completionRateColor: {
        r: 255,
        g: 0,
        b: 0,
      },
      intervalId: null,
      lineData: {
        legendData: ["回流焊", "SPI", "AOI"],
        hlhData: [],
        spiData: [],
        aoiData: [],
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
      tabData: {
        lqqwdData: [],
        swqwdData: [],
        hwqwdData: [],
        hjqwdData: [],
        yxsdData: [],
      },
      barData: {
        title: "近15天AOI检测不良数量统计TOP5",
        xData: [0],
        yData: [0],
      },
      barData1: {
        title: "近10日抛料率统计TOP5",
        xData: [],
        yData: [],
      },
      pieData: {
        title: "当日AOI检测不良统计",
        showLabel: true, //是否显示标签
        yData: [0],
      },
      pieData1: {
        title: "站点完成情况",
        showLabel: true, //是否显示标签
        yData: 0,
      },
      pieData2: {
        title: "站点完成情况",
        showLabel: true, //是否显示标签
        yData: 1,
      },
      pieData3: {
        title: "站点完成情况",
        showLabel: true, //是否显示标签
        yData: 0,
      },
      basicData: {},
      processData: {
        spiData: {},
        hlhData: {},
        aoiData: {},
      },
      patchData: {},
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
    // this.getTableData();
  },
  computed: {},
  methods: {
    initData() {
      this.GetSmt_basic_infoData();
      this.GetSmt02_processData();
      this.GetSmt02_aoi_defect_statsData();
      this.GetSmt02_hourly_capacityData();
      this.GetSmt02_aoi_defect_statsDatas();
      this.GetSmt02_patch_infoData();
      this.GetSmt02_date_patch_infoData();
      this.GetSmt02_param_infoData();
    },

    async GetSmt_basic_infoData() {
      let res = await GetSmt_basic_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.basicData = res.result[0];
      } else {
        this.isQuery = false;
        // this.$message.error(res1.msg);
        this.isSuccess = false;
      }
    },
    async GetSmt02_processData() {
      let res = await GetSmt02_processData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.processData.spiData = res.result.find(
          (r) => (r.process_name = "SPI")
        );
        this.pieData1.yData = this.processData.spiData.achievement_rate || 0;
        this.processData.hlhData = res.result.find(
          (r) => (r.process_name = "回流焊")
        );
        this.pieData2.yData = this.processData.hlhData.achievement_rate || 0;
        this.processData.aoiData = res.result.find(
          (r) => (r.process_name = "AOI")
        );
        this.pieData3.yData = this.processData.aoiData.achievement_rate || 0;
      } else {
        this.isQuery = false;
        // this.$message.error(res1.msg);
        this.isSuccess = false;
      }
    },

    async GetSmt02_aoi_defect_statsData() {
      const now = Date.now();
      // let res = await GetSmt02_aoi_defect_statsData(moment(now).format("YYYY-MM-DD"),);
      let res = await GetSmt02_aoi_defect_statsData("2024-12-11", "999");
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.pieData.yData = res.result;
      } else {
        this.isQuery = false;
        // this.$message.error(res.msg);
        this.isSuccess = false;
      }
    },
    async GetSmt02_hourly_capacityData() {
      const now = Date.now();
      // let res = await GetSmt02_hourly_capacityData(moment(now).format("YYYY-MM-DD"),);
      let res = await GetSmt02_hourly_capacityData("2024-12-18");
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.lineData.spiData = res.result
          .filter((r) => r.process_name === "SPI")
          .map((item) => item.capacity);
        this.lineData.hlhData = res.result
          .filter((r) => r.process_name === "回流焊")
          .map((item) => item.capacity);
        this.lineData.aoiData = res.result
          .filter((r) => r.process_name === "AOI")
          .map((item) => item.capacity);
        // this.lineData.xData = res.result
        //   .filter((r) => r.process_name === "AOI")
        //   .map((item) => item.datetime);
      } else {
        this.isQuery = false;
        // this.$message.error(res.msg);
        this.isSuccess = false;
      }
    },
    async GetSmt02_aoi_defect_statsDatas() {
      const now = new Date();
      now.setDate(now.getDate() - 15);
      // let res = await GetSmt02_aoi_defect_statsData(moment(now).format("YYYY-MM-DD"),);
      let res = await GetSmt02_aoi_defect_statsData(
        moment(now).format("YYYY-MM-DD"),
        "5"
      );
      // let res = await GetSmt02_aoi_defect_statsData("2024-12-18");
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.barData.yData = res.result.map((item) => item.value);
        this.barData.xData = res.result.map((item) => item.name);
      } else {
        this.isQuery = false;
        this.tableData1 = [];
        // this.$message.error(res.msg);
        this.isSuccess = false;
      }
    },
    async GetSmt02_patch_infoData() {
      let res = await GetSmt02_patch_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.patchData = res.result[0];
      } else {
        this.isQuery = false;
        // this.$message.error(res.msg);
        this.isSuccess = false;
      }
    },

    async GetSmt02_date_patch_infoData() {
      let res = await GetSmt02_date_patch_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.barData1.yData = res.result.map((item) => item.value);
        this.barData1.xData = res.result.map((item) => item.holeNo);
      } else {
        this.isQuery = false;
        // this.$message.error(res.msg);
        this.isSuccess = false;
      }
    },

    async GetSmt02_param_infoData() {
      let res = await GetSmt02_param_infoData();
      this.isQuery = true;
      if ((res.status = 1 && res.result?.length > 0)) {
        this.tabData.lqqwdData = res.result.filter(
          (r) => r.param_name === "冷却区温度（℃）"
        );
        this.tabData.swqwdData = res.result.filter(
          (r) => r.param_name === "升温区温度（℃）"
        );
        this.tabData.hwqwdData = res.result.filter(
          (r) => r.param_name === "恒温区温度（℃）"
        );

        this.tabData.hjqwdData = res.result.filter(
          (r) => r.param_name === "焊接区温度（℃）"
        );

        this.tabData.yxsdData = res.result.filter(
          (r) => r.param_name === "运行速度"
        );
      } else {
        this.isQuery = false;
        this.isSuccess = false;
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
    },
    // 在过渡进入前，给元素设置初始宽度
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
    if (this.intervalId) {
      clearInterval(this.intervalId); // 清除定时器
    }
  },
};
</script>
<style lang="scss" scoped>
* {
  border-radius: 1px;
}

.content-container {
  // .base-info {
  // 	padding: 10px;
  // 	margin: 5px 0;

  // }
  .item-value-progress {
    width: 90%;
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

  .chart-content {
    background-color: rgba(25, 129, 246, 0.2);
  }
  .GreeenSpan {
    display: flex;
    /* 使用 flexbox */
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* 圆形 */
    background-color: green;
    color: white;
    /* 可以设置文本颜色为白色以便于阅读 */
  }

  .TopSpan {
    // width: 35%;
    height: 90%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    // border: 1px solid #0a4686;
    margin-left: 5px;
    margin-top: 3px;
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

  .base-info {
    // margin: -10px;
    padding: 15px 10px 10px 10px;

    .com-part {
      // background-color: rgba(25, 129, 246, 0.2);
      // box-shadow: 0 0 5px 3px rgba(25, 129, 246, 0.5);

      min-height: 40px;
      display: flex;
      line-height: 40px;
      color: #fff;
      font-size: 11px;
      // background-color: rgba(25, 129, 246, 0.5);
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

      span {
        flex: 1;
        font-size: 12px;
        font-weight: 400;
        padding-left: 4px;
        background-color: rgba(25, 129, 246, 0.2);
      }
    }
  }
}
</style>
