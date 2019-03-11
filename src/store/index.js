import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    wsSocket: null
  },
  mutations: {
    SET_WSSOCKET: (state, wsSocket) => {
      state.wsSocket = wsSocket
      console.log('wsSocket updated: ', state.wsSocket)
    }
  }
})

export default store
