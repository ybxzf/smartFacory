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
      <el-table-column label="产品编码" align="center" prop="product_code" />
      <el-table-column
        label="研发方案名称"
        align="center"
        prop="product_name"
      />
      <el-table-column label="产品型号" align="center" prop="product_type" />
      <el-table-column
        label="产品设计功能依据"
        align="center"
        prop="product_design_function_basis"
      />
      <el-table-column label="评审次数" align="center" prop="review_count" />
      <el-table-column label="变更次数" align="center" prop="change_count" />
      <el-table-column label="测试次数" align="center" prop="test_count" />
      <el-table-column label="文档数量" align="center" prop="files_count" />
      <el-table-column label="需求来源" align="center" prop="sources_demand" />
      <el-table-column label="附件" align="center" prop="fileName" />
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
      width="800px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="研发方案编号" prop="development_project_no">
              <el-input
                v-model="form.development_project_no"
                placeholder="请输入研发方案编号"
              />
            </el-form-item>
          </el-col>
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
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="研发方案名称" prop="product_name">
              <el-input
                v-model="form.product_name"
                placeholder="请输入研发方案名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
                  v-for="item in pubCodeDataList2"
                  :key="item.product_type"
                  :label="item.product_type"
                  :value="item.product_type"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="产品设计功能依据"
              prop="product_design_function_basis"
            >
              <el-input
                v-model="form.product_design_function_basis"
                placeholder="请输入产品设计功能依据"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评审次数" prop="review_count">
              <el-input
                v-model="form.review_count"
                placeholder="请输入评审次数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="变更次数" prop="change_count">
              <el-input
                v-model="form.change_count"
                placeholder="请输入变更次数"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试次数" prop="test_count">
              <el-input
                v-model="form.test_count"
                placeholder="请输入测试次数"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档数量" prop="files_count">
              <el-input
                v-model="form.files_count"
                placeholder="请输入文档数量"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求来源" prop="sources_demand">
              <el-input
                v-model="form.sources_demand"
                placeholder="请输入需求来源"
              />
            </el-form-item>
          </el-col>
        </el-row>

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
  GetProductDetail,
  GetProductProject,
  AddProductProject,
  UpdateProductProject,
  DeleteProductProject,
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
        product_name: [
          {
            required: true,
            message: "研发方案名称不能为空",
            trigger: "blur",
          },
        ],
        product_type: [
          { required: true, message: "产品型号不能为空", trigger: "blur" },
        ],
        product_design_function_basis: [
          {
            required: true,
            message: "产品设计功能依据不能为空",
            trigger: "blur",
          },
        ],
        change_count: [
          {
            required: true,
            message: "变更次数不能为空",
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
    /** 查询公共信息列表 */
    GetPubCodeList(isAdd) {
      this.GetProductInfoList(isAdd);
    } /** 查询产品信息列表 */,
    GetProductInfoList(isAdd) {
      GetProductInfo(this.queryParams).then((res) => {
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
            this.form.product_type =
              this.pubCodeDataList2.length > 0
                ? this.pubCodeDataList2[0].product_type
                : "";
          }
        }
      });
    },
    /** 查询研发方案列表 */
    getList() {
      this.loading = true;
      GetProductProject(this.queryParams).then((res) => {
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
          if (this.form.id != null) {
            UpdateProductProject(this.form).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddProductProject(this.form).then((res) => {
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
          DeleteProductProject(this.form).then((res) => {
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
