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
      Vue.http.post('/api/v1/users', params).then(data => {
        return data
      })
    },
    getUsers({ commit, state }) {
      Vue.http.get('/api/v1/users/search').then(data => {
        return data
      })
    }
  }
}