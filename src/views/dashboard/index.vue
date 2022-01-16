<template>
  <div class="dashboard-container">
    <Card/>
  </div>
</template>

<script>

import Card from '@/views/dashboard/card/Card.vue'
export default {
  name: 'Dashboard',
  components: { Card }
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
