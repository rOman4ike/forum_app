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
import { defineComponent, reactive } from 'vue'
import Vue from 'vue'
import store from 'main/store/base'
import User from 'main/types/user'
// import router from 'main/routes/index'

export default defineComponent({
  setup(props, context) {
    console.log(store);
    const user = reactive<User>({
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
    })

    // ПРИМЕРЫ
    // router.push('/')
    // const note = computed(() => store.state.currentNote)
    // const age = ref<number | string>(23)

    function sendSignupForm(params) {
      Vue.http.post("/api/v1/users", params)
        .then(response => {
          console.log(response);
        })
    }

    return {
      ...user,
      sendSignupForm
    }
  },
  // Вызывается каждый раз, когда юзер покидает страницу компонента
  // beforeRouteLeave(to, from, next) {}
})
</script>

<style>

</style>