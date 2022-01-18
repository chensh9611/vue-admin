<template>
  <div class="sale-container">
    <el-card class="box-card">
      <header class="clearfix">
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale" />
          <el-tab-pane label="访问量" name="access" />
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
            <div ref="charts" class="charts" />
          </el-col>
          <el-col :span="6">
            <div class="ranking">
              <h3>{{ `门店${titleName}排名` }}</h3>
              <ul v-show="titleName === '销售额'" class="ranking-list">
                <li v-for="(sale,index) in saleValueAndName" :key="index" class="ranking-list-item">
                  <div class="index">
                    <span>{{ index+1 }}</span>
                  </div>
                  <div class="name">
                    <span>{{ sale.saleName }}</span>
                  </div>
                  <div class="money">
                    <span>{{ `￥${sale.saleValue}` }}</span>
                  </div>
                </li>
              </ul>
              <ul v-show="titleName === '访问量'" class="ranking-list">
                <li v-for="(access,index) in accessValueAndName" :key="index" class="ranking-list-item">
                  <div class="index">
                    <span>{{ index+1 }}</span>
                  </div>
                  <div class="name">
                    <span>{{ access.accessName }}</span>
                  </div>
                  <div class="money">
                    <span>{{ access.accessValue }}</span>
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
      date: [],
      dateValue: 'year',
      saleData: [300000, 288888, 198888, 98888, 78988, 188888, 103211, 122222, 88888, 98812, 300000, 283121],
      access: [13000, 18888, 9888, 18888, 9988, 8888, 10321, 2222, 9111, 8812, 30000, 13121],
      year: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      saleValueAndName: [
        {
          saleValue: '1100012',
          saleName: '耐克官方店'
        },
        {
          saleValue: '198899',
          saleName: '阿迪达斯'
        },
        {
          saleValue: '189999',
          saleName: '海底捞'
        },
        {
          saleValue: '179999',
          saleName: '三只松鼠'
        },
        {
          saleValue: '169999',
          saleName: '肯德基'
        }

      ],
      accessValueAndName: [
        {
          accessValue: '9120012',
          accessName: '阿迪达斯'
        },
        {
          accessValue: '8276543',
          accessName: '兰蔻官方店'
        },
        {
          accessValue: '7276543',
          accessName: '古驰官方店'
        },
        {
          accessValue: '6216543',
          accessName: '特斯拉官方店'
        },
        {
          accessValue: '5669999',
          accessName: '耐克'
        }
      ]
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
        },
        series: [
          {
            data: this.titleName === '销售额' ? this.saleData : this.access,
            type: 'bar'
          }
        ],
        xAxis: {
          data: this.year
        }
      })
    },
    date: function() {
      console.log(this.dateValue)
      if (this.dateValue === 'month') {
        this.accessValueAndName = [
          {
            accessValue: '1120012',
            accessName: '特斯拉旗舰店'
          },
          {
            accessValue: '1276543',
            accessName: '兰蔻官方店'
          },
          {
            accessValue: '1276543',
            accessName: '古驰官方店'
          },
          {
            accessValue: '1216543',
            accessName: '华为'
          },
          {
            accessValue: '1669999',
            accessName: '耐克'
          }
        ]
        this.saleValueAndName = [
          {
            saleValue: '190012',
            saleName: '华为旗舰店'
          },
          {
            saleValue: '188899',
            saleName: '耐克'
          },
          {
            saleValue: '179999',
            saleName: '海底捞'
          },
          {
            saleValue: '169999',
            saleName: '阿迪达斯'
          },
          {
            saleValue: '159999',
            saleName: '肯德基'
          }
        ]
      } else if (this.dateValue === 'year') {
        this.accessValueAndName = [
          {
            accessValue: '9120012',
            accessName: '阿迪达斯'
          },
          {
            accessValue: '8276543',
            accessName: '兰蔻官方店'
          },
          {
            accessValue: '7276543',
            accessName: '古驰官方店'
          },
          {
            accessValue: '6216543',
            accessName: '特斯拉官方店'
          },
          {
            accessValue: '5669999',
            accessName: '耐克'
          }
        ]
        this.saleValueAndName = [
          {
            saleValue: '1100012',
            saleName: '耐克官方店'
          },
          {
            saleValue: '198899',
            saleName: '阿迪达斯'
          },
          {
            saleValue: '189999',
            saleName: '海底捞'
          },
          {
            saleValue: '179999',
            saleName: '三只松鼠'
          },
          {
            saleValue: '169999',
            saleName: '肯德基'
          }
        ]
      } else if (this.dateValue === 'week') {
        this.accessValueAndName = [
          {
            accessValue: '80012',
            accessName: '阿迪达斯'
          },
          {
            accessValue: '76543',
            accessName: '兰蔻官方店'
          },
          {
            accessValue: '76543',
            accessName: '古驰官方店'
          },
          {
            accessValue: '66543',
            accessName: '特斯拉官方店'
          },
          {
            accessValue: '59999',
            accessName: '耐克'
          }
        ]
        this.saleValueAndName = [
          {
            saleValue: '90012',
            saleName: '耐克官方店'
          },
          {
            saleValue: '88899',
            saleName: '阿迪达斯'
          },
          {
            saleValue: '79999',
            saleName: '海底捞'
          },
          {
            saleValue: '69999',
            saleName: '三只松鼠'
          },
          {
            saleValue: '59999',
            saleName: '肯德基'
          }
        ]
      } else if (this.dateValue === 'day') {
        this.accessValueAndName = [
          {
            accessValue: '20012',
            accessName: '耐克'
          },
          {
            accessValue: '16543',
            accessName: '兰蔻官方店'
          },
          {
            accessValue: '14543',
            accessName: '三星官方店'
          },
          {
            accessValue: '11543',
            accessName: '特斯拉官方店'
          },
          {
            accessValue: '9999',
            accessName: '海底捞'
          }
        ]
        this.saleValueAndName = [
          {
            saleValue: '9012',
            saleName: '肯德基'
          },
          {
            saleValue: '8899',
            saleName: '阿迪达斯'
          },
          {
            saleValue: '7999',
            saleName: '耐克官方店'
          },
          {
            saleValue: '6999',
            saleName: '三只松鼠'
          },
          {
            saleValue: '5999',
            saleName: '华为'
          }
        ]
      }
    }
  },
  mounted() {
    // 初始化门店销售排名事件区间
    const start = dayjs().startOf('year').format('YYYY-MM-DD')
    const end = dayjs().endOf('year').format('YYYY-MM-DD')
    this.date = [start, end]
    // 初始化图表
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: this.titleName + '趋势'
      },
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [300000, 288888, 198888, 98888, 78988, 188888, 103211, 122222, 88888, 98812, 300000, 283121],
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
      this.dateValue = 'day'
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
      this.dateValue = 'week'
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
      this.dateValue = 'month'
    },
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
      this.dateValue = 'year'
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
