import { createStore } from "vuex"
import { userStore } from "./user"

export default createStore({
  modules: {
    user: {namespaced: true, ...userStore}
  }
})