<template>
  <div id="app" >
    <nav-bar></nav-bar>
    <router-view class="section" />
  </div>
</template>

<script>
import Header from "./components/Top-Header";
export default {
  components: {
    "nav-bar": Header
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
.is-pointer{
  cursor: pointer;
}
</style>