import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from '../app.vue'
import { routes } from 'main/routes'
import baseStore from 'main/store/base'
import errorHandler from 'handlers/error'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

// Обработка 404
Vue.http.interceptors.push((request, next) => {
  next(responce => {
    if (responce.status === 404) {
      baseStore.commit('notice/setNotice', {
        title: "Ошибка",
        text: 'Ошибка емое',
        type: 'danger',
      })
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const router = new VueRouter({
    routes,
  })
  router.onError((error) => {
    console.log(error);
  })

  const store = new Vuex.Store(baseStore)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount()

  document.body.appendChild(app.$el)
})