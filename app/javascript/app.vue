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
import { onBeforeMount } from 'vue'
import store from 'main/store/base'

export default {
  setup() {
    onBeforeMount(() => {
      store.commit('user/setIsAuthorized', localStorage.getItem('token') || false)
    })
  },
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
