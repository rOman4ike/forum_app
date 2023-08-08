<template>
  <div class="main-part">
    <div class="container">
      <div class="main-inner">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="mb-3">
            {{ $t('main.title') }}
          </h1>
          <button class="btn btn-primary" @click="sendAllUsersMessage()">Send</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue"

export default defineComponent({
  setup() {
    function sendAllUsersMessage(): void {
      Vue.http.post('/api/v1/users/send_messages').then(data => {
        console.log();
      })
    }

    return {
      sendAllUsersMessage
    }
  }
})
</script>

<style>

</style>