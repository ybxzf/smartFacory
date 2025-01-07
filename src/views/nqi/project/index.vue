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
      style="height: calc(100% - 100px)"
      v-loading="loading"
      :data="attendanceList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column
        label="研发方案编号"
        align="center"
        prop="actualQuantity"
      />
      <el-table-column label="产品编码" align="center" prop="actualQuantity" />
      <el-table-column
        label="研发方案名称"
        align="center"
        prop="expectedQuantity"
      />
      <el-table-column label="产品型号" align="center" prop="actualQuantity" />
      <el-table-column
        label="产品设计功能依据"
        align="center"
        prop="actualQuantity"
      />
      <el-table-column label="评审次数" align="center" prop="actualQuantity" />
      <el-table-column label="变更次数" align="center" prop="actualQuantity" />
      <el-table-column label="测试次数" align="center" prop="actualQuantity" />
      <el-table-column label="文档数量" align="center" prop="actualQuantity" />
      <el-table-column label="需求来源" align="center" prop="actualQuantity" />
      <el-table-column
        label="附件文件地址"
        align="center"
        prop="actualQuantity"
      />
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
      <el-table-column label="企业编号" align="center" prop="actualQuantity" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改出勤统计对话框 -->
    <el-dialog center :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="研发方案编号" prop="expectedQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入研发方案编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编码" prop="actualQuantity">
              <el-input
                v-model="form.actualQuantity"
                placeholder="请输入产品编码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="研发方案名称" prop="actualQuantity">
              <el-input
                v-model="form.actualQuantity"
                placeholder="请输入研发方案名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品型号" prop="actualQuantity">
              <el-input
                v-model="form.actualQuantity"
                placeholder="请输入产品型号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品设计功能依据" prop="actualQuantity">
              <el-input
                v-model="form.actualQuantity"
                placeholder="请输入产品设计功能依据"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评审次数" prop="actualQuantity">
              <el-input
                v-model="form.actualQuantity"
                placeholder="请输入评审次数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="变更次数" prop="expectedQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入变更次数"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试次数" prop="actualQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入测试次数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档数量" prop="actualQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入文档数量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求来源" prop="expectedQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入需求来源"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业编号" prop="actualQuantity">
              <el-input
                v-model="form.expectedQuantity"
                placeholder="请输入企业编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件" prop="actualQuantity">
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
      rules: {
        actualQuantity: [
          { required: true, message: "任务名称不能为空", trigger: "blur" },
        ],
        invokeTarget: [
          {
            required: true,
            message: "调用目标字符串不能为空",
            trigger: "blur",
          },
        ],
        cronExpression: [
          {
            required: true,
            message: "cron执行表达式不能为空",
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
      this.title = "添加产品详细信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getAttendance(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品详细信息";
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
    // 覆盖默认的上传行为
    requestUpload() {},
    // 上传预处理
    beforeUpload(file) {
      console.log(file);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(",")[1];
          console.log(base64Data);
          if (!this.formData) {
            this.formData = {
              expectedQuantity: [],
            };
          }
          this.formData.expectedQuantity.push({
            fileName: file.name,
            fileBase64: base64Data,
          });
          resolve(false); // 阻止默认上传，我们手动控制上传
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>
