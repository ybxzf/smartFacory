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
      <el-table-column label="采购编号" align="center" prop="purchase_code" />
      <el-table-column
        label="元器件编号"
        align="center"
        prop="component_code"
      />
      <el-table-column label="供应商企业编号" align="center" prop="supplier_enterprise_code" />
      <el-table-column label="采购数量" align="center" prop="purchase_num" />
      <el-table-column
        label="到货时间"
        align="center"
        prop="arrived_time"
      /><el-table-column label="写入时间" align="center" prop="write_date" />
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
            <el-form-item label="采购编号" prop="purchase_code">
              <el-input
                v-model="form.purchase_code"
                placeholder="请输入采购编号"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="元器件编号" prop="component_code">
              <el-select
                v-model="form.component_code"
                auto-complete="off"
                style="width: 100%"
                size="mini"
                filterable
                @change="refreshData"
                placeholder="请选择旧元器件编号"
              >
                <el-option
                  v-for="item1 in pubCodeDataList1"
                  :key="item1.code"
                  :label="item1.code + ':' + item1.name"
                  :value="item1.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="供应商企业编号"
              prop="supplier_enterprise_code"
            >
              <el-input
                v-model="form.supplier_enterprise_code"
                placeholder="请输入供应商企编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采购数量" prop="purchase_num">
              <el-input
                v-model="form.purchase_num"
                placeholder="请输入采购数量"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="到货时间" prop="arrived_time">
              <el-date-picker
                clearable
                v-model="form.arrived_time"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择变更时间"
              >
              </el-date-picker>
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
  GetComponentPurchasePlanInfo,GetPubComponentInfo ,
  AddComponentPurchasePlanInfo,
  UpdateComponentPurchasePlanInfo,
  DeleteComponentPurchasePlanInfo,
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
        supplier_enterprise_code: [
          {
            required: true,
            message: "供应商企业编号不能为空",
            trigger: "blur",
          },
        ],
        purchase_code: [
          {
            required: true,
            message: "采购编号不能为空",
            trigger: "blur",
          },
        ],
        component_code: [
          {
            required: true,
            message: "元器件编号不能为空",
            trigger: "blur",
          },
        ],
        purchase_num: [
          {
            required: true,
            message: "采购数量不能为空",
            trigger: "blur",
          },
        ],
        arrived_time: [
          {
            required: true,
            message: "到货时间不能为空",
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
    } , /** 查询产品元器件信息列表 */
    GetPubComponentInfoList(isAdd) {
      GetPubComponentInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList1 = this.uniqueByProperty(res.response, "code");
          if (isAdd) {
            this.form.component_code =
              this.pubCodeDataList1.length > 0
                ? this.pubCodeDataList1[0].code
                : "";
          }
        }
      });
    },
    getSelectList(isAdd) {
      // this.GetProductProjectList(isAdd);
      // this.GetProjectDetailList(isAdd);
      this.GetPubComponentInfoList(isAdd);
      // this.GetPubCodeList(isAdd);
    },
    /** 查询出勤统计列表 */
    getList() {
      this.loading = true;
      GetComponentPurchasePlanInfo(this.queryParams).then((res) => {
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
            UpdateComponentPurchasePlanInfo(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddComponentPurchasePlanInfo(this.form).then((res) => {
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
          DeleteComponentPurchasePlanInfo({ id: this.form.id }).then((res) => {
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
