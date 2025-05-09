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
        label="研发方案编号"
        align="center"
        prop="development_project_no"
      />
      <el-table-column
        label="软件版本号"
        align="center"
        prop="software_version"
      />
      <el-table-column
        label="硬件版本号"
        align="center"
        prop="hardware_version"
      />
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
      width="420px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <!-- 第一行 -->
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
        <el-form-item label="软件版本号" prop="software_version">
          <el-input
            v-model="form.software_version"
            placeholder="请输入软件版本号"
          />
        </el-form-item>
        <el-form-item label="硬件版本号" prop="hardware_version">
          <el-input
            v-model="form.hardware_version"
            placeholder="请输入硬件版本号"
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
  GetProductProject,
  GetProjectDetail,
  AddProjectDetail,
  UpdateProjectDetail,
  DeleteProjectDetail,
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
        development_project_no: [
          { required: true, message: "研发方案编号不能为空", trigger: "blur" },
        ],
        software_version: [
          {
            required: true,
            message: "软件版本号不能为空",
            trigger: "blur",
          },
        ],
        hardware_version: [
          {
            required: true,
            message: "硬件版本号不能为空",
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
      GetProductProject(this.queryParams).then((res) => {
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
    /** 查询研发方案列表 */
    getList() {
      this.loading = true;
      GetProjectDetail(this.queryParams).then((res) => {
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
      this.GetProductProjectList(true);
      this.reset();
      this.open = true;
      this.title = "添加研发方案明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.GetProductProjectList(false);
      this.form = JSON.parse(JSON.stringify(this.currentRow));
      if (!this.form) {
        this.$message.error("请选择要修改的数据！");
        return;
      }
      this.open = true;
      this.title = "修改研发方案明细";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            UpdateProjectDetail(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            AddProjectDetail(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
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
          DeleteProjectDetail(this.form.id).then((res) => {
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
