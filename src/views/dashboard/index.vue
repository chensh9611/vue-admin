<template>
  <div class="dashboard-container">
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>

import Card from '@/views/dashboard/card/Card.vue'
import Sale from '@/views/dashboard/sale/Sale.vue'
import Observe from '@/views/dashboard/observe/Observe.vue'
export default {
  name: 'Dashboard',
  components: { Observe, Sale, Card }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
