<template>
  <p>
    {{ message }}
  </p>
  <h3>asdfasdfasdf</h3>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: "hello there"
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