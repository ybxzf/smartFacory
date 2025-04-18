<template  style="height:100%">
  <div style="height: 100%" class="app-container">
    <el-row :gutter="10" style="height: 40px" v-show="showSearch">
      <el-col :span="12">
        <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          inline
          label-width="68px"
        >
          <el-form-item>
            <el-input
              v-model="queryParams.key"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12" style="text-align: right">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['smartfactory:attendance:add']"
          >新增</el-button
        >

        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['smartfactory:attendance:edit']"
          >修改</el-button
        >

        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
          v-hasPermi="['smartfactory:attendance:remove']"
          >删除</el-button
        >

        <right-toolbar
          :showSearch.sync="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </el-col>
    </el-row>
    <div
      style="
        height: calc(100% - 90px);
        width: 100%;
        position: relative;
        overflow: auto;
      "
      class="table-container"
    >
      <el-table
        style=
      "height: calc(100% - 500px);
       overflow-y: auto"
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        border
        highlight-current-row
        @row-click="rowClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column
          label="产品详细信息编号"
          align="center"
          width="150" show-overflow-tooltip
          prop="product_detail_code"
        />
        <el-table-column
          label="产品详细信息名称"
          align="center"
          width="150"
          prop="product_detail_name"
          show-overflow-tooltip
        />
        <el-table-column label="产品编码"
          width="150"
          align="center"
          show-overflow-tooltipalign="center" prop="product_code"
          show-overflow-tooltip/>
        <el-table-column
          label="研发方案编号"
          show-overflow-tooltip
          align="center"
          width="180"
          prop="development_project_no"
        />
        <el-table-column
          label="产品规格"
          width="120"
          align="center"
          prop="product_spec"
        />
        <el-table-column label="额定电压" align="center" prop="rated_voltage" />
        <el-table-column label="最小电流" align="center" prop="min_current" />
        <el-table-column label="转折电流" align="center" prop="turn_current" />
        <el-table-column label="额定电流" align="center" prop="rated_current" />
        <el-table-column label="最大电流" align="center" prop="max_current" />
        <el-table-column
          label="有功准确度等级"
          align="center"
          prop="act_pwr_accuracy_grade"
        />
        <el-table-column
          label="有功常数"
          align="center" show-overflow-tooltip
          prop="active_power_constant"
        />
        <el-table-column
          label="计度器(LCD)整数位数"
          align="center"
          prop="lcd_integer_digits"
        />
        <el-table-column
          label="计度器(LCD小数位数)"
          align="center"
          prop="lcd_decimal_digits"
        />
        <el-table-column
          label="本地通讯方式"
          align="center"
          prop="local_comm_type"
        />
        <el-table-column
          label="远程通讯方式"
          align="center"
          prop="remote_comm_type"
        />
        <el-table-column
          label="费控方式"
          align="center"
          prop="rate_control_type"
        />
        <el-table-column
          label="工艺规程"
          align="center"
          prop="technology_rules"
        />
        <el-table-column
          label="附件"
          width="120"
          align="center"
          prop="fileName"
        />
        <el-table-column label="备注" align="center" prop="remarks" />
        <el-table-column
          label="写入时间"
          align="center"
          prop="write_date"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.write_date) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出勤统计对话框 -->
    <el-dialog
      center
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品详细信息编号" prop="product_detail_code">
              <el-input
                v-model="form.product_detail_code"
                placeholder="请输入产品详细信息编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品详细信息名称" prop="product_detail_name">
              <el-input
                v-model="form.product_detail_name"
                placeholder="请输入产品详细信息名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品编码" prop="product_code">
              <el-select
                v-model="form.product_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择产品编码"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList10"
                  :key="item.product_code"
                  :label="item.product_code"
                  :value="item.product_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="研发方案编号" prop="development_project_no">
               <el-select
                v-model="form.development_project_no"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择研发方案编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList11"
                  :key="item.development_project_no"
                  :label="item.development_project_no"
                  :value="item.development_project_no"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品规格" prop="product_spec">
              <el-select
                v-model="form.product_spec"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择产品规格"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList1"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额定电压" prop="rated_voltage">
              <el-select
                v-model="form.rated_voltage"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择额定电压"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList2"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="最小电流" prop="min_current">
              <el-select
                v-model="form.min_current"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择最小电流"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList3"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转折电流" prop="turn_current">
              <el-select
                v-model="form.turn_current"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择转折电流"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList4"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="额定电流" prop="rated_current">
              <el-select
                v-model="form.rated_current"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择额定电流"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList5"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大电流" prop="max_current">
              <el-select
                v-model="form.max_current"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择最大电流"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList6"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第六行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="有功准确度等级" prop="act_pwr_accuracy_grade">
              <el-input
                v-model="form.act_pwr_accuracy_grade"
                placeholder="请输入有功准确度等级"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有功常数" prop="active_power_constant">
              <el-input
                v-model="form.active_power_constant"
                placeholder="请输入有功常数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第七行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计度器(LCD)整数位数" prop="lcd_integer_digits">
              <el-input
                v-model="form.lcd_integer_digits"
                placeholder="请输入计度器(LCD)整数位数"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计度器(LCD)小数位数" prop="lcd_decimal_digits">
              <el-input
                v-model="form.lcd_decimal_digits"
                placeholder="请输入计度器(LCD)小数位数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第八行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="本地通讯方式" prop="local_comm_type">
              <el-select
                v-model="form.local_comm_type"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择本地通讯方式"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList7"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="远程通讯方式" prop="remote_comm_type">
              <el-select
                v-model="form.remote_comm_type"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择远程通讯方式"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList8"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第九行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="费控方式" prop="rate_control_type">
              <el-select
                v-model="form.rate_control_type"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择费控方式"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList9"
                  :key="item.codE_ID"
                  :label="item.codE_ID + ':' + item.name"
                  :value="item.codE_ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工艺规程" prop="technology_rules">
              <el-input
                v-model="form.technology_rules"
                placeholder="请输入工艺规程"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第十行 -->
        <el-row :gutter="20">
          <el-col :span="9">
            <el-form-item label="附件" prop="fileName">
              <el-upload
                action="#"
                :http-request="requestUpload"
                :show-file-list="false"
                :before-upload="beforeUpload"
              >
                <el-button type="primary" size="small">
                  选择文件
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- 新增的文件图标显示区域 -->
            <span
              v-if="form.fileName"
              @change="refreshData"
              class="file-icon-container"
            >
              <i class="el-icon-document"></i>{{ form.fileName }}
              <el-button
                type="text"
                size="small"
                @click="removeUploadedFile"
                style="margin-left: 5px"
              >
                删除
              </el-button>
            </span></el-col
          >
        </el-row>
        <!-- 第十一行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input
                type="textarea"
                v-model="form.remarks"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetPubCode,GetProductInfo,GetProductProject ,
  GetProductDetail,
  AddProductDetail,
  UpdateProductDetail,
  DeleteProductDetail,
} from "@/api/nqi/nqi";

