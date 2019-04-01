<template>
  <div v-if="hash !== ''" class="hash-result" :class="{'top': top, 'bottom': !top}">本数据由数链实时获取<br/>{{hash}}</div>
</template>

<script>
export default {
  name: 'hashResult',
  props: {
    hash: {
      default: ''
    },
    top: {
      default: false
    }
  }
}
</script>

<style scoped>
  .hash-result {
    color: white;
    position: absolute;
    text-align: left;
    word-wrap: break-word;
    left: 15px;
  }
  .top {
    bottom: 0;
    max-width: 30%;
  }
  .bottom {
    bottom: 5px;
  }
</style>
