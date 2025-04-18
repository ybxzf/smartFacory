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
    <el-row :gutter="10" style="height: calc(100% - 90px)">
      <el-col :span="24 - tableWidth">
        <el-scrollbar>
          <el-table
            ref="tableData"
            class="custom-table"
            :data="tableData"
            v-loading="loading"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            highlight-current-row
            border
            size="small"
            @row-click="rowClick"
            row-key="Id"
            lazy
            stripe
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="55"
            />
            <el-table-column prop="comment_project_no" label="元器件清单编号" />
            <el-table-column prop="product_code" label="产品编码" />
            <el-table-column
              label="产品详细信息编号"
              prop="product_detail_code"
            >
            </el-table-column>
            <el-table-column
              label="研发方案编号"
              prop="development_project_no"
            /><el-table-column
              label="硬件版本号"
              prop="hardware_version"
            /><el-table-column label="写入时间" prop="write_date" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="currentRow != scope.row || tableWidth === 0"
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  style="color: #1491a8"
                  >查看</el-button
                >
                <el-button
                  v-if="tableWidth === 6 && currentRow === scope.row"
                  @click="handleRefresh(scope.row)"
                  type="text"
                  size="small"
                  style="color: #df4834"
                  >收起</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-col>
      <el-col :span="tableWidth" style="height: 100%">
        <el-table
          ref="tableData1"
          :data="tableData1"
          style="height: 100%; overflow-y: auto"
          v-loading="loading1"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          border
          size="small"
          row-key="Id"
          lazy
          stripe
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55"
          />
          <el-table-column
            label="元器件编号"
            prop="component_code"
            align="center"
          />
          <el-table-column
            label="元器件位号"
            prop="component_position"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
            <el-form-item label="元器件清单编号" prop="comment_project_no">
              <el-input
                v-model="form.comment_project_no"
                placeholder="请输入元器件清单编号"
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
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="硬件版本号" prop="hardware_version">
              <el-input
                v-model="form.hardware_version"
                placeholder="请输入硬件版本号"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <div v-for="(item, index) in formData" :key="index">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="component_code" label="元器件编号">
                <el-select
                  v-model="item.component_code"
                  auto-complete="off"
                  style="width: 100%"
                  size="mini"
                  filterable
                  placeholder="请选择元器件编号"
                >
                  <el-option
                    v-for="item1 in pubCodeDataList4"
                    :key="item1.code"
                    :label="item1.code + ':' + item1.name"
                    :value="item1.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="component_position" label="元器件位号">
                <el-input
                  v-model="item.component_position"
                  placeholder="请输入元器件位号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="index === formData.length - 1">
            <el-button type="primary" @click="addRow">添加一行</el-button>
          </el-form-item>
        </div>
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
  GetComponentDetailLists,
  GetProductDetail,
  AddComponentDetailList,
  UpdateComponentDetailList,
  GetPubComponentInfo,
  DeleteComponentDetailList,
} from "@/api/nqi/nqi";
export default {
  name: "Attendance",
  data() {
    return {
      // 遮罩层
      loading: true,
      loading1: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: false,
      // 非多个禁用
      multiple: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 出勤统计表格数据
      tableData: [],
      tableData1: [],
      currentRow: null,
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
      tableWidth: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        key: null,
      },
      formData: [{ component_code: "", component_position: "" }],
      // 表单参数
      form: {},
      formList: {},
      // 表单校验
      rules: {
        comment_project_no: [
          {
            required: true,
            message: "元器件清单编号不能为空",
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
        development_project_no: [
          {
            required: true,
            message: "研发方案编号不能为空",
            trigger: "blur",
          },
        ],
        // component_code: [
        //   {
        //     required: true,
        //     message: "元器件编号不能为空",
        //     trigger: "blur",
        //   },
        // ],component_position: [
        //   {
        //     required: true,
        //     message: "元器件位号不能为空",
        //     trigger: "blur",
        //   },
        // ],
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
    addRow() {
      this.formData.push({
        component_code:
          this.pubCodeDataList4.length > 0 ? this.pubCodeDataList4[0].code : "",
        component_position: "",
      });
    },
    handleRefresh(val) {
      this.tableWidth = 0;
    },
    // 行点击
    rowClick(row) {
      this.$refs.tableData.clearSelection();
      this.$refs.tableData.toggleRowSelection(row);
      if (this.tableWidth !== 6) {
        this.tableWidth = 6;
        this.getTableData1(row.comment_project_no);
      } else {
        let valId = row ? row.write_date : "-1";
        let rowId = this.currentRow ? this.currentRow.write_date : "-1";
        if (valId === rowId) {
          this.tableWidth = 0;
        } else {
          this.getTableData1(row.comment_project_no);
        }
      }
      this.currentRow = row;
    },
    handleClick(val) {
      this.tableWidth = 6;
      this.getTableData1(row.comment_project_no);
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
    /** 查询产品详细信息列表 */
    GetProductDetailList(isAdd) {
      GetProductDetail().then((res) => {
        if (res.success) {
          this.pubCodeDataList3 = this.uniqueByProperty(
            res.response,
            "product_detail_code"
          );
          this.pubCodeDataList3 = res.response;
          if (isAdd) {
            this.form.product_detail_code =
              this.pubCodeDataList3.length > 0
                ? this.pubCodeDataList3[0].product_detail_code
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
    } /** 查询产品元器件信息列表 */,
    GetPubComponentInfoList(isAdd) {
      GetPubComponentInfo().then((res) => {
        if (res.success) {
          this.pubCodeDataList4 = this.uniqueByProperty(res.response, "code");
          if (isAdd) {
            this.addRow();
          }
        }
      });
    },
    /** 查询产品元器件清单列表 */
    getList() {
      this.loading = true;
      GetComponentDetailList(this.queryParams).then((res) => {
        if (res.success) {
          this.tableData = res.response;
          this.total = res.dataCount;
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getTableData1(key) {
      this.loading1 = true;
      GetComponentDetailLists({ key: key }).then((response) => {
        this.tableData1 = response.response;
        this.formData = this.tableData1;
        this.loading1 = false;
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
      this.formData = [];
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
      this.GetProductProjectList(true);
      this.GetProductInfoList(true);
      this.GetProductDetailList(true);
      this.GetPubComponentInfoList(true);
      this.open = true;
      this.title = "添加元器件清单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.GetProductProjectList(false);
      this.GetProductInfoList(false);
      this.GetProductDetailList(false);
      this.GetPubComponentInfoList(false);
      // getAttendance(id).then((response) => {
     this.form = JSON.parse(JSON.stringify(this.currentRow));
      this.open = true;
      this.title = "修改元器件清单";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            UpdateComponentDetailList({
              nqiComponentDetail: this.form,
              nqiComponentDetailListEx: this.formData,
            }).then((res) => {
              if (res.success) {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            AddComponentDetailList({
              nqiComponentDetail: this.form,
              nqiComponentDetailListEx: this.formData,
            }).then((res) => {
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
        this.$message.error("请选择要删除的产品信息！");
        return;
      }
      this.$confirm("确认删除该产品信息吗？", "提示", { type: "warning" })
        .then(() => {
          DeleteComponentDetailList(this.form).then((res) => {
            if (res.success) {
              this.tableWidth = 0;
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
<style scoped lang="scss">
.app-container {
  ::v-deep .el-table__body tr.current-row > td.el-table__cell {
    color: #ffffff;
    background-color: #1890ff !important;
  }
}
</style>
