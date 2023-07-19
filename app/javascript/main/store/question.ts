import Vue from "vue"

export const questionStore = {
  state: {
    question: {},
    questions: [],
    errors: [],
  },
  mutations: {
    setQuestion(state, question) {
      Vue.set(state, 'question', question)
    },
    setQuestions(state, questions) {
      Vue.set(state, 'questions', questions)
    },
    setErrors(state, errors) {
      Vue.set(state, 'errors', errors)
    }
  },
  actions: {
    getQuestions({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.get('').then(data => {
          commit('setQuestions', data.body)
          resolve(data)
        })
      })
    },
    getQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('' + params.id).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    getQuestionForEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('' + params.id).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    createQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('', params).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    destroyQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('' + params.id).then(data => {
          resolve(data)
        })
      })
    },
    updateQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('' + params.id, params).then(data => {
          resolve(data)
        })
      })
    }
  }
}