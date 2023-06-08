<template>
  <div id="app">
    <the-header></the-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import TheHeader from 'common/components/TheHeader.vue'

export default {
  data: function () {
    return {
      message: "Hello Vue!a"
    }
  },
  methods: {
    testTS(message: string): string {
      return message + "heheh"
    }
  },
  components: {
    TheHeader
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
