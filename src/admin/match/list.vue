<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <td>
            <router-link :to="{name:'tournaments-matches',params:{id:item.id}}">{{t.name}}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="create">Add New</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";

export default {
  mixins: [CRUD],

  data() {
    return { formComponent };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    this.ref = this.fb
      .collection("tournaments")
      .doc(this.$route.params.id)
      .collection("matches");

    this.get_data();
  }
};
</script>
<style>
</style>