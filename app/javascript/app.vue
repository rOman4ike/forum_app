<template>
  <div id="app">
    <p>{{ testTS(message) }}</p>
  </div>
</template>

<script lang='ts'>


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
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
