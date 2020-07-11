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
  apiKey: "AIzaSyCeVKAN2nTCByHDXP0YAhHmDsw9VOawqcw",
  authDomain: "vue-kpl.firebaseapp.com",
  databaseURL: "https://vue-kpl.firebaseio.com",
  projectId: "vue-kpl",
  storageBucket: "vue-kpl.appspot.com",
  messagingSenderId: "159987305258",
  appId: "1:159987305258:web:6dfda3278fa26ca7a66c53"

  // apiKey: process.env.apiKey,
  // authDomain: process.env.authDomain,
  // databaseURL: process.env.databaseURL,
  // projectId: process.env.projectId,
  // storageBucket: process.env.storageBucket,
  // messagingSenderId: process.env.messagingSenderId,
  // appId: process.env.appId
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