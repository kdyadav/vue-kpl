<template>
  <div>
    <div class="columns">
      <div class="column" v-for="(item,i) in data" :key="i">
        <team-card :item="item"></team-card>
      </div>
    </div>

    <button  v-if="loggedIn && data.length<=1" @click="open_form()" class="button is-primary">Add Team</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
import TeamCard from "./team-card";
export default {
  mixins: [CRUD],
  components:{TeamCard},
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
      .collection("teams");
    this.get_data();
  }
};
</script>
