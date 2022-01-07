<template>
  <div class="attr-container">
    <el-card style="margin: 20px 0;">
      <CategorySelect/>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  mounted() {
    this.getCategoryOneList()
  },
  methods: {
    async getCategoryOneList() {
      let result = await this.$API.attr.reqGetCategoryOne()
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
