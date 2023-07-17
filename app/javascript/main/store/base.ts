import { createStore } from "vuex"
import { userStore } from "./user"
import { noticeStore } from "./notice"
import { abilityStore } from "./ability"

export default createStore({
  modules: {
    user: {namespaced: true, ...userStore},
    notice: {namespaced: true, ...noticeStore},
    ability: {namespaced: true, ...abilityStore}
  }
})