<template>
  <div class="signup-part">
    <div class="container">
      <div class="signup-inner">

        <div class="card mt-5">
          <div class="card-header">
            Signup
          </div>
          <div class="card-body">
            <form @submit.prevent="sendSignupForm({
              user: {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
              }
            })">
              <div class="mb-3">
                <label for="email">Email</label>
                <input class="form-control"
                  v-model="user.email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="name">Name</label>
                <input class="form-control"
                  v-model="user.name"
                  type="text"
                  id="name"
                >
              </div>
              <div class="mb-3">
                <label for="password">Password</label>
                <input class="form-control"
                  v-model="user.password"
                  type="password"
                  id="password"
                >
              </div>
              <div class="mb-3">
                <label for="repeat-password">Repeat Password</label>
                <input class="form-control"
                  v-model="user.password_confirmation"
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
import { defineComponent, reactive } from 'vue'
import Vue from 'vue'

export default defineComponent({
  setup(props, context) {
    const user = reactive({
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    })

    function sendSignupForm(params) {
      Vue.http.post("/api/v1/users", params)
        .then(response => {
          console.log(response);
        })
    }

    return {
      user,
      sendSignupForm
    }
  }
})
</script>

<style>

</style>