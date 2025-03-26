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

    <el-table
      style="height: calc(100% - 90px); overflow-y: auto"
      v-loading="loading"
      ref="tableData"
      :data="tableData"
      @row-click="rowClick"
      highlight-current-row
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column
        label="商务合同编号"
        align="center"
        prop="business_contract_code"
      />
      <el-table-column label="中标批次" align="center" prop="bidding_batch" />
      <el-table-column
        label="合同甲方单位"
        align="center"
        prop="bidding_party_a"
      />
      <el-table-column label="中标时间"
          show-overflow-tooltip align="center" prop="bidding_time" />
      <el-table-column label="中标数量" align="center" prop="bidding_count" />
      <el-table-column label="用户性质" align="center" prop="uaser_nature" />
      <el-table-column
        label="研发方案编号"
        align="center"
        prop="development_project_no"
      />
      <el-table-column
        label="研发方案软件版本"
        align="center"
        prop="software_version"
          show-overflow-tooltip
      />
      <el-table-column
        label="研发方案硬件版本"
        align="center"
        prop="hardware_version"
      />
      <el-table-column
        label="产品详细信息编号"
        align="center"
        prop="product_detail_code"
      /><el-table-column
        label="写入时间"
        align="center"
        prop="write_date"
      />
    </el-table>

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
            <el-form-item label="商务合同编号" prop="business_contract_code">
              <el-input
                v-model="form.business_contract_code"
                placeholder="请输入商务合同编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标批次" prop="bidding_batch">
              <el-select
                v-model="form.bidding_batch"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择中标批次"
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
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同甲方单位" prop="bidding_party_a">
              <el-select
                v-model="form.bidding_party_a"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择合同甲方单位"
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
          <el-col :span="12">
            <el-form-item label="中标时间" prop="bidding_time">
              <el-date-picker
                clearable
                v-model="form.bidding_time"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择变更时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="中标数量" prop="bidding_count">
              <el-input
                v-model="form.bidding_count"
                placeholder="请输入中标数量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性质" prop="uaser_nature">
              <el-select
                v-model="form.uaser_nature"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择用户性质"
              >
                <el-option
                  v-for="item in uaserNatureList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
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
                  v-for="item in pubCodeDataList3"
                  :key="item.development_project_no"
                  :label="item.development_project_no"
                  :value="item.development_project_no"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="研发方案软件版本" prop="software_version">
              <el-input
                v-model="form.software_version"
                placeholder="请输入研发方案软件版本"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="研发方案硬件版本" prop="hardware_version">
              <el-input
                v-model="form.hardware_version"
                placeholder="请输入研发方案硬件版本"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品详细信息编号" prop="product_detail_code">
              <el-select
                v-model="form.product_detail_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择产品详细信息编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList4"
                  :key="item.product_detail_code"
                  :label="item.product_detail_code"
                  :value="item.product_detail_code"
                ></el-option>
              </el-select>
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
  GetPubCode,
  GetProductProject,
  GetProductInfo,
  GetComponentDetailList,
  GetProjectChangeRecond,
  GetProjectDetail,GetProductDetail,
  GetBiddingInfo,
  AddBiddingInfo,
  UpdateBiddingInfo,
  DeleteBiddingInfo,
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
      // 总条数
      total: 0,
      // 出勤统计表格数据
      tableData: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      pubCodeDataList1: [],
      pubCodeDataList2: [],
      pubCodeDataList3: [],
      pubCodeDataList4: [],
      fileList: [],
      limit: 5,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key: null,
      },
      changeTypeList: [
        { value: "部分变更", label: "部分变更" },
        { value: "全部变更", label: "全部变更" },
      ],
      uaserNatureList: [
        { value: "国网", label: "国网" },
        { value: "南网", label: "南网" },
        { value: "自购", label: "自购" },
        { value: "出口", label: "出口" },
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        business_contract_code: [
          { required: true, message: "商务合同编号不能为空", trigger: "blur" },
        ],
        bidding_batch: [
          {
            required: true,
            message: "中标批次不能为空",
            trigger: "blur",
          },
        ],
        bidding_party_a: [
          {
            required: true,
            message: "合同甲方单位不能为空",
            trigger: "blur",
          },
        ],
        bidding_time: [
          {
            required: true,
            message: "中标时间不能为空",
            trigger: "blur",
          },
        ],
        bidding_count: [
          {
            required: true,
            message: "中标数量不能为空",
            trigger: "blur",
          },
        ],
        uaser_nature: [
          {
            required: true,
            message: "用户性质不能为空",
            trigger: "blur",
          },
        ],
        development_project_no: [
          {
            required: true,
            message: "研发方案编号不能为空",
            trigger: "blur",
          },
        ],
        software_version: [
          {
            required: true,
            message: "研发方案软件版本不能为空",
            trigger: "blur",
          },
        ],
        hardware_version: [
          {
            required: true,
            message: "研发方案硬件版本不能为空",
            trigger: "blur",
          },
        ],
        product_detail_code: [
          {
            required: true,
            message: "产品详细信息编号不能为空",
            trigger: "blur",
          },
        ],
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
    } /** 查询研发方案列表 */,
    GetProductProjectList(isAdd) {
      GetProductProject().then((res) => {
        if (res.success) {
          this.pubCodeDataList3 = this.uniqueByProperty(
            res.response,
            "development_project_no"
          );
          if (isAdd) {
            this.form.development_project_no =
              this.pubCodeDataList3.length > 0
                ? this.pubCodeDataList3[0].development_project_no
                : "";
          }
        }
      });
    },/** 查询研发方案详情列表 */
    GetProjectDetailList(isAdd) {
      GetProductDetail().then((res) => {
        if (res.success) {
          this.pubCodeDataList4 = this.uniqueByProperty(
            res.response,
            "product_detail_code"
          );
          if (isAdd) {
            this.form.product_detail_code =
              this.pubCodeDataList4.length > 0
                ? this.pubCodeDataList4[0].product_detail_code
                : "";
          }
        }
      });
    } /** 查询公共信息列表 */,
    GetPubCodeList(isAdd) {
      GetPubCode({
        key: "'BIDDING_BATCH','BIDDING_PARTY_A'",
      }).then((res) => {
        if (res.success) {
          this.pubCodeDataList1 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "BIDDING_BATCH"),
            "codE_ID"
          );
          this.pubCodeDataList2 = this.uniqueByProperty(
            res.response.filter((r) => r.codE_TYPE === "BIDDING_PARTY_A"),
            "codE_ID"
          );
          if (isAdd) {
            this.form.bidding_batch =
              this.pubCodeDataList1.length > 0
                ? this.pubCodeDataList1[0].codE_ID
                : "";
            this.form.bidding_party_a =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].codE_ID
                : "";
          }
        }
      });
    },
    getSelectList(isAdd) {
      this.GetProductProjectList(isAdd);
      this.GetProjectDetailList(isAdd);
      this.GetPubCodeList(isAdd);
    },
    /** 查询出勤统计列表 */
    getList() {
      this.loading = true;
      GetBiddingInfo(this.queryParams).then((res) => {
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
      this.reset();
      this.getSelectList(true);this.form.uaser_nature="国网";
      this.open = true;
      this.title = "添加元器件变更";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.getSelectList(false);
      // getAttendance(id).then((response) => {
      this.form = JSON.parse(JSON.stringify(this.currentRow));
      this.open = true;
      this.title = "修改元器件变更";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            UpdateBiddingInfo(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddBiddingInfo(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    } /** 删除按钮操作 */,
    handleDelete(row) {
      this.form = JSON.parse(JSON.stringify(this.currentRow));
      if (!this.form) {
        this.$message.error("请选择要删除的产品信息！");
        return;
      }
      this.$confirm("确认删除该产品信息吗？", "提示", { type: "warning" })
        .then(() => {
          DeleteBiddingInfo({ id: this.form.id }).then((res) => {
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
  },
};
</script>
