<template>
  <div>
    <el-card>
      <div slot="header">
        <header class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(name,index) in searchList" :key="index" :command="name">{{ name.valueName }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </header>
        <main class="main">
          <el-row>
            <el-col :span="12">
              <LineCharts title="搜索用户数" :value="sumValue.value" :percentage="sumValue.percentage" :type="sumValue.type" :name="sumValue.name" />
            </el-col>
            <el-col :span="12">
              <LineCharts title="人均搜索次数" :value="sumValue.average" :percentage="sumValue.averagePercentage" :type="sumValue.type" :name="sumValue.name" />
            </el-col>
          </el-row>
          <el-table
            :data="searchList"
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
              prop="valueName"
              label="搜索关键字"
              width="180"
            />
            <el-table-column
              prop="userSum"
              label="用户数"
              sortable
            />
            <el-table-column
              prop="percentage"
              sortable
              label="周涨幅"
            />
          </el-table>
        </main>
      </div>
    </el-card>
  </div>
</template>

<script>
import LineCharts from '@/views/dashboard/observe/charts/LineCharts.vue'
export default {
  name: 'Search',
  components: { LineCharts },
  data() {
    return {
      sumValue: {
        value: '18998',
        percentage: '35%',
        type: 1,
        average: 9.8,
        averagePercentage: '10%',
        name: ''
      },
      searchList: [
        {
          valueName: '华为',
          userSum: 18998,
          percentage: '35%',
          type: 1,
          average: 9.8,
          averagePercentage: '10%'
        },
        {
          valueName: '肯德基',
          userSum: 11998,
          percentage: '24%',
          type: 1,
          average: 10.8,
          averagePercentage: '11%'
        },
        {
          valueName: '耐克',
          userSum: 9998,
          percentage: '12%',
          type: 1,
          average: 7.8,
          averagePercentage: '8%'
        },
        {
          valueName: '特斯拉',
          userSum: 8998,
          percentage: '12%',
          type: 1,
          average: 6.8,
          averagePercentage: '7%'
        },
        {
          valueName: '海底捞',
          userSum: 6998,
          percentage: '10%',
          type: 1,
          average: 3.8,
          averagePercentage: '4%'
        }
      ]
    }
  },
  methods: {
    handleCommand(command) {
      this.sumValue.value = command.userSum
      this.sumValue.percentage = command.percentage
      this.sumValue.type = command.type
      this.sumValue.average = command.average
      this.sumValue.averagePercentage = command.averagePercentage
      this.sumValue.name = command.valueName
    }
  }
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
