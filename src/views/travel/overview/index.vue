<template>
  <div class="app-container">
    <el-form ref="queryForm" size="small" :inline="true" :model="queryParams">
      <el-form-item>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">创建</el-button>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="queryParams.realName"
          placeholder="报账人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryParams.departments"
          placeholder="部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryParams.travelers"
          placeholder="出差人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryParams.reportDate"
          placeholder="报销日期"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :v-loading="loading"
      :data="pageList"
      row-key="id"
      border
    >
      <el-table-column align="center" prop="reportDate" label="报销日期" width="150" />
      <el-table-column align="center" prop="realName" label="报账人" width="100" />
      <el-table-column align="center" prop="departments" label="部门" width="200" />
      <el-table-column align="center" prop="travelers" label="出差人员" width="200" />
      <el-table-column align="center" prop="purposeForTrip" label="出差事由" />
      <el-table-column align="center" width="100" prop="receiptCount" label="单据张数" />
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-view"
            size="mini"
            circle
            plain
            @click.stop="handleView(scope.row)"
          />
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            plain
            @click.stop="handleUpdate(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            plain
            @click.stop="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-row style="text-align: center;margin-top: 1px;">
      <pagination
        v-show="pagination.total>0"
        :limit.sync="pagination.limit"
        :page.sync="pagination.page"
        :total="pagination.total"
        style="padding: 0"
        @pagination="handleQuery"
      />
    </el-row>

    <!-- 查看差旅费报销单 -->
    <el-dialog
      :title="viewDialog.title"
      :visible.sync="viewDialog.visible"
      width="500px"
      top="3vh"
    >
      <el-form>
        ......
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialog.visible=false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 修改项目对话框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="60%"
      top="3vh"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="55px"
      >
        <el-row :gutter="2">
          <el-col :span="22">
            <el-form-item prop="departments" label="部门">
              <el-input v-model="form.departments" type="textarea" autosize :rows="2" placeholder="请输入部门，多人用空格分隔，默认为填报人所在部门" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="2px">
              <el-button type="success">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="2">
          <el-col :span="9">
            <el-form-item prop="travelers" label="人员">
              <el-input v-model="form.travelers" type="textarea" autosize :rows="2" placeholder="请输入出差人员，多人用空格分隔" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="2px">
              <el-button type="success">选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="purposeForTrip" label="事由">
              <el-input v-model="form.purposeForTrip" type="textarea" autosize :rows="2" placeholder="请输入出差事由" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="张数">
              <el-input v-model="form.receiptCount" placeholder="单据张数" />
            </el-form-item>
          </el-col>
        </el-row>
        <div v-for="(item, index) in form.details" :key="index">
          <el-divider direction="horizontal" content-position="left"><b>报销单详情 {{ index + 1 }}</b></el-divider>
          <el-row :gutter="4">
            <el-col :span="7">
              <el-form-item label="起日">
                <el-date-picker
                  v-model="item.beginDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="起始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="止日">
                <el-date-picker
                  v-model="item.endDate"
                  value-format="yyyy-MM-dd"
                  placeholder="截止日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7" align="right">
              <el-form-item label="地点">
                <el-input v-model="item.destination" placeholder="出差地点" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="0px">
                <el-button type="success">选择</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="2">
            <el-col :span="4">
              <el-form-item label="车船">
                <el-input v-model="item.vehicleVesselFare" placeholder="车船费" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="路桥">
                <el-input v-model="item.oilRoadBridgeFare" placeholder="路桥费" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="火车">
                <el-input v-model="item.trainFare" placeholder="火车费" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="飞机">
                <el-input v-model="item.airFare" placeholder="飞机费" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="住宿">
                <el-input v-model="item.accommodationFare" placeholder="住宿费" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="杂费">
                <el-input v-model="item.miscFare" placeholder="杂费" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-divider direction="horizontal" />
        <el-row>
          <el-col>
            <el-button type="success" @click="addDetail">添加报销详情</el-button>
            <el-button type="danger" @click="deleteDetail">删除报销详情</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialog.visible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, add, update, detail } from '@/api/travel/overview'
