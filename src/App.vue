<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view style="padding:1rem" />
  </div>
</template>

<script>
import Navbar from "./shared/navbar";
export default {
  components: {
    "nav-bar": Navbar
  },
  data() {
    return {
      blah: "erik"
    };
  }
};
</script>  

<style lang="scss">
body {
  min-height: 100vh;
  background: #f5f5f5;
}
.form-modal {
  padding-left: 1rem;
  padding-right: 1rem;
}
.is-pointer {
  cursor: pointer;
}
.td-edit-delete {
  width: 68px;
}
form {
  min-width: 333px;
}
</style>