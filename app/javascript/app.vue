<template>
  <div id="app">
    <the-header></the-header>
    <the-alert></the-alert>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import TheHeader from 'common/components/TheHeader.vue'
import TheAlert from 'common/components/TheAlert.vue'

export default {
  components: {
    TheHeader,
    TheAlert
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
