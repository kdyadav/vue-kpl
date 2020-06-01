import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fb: null,
    loggedIn: false,
    current_user: {}
  },
  mutations: {
    SET_CURRENT_USER(state, value) {
      state.current_user = value;
    },
    INIT_FIREBASE(state, value) {
      state.fb = value;
    },
    SET_AUTHENICATION(state, value) {
      state.loggedIn = value;
    }
  }
})
