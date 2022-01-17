<template>
  <div class="category-container">
    <el-card>
      <header class="header">
        <span>销售额类别占比</span>
        <div class="radio">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="全渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </header>
      <main>
        <PieCharts />
      </main>
    </el-card>
  </div>
</template>

<script>
import PieCharts from '@/views/dashboard/observe/charts/PieCharts.vue'
export default {
  name: 'Category',
  components: { PieCharts },
  data() {
    return {
      radioValue: '全渠道'
    }
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
}
</style>
