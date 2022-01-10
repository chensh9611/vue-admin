<template>
  <div class="spu-container">
    <el-card>
      <category-select :is-show="showMain" @getCategoryId="getCategoryId" />
    </el-card>
    <main>
      <el-card class="main">
        <div class="addSpu">
          <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        </div>
        <div class="spu-list">
          <el-table border style="width: 100%" :data="records">
            <el-table-column label="序号" width="80" type="index" />
            <el-table-column label="spu名称" width="width" prop="spuName" />
            <el-table-column label="spu描述" width="width" prop="description" />
            <el-table-column label="操作" width="width">
              <template slot-scope="{row, $index}">
                <el-tooltip content="添加sku" placement="top">
                  <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
                </el-tooltip>
                <el-tooltip content="修改spu" placement="top">
                  <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                </el-tooltip>
                <el-tooltip content="查看当前spu全部sku列表" placement="top">
                  <el-button type="info" icon="el-icon-document" size="mini"></el-button>
                </el-tooltip>
                <el-tooltip content="删除spu" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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

</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
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
      records: []
    }
  },
  methods: {
    handleSizeChange(value) {
      this.limit = value
      this.getSpuInfoList()
    },
    // 获取SpuList
    async getSpuInfoList(pager = 1) {
      this.page = pager
      const result = await this.$API.spu.reqgetSpuList(this.page, this.limit, this.category3Id)
      console.log(result)
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
