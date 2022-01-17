<template>
  <div class="sale-container">
    <el-card class="box-card">
      <header class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="access"></el-tab-pane>
        </el-tabs>
        <div class="sale-time">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </div>
      </header>
      <main class="main">
        <el-row>
          <el-col :span="18">
            <div ref="charts" class="charts"></div>
          </el-col>
          <el-col :span="6">
            <div class="ranking">
              <h3>{{ `门店${titleName}排名` }}</h3>
              <ul class="ranking-list">
                <li class="ranking-list-item">
                  <div class="index">
                    <span>1</span>
                  </div>
                  <div class="name">
                    <span>耐克官方旗舰店</span>
                  </div>
                  <div class="money">
                    <span>￥100012</span>
                  </div>
                </li>
                <li class="ranking-list-item">
                  <div class="index">
                    <span>2</span>
                  </div>
                  <div class="name">
                    <span>阿迪达斯</span>
                  </div>
                  <div class="money">
                    <span>￥98899</span>
                  </div>
                </li>
                <li class="ranking-list-item">
                  <div class="index">
                    <span>3</span>
                  </div>
                  <div class="name">
                    <span>海底捞</span>
                  </div>
                  <div class="money">
                    <span>￥89999</span>
                  </div>
                </li>
                <li class="ranking-list-item">
                  <div class="index">
                    <span>4</span>
                  </div>
                  <div class="name">
                    <span>三只松鼠</span>
                  </div>
                  <div class="money">
                    <span>￥79999</span>
                  </div>
                </li>
                <li class="ranking-list-item">
                  <div class="index">
                    <span>5</span>
                  </div>
                  <div class="name">
                    <span>肯德基</span>
                  </div>
                  <div class="money">
                    <span>￥69999</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </main>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      myCharts: null,
      date: []
    }
  },
  computed: {
    titleName() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    }
  },
  watch: {
    titleName() {
      this.myCharts.setOption({
        title: {
          text: this.titleName + '趋势'
        }
      })
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: this.titleName + '趋势'
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 500, 145, 888, 1245, 1112],
          type: 'bar'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    })
  },
  methods: {
    setDay() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style lang="scss" scoped>
.sale-container {
    .box-card {
      margin: 10px 0;
      .clearfix{
        .el-tabs__item{
          font-size: 16px;
        }
        position: relative;
        display: flex;
        justify-content: space-between;
        .tab {
          width: 100%;
        }
        .sale-time {
          position: absolute;
          right: 0;
          top: -10px;
          > span{
            padding: 0 8px;
            cursor:pointer;
          }
        }
        .date {
          margin: 0 10px;
        }
      }
      .main {
        .charts {
          width: 100%;
          height: 300px;
        }
        .ranking{
          > h3{
            margin: 0;
          }
          width: 100%;
          height: 300px;
          &-list {
            &-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px 0;
              .index{
                background: #333;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                > span {
                  padding-top: 3px;
                }
              }
              .name {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .right {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
}
</style>