export default {
  components: '',
  data() {
    return {
      loading: true,
      pageList: [],
      tableList: [],
      dictItems: [],
      queryParams: {
        realName: undefined,
        departments: undefined,
        travelers: undefined,
        reportDate: undefined
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      dialog: {
        title: undefined,
        visible: false
      },
      viewDialog: {
        title: undefined,
        visible: false
      },
      form: {
        id: undefined,
        sort: undefined,
        departments: undefined,
        travelers: '',
        purposeForTrip: '',
        receiptCount: undefined,
        details: [
          {
            beginDate: '',
            endDate: '',
            destination: '',
            vehicleVesselFare: '',
            oilRoadBridgeFare: '',
            trainFare: '',
            airFare: '',
            accommodationFare: '',
            miscFare: ''
          }
        ]
      },
      rules: {
        travelers: [
          { required: true, message: '出差人员不能为空', trigger: 'blur' }
        ],
        purposeForTrip: [
          { required: true, message: '出差事由不能为空', trigger: 'blur' }
        ],
        beginDate: [
          { required: true, message: '起始日期不能为空', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '截止日期不能为空', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '出差地点不能为空', trigger: 'blur' }
        ],
        receiptCount: [
          { required: true, message: '单据张数不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.handleQuery()
  },
  methods: {
    addDetail() {
      if (this.form.details.length < 4) {
        this.form.details.push(
          {
            travelers: '',
            purposeForTrip: '',
            beginDate: '',
            endDate: '',
            destination: '',
            vehicleVesselFare: '',
            oilRoadBridgeFare: '',
            trainFare: '',
            airFare: '',
            accommodationFare: '',
            miscFare: ''
          }
        )
      }
    },
    deleteDetail() {
      const maxIndex = this.form.details.length - 1
      if (maxIndex > 0) {
        this.form.details.splice(maxIndex, 1)
      }
    },
    handleQuery() {
      this.queryParams.page = this.pagination.page
      this.queryParams.limit = this.pagination.limit
      list(this.queryParams).then(response => {
        const { data, total } = response
        this.pageList = data
        this.pagination.total = total
        this.loading = false
      })
    },
    handleReset() {
      this.queryParams = {
        realName: undefined,
        departments: undefined,
        travelers: undefined,
        reportDate: undefined
      }
      this.handleQuery()
    },
    async handleAdd() {
      this.resetForm()
      this.dialog = {
        title: '填写报销单',
        visible: true
      }
    },
    async handleView(row) {
      this.$router.push(
        {
          path: '/travel/pdf/' + row.id
        }
      )
    },
    async handleUpdate(row) {
      this.resetForm()
      this.dialog = {
        title: '修改报销单',
        visible: true
      }
      detail(row.id).then(response => {
        this.form = response.data
      })
    },
    handleSubmit: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const id = this.form.id
          if (id !== undefined) {
            update(id, this.form).then(() => {
              this.$message.success('修改成功')
              this.dialog.visible = false
              this.handleQuery()
            })
          } else {
            add(this.form).then(() => {
              this.$message.success('创建成功')
              this.dialog.visible = false
              this.handleQuery()
            })
          }
        }
      })
    },
    handleDelete(row) {
      // const ids = [row.id || this.ids].join(',')
      // this.$confirm('确认删除已选中的数据项?', '警告', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   leiBie: 'warning'
      // }).then(() => {
      //   del(ids).then(() => {
      //     console.log(ids)
      //     this.$message.success('删除成功')
      //     this.handleQuery()
      //   })
      // }).catch(() =>
      //   this.$message.info('已取消删除')
      // )
    },
    resetForm() {
      this.form = {
        sort: undefined,
        travelers: undefined,
        details: [
          {
            travelers: '',
            purposeForTrip: '',
            beginDate: '',
            endDate: '',
            destination: '',
            vehicleVesselFare: '',
            oilRoadBridgeFare: '',
            trainFare: '',
            airFare: '',
            accommodationFare: '',
            miscFare: ''
          }
        ]
      }
    }
  }
}
</script>
<!--<style scoped>-->
<!--  .el-row {-->
<!--    margin: 0 5px;-->
<!--    display: flex;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--  .el-row>>> .el-form-item label:after {-->
<!--    content: " ";-->
<!--    display: inline-block;-->
<!--    width: 100%;-->
<!--  }-->
<!--  .el-row>>> .el-form-item__label {-->
<!--    text-align: justify-->
<!--  }-->
<!--  .el-col {-->
<!--    height: 4vh;-->
<!--  }-->
<!--</style>-->
<!--<style>-->
<!--  /*标题背景色*/-->
<!--  .el-dialog .el-dialog__header  {-->
<!--    /*background-color: #adaeb6;*/-->
<!--    border-bottom: solid 1px darkgray;-->
<!--  }-->
<!--  /*body背景色*/-->
<!--  .el-dialog .el-dialog__body  {-->
<!--    /*background-color: #e0e0e0;*/-->
<!--    /*margin: 10px;*/-->
<!--    /*border: solid 1px;*/-->
<!--    /*border-radius: 9px;*/-->
<!--  }-->
<!--</style>-->
