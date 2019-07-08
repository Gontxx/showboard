<template>
  <div id='app'>
    <yheader></yheader>
    <router-view></router-view>
  </div>
</template>

<script>
import yheader from '@/components/Header'

export default {
  name: 'App',
  components: { yheader }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
}
</style>
