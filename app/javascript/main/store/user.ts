import Vue from "vue"
import User from "main/types/user"

export const userStore = {
  state: {
    user: {} as User,
    users: [] as Array<User>,
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
    },
    getUser({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/users/' + params.id).then(data => {
          resolve(data)
        })
      })
    },
    updateUser({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.patch('/api/v1/users/' + params.id, params).then(data => {
          resolve(data)
        })
      })
    },
    getUserForEdit({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/users/${params.id}/edit`).then(data => {
          resolve(data)
        })
      })
    }
  },
  getters: {
    user(state) {
      return () => state.user
    },
    users(state) {
      return () => state.users
    },
    errors(state) {
      return () => state.errors
    },
  }
}