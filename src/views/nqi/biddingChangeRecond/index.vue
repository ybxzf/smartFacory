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
        label="变更记录编号"
        align="center"
        prop="changE_RECORD_CODE"
      />
      <el-table-column label="变更类型" align="center" prop="changE_TYPE" />
      <el-table-column label="变更内容" align="center" prop="changE_CONTENT" />
      <el-table-column label="变更结论" align="center" prop="changE_RESULT" />
      <el-table-column label="变更时间" align="center" prop="changE_TIME" />
      <el-table-column
        label="商务合同编号"
        align="center"
        prop="businesS_CONTRACT_CODE"
      />
      <el-table-column
        label="产品详细信息编号"
        align="center"
        prop="producT_DETAIL_CODE"
      />
      <el-table-column
        label="变更后研发方案编号"
        align="center"
        prop="neW_PRODUCT_CODE"
      />
      <el-table-column
        label="变更后研发方案硬件版本号"
        align="center"
        prop="neW_PRODUCT_HARD_CODE"
      />
      <el-table-column
        label="变更后研发方案软件版本号"
        align="center"
        prop="neW_PRODUCT_SOFT_CODE"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="变更记录编号:" prop="changE_RECORD_CODE">
              <el-input
                v-model="form.changE_RECORD_CODE"
                placeholder="请输入变更记录编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更类型:" prop="changE_TYPE">
              <el-select
                v-model="form.changE_TYPE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择变更类型"
              >
                <el-option
                  v-for="item in changeTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="变更内容:" prop="changE_CONTENT">
              <el-input
                v-model="form.changE_CONTENT"
                placeholder="请输入变更内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更结论:" prop="changE_RESULT">
              <el-select
                v-model="form.changE_RESULT"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择变更结论"
              >
                <el-option
                  v-for="item in changeResultList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="变更时间:" prop="changE_TIME">
              <el-date-picker
                clearable
                v-model="form.changE_TIME"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择变更时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商务合同编号:" prop="businesS_CONTRACT_CODE">
              <el-select
                v-model="form.businesS_CONTRACT_CODE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择商务合同编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList1"
                  :key="item.business_contract_code"
                  :label="item.business_contract_code"
                  :value="item.business_contract_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品详细信息编号:" prop="producT_DETAIL_CODE">
              <el-select
                v-model="form.producT_DETAIL_CODE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择产品详细信息编号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList2"
                  :key="item.product_detail_code"
                  :label="item.product_detail_code"
                  :value="item.product_detail_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更后研发方案编号:" prop="neW_PRODUCT_CODE">
              <el-select
                v-model="form.neW_PRODUCT_CODE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择变更后研发方案编号"
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
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="变更后研发方案硬件版本号:"
              prop="neW_PRODUCT_HARD_CODE"
            >
              <el-select
                v-model="form.neW_PRODUCT_HARD_CODE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择变更后研发方案硬件版本号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList4"
                  :key="item.hardware_version"
                  :label="item.hardware_version"
                  :value="item.hardware_version"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="变更后研发方案软件版本号:"
              prop="neW_PRODUCT_SOFT_CODE"
            >
              <el-select
                v-model="form.neW_PRODUCT_SOFT_CODE"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                placeholder="请选择变更后研发方案软件版本号"
                @change="refreshData"
              >
                <el-option
                  v-for="item in pubCodeDataList5"
                  :key="item.software_version"
                  :label="item.software_version"
                  :value="item.software_version"
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
  GetProductDetail,
  GetComponentPurchasePlanInfo,
  GetBiddingInfo,
  GetBiddingChangeRecond,
  GetPubComponentInfo,
  AddBiddingChangeRecond,
  UpdateBiddingChangeRecond,
  DeleteBiddingChangeRecond,
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
      fileList: [],
      limit: 5,
      pubCodeDataList1: [],
      pubCodeDataList2: [],
      pubCodeDataList3: [],
      pubCodeDataList4: [],
      pubCodeDataList5: [],
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
      changeResultList: [
        { value: "成功", label: "成功" },
        { value: "失败", label: "失败" },
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        changE_RECORD_CODE: [
          {
            required: true,
            message: "变更记录编号不能为空",
            trigger: "blur",
          },
        ],
        changE_TYPE: [
          {
            required: true,
            message: "变更类型不能为空",
            trigger: "blur",
          },
        ],
        changE_CONTENT: [
          {
            required: true,
            message: "变更内容不能为空",
            trigger: "blur",
          },
        ],
        changE_RESULT: [
          {
            required: true,
            message: "变更结论不能为空",
            trigger: "blur",
          },
        ],
        changE_TIME: [
          {
            required: true,
            message: "变更时间不能为空",
            trigger: "blur",
          },
        ],
        businesS_CONTRACT_CODE: [
          {
            required: true,
            message: "商务合同编号不能为空",
            trigger: "blur",
          },
        ],
        producT_DETAIL_CODE: [
          {
            required: true,
            message: "产品详细信息编号不能为空",
            trigger: "blur",
          },
        ],
        neW_PRODUCT_CODE: [
          {
            required: true,
            message: "变更后研发方案编号不能为空",
            trigger: "blur",
          },
        ],
        neW_PRODUCT_HARD_CODE: [
          {
            required: true,
            message: "变更后研发方案硬件版本不能为空",
            trigger: "blur",
          },
        ],
        neW_PRODUCT_SOFT_CODE: [
          {
            required: true,
            message: "变更后研发方案软件版本号不能为空",
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
    },
    //获取商务合同编号列表
    GetBiddingInfoList(isAdd) {
      GetBiddingInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList1 = this.uniqueByProperty(
            res.response,
            "business_contract_code"
          );
          if (isAdd) {
            this.form.businesS_CONTRACT_CODE =
              this.pubCodeDataList1.length > 0
                ? this.pubCodeDataList1[0].business_contract_code
                : "";
          }
        }
      });
    } /** 查询研发方案详情列表 */,
    GetProductDetailList(isAdd) {
      GetProductDetail().then((res) => {
        if (res.success) {
          this.pubCodeDataList2 = this.uniqueByProperty(
            res.response,
            "product_detail_code"
          );
          if (isAdd) {
            this.form.producT_DETAIL_CODE =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].product_detail_code
                : "";
          }
        }
      });
    } /** 查询研发方案列表 */,
    GetProductProjectList(isAdd) {
      GetProductProject().then((res) => {
        if (res.success) {
          this.pubCodeDataList3 = this.uniqueByProperty(
            res.response,
            "development_project_no"
          );
          if (isAdd) {
            this.form.neW_PRODUCT_CODE =
              this.pubCodeDataList3.length > 0
                ? this.pubCodeDataList3[0].development_project_no
                : "";
          }
        }
      });
    } /** 查询研发方案详情列表 */,
    GetProjectDetailList(isAdd) {
      GetProjectDetail().then((res) => {
        if (res.success) {
          this.pubCodeDataList4 = this.uniqueByProperty(
            res.response,
            "hardware_version"
          );
          this.pubCodeDataList5 = this.uniqueByProperty(
            res.response,
            "software_version"
          );
          if (isAdd) {
            this.form.neW_PRODUCT_HARD_CODE =
              this.pubCodeDataList4.length > 0
                ? this.pubCodeDataList4[0].hardware_version
                : "";
            this.form.neW_PRODUCT_SOFT_CODE =
              this.pubCodeDataList5.length > 0
                ? this.pubCodeDataList5[0].software_version
                : "";
          }
        }
      });
    },
    getSelectList(isAdd) {
      this.GetProductProjectList(isAdd);
      this.GetProductDetailList(isAdd);
      this.GetBiddingInfoList(isAdd);
      this.GetProjectDetailList(isAdd);
    },
    /** 查询出勤统计列表 */
    getList() {
      this.loading = true;
      GetBiddingChangeRecond(this.queryParams).then((res) => {
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
      this.form.changE_TYPE = "部分变更";
      this.form.changE_RESULT = "成功";
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
            UpdateBiddingChangeRecond(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddBiddingChangeRecond(this.form).then((res) => {
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
          DeleteBiddingChangeRecond({ id: this.form.id }).then((res) => {
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
