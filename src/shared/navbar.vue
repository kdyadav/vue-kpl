<template>
  <nav
    class="navbar is-primary"
    v-click-outside="()=>{expand=false}"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item">
        KPL
        <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> -->
      </a>

      <a
        @click="expand=!expand"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        data-target="navbarBasicExample"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-expanded':expand==true}">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{name:'home'}">Home</router-link>
        <router-link class="navbar-item" :to="{name:'tournaments'}">Tournaments</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <span class="tag is-uppercase is-danger" v-if="loggedIn">{{current_user.email.split("@")[0]}}</span>
        </div>
        <div class="navbar-item">
          <div class="buttons" v-if="!loggedIn">
            <router-link class="button is-primary" to="/register">
              <strong>Sign up</strong>
            </router-link>
            <router-link class="button is-light" to="/login">Log in</router-link>
          </div>
          <div class="buttons" v-else>
            <a @click="signOut" class="button is-primary">
              <strong>Sign out</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapMutations } from "vuex";
export default {
  name: "top-header",
  data() {
    return {
      expand: null
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    ...mapMutations(["SET_AUTHENICATION", "SET_CURRENT_USER"]),
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.SET_CURRENT_USER(user);
          this.SET_AUTHENICATION(true);
        } else {
          this.SET_CURRENT_USER({});
          this.SET_AUTHENICATION(false);
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-menu.is-expanded {
  display: block;
}
</style>