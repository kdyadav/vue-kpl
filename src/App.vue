<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view class="section" />
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
.form-modal{
  padding-left:1rem; 
  padding-right:1rem; 
}
.is-pointer {
  cursor: pointer;
}
</style>