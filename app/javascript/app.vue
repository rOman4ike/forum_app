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
      store.dispatch('ability/setAbilities', window.ability.abilities.models_abilities)
      document.querySelector('script[data-name="ability"]').remove()
    })
  },
  components: {
    TheHeader,
    TheAlert
  }
}
</script>

<style scoped>
</style>
