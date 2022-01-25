<template>
  <div class="tradeMark-container">
    <!--   添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" size="small " style="margin: 10px 0" @click="visibleDialog">添加</el-button>
    <!--  表格组件展示将来需要展示的数据  -->
    <el-table style="width: 100%;" border :data="tradeMarkList" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <!--column属性：
            1.label：显示标题
            2.width：对应列的宽度
            3.align：标题对齐方式
            4.elementUI的table组件是以列来展示数据
            5.prop:对应列内容的字段名
            -->
      <el-table-column type="index" label="序号" width="width" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="height: 60px; width: 60px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器：
            current-page:代表的是当前第几页
            total：代表的是分页器一共展示多少条数据
            page-size：代表的是每一页展示多少条数据
            page-sizes:代表的是设置每一页展示多少条数据
            layout：实现分页布局
            pager-count:按钮的数量，如果 7 页面连续数量为5
      -->
    <div style="text-align: center">
      <el-pagination
        :current-page="page"
        :page-sizes="[3,5,10]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        :pager-count="7"
        @size-change="handleSizeChange"
        @current-change="getTradeMarkData"
      />
    </div>

    <!--     新增(修改)品牌对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <!--  from表单的 ：model属性，把表单的数据收集到哪个对象身上，表单验证也需要这个属性    -->
      <el-form ref="ruleForm" :model="tradeMarkForm" :rules="rules">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="tradeMarkForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
          <!-- action： 设置图片上传的地址
                  :on-success 检测图片是否上传成功，上传之后执行一次
                  ：before-upload,可以在图片上传之前，执行一次
                  -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 输入品牌名称校验
    const valueStyle = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      if (!reg.test(value)) {
        return callback(new Error('输入的字符类型不对'))
      } else {
        callback() // 切记要有返回函数
      }
    }
    return {
      // 对象身上的属性要与接口文档一致
      tradeMarkForm: {
        tmName: '',
        logoUrl: '',
        id: ''
      },
      // 当前页码
      page: 1,
      // 每页记录数
      limit: 3,
      // 总数
      total: 0,
      // 品牌数据列表
      tradeMarkList: [],
      // 控制对话框是否显示
      dialogFormVisible: false,
      // input宽度
      formLabelWidth: '120px',
      imageUrl: '', // 图片存放地址
      title: '', // 修改、新增品牌title
      rules: {
        tmName: [
          { required: true, message: '品牌名称不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
          { validator: valueStyle, trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.getTradeMarkData()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // res:上传成功之后返回前端数据
      // file:上传成功之后服务器返回前端数据
      this.tradeMarkForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGOrPNG && isLt2M
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm('是否删除该品牌？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          await this.getTradeMarkData(this.tradeMarkList.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 添加品牌
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrTradeMark(this.tradeMarkForm)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.tradeMarkForm.id ? '修改成功!' : '新增成功！'
            })
          }
          this.dialogFormVisible = false
          await this.getTradeMarkData(this.tradeMarkForm.id ? this.page : this.page = 1)
        }
      })
    },
    // 获取品牌数据
    async getTradeMarkData(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.trademark.reqGetTradeMarkList(page, limit)
      if (result.code === 200) {
        this.tradeMarkList = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(value) {
      this.limit = value
      this.getTradeMarkData()
    },
    visibleDialog() {
      this.title = '添加品牌'
      this.dialogFormVisible = true
      // 添加之前先清空数据
      this.tradeMarkForm.tmName = ''
      this.tradeMarkForm.logoUrl = ''
    },
    updateTradeMark(row) {
      this.title = '修改品牌'
      this.dialogFormVisible = true
      // 浅拷贝
      this.tradeMarkForm = { ...row }
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
