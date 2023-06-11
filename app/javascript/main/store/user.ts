import Vue from "vue"
import User from "main/types/user"

export const userStore = {
  state: {
    user: {} as User,
    users: [] as Array<User>,
    errors: [],
  },
  mutations: {

  },
  actions: {
    createUser({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('/api/v1/users', params).then(data => {
          resolve(data)
        })
      })
    },
    getUsers({ commit, state }) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/users/search').then(data => {
          resolve(data)
        })
      })
    },
    destroyUser({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.delete('/api/v1/users/' + params.id).then(data => {
          resolve(data)
        })
      })
    }
  }
}