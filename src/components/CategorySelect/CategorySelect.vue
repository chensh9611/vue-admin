<template>
  <div>
    <el-form :inline="true" :model="categoryFrom" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="categoryFrom.category1Id" placeholder="请选择" @change="getCategoryTwoList">
          <el-option v-for="c1 in categoryOneList" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryFrom.category2Id" placeholder="请选择" @change="getCategoryThreeList">
          <el-option v-for="c2 in categoryTwoList" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryFrom.category3Id" placeholder="请选择" @change="handler">
          <el-option v-for="c3 in categoryThreeList" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      // 一级分类数据
      categoryOneList: [],
      // 二级分类的数据
      categoryTwoList: [],
      // 三级
      categoryThreeList: [],
      // 收集1、2、3级分类的Id
      categoryFrom: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategoryOneList()
  },
  methods: {
    // 获取一级分类的数据
    async getCategoryOneList() {
      const result = await this.$API.attr.reqGetCategoryOne()
      if (result.code === 200) {
        this.categoryOneList = result.data
      }
    },
    // 获取二级分类的数据
    async getCategoryTwoList() {
      this.categoryTwoList = []
      this.categoryThreeList = []
      this.categoryFrom.category2Id = ''
      this.categoryFrom.category3Id = ''
      const { category1Id } = this.categoryFrom
      const result = await this.$API.attr.reqGetCategoryTwo(category1Id)
      if (result.code === 200) {
        this.categoryTwoList = result.data
      }
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })
    },
    async getCategoryThreeList() {
      this.categoryThreeList = []
      this.categoryFrom.category3Id = ''
      const { category2Id } = this.categoryFrom
      const result = await this.$API.attr.reqGetCategoryThree(category2Id)
      if (result.code === 200) {
        this.categoryThreeList = result.data
      }
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
    },
    handler() {
      const { category3Id } = this.categoryFrom
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
