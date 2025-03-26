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
      style="height: calc(100% - 100px);overflow-y: auto"
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
        label="变更记录编号"
        align="center"
        prop="change_record_code"
          show-overflow-tooltip
      />
      <el-table-column
        label="研发方案编号"
        align="center"
        prop="development_project_no"
      />
      <el-table-column label="产品编码" align="center" prop="product_code" />
      <el-table-column
        label="产品详细信息编号"
        align="center"
        prop="product_detail_code"
      />
      <el-table-column
        label="商务合同编号"
        align="center"
        prop="business_contract_code"
      />
      <el-table-column label="计划单号" align="center" prop="plan_code" />
      <el-table-column
        label="供应商企编号"
        align="center"
        prop="supplier_enterprise_code"
      />
      <el-table-column label="更换理由" align="center" prop="change_reason" />
      <el-table-column
        label="旧元器件位号"
        align="center"
        prop="old_component_position"
      />
      <el-table-column
        label="旧元器件编号"
        align="center"
        prop="old_component_code"
      />
      <el-table-column
        label="新元器件位号"
        align="center"
        prop="new_component_position"
      />
      <el-table-column
        label="新元器件编号"
        align="center"
        prop="new_component_code"
      />
      <el-table-column label="写入时间"
          show-overflow-tooltip align="center" prop="write_date" />
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
            <el-form-item label="变更记录编号" prop="change_record_code">
              <el-input
                v-model="form.change_record_code"
                placeholder="请输入变更记录编号"
              />
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
                  v-for="item in pubCodeDataList1"
                  :key="item.development_project_no"
                  :label="item.development_project_no"
                  :value="item.development_project_no"
                ></el-option>
              </el-select>
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
                  v-for="item in pubCodeDataList2"
                  :key="item.product_code"
                  :label="item.product_code"
                  :value="item.product_code"
                ></el-option>
              </el-select>
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
                  v-for="item in pubCodeDataList3"
                  :key="item.product_detail_code"
                  :label="item.product_detail_code"
                  :value="item.product_detail_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商务合同编号" prop="business_contract_code">
              <el-select
                v-model="form.business_contract_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择商务合同编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList4"
                  :key="item.business_contract_code"
                  :label="item.business_contract_code"
                  :value="item.business_contract_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划单号" prop="plan_code">
              <el-select
                v-model="form.plan_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择商务合同编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList5"
                  :key="item.plan_code"
                  :label="item.plan_code"
                  :value="item.plan_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="供应商企编号" prop="supplier_enterprise_code">
              <el-input
                v-model="form.supplier_enterprise_code"
                placeholder="请输入供应商企编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更换理由" prop="change_reason">
              <el-input
                v-model="form.change_reason"
                placeholder="请输入更换理由"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="旧元器件位号" prop="old_component_position">
              <el-input
                v-model="form.old_component_position"
                placeholder="请输入旧元器件位号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="旧元器件编号" prop="old_component_code">
              <el-select
                v-model="form.old_component_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                @change="refreshData"
                placeholder="请选择旧元器件编号"
              >
                <el-option
                  v-for="item1 in pubCodeDataList6"
                  :key="item1.code"
                  :label="item1.code + ':' + item1.name"
                  :value="item1.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第六行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="新元器件位号" prop="new_component_position">
              <el-input
                v-model="form.new_component_position"
                placeholder="请输入新元器件位号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新元器件编号" prop="new_component_code">
              <el-select
                v-model="form.new_component_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                @change="refreshData"
                placeholder="请选择新元器件编号"
              >
                <el-option
                  v-for="item1 in pubCodeDataList6"
                  :key="item1.code"
                  :label="item1.code + ':' + item1.name"
                  :value="item1.code"
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
  GetProjectDetail,
  GetPubComponentInfo,
  GetProductDetail,
  GetComponentChangeRecord,
  GetBiddingInfo,
  GetProductionPlan,
  AddComponentChangeRecord,
  UpdateComponentChangeRecord,
  DeleteComponentChangeRecord,
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
      pubCodeDataList1: [],
      pubCodeDataList2: [],
      pubCodeDataList3: [],
      pubCodeDataList4: [],
      pubCodeDataList5: [],
      pubCodeDataList6: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      fileList: [],
      limit: 5,
      changeTypeList: [
        { value: "部分变更", label: "部分变更" },
        { value: "全部变更", label: "全部变更" },
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        change_record_code: [
          { required: true, message: "变更记录编号不能为空", trigger: "blur" },
        ],
        development_project_no: [
          {
            required: true,
            message: "研发方案编号不能为空",
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
        product_detail_code: [
          {
            required: true,
            message: "产品详细信息编号不能为空",
            trigger: "blur",
          },
        ],
        business_contract_code: [
          {
            required: true,
            message: "商务合同编号不能为空",
            trigger: "blur",
          },
        ],
        plan_code: [
          {
            required: true,
            message: "计划单号不能为空",
            trigger: "blur",
          },
        ],
        supplier_enterprise_code: [
          {
            required: true,
            message: "供应商企编号不能为空",
            trigger: "blur",
          },
        ],
        change_reason: [
          {
            required: true,
            message: "更换理由不能为空",
            trigger: "blur",
          },
        ],
        old_component_position: [
          {
            required: true,
            message: "旧元器件位号不能为空",
            trigger: "blur",
          },
        ],
        old_component_code: [
          {
            required: true,
            message: "旧元器件编号不能为空",
            trigger: "blur",
          },
        ],
        new_component_position: [
          {
            required: true,
            message: "新元器件位号不能为空",
            trigger: "blur",
          },
        ],
        new_component_code: [
          {
            required: true,
            message: "新元器件编号不能为空",
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
          this.pubCodeDataList1 = this.uniqueByProperty(
            res.response,
            "development_project_no"
          );
          if (isAdd) {
            this.form.development_project_no =
              this.pubCodeDataList1.length > 0
                ? this.pubCodeDataList1[0].development_project_no
                : "";
          }
        }
      });
    },
    /** 查询产品信息列表 */
    GetProductInfoList(isAdd) {
      GetProductInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList2 = this.uniqueByProperty(
            res.response,
            "product_code"
          );
          if (isAdd) {
            this.form.product_code =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].product_code
                : "";
          }
        }
      });
    } /** 查询研发方案详情列表 */,
    GetProjectDetailList(isAdd) {
      GetProductDetail().then((res) => {
        if (res.success) {
          this.pubCodeDataList3 = this.uniqueByProperty(
            res.response,
            "product_detail_code"
          );
          if (isAdd) {
            this.form.product_detail_code =
              this.pubCodeDataList3.length > 0
                ? this.pubCodeDataList3[0].product_detail_code
                : "";
          }
        }
      });
    } /** 查询研发方案详情列表 */,
    GetBiddingInfoList(isAdd) {
      GetBiddingInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList4 = this.uniqueByProperty(
            res.response,
            "business_contract_code"
          );
          if (isAdd) {
            this.form.business_contract_code =
              this.pubCodeDataList4.length > 0
                ? this.pubCodeDataList4[0].business_contract_code
                : "";
          }
        }
      });
    } /** 查询生产计划列表 */,
    GetProductionPlanList(isAdd) {
      GetProductionPlan().then((res) => {
        if (res.success) {
          this.pubCodeDataList5 = this.uniqueByProperty(
            res.response,
            "plan_code"
          );
          if (isAdd) {
            this.form.plan_code =
              this.pubCodeDataList5.length > 0
                ? this.pubCodeDataList5[0].plan_code
                : "";
          }
        }
      });
    } /** 查询产品元器件信息列表 */,
    GetPubComponentInfoList(isAdd) {
      GetPubComponentInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList6 = this.uniqueByProperty(res.response, "code");
          if (isAdd) {
            this.form.new_component_code =
              this.pubCodeDataList6.length > 0
                ? this.pubCodeDataList6[0].code
                : "";
            this.form.old_component_code =
              this.pubCodeDataList6.length > 0
                ? this.pubCodeDataList6[0].code
                : "";
          }
        }
      });
    },
    getSelectList(isAdd) {
      this.GetProductProjectList(isAdd);
      this.GetProjectDetailList(isAdd);
      this.GetProductInfoList(isAdd);
      this.GetBiddingInfoList(isAdd);
      this.GetPubComponentInfoList(isAdd);
      this.GetProductionPlanList(isAdd);
    },
    /** 查询出勤统计列表 */
    getList() {
      this.loading = true;
      GetComponentChangeRecord(this.queryParams).then((res) => {
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
      this.getSelectList(true);
      this.form.change_type = "部分变更";
      this.form.change_result = "成功";
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
            UpdateComponentChangeRecord(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddComponentChangeRecord(this.form).then((res) => {
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
          DeleteComponentChangeRecord({ id: this.form.id }).then((res) => {
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
