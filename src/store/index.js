import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fb:null
  },
  mutations: {
    INIT_FIREBASE(state,value){
      state.fb = value
    }
  },
  actions: {
  },
  modules: {
  }
})
