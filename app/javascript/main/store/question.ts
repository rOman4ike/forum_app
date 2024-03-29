import Vue from "vue"

export const questionStore = {
  state: {
    question: {},
    questionSearch: [],
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
    setQuestionSearch(state, questionSearch) {
      Vue.set(state, 'questionSearch', questionSearch)
    },
    setErrors(state, errors) {
      Vue.set(state, 'errors', errors)
    }
  },
  actions: {
    getQuestions({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/questions?page=${params.page}`).then(data => {
          commit('setQuestions', data.body)
          resolve(data)
        })
      })
    },
    getQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/questions/' + params.id).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    getQuestionForEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/questions/${params.id}/edit`).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    createQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post('/api/v1/questions', params).then(data => {
          commit('setQuestion', data.body)
          resolve(data)
        })
      })
    },
    destroyQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.delete('/api/v1/questions/' + params.id).then(data => {
          resolve(data)
        })
      })
    },
    updateQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.patch('/api/v1/questions/' + params.question.id, params).then(data => {
          resolve(data)
        })
      })
    },
    searchQuestion({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get('/api/v1/questions/search?q=' + params.q)
          .then(data => {
            commit('setQuestionSearch', data.body.questions)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}