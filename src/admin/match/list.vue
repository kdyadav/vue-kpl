<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <td>
            <router-link
              :to="{name:'match-details',params:{tournament_id:$route.params.id,id:item.id}}"
            >{{item.name}}</router-link>
          </td>
          <td>
            <a @click="delete_item(item.id)">
              <i class="fa fa-trash"></i>
            </a>
            |
            <a @click="open_form(item)">
              <i class="fa fa-edit"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="open_form" class="button is-primary">Add New</button>
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