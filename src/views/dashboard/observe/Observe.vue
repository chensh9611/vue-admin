<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from '@/views/dashboard/observe/Search.vue'
import Category from '@/views/dashboard/observe/Category.vue'
export default {
  name: 'Observe',
  components: { Category, Search }
}
</script>

<style lang="scss" scoped>

</style>
