<template>
  <div class="signup-part">
    <div class="container">
      <div class="signup-inner">

        <h1 class="mb-3">{{ $t('signup.title') }}</h1>
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
                <label for="email">{{ $t('signup.form.email') }}</label>
                <input class="form-control"
                  v-model="email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="name">{{ $t('signup.form.name') }}</label>
                <input class="form-control"
                  v-model="name"
                  type="text"
                  id="name"
                >
              </div>
              <div class="mb-3">
                <label for="password">{{ $t('signup.form.password') }}</label>
                <input class="form-control"
                  v-model="password"
                  type="password"
                  id="password"
                >
              </div>
              <div class="mb-3">
                <label for="repeat-password">{{ $t('signup.form.password_confirmation') }}</label>
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
import { router } from 'main/routes'

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
        console.log(data);
        if (data.ok) {
          console.log(store.state.user);
          localStorage.setItem('token', data.data.token)
          store.commit('user/setIsAuthorized', true)
          store.commit('notice/setNotice', {
            title: "Success",
            text: 'asdfdsf',
            type: 'success'
          })
          router.push({ name: 'user_index' })
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