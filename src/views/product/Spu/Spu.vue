<template>
  <div class="spu-container">
    <el-card>
      <category-select :is-show="!scene" @getCategoryId="getCategoryId" />
    </el-card>
    <div v-show="scene === 0" class="spu-page">
      <main>
        <el-card class="main">
          <div class="addSpu">
            <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
          </div>
          <div class="spu-list">
            <el-table border style="width: 100%" :data="records">
              <el-table-column label="序号" width="80" type="index" />
              <el-table-column label="spu名称" width="width" prop="spuName" />
              <el-table-column label="spu描述" width="width" prop="description" />
              <el-table-column label="操作" width="width">
                <template slot-scope="{row}">
                  <el-tooltip content="添加sku" placement="top">
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSku(row)" />
                  </el-tooltip>
                  <el-tooltip content="修改spu" placement="top">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateSpu(row)" />
                  </el-tooltip>
                  <el-tooltip content="查看当前spu全部sku列表" placement="top">
                    <el-button type="info" icon="el-icon-document" size="mini" @click="showSkuList(row)" />
                  </el-tooltip>
                  <el-tooltip content="删除spu" placement="top">
                    <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      style="margin-left: 10px"
                      icon="el-icon-info"
                      icon-color="red"
                      :title="`确定要删除【${row.spuName}】吗？`"
                      @confirm="deleteSpu(row)"
                    >
                      <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
                    </el-popconfirm>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </main>
      <footer>
        <el-pagination
          :current-page="page"
          :page-sizes="[3,5,10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          :pager-count="7"
          @size-change="handleSizeChange"
          @current-change="getSpuInfoList"
        />
      </footer>
    </div>
    <el-card style="margin-top: 20px">
      <SpuForm v-show="scene === 1" ref="spu" @changeScene="changeScene" />
      <SkuForm v-show="scene === 2" ref="sku" @changeScene="skuChangeScene" />
    </el-card>
    <div class="sku-list">
      <el-dialog :title="`${spu.spuName}的Sku列表`" :visible.sync="dialogTableVisible" :before-close="closeDialog">
        <el-table :data="skuList" v-loading="loading">
          <el-table-column prop="skuName" width="width" label="名称" align="center"></el-table-column>
          <el-table-column prop="price" label="价格(元)" width="width" align="center"></el-table-column>
          <el-table-column prop="weight" label="重量(千克)" align="center"></el-table-column>
          <el-table-column propo="skuDefaultImg" label=" 默认图片" align="center">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import SpuForm from '@/views/product/Spu/SpuForm.vue'
import SkuForm from '@/views/product/Spu/SkuForm.vue'
export default {
  name: 'Spu',
  components: { SkuForm, SpuForm },
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      // 控制主内容区域显示隐藏
      showMain: true,
      // categoryId
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 当前页码
      page: 1,
      // 每页记录数
      limit: 3,
      // 总数
      total: 0,
      records: [],
      // 控制场景页面
      scene: 0,
      // 存储spu信息
      spu: {},
      // 存放sku列表
      skuList: [],
      loading: true
    }
  },
  methods: {
    // 关闭dialog回调
    closeDialog(done) {
      this.loading = true
      this.skuList = []
      done()
    },
    // 查看sku列表
    async showSkuList(spu) {
      this.dialogTableVisible = true
      this.spu = spu
      const result = await this.$API.skuForm.reqFindBySpuId(spu.id)
      console.log(result)
      if (result.code === 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    // skuForm取消按钮回调
    skuChangeScene(skuScene) {
      this.scene = skuScene
    },
    // 删除Spu
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message.success('删除成功！')
        await this.getSpuInfoList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // SPU子组件触发事件
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === '修改') {
        this.getSpuInfoList(this.page)
      } else {
        this.getSpuInfoList()
      }
    },
    // 新增Sku
    addSku(row) {
      this.scene = 2
      const { category1Id, category2Id } = this
      this.$refs.sku.getData(category1Id, category2Id, row)
      console.log(row)
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // 新增spu
    addSpu() {
      this.scene = 1
      this.$refs.spu.addSpu(this.category3Id)
    },
    handleSizeChange(value) {
      this.limit = value
      this.getSpuInfoList()
    },
    // 获取SpuList
    async getSpuInfoList(pager = 1) {
      this.page = pager
      const result = await this.$API.spu.reqgetSpuList(this.page, this.limit, this.category3Id)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 获取类型的3级Id
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else if (level === 3) {
        this.category3Id = categoryId
        this.getSpuInfoList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.spu-container{
  .main{
    margin-top: 20px;
    .addSpu{
      margin-bottom: 10px;
    }
  }
  footer{
    text-align: center;
  }
}

</style>
