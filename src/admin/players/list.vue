<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th v-if="loggedIn"  class="has-text-right"><i class="fa fa-cogs" aria-hidden="true"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <router-link
            class="is-pointer"
            :to="{name:'tournaments-matches',params:{id:item.id}}"
            tag="td"
          >{{item.name}} {{item.type?`(${item.type})`:''}}</router-link>
          <td v-if="loggedIn">
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
    <button  v-if="loggedIn && data.length<=11" @click="open_form()" class="button is-primary">Add Player</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
export default {
  props: ["team_id"],
  mixins: [CRUD],

  data() {
    return { formComponent };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    this.ref = this.ref = this.fb
      .collection("tournaments")
      .doc(this.$route.params.tournament_id)
      .collection("matches")
      .doc(this.$route.params.id)
      .collection("teams")
      .doc(this.team_id)
      .collection("players");

    this.get_data();
  }
};
</script>
