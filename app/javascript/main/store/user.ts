import Vue from "vue"
import { UserModel } from "main/types/user"

export const userStore = {
  state: {
    user: {} as UserModel,
    users: [] as Array<UserModel>,
    errors: [],
  },
  mutations: {
    setUser(state, user) {
      Vue.set(state, 'user', user)
    },
    setUsers(state, users) {
      Vue.set(state, 'users', users)
    },
    setErrors(state, errors) {
      Vue.set(state, 'errors', errors)
    }
  },
  actions: {
    createUser({  }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('/api/v1/users', params).then(data => {
          resolve(data)
        })
      })
    },
    getUsers({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/users/search').then(data => {
          commit('setUsers', data.body)
          resolve(data)
        })
      })
    },
    getUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/users/' + params.id).then(data => {
          commit('setUser', data.body)
          resolve(data)
        })
      })
    },
    destroyUser({ }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.delete('/api/v1/users/' + params.id).then(data => {
          resolve(data)
        })
      })
    },
    updateUser({ }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.patch('/api/v1/users/' + params.user.id, params).then(data => {
          resolve(data)
        })
      })
    },
    getUserForEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/users/${params.id}/edit`).then(data => {
          commit('setUser', data.body)
          resolve(data)
        })
      })
    }
  }
}