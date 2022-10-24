import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: 'a',
    windowHeight: null,
    windowWidth: null,
  },
  mutations: {
    setUUID(state, val){
      state.uuid = val.uuid
    },
    setWindowHeight(state, val){
      state.windowHeight = val.windowHeight
    },
    setWindowWidth(state, val){
      state.windowWidth = val.windowWidth
    }
  },
  actions: {
  },
  modules: {
  }
})
