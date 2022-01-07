<template>
  <div class="attr-container">
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId"/>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  },
  methods: {
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
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
