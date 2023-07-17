import Vue from "vue"

export const abilityStore = {
  state: {
    abilities: {}
  },
  actions: {
    setAbilities({ commit, state }, abilities) {
      Vue.set(state, 'abilities', abilities)
    }
  },
}