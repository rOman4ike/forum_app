<template>
  <div class="signup-part">
    <div class="container">
      <div class="signup-inner">

        <h1 class="mb-3">Signup</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendSignupForm({
              user: {
                name,
                email,
                password,
                password_confirmation
              }
            })">
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
                  v-model="password_confirmation"
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

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import store from 'main/store/base'
import { UserSignup } from 'main/types/user'

export default defineComponent({
  setup() {
    const user = reactive<UserSignup>({
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    })

    function sendSignupForm(params: { user: UserSignup }): void {
      store.dispatch('user/createUser', params).then(data => {
        if (data.ok) {
          store.commit('notice/setNotice', {
            title: "Success",
            text: 'asdfdsf',
            type: 'success'
          })
        }
      })
    }

    return {
      ...toRefs(user),
      sendSignupForm
    }
  },

})
</script>

<style>

</style>