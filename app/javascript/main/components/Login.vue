<template>
  <div class="login-part">
    <div class="container">
      <div class="login-inner">

        <h1 class="mb-3">Login</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendLoginForm()">
              <div class="mb-3">
                <label for="email">Email</label>
                <input class="form-control"
                  v-model="email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="password">Password</label>
                <input class="form-control"
                  v-model="password"
                  type="password"
                  id="password"
                >
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input"
                  v-model="remember"
                  type="checkbox"
                  id="remember"
                >
                <label class="form-check-label" for="remember">Remember me</label>
              </div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')
    const remember = ref(false)

    function sendLoginForm(): void {
      console.log(email.value);
      console.log(password.value);
      console.log(remember.value);
    }

    return {
      email,
      password,
      remember,
      sendLoginForm,
    }
  }
})
</script>

<style>

</style>