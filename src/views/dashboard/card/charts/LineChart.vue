<template>
  <div ref="charts" class="charts" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted() {
    const myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
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

</style>
