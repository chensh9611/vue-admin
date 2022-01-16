<template>
  <div class="card-container">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card>
          <Detail
            title="总销售额"
            content="￥ 12567"
          >
            <template slot="charts">
              <div class="week">
                <span>周同比：</span>
                <span class="number">56.56%</span>
                <svg class="icon">
                  <use xlink:href="#icon-up" />
                </svg>
              </div>
              <div class="day">
                <span>日同比：</span>
                <span class="number">12%</span>
                <svg class="icon">
                  <use xlink:href="#icon-down" />
                </svg>
              </div>
            </template>
            <template slot="footer">
              <div class="footer">
                <span>日销售额：</span>
                <span>￥&nbsp;8891</span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="访问量"
            content="8856"
          >
            <template slot="charts">
              <LineChart></LineChart>
            </template>
            <template slot="footer">
              <div class="footer">
                <span>日访问量：</span>
                <span>￥&nbsp;1200</span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="支付笔数"
            content="8856"
          >
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <div class="footer">
                <span>转化率：</span>
                <span>&nbsp;67%</span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="运营活动效果"
            content="77%"
          >
            <template slot="charts">
              <RectangleChart />
            </template>
            <template slot="footer">
              <div class="footer">
                <span class="activity">
                  周同比12%
                  <span class="week">
                    <svg class="icon">
                      <use xlink:href="#icon-up" />
                    </svg>
                  </span>
                  日同比12%
                  <span class="day">
                    <svg class="icon">
                      <use xlink:href="#icon-down" />
                    </svg>
                  </span>
                </span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from '@/views/dashboard/card/detail/Detail.vue'
import LineChart from '@/views/dashboard/card/charts/LineChart.vue'
import BarChart from '@/views/dashboard/card/charts/BarChart.vue'
import RectangleChart from '@/views/dashboard/card/charts/RectangleChart.vue'

export default {
  name: 'Card',
  components: {RectangleChart, BarChart, LineChart, Detail }
}
</script>

<style lang="scss" scoped>
.card-container{
  .week {
    padding-bottom: 10px;
    > svg {
      color: red;
    }
  }
  .day {
    padding-bottom: 10px;
    > svg {
      color: green;
    }
  }
  .number {
    padding: 0 4px 0 40px;
  }
  .footer{
    padding-top: 20px;
  }
  .activity {
    .week {
      color: red;
    }
    .day {
      color: green;
    }
  }
}

</style>
