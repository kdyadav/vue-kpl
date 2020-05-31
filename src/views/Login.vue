<template>
  <div >
    <h3>Login</h3>
    <form @submit.prevent="pressed">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" v-model="email" placeholder="Email" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="password" v-model="password" />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Login</button>
        </div>
      </div>
    </form>
    <br>
    <b-notification
      v-if="error"
      type="is-danger"
      aria-close-label="Close notification"
      role="alert"
    >{{error.message}}</b-notification>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "secret" });
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>