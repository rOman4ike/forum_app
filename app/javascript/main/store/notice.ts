import Vue from "vue"
import Notice from "main/types/notice"

export const noticeStore = {
  state: {
    notice: {} as Notice
  },
  mutations: {
    clearNotice(state) {
      Vue.set(state, 'notice', {})
    },
    setNotice(state, noticeInfo) {
      Vue.set(state, 'notice', noticeInfo)
    }
  },
}