import Vue from "vue"

export const viewedQuestionStore = {
  state: {
    viewedQuestions: [],
    errors: [],
  },
  mutations: {
    setViewedQuestions(state, viewedQuestions) {
      Vue.set(state, 'viewedQuestions', viewedQuestions)
    }
  },
  actions: {
    getViewedQuestions({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(`/api/v1/users/${params.id}/viewed_questions`).then(data => {
          commit('setViewedQuestions', data.body.viewed_questions)
          resolve(data)
        })
      })
    }
  }
}