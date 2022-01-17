<template>
  <div class="dashboard-container">
    <Card />
    <Sale />
  </div>
</template>

<script>

import Card from '@/views/dashboard/card/Card.vue'
import Sale from '@/views/dashboard/sale/Sale.vue'
export default {
  name: 'Dashboard',
  components: {Sale, Card }
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
