<template>
  <div>
    <header>
      <span class="title">搜索用户数</span>
      <span class="icon-svg">
        <svg class="icon">
          <use xlink:href="#icon-info" />
        </svg>
      </span>
    </header>
    <main>
      <span class="left">7865</span>
      <span class="center">12%</span>
      <span class="right">
        <span class="up">
          <svg class="icon">
            <use xlink:href="#icon-up" />
          </svg>
        </span>
        <span class="down">
          <svg class="icon">
            <use xlink:href="#icon-down" />
          </svg>
        </span>

      </span>
    </main>
    <div ref="charts" class="charts"></div>
  </div>

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted() {
    const myCharts = echarts.init(this.$refs.charts)
    myCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [1, 12, 10, 22, 13, 23, 19, 1],
          type: 'line',
          smooth: true,
          // 拐点设置样式
          itemStyle: {
            opacity: 0
          },
          // 线条样式
          lineStyle: {
            color: '#D47AE8'
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#D47AE8' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style lang="scss" scoped>
header {
  padding-top: 10px;
  .icon-svg {
    color: #d9d9d9;
    padding-left: 20px;
  }
}
main {
  padding: 20px 0;
  .center{
    padding-left: 20px;
    padding-right: 10px;
  }
  .right {
    .up {
      color: red;
    }
    .down {
      color: green;
    }
  }
}
.charts {
  width: 100%;
  height: 60px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
