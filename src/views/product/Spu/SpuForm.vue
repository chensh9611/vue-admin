<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spuInfo" :rules="rules">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="spuInfo.spuName" placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select
          v-model="spuInfo.tmId"
          placeholder="请选中品牌"
        >
          <el-option
            v-for="tm in tradeMark"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuInfo.description" placeholder="SPU描述" type="textarea" :autosize="{minRows: 5, maxRows: 10}" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImage"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}个属性可以选择`" v-model="attrIdAndName">
          <el-option :label="attr.name" :value="`${attr.id}:${attr.name}`" v-for="attr in unSelectSaleAttr" :key="attr.id" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 12px" :disabled="!attrIdAndName" @click="addAttrName">添加销售属性</el-button>
        <div>
          <el-table border style="width: 100%; margin-top: 4px" :data="spuInfo.spuSaleAttrList">
            <el-table-column label="序号" width="80" type="index" />
            <el-table-column label="属性名" width="150" prop="saleAttrName" />
            <el-table-column label="属性名称列表" prop="prop">
              <template slot-scope="{row}">
                <el-tag
                  v-for="(tag,index) in row.spuSaleAttrValueList"
                  :key="tag.id"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(index,row )"
                >
                  {{ tag.saleAttrValueName }}
                </el-tag>
                <el-input
                  v-if="row.inputVisible"
                  ref="saveTagInput"
                  v-model="row.inputValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="{row,$index}">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteSaleAttrName($index)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SpuForm',
  data() {
    const spuNameCheck = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback(new Error('名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuInfo: {
        category3Id: 0,
        description: '', // 描述
        id: 0,
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],
        spuName: '',
        spuSaleAttrList: [
        ],
        tmId: '' // 品牌Id
      },
      tradeMark: [],
      baseSale: [],
      spuImage: [],
      attrIdAndName: '',
      rules: {
        spuName: [
          { validator: spuNameCheck, trigger: 'blur' },
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    unSelectSaleAttr() {
      return this.baseSale.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    // 取消按钮
    cancel() {
      Object.assign(this._data, this.$options.data())
      this.$emit('changeScene', { scene: 0, flag: '' })
    },
    // 新增Spu
    async addSpu(category3Id) {
      this.spuInfo.category3Id = category3Id
      const tradeMarkResult = await this.$API.spu.reqGetTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMark = tradeMarkResult.data
      }
      const baseSaleResult = await this.$API.spu.reqGetBaseSaleAttrList()
      if (baseSaleResult.code === 200) {
        this.baseSale = baseSaleResult.data
      }
    },
    // 保存或者添加Spu
    addOrUpdateSpu() {
      this.$refs.form.validate(async(success) => {
        if (success) {
          this.spuInfo.spuImageList = this.spuImage.map((item) => {
            return {
              imgName: item.name,
              imgUrl: (item.response && item.response.data) || item.url
            }
          })
          const result = await this.$API.spu.reqAddOrUpdateSpu(this.spuInfo)
          if (result.code === 200) {
            this.$message.success('保存成功！')
            this.$emit('changeScene', { scene: 0, flag: this.spuInfo.id ? '修改' : '新增' })
          }
          Object.assign(this._data, this.$options.data())
        }
      })
    },
    // 删除属性名称
    handleClose(index, row) {
      return row.spuSaleAttrValueList.splice(index, 1)
    },
    // 添加属性，失去焦点
    handleInputConfirm(row) {
      row.inputVisible = false
      const { baseSaleAttrId, inputValue } = row
      // 新增的属性值不能为空
      if (inputValue.trim() === '') {
        this.$message.error('不能输入空的值')
        return
      }
      // 属性值不能重复
      const result = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue)
      if (result) {
        return this.$message.error('属性值重复了')
      }
      const newResult = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newResult)
    },
    // 添加属性值
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 删除属性名
    deleteSaleAttrName(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    },
    // 添加销售属性
    addAttrName() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuInfo.spuSaleAttrList.push(newSaleAttr)
    },
    // 获取数据
    async initSpuData(spu) {
      const supInfoResult = await this.$API.spu.reqGetSpuInfo(spu.id)
      if (supInfoResult.code === 200) {
        this.spuInfo = supInfoResult.data
      }
      const tradeMarkResult = await this.$API.spu.reqGetTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMark = tradeMarkResult.data
      }
      const baseSaleResult = await this.$API.spu.reqGetBaseSaleAttrList()
      if (baseSaleResult.code === 200) {
        this.baseSale = baseSaleResult.data
      }
      const spuImageResult = await this.$API.spu.reqGetSpuImageList(spu.id)
      if (spuImageResult.code === 200) {
        // elementUI需要数组中含有name和url
        const imageList = spuImageResult.data
        imageList.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImage = imageList
      }
    },
    // 图片上传成功回调
    handlerSuccess(response, file, fileList) {
      this.spuImage = fileList
    },
    // 删除照片墙的某一个图片的回调
    handleRemove(file, fileList) {
      this.spuImage = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
