import { rootTypes } from '@/store/mutation-types'

const state = {
  userName: ''
}

const getters = {
  userName: state => state.userName
}

const actions = {
  setUserName ({ commit }, name) {
    commit(rootTypes.SET_USER_NAME, name)
  }
}

const mutations = {
  [rootTypes.SET_USER_NAME] (state, name) {
    state.userName = name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
