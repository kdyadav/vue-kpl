<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th class="has-text-right" v-if="loggedIn">
            <i class="fa fa-cogs" aria-hidden="true"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,i) in data" :key="i">
          <router-link
            class="is-pointer"
            :to="{name:'tournaments-matches',params:{id:item.id}}"
            tag="td"
          >
            <span class="tag">{{item.over}}.{{item.bowl}}</span>

            <span class="has-text-danger">{{item.bowler}}</span>
            to
            <span class="has-text-primary">{{item.batter}}</span>
            , scored {{item.run }} run.
            {{item.commentary}}
          </router-link>
          <td v-if="loggedIn" class="has-text-right">
            <a @click="delete_item(item.id)">
              <i class="fa fa-trash"></i>
            </a>
            |
            <a @click="open_form(item,{batting_team_player,bowling_team_player})">
              <i class="fa fa-edit"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <button
      v-if="loggedIn"
      @click="open_form(null,{batting_team_player,bowling_team_player,last_record:data.length?data[data.length-1]:null})"
      class="button is-primary"
    >Add Score</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
export default {
  props: ["inning"],
  mixins: [CRUD],

  data() {
    return { formComponent, batting_team_player: [], bowling_team_player: [] };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    let ref = this.fb
      .collection("tournaments")
      .doc(this.$route.params.tournament_id)
      .collection("matches")
      .doc(this.$route.params.id);

    this.ref = ref
      .collection("innings")
      .doc(this.inning.id)
      .collection("scores");

    this.get_data();
    this.get_team_players(ref);
  },
  methods: {
    get_team_players(ref) {
      ref
        .collection("teams")
        .doc(this.inning.batting_team)
        .collection("players")
        .get()
        .then(querySnapshot => {
          this.batting_team_player = [];
          querySnapshot.forEach(doc => {
            this.batting_team_player.push({
              ...doc.data(),
              id: doc.id
            });
          });
        });
      ref
        .collection("teams")
        .doc(this.inning.bowling_team)
        .collection("players")
        .get()
        .then(querySnapshot => {
          this.bowling_team_player = [];
          querySnapshot.forEach(doc => {
            this.bowling_team_player.push({
              ...doc.data(),
              id: doc.id
            });
          });
        });
    }
  }
};
</script>
