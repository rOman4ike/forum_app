import { createStore } from "vuex"
import { userStore } from "./user"
import { noticeStore } from "./notice"

export default createStore({
  modules: {
    user: {namespaced: true, ...userStore},
    notice: {namespaced: true, ...noticeStore}
  }
})