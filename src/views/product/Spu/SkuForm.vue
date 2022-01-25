<template>
  <div class="sku">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="点击输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="点击输入价格" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="点击输入重量" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          placeholder="点击输入规格描述"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="(attr) in attrList"
            :key="attr.id"
            :label="attr.attrName"
          >
            <el-select v-model="attr.attrIdAndName" placeholder="请选择活动区域">
              <el-option
                v-for="(attrValue) in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="(saleAttrValue) in spuSaleAttrList"
            :key="saleAttrValue.id"
            :label="saleAttrValue.saleAttrName"
          >
            <el-select v-model="saleAttrValue.saleAttrValueIdAndName" placeholder="请选择活动区域">
              <el-option
                v-for="(valueName) in saleAttrValue.spuSaleAttrValueList"
                :key="valueName.id"
                :label="valueName.saleAttrValueName"
                :value="`${saleAttrValue.id}:${valueName.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column label="图片" width="width" align="center">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button v-if="row.isDefault === 0" type="primary" size="mini" @click="changeIsDefault(row)">设为默认</el-button>
              <el-button v-else type="success" size="mini" plain disabled>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="addSku">保存</el-button>
        <el-button  @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SkuForm',
  data() {
    return {
      // spu图片列表
      spuImageList: [],
      // 销售属性列表
      spuSaleAttrList: [],
      // 平台属性列表
      attrList: [],
      // 存储spu
      spu: {},
      // 临时图片
      imageList: [],
      // sku数据
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        price: 0,
        skuAttrValueList: [
        ],
        skuDefaultImg: '',
        skuDesc: '',
        skuImageList: [
        ],
        skuName: '',
        skuSaleAttrValueList: [
        ],
        weight: ''
      }
    }
  },
  methods: {
    // 添加SKU回调
    async addSku() {
      // 格式化skuAttrValueList数据
      const { attrList, skuInfo, spuSaleAttrList, imageList } = this
      const arr = []
      attrList.forEach((item) => {
        if (item.attrIdAndName) {
          const [attrId, valueId] = item.attrIdAndName.split(':')
          const obj = { valueId, attrId }
          arr.push(obj)
        }
      })
      skuInfo.skuAttrValueList = arr
      // 格式化skuSaleAttrValueList数据
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrValueIdAndName) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrValueIdAndName.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 格式化skuInfo.skuImageList数据
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      console.log(this.skuInfo)
      const result = await this.$API.skuForm.reqSaveSkuInfo(this.skuInfo)
      if (result.code === 200) {
        this.$message.success('添加成功！')
        this.$emit('changeScene', 0)
      }

      Object.assign(this._data, this.$options.data())
    },
    // 取消按钮回调
    cancel() {
      Object.assign(this._data, this.$options.data())
      this.$emit('changeScene', 0)
    },
    // 设为默认
    changeIsDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 图片复选框选中事件
    handleSelectionChange(value) {
      this.imageList = value
    },
    // 获取初始数据
    async getData(category1Id, category2Id, sku) {
      this.spu = sku
      this.skuInfo.spuId = sku.id
      this.skuInfo.tmId = sku.tmId
      this.skuInfo.category3Id = sku.category3Id
      const spuImageListResult = await this.$API.skuForm.reqGetSpuImageList(sku.id)
      if (spuImageListResult.code === 200) {
        const list = spuImageListResult.data
        list.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      const spuSaleAttrListResult = await this.$API.skuForm.reqGetSpuSaleAttrList(sku.id)
      if (spuSaleAttrListResult.code === 200) {
        this.spuSaleAttrList = spuSaleAttrListResult.data
      }
      const attrListResult = await this.$API.skuForm.reqGetAttrList(category1Id, category2Id, sku.category3Id)
      if (attrListResult.code === 200) {
        this.attrList = attrListResult.data
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
