<template>
  <div class="detail-container">
    <header>
      <span>{{ title }}</span>
      <span>
        <svg class="icon">
          <use xlink:href="#icon-info" />
        </svg>
      </span>
    </header>
    <main>{{ content }}</main>
    <div class="card-charts">
      <slot name="charts" />
    </div>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['title','content']
}
</script>

<style lang="scss" scoped>
.detail-container {
  > header{
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
    font-size: 20px;
  }
  > main {
    font-size: 28px;
    font-family: inherit;
    padding: 10px;
  }
  .card-charts {
    height: 60px;
  }
  > footer {
    border-top: 1px solid #d9d9d9;
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
