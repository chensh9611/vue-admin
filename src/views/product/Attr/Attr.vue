<template>
  <div class="attr-container">
    <el-card style="margin: 20px 0;">
      <CategorySelect :is-show="!attrInfo.attrName" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="attrVisible" class="attr-list">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3Id"
          @click="addAttrInfo"
        >添加属性</el-button>
        <el-table border style="width: 100%;" :data="attrList">
          <el-table-column label="序号" width="80" prop="prop" type="index" align="center" />
          <el-table-column label="属性名称" width="150" prop="attrName" />
          <el-table-column label="属性值列表" width="width" prop="prop">
            <template slot-scope="{row}">
              <el-tag
                v-for="tag in row.attrValueList"
                :key="tag.id"
                type="info"
              >
                {{ tag.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" prop="prop">
            <template slot-scope="{row}">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateAttrInfo(row)" />
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                style="margin-left: 10px"
                :title="`确定要删除属性名称【${row.attrName}】`"
                @onConfirm="deleteAttrInfo(row)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!attrVisible" class="add-attr">
        <el-form ref="from" :rules="rules" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名" prop="attrName">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" @blur="verifyAttrName" />
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 20px">
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled="attrInfo.attrName === '' "
            @click="addAttrValue"
          >添加属性值</el-button>
          <el-button @click="attrVisible=true">取消</el-button>
        </div>
        <el-table border style="width: 100%;" :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                @keyup.native.e.esc="toLook(row)"
              />
              <span v-else style="display: block; cursor: pointer" @click="toInput(row,$index)">{{ row.valueName }}</span>

            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                :title="`确定要删除属性名称【${row.valueName}】`"
                @onConfirm="deleteAttrName($index)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button
            type="primary"
            :disabled="attrInfo.attrValueList.length<1"
            @click="addOrUpdateAttrInfo"
          >保存</el-button>
          <el-button @click="attrVisible=true">取消</el-button>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep.js'
export default {
  name: 'Attr',
  data() {
    const attrNameCheck = (rule, value, callback) => {
      const isRepeat = this.attrNameList.indexOf(this.attrInfo.attrName.replace(/\s+/g, '')) >= 0
      if (value.trim() === '') {
        return callback(new Error('属性名不能为空'))
      } else if (isRepeat) {
        return callback(new Error('属性名重复'))
      }
    }
    return {
      // 表单校验
      rules: {
        attrName: [
          { required: true, message: '属性名不能为空', trigger: 'blur' },
          { validator: attrNameCheck, trigger: 'blur' }
        ]
      },
      flag: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 类别列表
      attrList: [],
      // 控制列表是否显示
      attrVisible: true,
      attrInfo: {
        attrName: '',
        attrValueList: [
        ],
        categoryId: 0,
        categoryLevel: 3
      },
      // 判断属性名称是否重复
      isRepeat: false,
      // 判断能否发送新增或修改保存请求
      isSave: false
    }
  },
  computed: {
    // 属性名列表
    attrNameList() {
      const attr = []
      // eslint-disable-next-line no-empty
      for (let i = 0; i < this.attrList.length; i++) {
        attr.push(this.attrList[i].attrName)
      }
      return attr
    }
  },
  // updated() {
  //   console.log(this.attrNameList)
  // },
  methods: {
    // 更新或者添加属性
    async addOrUpdateAttrInfo() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item) => {
        if (item.valueName === '') {
          this.$message({
            type: 'error',
            message: '属性名称不能为空！'
          })
          this.isSave = false
          return true
        } else if (this.isRepeat) {
          this.isSave = false
          return true
        } else {
          delete item.flag
          this.isSave = true
          return true
        }
      })
      if (this.isRepeat) {
        this.$message({
          type: 'error',
          message: '属性名称重复了，请修改数据再保存'
        })
      }
      console.log(this.isSave)
      if (this.isSave) {
        try {
          const result = await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo)
          if (result.code === 200) {
            this.attrVisible = true
            this.$message.success('保存成功')
            await this.getAttrInfoList()
          }
        } catch (e) {
          alert(e)
        }
      }
    },
    // 删除属性值
    deleteAttrName(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 格式化attrName
    verifyAttrName() {
      this.attrInfo.attrName = this.attrInfo.attrName.replace(/\s+/g, '')
    },
    // 输入属性名称后触发回调
    toLook(row) {
      const isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          row.valueName = row.valueName.replace(/\s+/g, '')
          return row.valueName === item.valueName
        }
      })
      if (row.valueName.trim() === '') {
        this.$notify.error({
          title: '提示',
          message: '属性名称不能为空！'
        })
      } else if (isRepeat) {
        this.isRepeat = isRepeat
        this.$notify.error({
          title: '提示',
          message: `属性名称:[${row.valueName.trim()}]重复了！`
        })
      } else {
        this.isRepeat = false
        row.flag = false
      }
    },
    // 点击span触发回调
    toInput(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 添加addAttrValue
    addAttrValue() {
      this.isSave = false
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
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
        this.getAttrInfoList()
      }
    },
    async getAttrInfoList() {
      const { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqGetAttrInf(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    // 添加属性
    addAttrInfo() {
      this.attrVisible = false
      // 清除数据，并且收集3级分类ID
      this.attrInfo = {
        attrName: '',
        attrValueList: [
        ],
        categoryId: this.category3Id,
        categoryLevel: 3
      }
    },
    // 删除属性
    async deleteAttrInfo(row) {
      console.log(row)
      try {
        const result = await this.$API.attr.reqDeleteAttrInfo(row.id)
        if (result.code === 200) {
          this.$message.success('删除成功')
          await this.getAttrInfoList()
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 修改属性
    updateAttrInfo(row) {
      this.isSave = false
      this.attrVisible = false
      // 因为数据复杂，要用深拷贝
      this.attrInfo = cloneDeep(row)
      // 修改属性名称的时候加flag
      this.attrInfo.attrValueList.forEach((item) => {
        // $set添加响应式数据
        this.$set(item, 'flag', false)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
