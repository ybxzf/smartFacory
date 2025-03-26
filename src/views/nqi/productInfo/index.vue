<template>
  <div style="height: 100%" class="app-container">
    <el-row :gutter="10" style="height: 40px" class="mb8" v-show="showSearch">
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
      :data="tableData"
      ref="tableData"
      highlight-current-row
      @row-click="rowClick"
      border
    >
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column
        label="产品编码"
        sortable
        align="center"
        prop="product_code"
      />
      <el-table-column label="企业编码" align="center" prop="enterprise_code" />
      <el-table-column label="产品型号" align="center" prop="product_type" />
      <el-table-column label="产品名称" align="center" prop="product_name" />
      <el-table-column label="产品类别" align="center" prop="product_categid" />
      <el-table-column
        label="产品设计依据"
        align="center"
        prop="product_design_basis"
      />
      <el-table-column label="备注" align="center" prop="remarks" />
      <el-table-column
        label="写入时间"
        align="center"
        sortable
        prop="write_date"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.write_date) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="处理标记" align="center" prop="actualQuantity" />
      <el-table-column label="通知时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知号" align="center" prop="actualQuantity" /> -->
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
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="产品编码" prop="product_code">
          <el-input v-model="form.product_code" placeholder="请输入产品编码" />
        </el-form-item>
        <el-form-item label="企业编码" prop="enterprise_code">
          <el-input
            v-model="form.enterprise_code"
            placeholder="请输入企业编码"
          />
        </el-form-item>
        <el-form-item label="产品型号" prop="product_type">
          <el-select
            v-model="form.product_type"
            auto-complete="off"
            style="width: 100%"
            size="mini"
            filterable
            placeholder="请选择产品型号"
            @change="refreshData"
          >
            <el-option
              v-for="item in pubCodeDataList"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <el-select
            v-model="form.product_name"
            auto-complete="off"
            style="width: 100%"
            size="mini"
            filterable
            placeholder="请选择产品名称"
            @change="refreshData"
          >
            <el-option
              v-for="item in pubCodeDataList1"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类别" prop="product_categid">
          <el-select
            v-model="form.product_categid"
            auto-complete="off"
            style="width: 100%"
            size="mini"
            filterable
            placeholder="请选择产品类别"
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
        <el-form-item label="产品设计依据" prop="product_design_basis">
          <el-input
            v-model="form.product_design_basis"
            placeholder="请输入产品设计依据"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            v-model="form.remarks"
            placeholder="请输入备注"
          />
        </el-form-item>
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
  GetProductInfo,
  AddProductInfo,
  UpdateProductInfo,
  DeleteProductInfo,
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
      // 产品信息列表
      tableData: [],
      pubCodeDataList: [],
      pubCodeDataList1: [],
      pubCodeDataList2: [],
      //选中行数据
      currentRow: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
        product_code: [
          { required: true, message: "产品编码不能为空", trigger: "blur" },
        ],
        enterprise_code: [
          {
            required: true,
            message: "企业编码不能为空",
            trigger: "blur",
          },
        ],
        product_type: [
          {
            required: true,
            message: "产品型号不能为空",
            trigger: "blur",
          },
        ],
        product_name: [
          { required: true, message: "产品名称不能为空", trigger: "blur" },
        ],
        product_categid: [
          {
            required: true,
            message: "产品类别不能为空",
            trigger: "blur",
          },
        ],
        product_design_basis: [
          {
            required: true,
            message: "产品设计依据不能为空",
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
    rowClick(row) {
      this.$refs.tableData.clearSelection();
      this.$refs.tableData.toggleRowSelection(row);
      this.currentRow = row;
    },
    /** 查询公共信息列表 */
    GetPubCodeList(isAdd) {
      GetPubCode({ key: "'PRODUCT_NAME','PRODUCT_CATEGID'" }).then((res) => {
        if (res.success) {
          this.pubCodeDataList = res.response.filter(
            (r) => r.codE_TYPE === "PRODUCT_NAME"
          );
          this.pubCodeDataList1 = [
            ...new Set(
              res.response
                .filter((r) => r.codE_TYPE === "PRODUCT_NAME")
                .map((y) => y.name)
            ),
          ];
          this.pubCodeDataList2 = res.response.filter(
            (r) => r.codE_TYPE === "PRODUCT_CATEGID"
          );
          if (isAdd) {
            this.form.product_type =
              this.pubCodeDataList.length > 0
                ? this.pubCodeDataList[0].value
                : "";
            this.form.product_name =
              this.pubCodeDataList1.length > 0 ? this.pubCodeDataList1[0] : "";
            this.form.product_categid =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].codE_ID
                : "";
          }
        }
      });
    },
    /** 查询产品信息列表 */
    getList() {
      this.loading = true;
      GetProductInfo(this.queryParams).then((res) => {
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
      this.GetPubCodeList(true);
      this.open = true;
      this.title = "添加产品信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.GetPubCodeList(false);
      this.form = JSON.parse(JSON.stringify(this.currentRow));
      if (!this.form) {
        this.$message.error("请选择要修改的产品信息！");
        return;
      }
      this.open = true;
      this.title = "修改产品信息";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            UpdateProductInfo(this.form).then((response) => {
              if (res.success) {  this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();} else {
              this.$message.error(res.msg);
            }
            });
          } else {
            AddProductInfo(this.form).then((response) => {
               if (res.success) { this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();} else {
              this.$message.error(res.msg);
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
        this.$message.error("请选择要删除的产品信息！");
        return;
      }
      this.$confirm("确认删除该产品信息吗？", "提示", { type: "warning" })
        .then(() => {
          DeleteProductInfo(this.form.id).then((res) => {
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
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "smartfactory/attendance/export",
        {
          ...this.queryParams,
        },
        `attendance_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
