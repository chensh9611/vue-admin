<template>
  <div>
    <el-card>
      <div slot="header">
        <header class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </header>
        <main class="main">
          <el-row>
            <el-col :span="12">
              <LineCharts />
            </el-col>
            <el-col :span="12">
              <LineCharts />
            </el-col>
          </el-row>
          <el-table
            border
            style="width: 100%"
          >
            <el-table-column
              prop="address"
              label="排名"
              type="index"
              width="80"
            />
            <el-table-column
              prop="prpo"
              label="搜索关键字"
              width="180"
            />
            <el-table-column
              prop="name"
              label="用户数"
              sortable
            />
            <el-table-column
              prop="address"
              sortable
              label="周涨幅"
            />
          </el-table>
        </main>
        <footer>
          <el-pagination
            class="foot"
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </footer>
      </div>
    </el-card>
  </div>
</template>

<script>
import LineCharts from '@/views/dashboard/observe/charts/LineCharts.vue'
export default {
  name: 'Search',
  components: { LineCharts }
}
</script>

<style lang="scss" scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.foot{
  text-align: right;
}
</style>
