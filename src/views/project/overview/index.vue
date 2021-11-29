<template>
  <div class="app-container">
    <el-form ref="queryForm" size="small" :inline="true" :model="queryParams">
      <el-form-item>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">创建</el-button>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="queryParams.name"
          placeholder="项目名称"
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
      v-loading="loading"
      :data="pageList"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="weiTuo" label="委托单位" />
      <el-table-column prop="address" label="工程地址" />
      <el-table-column prop="beginDate" label="开始日期" />
      <el-table-column prop="endDate" label="结束日期" />
      <el-table-column prop="status" label="进展状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===1" type="success">已完成</el-tag>
          <el-tag v-else type="info">正在进行</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
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

    <!-- 查看项目对话框 -->
    <el-dialog
      :title="viewDialog.title"
      :visible.sync="viewDialog.visible"
      width="500px"
      top="3vh"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col">
            <el-form-item label="项目名称：" prop="name">
              {{ form.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col">
            <el-form-item label="建设单位：" prop="shiGong">
              {{ form.shiGong }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col">
            <el-form-item label="工程地址：" prop="address">
              {{ form.address }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col">
            <el-form-item label="施工单位：" prop="jianShe">
              {{ form.jianShe }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col">
            <el-form-item label="委托单位：" prop="weiTtuo">
              {{ form.weiTuo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="联系人：" prop="lianXiRen">
              {{ form.lianXiRen }}
            </el-form-item>
          </el-col>
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="联系电话：" prop="phone">
              {{ form.phone }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="协议书编号：" prop="bianHao">
              {{ form.bianHao }}
            </el-form-item>
          </el-col>
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item v-if="form.leiBie===1" label="检验类别：">
              委托检验
            </el-form-item>
            <el-form-item v-if="form.leiBie===0" label="检验类别：">
              委托检验
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="开始日期：">
              {{ form.beginDate }}
            </el-form-item>
          </el-col>
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="结束日期：">
              {{ form.endDate }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" class="el-row">
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item label="显示排序：" prop="sort">
              {{ form.sort }}
            </el-form-item>
          </el-col>
          <el-col :gutter="0" class="el-col" :span="12">
            <el-form-item v-if="form.status===1" label="进展状态：">
              已完成
            </el-form-item>
            <el-form-item v-if="form.status===0" label="进展状态：">
              进行中
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialog.visible=false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 修改项目对话框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="800px"
      top="3vh"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >

        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="施工单位" prop="jianShe">
          <el-input v-model="form.jianShe" placeholder="请输入建设单位名称" />
        </el-form-item>
        <el-form-item label="建设单位" prop="shiGong">
          <el-input v-model="form.shiGong" placeholder="请输入施工单位名称" />
        </el-form-item>
        <el-form-item label="委托单位" prop="weiTtuo">
          <el-input v-model="form.weiTuo" placeholder="请输入委托单位名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="lianXiRen">
          <el-input v-model="form.lianXiRen" placeholder="请输入委托方联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入委托方联系电话" />
        </el-form-item>
        <el-form-item label="协议书编号" prop="bianHao">
          <el-input v-model="form.bianHao" placeholder="请输入协议书编号" />
        </el-form-item>
        <el-form-item label="检验类别">
          <el-select v-model="form.leiBie" placeholder="请选择">
            <el-option label="委托检验" :value="1" />
            <el-option label="监督抽查" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="form.beginDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="开始日期"
          />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            v-model="form.endDate"
            value-format="yyyy-MM-dd"
            placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" style="width: 100px" :min="0" />
        </el-form-item>
        <el-form-item label="进展状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">已完成</el-radio>
            <el-radio :label="0">进行中</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialog.visible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { list } from '@/api/project/overview'

export default {
  components: '',
  data() {
    return {
      loading: true,
      pageList: [],
      tableList: [],
      deptOptions: [],
      queryParams: {
        name: undefined,
        status: undefined
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
        name: undefined,
        jianShe: undefined,
        shiGong: undefined,
        weiTuo: undefined,
        leiBie: undefined,
        address: undefined,
        bianHao: undefined,
        lianXiRen: undefined,
        phone: undefined,
        beginDate: undefined,
        endDate: undefined,
        sort: 1,
        yeWuLeiXing: undefined,
        status: 0
      },
      rules: {
        name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.handleQuery()
  },
  methods: {
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
        name: undefined,
        status: undefined
      }
      this.handleQuery()
    },
    async handleAdd(row) {
      this.resetForm()
      this.dialog = {
        title: '创建项目',
        visible: true
      }
      // await this.loadDeptOptions()
      // if (row) {
      //   this.form.parentId = row.id
      // }
    },
    async handleView(row) {
      this.viewDialog = {
        title: '项目详情',
        visible: true
      }
      this.form = row
      // await this.loadDeptOptions()
      // if (row) {
      //   this.form.parentId = row.id
      // }
    },
    async handleUpdate(row) {
      this.resetForm()
      this.dialog = {
        title: '修改项目',
        visible: true
      }
      // // 项目下拉数据
      // await this.loadDeptOptions()
      // detail(row.id).then(response => {
      //   this.form = response.data
      // })
    },
    handleSubmit: function() {
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      //     const id = this.form.id
      //     if (id !== undefined) {
      //       update(id, this.form).then(() => {
      //         this.$message.success('修改成功')
      //         this.dialog.visible = false
      //         this.handleQuery()
      //       })
      //     } else {
      //       add(this.form).then(() => {
      //         this.$message.success('创建成功')
      //         this.dialog.visible = false
      //         this.handleQuery()
      //       })
      //     }
      //   }
      // })
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
        name: undefined,
        jianShe: undefined,
        shiGong: undefined,
        weiTuo: undefined,
        leiBie: undefined,
        address: undefined,
        bianHao: undefined,
        lianXiRen: undefined,
        phone: undefined,
        beginDate: undefined,
        endDate: undefined,
        sort: 1,
        yeWuLeiXing: undefined,
        status: 0
      }
    },
    loadDictOptions() {
      // getDictOptions().then(response => {
      //   this.deptOptions = [{
      //     id: 0,
      //     label: '无',
      //     children: response.data
      //   }]
      // })
    }
  }
}
</script>
<style scoped>
  .el-row {
    margin: 0 5px;
    display: flex;
    flex-wrap: wrap;
  }
  .el-row>>> .el-form-item label:after {
    content: " ";
    display: inline-block;
    width: 100%;
  }
  .el-row>>> .el-form-item__label {
    text-align: justify
  }
  .el-col {
    height: 4vh;
  }
</style>
<style>
  /*标题背景色*/
  .el-dialog .el-dialog__header  {
    /*background-color: #adaeb6;*/
    border-bottom: solid 1px darkgray;
  }
  /*body背景色*/
  .el-dialog .el-dialog__body  {
    /*background-color: #e0e0e0;*/
    /*margin: 10px;*/
    /*border: solid 1px;*/
    /*border-radius: 9px;*/
  }
</style>
