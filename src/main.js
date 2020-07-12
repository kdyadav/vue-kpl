import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters";
import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


import AuthMixin from "./auth.mixin.vue";

import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

Vue.filter("date", DateFilter);

Vue.use(Buefy)
Vue.mixin(AuthMixin);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

const firebaseConfig = {
  apiKey: "AIzaSyA1yCg_NoQDR6J6eTHeQFBiGuWEdDuw0pE",
  authDomain: "koond-cricket-club.firebaseapp.com",
  databaseURL: "https://koond-cricket-club.firebaseio.com",
  projectId: "koond-cricket-club",
  storageBucket: "koond-cricket-club.appspot.com",
  messagingSenderId: "415930102513",
  appId: "1:415930102513:web:7d62b4940d2f774bdc6f50"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

let app;

firebase.auth().onAuthStateChanged(user => {
  store.commit("INIT_FIREBASE", firebase.firestore())
  // console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }

});