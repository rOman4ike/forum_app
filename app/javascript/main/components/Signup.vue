<template>
  <div class="signup-part">
    <div class="container">
      <div class="signup-inner">

        <div class="card mt-5">
          <div class="card-header">
            Signup
          </div>
          <div class="card-body">
            <form @submit.prevent="sendSignupForm()">
              <div class="mb-3">
                <label for="email">Email</label>
                <input class="form-control"
                  v-model="email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="name">Name</label>
                <input class="form-control"
                  v-model="name"
                  type="text"
                  id="name"
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
              <div class="mb-3">
                <label for="repeat-password">Repeat Password</label>
                <input class="form-control"
                  v-model="repeatPassword"
                  type="password"
                  id="repeat-password"
                >
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

export default {
  setup() {
    const email = ref('')
    const name = ref('')
    const password = ref('')
    const repeatPassword = ref('')

    function sendSignupForm(): void {
      console.log(email.value);
      console.log(name.value);
      console.log(password.value);
      console.log(repeatPassword.value);
    }

    return {
      email,
      name,
      password,
      repeatPassword,
      sendSignupForm
    }
  }
}
</script>

<style>

</style>