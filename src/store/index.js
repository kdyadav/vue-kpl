import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fb: null,
    loggedIn: false
  },
  mutations: {
    INIT_FIREBASE(state, value) {
      state.fb = value;
    },
    SET_AUTHENICATION(state, value) {
      state.loggedIn = value;
    }
  }
})
