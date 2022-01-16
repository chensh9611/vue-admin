<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RectangleChart',
  mounted() {
    const rectangleEcharts = echarts.init(this.$refs.charts)
    rectangleEcharts.setOption({
      xAxis: {
        show: false,
        // 最大值和最小值
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        // 均分
        type: 'category'
      },
      series: {
        data: [78],
        type: 'bar',
        barWidth: 10,
        color: '#516BEB',
        showBackground: true,
        backgroundStyle: {
          color: '#eee'
        },
        // 文本
        label: {
          show: true,
          formatter: '|',
          position: 'right'
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
