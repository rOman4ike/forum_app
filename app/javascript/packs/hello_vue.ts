import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from '../app.vue'
import { router } from 'main/routes'
import baseStore from 'main/store/base'
import VueI18n from 'vue-i18n'
import { i18n } from 'locales/vue-i18n'
import VueCanCan from 'vue-cancan'

// window.abilities - are exported JSON abilities from CanCan, read further.
// Vue.use(VueCanCan, { rules: window.Abilities });
// v-if="$can('edit', item)"
// v-can.index.items
Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

// router.beforeEach(VueCanCan.navigationGuard('/'));

// Обработка 404
Vue.http.interceptors.push((request, next) => {
  request.headers.set('token', localStorage.getItem('token') || '')

  next(response => {
    if (!response.ok) {
      baseStore.commit('notice/setNotice', {
        title: "Ошибка",
        text: 'Ошибка емое',
        type: 'danger',
      })
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const store = new Vuex.Store(baseStore)

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount()

  document.body.appendChild(app.$el)
})