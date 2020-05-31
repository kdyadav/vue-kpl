<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
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
        <router-link class="navbar-item" :to="{name:''}">Home</router-link>
        <router-link class="navbar-item" :to="{name:'about'}">About</router-link>
        <router-link class="navbar-item" :to="{name:'tournaments'}">Tournaments</router-link>
      </div>
      <div class="navbar-end">
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
export default {
  name: "top-header",
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
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
  },
  data() {
    return {
      expand: null,
      loggedIn: false
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar-menu.is-expanded {
  display: block;
}
</style>