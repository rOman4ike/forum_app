import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import App from '../app.vue'
import { routes } from 'main/routes'
import baseStore from 'main/store/base'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

// Обработка 404
Vue.http.interceptors.push((request, next) => {
  next(responce => {
    const statusList: number[] = [404, 500]
    if (statusList.includes(responce.status)) {
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