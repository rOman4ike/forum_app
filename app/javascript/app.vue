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
    TheHeader,
    TheAlert
  },
  errorCaptured(err, component, info) {
    console.log(err);
    console.log(component);
    console.log(info);
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
