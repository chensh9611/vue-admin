<template>
  <div>
    <div class="sku-container">
      <el-card>
        <el-table border style="width: 100%" :data="records">
          <el-table-column label="序号" width="80" type="index" align="center" />
          <el-table-column label="名称" prop="skuName" align="center" />
          <el-table-column label="描述" prop="skuDesc" align="center" />
          <el-table-column label="默认图片" prop="skuImageList" align="center">
            <template slot-scope="{row}">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="重量(kg)" prop="weight" align="center" />
          <el-table-column label="价格(元)" prop="price" align="center" />
          <el-table-column label="操作" width="260" align="center">
            <template slot-scope="{row, $index}">
              <el-button v-if="row.isSale === 0" type="success" size="mini" icon="el-icon-top" @click="onSale(row)" />
              <el-button v-else type="info" size="mini" icon="el-icon-bottom" @click="cancelSale(row)" />
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="$message.info('此功能正在开发中')" />
              <el-button type="info" size="mini" icon="el-icon-document" @click="getSkuDetails(row)" />
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                style="padding-left: 10px"
                :title="`确定要删除${row.skuName}吗？`"
                @confirm="deleteSku(row)"
              >
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination
        :current-page="page"
        :page-sizes="[3,5,10,20]"
        :page-size="limit"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="getSkuData"
      />
      <el-drawer
        title="SKU详情页面"
        :visible.sync="drawer"
        size="50%"
        :show-close="false"
      >
        <el-row>
          <el-col :span="5">名称：</el-col>
          <el-col :span="16">{{ skuDetails.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述：</el-col>
          <el-col :span="16">{{ skuDetails.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格：</el-col>
          <el-col :span="16">{{ skuDetails.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性：</el-col>
          <el-col :span="16">
            <el-tag v-for="attrName in skuDetails.skuAttrValueList" :key="attrName.id" type="success">{{ attrName.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片：</el-col>
          <el-col :span="16">
            <template>
              <el-carousel>
                <el-carousel-item v-for="item in skuDetails.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="height: 300px;width: 300px;">
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // 当前页
      page: 1,
      // 一页显示多少数据
      limit: 3,
      // 总数据
      total: 0,
      // 当前页面数据
      records: [],
      skuDetails: {},
      drawer: false
    }
  },
  mounted() {
    this.getSkuData()
  },
  methods: {
    // 获取Sku详情
    async getSkuDetails(row) {
      const result = await this.$API.sku.reqGetSku(row.id)
      if (result.code === 200) {
        this.skuDetails = result.data
        this.drawer = true
      }
      console.log(result)
    },
    // 删除sku
    async deleteSku(row) {
      row.isSale = 0
      const result = await this.$API.sku.reqDeleteSku(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        row.isSale = 0
        this.$message.success('删除成功')
        await this.getSkuData()
      }
    },
    // 下架
    async cancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    // 上架
    async onSale(row) {
      const result = await this.$API.sku.reqOnSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line require-atomic-updates
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    // 获取sku列表数据
    async getSkuData(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    handleSizeChange(value) {
      this.limit = value
      this.getSkuData()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  padding: 10px;
}
.el-carousel {
  border: 1px solid #d3dce6;
  text-align: center;
}
</style>
