<template>
  <div class="login-part">
    <div class="container">
      <div class="login-inner">

        <h1 class="mb-3">{{ $t('login.title') }}</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="sendLoginForm()">
              <div class="mb-3">
                <label for="email">{{ $t('login.form.email') }}</label>
                <input class="form-control"
                  v-model="email"
                  type="email"
                  id="email"
                >
              </div>
              <div class="mb-3">
                <label for="password">{{ $t('login.form.password') }}</label>
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
                <label class="form-check-label" for="remember">{{ $t('login.form.remember') }}</label>
              </div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount } from 'vue'
import { UserLogin } from 'main/types/user'
import { router } from 'main/routes/index'
import store from 'main/store/base'

export default defineComponent({
  setup() {
    const user = reactive<UserLogin>({
      email: '',
      password: '',
    })

    const remember = ref<boolean>(false)

    onBeforeMount(() => {
      if (store.state.user.isAuthorized) {
        router.push({ name: 'main' })
        store.commit('notice/setNotice', {
          title: "Error",
          text: 'asdfdsf',
          type: 'danger'
        })
      }
    })

    function sendLoginForm(): void {
      const params = { session: {
        email: user.email,
        password: user.password
      }}
      store.dispatch('user/createSession', params).then(data => {
        console.log(data);
        if (data.ok) {
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
      remember,
      sendLoginForm,
    }
  }
})
</script>

<style>

</style>