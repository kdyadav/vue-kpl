<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Venue</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <router-link class="is-pointer" :to="{name:'tournaments-matches',params:{id:item.id}}" tag="td">{{item.name}}</router-link>
          <td>{{item.venue}}</td>
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
    <button @click="open_form()">Add New</button>
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
    this.ref = this.fb.collection("tournaments");
    this.get_data();
  }
};
</script>
