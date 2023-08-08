import Vue from "vue"
import { UserModel } from "main/types/user"

export const userStore = {
  state: {
    user: {} as UserModel,
    userSearch: [],
    users: [] as Array<UserModel>,
    errors: [],
    isAuthorized: false as Boolean
  },
  mutations: {
    setUser(state, user) {
      Vue.set(state, 'user', user)
    },
    setUsers(state, users) {
      Vue.set(state, 'users', users)
    },
    setUserSearch(state, userSearch) {
      Vue.set(state, 'userSearch', userSearch)
    },
    setErrors(state, errors) {
      Vue.set(state, 'errors', errors)
    },
    setIsAuthorized(state, isAuthorized) {
      Vue.set(state, 'isAuthorized', isAuthorized)
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
        Vue.http.get('/api/v1/users').then(data => {
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
    },
    searchUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/users/search?q=` + params.q).then(data => {
          commit('setUserSearch', data.body.users)
          resolve(data)
        })
      })
    },
    createSession({ }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(`/api/v1/login`, params).then(data => {
          resolve(data)
        })
      })
    },
    deleteSession() {
      return new Promise((resolve, reject) => {
        Vue.http.delete(`/api/v1/logout`).then(data => {
          resolve(data)
        })
      })
    },
  }
}