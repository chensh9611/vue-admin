<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PieCharts',
  data() {
    return {
      myCharts: null
    }
  },
  props: ['value'],
  watch: {
    value: function() {
      if (this.value === '全渠道') {
        this.myCharts.setOption({
          title: {
            text: '',
            subtext: '',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '40',
              //     fontWeight: 'bold'
              //   }
              // },
              labelLine: {
                show: true
              },
              data: [
                { value: 1048, name: '母婴' },
                { value: 735, name: '护肤' },
                { value: 580, name: '衣服' },
                { value: 484, name: '鞋子' },
                { value: 300, name: '食品' }
              ]
            }
          ]
        })
      } else if (this.value === '线上') {
        this.myCharts.setOption({
          title: {
            text: '',
            subtext: '',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '40',
              //     fontWeight: 'bold'
              //   }
              // },
              labelLine: {
                show: true
              },
              data: [
                { value: 500, name: '母婴' },
                { value: 435, name: '护肤' },
                { value: 300, name: '衣服' },
                { value: 284, name: '鞋子' },
                { value: 180, name: '食品' }
              ]
            }
          ]
        })
      } else {
        this.myCharts.setOption({
          title: {
            text: '',
            subtext: '',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside'
              },
              // emphasis: {
              //   label: {
              //     show: true,
              //     fontSize: '40',
              //     fontWeight: 'bold'
              //   }
              // },
              labelLine: {
                show: true
              },
              data: [
                { value: 548, name: '母婴' },
                { value: 300, name: '护肤' },
                { value: 280, name: '衣服' },
                { value: 200, name: '鞋子' },
                { value: 120, name: '食品' }
              ]
            }
          ]
        })
      }
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts)
    this.myCharts.setOption({
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '母婴' },
            { value: 735, name: '护肤' },
            { value: 580, name: '衣服' },
            { value: 484, name: '鞋子' },
            { value: 300, name: '食品' }
          ]
        }
      ]
    })
    // 绑定事件
    this.myCharts.on('mouseover', (params) => {
      const { name, value } = params.data
      this.myCharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 481px;
}
</style>
