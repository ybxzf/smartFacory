<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属线体" prop="lineBody">
        <el-input
          v-model="queryParams.lineBody"
          placeholder="请输入所属线体"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监控位置" prop="monitoringPosition">
        <el-input
          v-model="queryParams.monitoringPosition"
          placeholder="请输入监控位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['smartfactory:camera:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['smartfactory:camera:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['smartfactory:camera:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cameraList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="所属线体" align="center" prop="lineBody" />
      <el-table-column label="监控位置" align="center" prop="monitoringPosition" />
      <el-table-column label="监控品牌" align="center" prop="monitoringBrand" />
      <el-table-column label="预留1" align="center" prop="reserved1" />
      <el-table-column label="预留2" align="center" prop="reserved2" />
      <el-table-column label="预留3" align="center" prop="reserved3" />
      <el-table-column label="预留4" align="center" prop="reserved4" />
      <el-table-column label="预留5" align="center" prop="reserved5" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['smartfactory:camera:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['smartfactory:camera:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改摄像头对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属线体" prop="lineBody">
          <el-input v-model="form.lineBody" placeholder="请输入所属线体" />
        </el-form-item>
        <el-form-item label="监控位置" prop="monitoringPosition">
          <el-input v-model="form.monitoringPosition" placeholder="请输入监控位置" />
        </el-form-item>
        <el-form-item label="监控品牌" prop="monitoringBrand">
          <el-input v-model="form.monitoringBrand" placeholder="请输入监控品牌" />
        </el-form-item>
        <el-form-item label="预留1" prop="reserved1">
          <el-input v-model="form.reserved1" placeholder="请输入预留1" />
        </el-form-item>
        <el-form-item label="预留2" prop="reserved2">
          <el-input v-model="form.reserved2" placeholder="请输入预留2" />
        </el-form-item>
        <el-form-item label="预留3" prop="reserved3">
          <el-input v-model="form.reserved3" placeholder="请输入预留3" />
        </el-form-item>
        <el-form-item label="预留4" prop="reserved4">
          <el-input v-model="form.reserved4" placeholder="请输入预留4" />
        </el-form-item>
        <el-form-item label="预留5" prop="reserved5">
          <el-input v-model="form.reserved5" placeholder="请输入预留5" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCamera, getCamera, delCamera, addCamera, updateCamera } from "@/api/smartfactory/camera";

export default {
  name: "Camera",
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
      // 摄像头表格数据
      cameraList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lineBody: null,
        monitoringPosition: null,
        monitoringBrand: null,
        reserved1: null,
        reserved2: null,
        reserved3: null,
        reserved4: null,
        reserved5: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询摄像头列表 */
    getList() {
      this.loading = true;
      listCamera(this.queryParams).then(response => {
        this.cameraList = response.rows;
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
        lineBody: null,
        monitoringPosition: null,
        monitoringBrand: null,
        reserved1: null,
        reserved2: null,
        reserved3: null,
        reserved4: null,
        reserved5: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加摄像头";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCamera(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改摄像头";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCamera(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCamera(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除摄像头编号为"' + ids + '"的数据项？').then(function() {
        return delCamera(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('smartfactory/camera/export', {
        ...this.queryParams
      }, `camera_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
