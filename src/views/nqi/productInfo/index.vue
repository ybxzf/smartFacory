<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8" v-show="showSearch">
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
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['smartfactory:attendance:edit']"
          >修改</el-button
        >

        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
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
      v-loading="loading"
      :data="attendanceList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column
        label="产品编码"
        align="center"
        prop="expectedQuantity"
      />
      <el-table-column label="企业编码" align="center" prop="actualQuantity" />
      <el-table-column label="产品型号" align="center" prop="actualQuantity" />
      <el-table-column label="产品名称" align="center" prop="actualQuantity" />
      <el-table-column label="产品类别" align="center" prop="actualQuantity" />
      <el-table-column
        label="产品设计依据"
        align="center"
        prop="actualQuantity"
      />
      <el-table-column label="备注" align="center" prop="actualQuantity" />
      <el-table-column label="写入时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理标记" align="center" prop="actualQuantity" />
      <el-table-column label="通知时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知号" align="center" prop="actualQuantity" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出勤统计对话框 -->
    <el-dialog center :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="产品编码" prop="expectedQuantity">
          <el-input
            v-model="form.expectedQuantity"
            placeholder="请输入产品编码"
          />
        </el-form-item>
        <el-form-item label="企业编码" prop="actualQuantity">
          <el-input
            v-model="form.actualQuantity"
            placeholder="请输入企业编码"
          />
        </el-form-item>
        <el-form-item label="产品型号" prop="actualQuantity">
          <el-input
            v-model="form.actualQuantity"
            placeholder="请输入产品型号"
          />
        </el-form-item>
         <el-form-item label="产品名称" prop="actualQuantity">
          <el-input
            v-model="form.actualQuantity"
            placeholder="请输入产品名称"
          />
        </el-form-item>  <el-form-item label="产品类别" prop="actualQuantity">
          <el-input
            v-model="form.actualQuantity"
            placeholder="请输入产品类别"
          />
        </el-form-item><el-form-item label="产品设计依据" prop="actualQuantity">
          <el-input
            v-model="form.actualQuantity"
            placeholder="请输入产品设计依据"
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
  listAttendance,
  getAttendance,
  delAttendance,
  addAttendance,
  updateAttendance,
} from "@/api/smartfactory/attendance";

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
      attendanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key: null,
        expectedQuantity: null,
        actualQuantity: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询出勤统计列表 */
    getList() {
      this.loading = true;
      listAttendance(this.queryParams).then((response) => {
        this.attendanceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        date: null,
        expectedQuantity: null,
        actualQuantity: null,
      };
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
      this.open = true;
      this.title = "添加产品信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getAttendance(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateAttendance(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAttendance(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除出勤统计编号为"' + ids + '"的数据项？')
        .then(function () {
          return delAttendance(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
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
