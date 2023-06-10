import Vue from "vue"

export const userStore = {
  state: {
    user: {},
    users: [],
    errors: [],
  },
  mutations: {

  },
  actions: {
    createUser({ commit, state }, params) {
      Vue.http.post('/api/v1/users', params).then(data => {
        return data
      })
    },
    getUsers({ commit, state }, params) {
      Vue.http.get('/api/v1/users/search').then(data => {
        return data
      })
    }
  }
}