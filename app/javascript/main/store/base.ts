import { userStore } from "./user"
import Vuex from 'vuex'

export default {
  modules: {
    user: {namespaced: true, ...userStore}
  }
}