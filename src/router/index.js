import Vue from "vue";
import VueRouter from "vue-router";
// Shared
import Home from "../shared/Home.vue";
import Register from "../shared/Register.vue";
import Login from "../shared/Login.vue";
// Admin
import Admin from "../admin/admin.vue";
// guests
import Tournaments from "../guest/tournament/list";
import Matches from "../guest/match/list";
import MatcheDetails from "../guest/match/details";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/tournaments",
    name: "tournaments",
    component: Tournaments
  },
  {
    path: "/tournaments/:id/matches",
    name: "tournaments-matches",
    component: Matches
  },
  {
    path: "/tournaments/:tournament_id/matches/:id",
    name: "match-details",
    component: MatcheDetails
  }

];

const router = new VueRouter({
  mode: "history",
  "hosting": {
    "public": "./dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },

  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  // console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;