export default {
  name: "Attendance",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      uploadedFileName: "",
      // 总条数
      total: 0,
      // 出勤统计表格数据
      attendanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      fileList: [],
      limit: 5,
      fileType: 0,
      // 产品信息列表
      tableData: [],
      pubCodeDataList1: [],
      pubCodeDataList2: [],
      pubCodeDataList3: [],
      pubCodeDataList4: [],
      pubCodeDataList5: [],
      pubCodeDataList6: [],
      pubCodeDataList7: [],
      pubCodeDataList8: [],
      pubCodeDataList9: [],
      pubCodeDataList10: [],pubCodeDataList11:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key: null,
      },
      // 表单参数
      form: { product_spec: "", rated_voltage: "" },
      // 表单校验
      rules: {
        product_detail_code: [
          {
            required: true,
            message: "产品详细信息编号不能为空",
            trigger: "blur",
          },
        ],
        product_detail_name: [
          {
            required: true,
            message: "产品详细信息名称不能为空",
            trigger: "blur",
          },
        ],
        product_code: [
          {
            required: true,
            message: "产品编码不能为空",
            trigger: "blur",
          },
        ],
        development_project_no: [
          { required: true, message: "研发方案编号不能为空", trigger: "blur" },
        ],
        product_spec: [
          {
            required: true,
            message: "产品规格不能为空",
            trigger: "blur",
          },
        ],
        rated_voltage: [
          {
            required: true,
            message: "额定电压不能为空",
            trigger: "blur",
          },
        ],
        lcd_integer_digits: [
          {
            required: true,
            message: "计度器(LCD)整数位数不能为空",
            trigger: "blur",
          },
        ],
        lcd_decimal_digits: [
          {
            required: true,
            message: "计度器(LCD小数位数)不能为空",
            trigger: "blur",
          },
        ],
        local_comm_type: [
          {
            required: true,
            message: "本地通讯方式不能为空",
            trigger: "blur",
          },
        ],
        remote_comm_type: [
          {
            required: true,
            message: "远程通讯方式不能为空",
            trigger: "blur",
          },
        ],
        rate_control_type: [
          {
            required: true,
            message: "费控方式不能为空",
            trigger: "blur",
          },
        ],
        technology_rules: [
          { required: true, message: "工艺规程不能为空", trigger: "blur" },
        ],
        // fileName: [
        //   {
        //     required: true,
        //     message: "附件不能为空",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    refreshData(val) {
      this.$forceUpdate();
    },
    uniqueByProperty(arr, property) {
      const seen = new Set();
      return arr.filter((item) => {
        const value = item[property];
        if (seen.has(value)) {
          return false;
        }
        seen.add(value);
        return true;
      });
    },
    rowClick(row) {
      this.$refs.tableData.clearSelection();
      this.$refs.tableData.toggleRowSelection(row);
      this.currentRow = row;
    }
    /** 查询公共信息列表 */,
    GetPubCodeList(isAdd) {
      GetPubCode({
        key: "'METER_SPEC','METER_PARA_VOLTAGE','METER_PARA_MIN_CURRENT','METER_PARA_TURN_CURRENT','METER_PARA_RATED_CURRENT','METER_PARA_MAX_CURRENT','LOCAL_COMM_TYPE','REMOTE_COMM_TYPE','RATE_CONTROL_TYPE'",
      }).then((res) => {
        if (res.success) {
          this.GetProductInfoList(isAdd);
          this.GetProductProjectList(isAdd);
          console.log(this.form)
          this.pubCodeDataList1 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "METER_SPEC"),
            "codE_ID"
          );
          this.pubCodeDataList2 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "METER_PARA_VOLTAGE"),
            "codE_ID"
          );
          this.pubCodeDataList3 = this.uniqueByProperty(
            res.response.filter(
              (r) => r.codE_TYPE === "METER_PARA_MIN_CURRENT"
            ),
            "codE_ID"
          );
          this.pubCodeDataList4 = this.uniqueByProperty(
            res.response.filter(
              (r) => r.codE_TYPE === "METER_PARA_TURN_CURRENT"
            ),
            "codE_ID"
          );
          this.pubCodeDataList5 = this.uniqueByProperty(
            res.response.filter(
              (r) => r.codE_TYPE === "METER_PARA_RATED_CURRENT"
            ),
            "codE_ID"
          );
          this.pubCodeDataList6 = this.uniqueByProperty(
            res.response.filter(
              (r) => r.codE_TYPE === "METER_PARA_MAX_CURRENT"
            ),
            "codE_ID"
          );
          this.pubCodeDataList7 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "LOCAL_COMM_TYPE"),
            "codE_ID"
          );
          this.pubCodeDataList8 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "REMOTE_COMM_TYPE"),
            "codE_ID"
          );
          this.pubCodeDataList9 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "RATE_CONTROL_TYPE"),
            "codE_ID"
          );
          if (isAdd) {
            this.form.product_spec =
              this.pubCodeDataList1.length > 0
                ? this.pubCodeDataList1[0].codE_ID +
                  ":" +
                  this.pubCodeDataList1[0].name
                : "";
            this.form.rated_voltage =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].codE_ID
                : "";
            this.form.min_current =
              this.pubCodeDataList3.length > 0
                ? this.pubCodeDataList3[0].codE_ID
                : "";
            this.form.turn_current =
              this.pubCodeDataList4.length > 0
                ? this.pubCodeDataList4[0].codE_ID
                : "";
            this.form.rated_current =
              this.pubCodeDataList5.length > 0
                ? this.pubCodeDataList5[0].codE_ID
                : "";
            this.form.max_current =
              this.pubCodeDataList6.length > 0
                ? this.pubCodeDataList6[0].codE_ID
                : "";
            this.form.local_comm_type =
              this.pubCodeDataList7.length > 0
                ? this.pubCodeDataList7[0].codE_ID
                : "";
            this.form.remote_comm_type =
              this.pubCodeDataList8.length > 0
                ? this.pubCodeDataList8[0].codE_ID
                : "";
            this.form.rate_control_type =
              this.pubCodeDataList9.length > 0
                ? this.pubCodeDataList9[0].codE_ID
                : "";
          }
        }
      });
    },/** 查询产品信息列表 */
    GetProductInfoList(isAdd) {
      GetProductInfo(this.queryParams).then((res) => {
        if (res.success) {
          this.pubCodeDataList10 = this.uniqueByProperty(
            res.response,
            "product_code"
          );
          if (isAdd) {
            this.form.product_code =
              this.pubCodeDataList10.length > 0
                ? this.pubCodeDataList10[0].product_code
                : "";
          }
        }
      });
    },
    /** 查询研发方案列表 */
    GetProductProjectList(isAdd) {
      GetProductProject(this.queryParams).then((res) => {
        if (res.success) {
          this.pubCodeDataList11= this.uniqueByProperty(
            res.response,
            "development_project_no"
          );
          if (isAdd) {
            this.form.development_project_no =
              this.pubCodeDataList11.length > 0
                ? this.pubCodeDataList11[0].development_project_no
                : "";
          }
        }
      });
    },
    /** 查询产品详细信息列表 */
    getList() {
      this.loading = true;
      GetProductDetail(this.queryParams).then((res) => {
       if (res.success) {
         this.tableData = res.response;
        this.total = res.dataCount;
        this.loading = false;
         } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
         console.log(this.tableData)
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.GetPubCodeList(true);
      this.reset();
      this.open = true;
      this.title = "添加产品详细信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.GetPubCodeList(false);
      // this.form = JSON.parse(JSON.stringify(this.currentRow));
      this.form = JSON.parse(
        JSON.stringify(
          this.tableData.filter((r) => r.id === this.currentRow.id)[0]
        )
      );
      if (!this.form) {
        this.$message.error("请选择要修改的产品信息！");
        return;
      }
      this.open = true;
      this.title = "修改产品详细信息";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.form.fileName) {
            this.$message.error("请上传附件！");
            return;
          }
          if (this.form.id != null) {
            UpdateProductDetail(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddProductDetail(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.form = JSON.parse(JSON.stringify(this.currentRow));
      if (!this.form) {
        this.$message.error("请选择要删除的产品详细信息！");
        return;
      }
      this.$confirm("确认删除该产品详细信息吗？", "提示", { type: "warning" })
        .then(() => {
          DeleteProductDetail(this.form).then((res) => {
            if (res.success) {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
            this.getList();
          });
        })
        .catch(() => {});
    },
    // 覆盖默认的上传行为
    requestUpload() {},
    // 上传预处理
    beforeUpload(file) {
      this.form.fileName = file.name;
      this.$nextTick(() => {
        this.$forceUpdate(); // 强制组件重新渲染
      });
      this.$refs.form.validateField("fileName"); // 手动验证
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(",")[1];
          (this.form.fileBase64 = base64Data), resolve(false); // 阻止默认上传，我们手动控制上传
        };
        reader.readAsDataURL(file);
      });
    },
    removeUploadedFile() {
      this.form.fileName = "";
      this.form.fileBase64 = "";
      this.$forceUpdate(); // 强制组件重新渲染
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  ::v-deep .el-table__body tr.current-row > td.el-table__cell {
    color: #ffffff;
    background-color: #1890ff !important;
  }
  .custom-unknown-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ccc;
    color: white;
    margin-right: 5px;
  }
  .file-icon-container {
    margin-left: 10px;
    display: inline-flex;
    align-items: center;
  }
  .table-container {
    height: calc(100% - 90px);
    width: 80%; /* 或者其他你想要的宽度 */
    position: relative;
    overflow: hidden;
  }

  .el-table__header-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .el-table__body-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
