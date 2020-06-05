<template>
  <div>
    <table class="table is-fullwidth">
      <tbody>
        <tr v-for="(item,i) in sorted" :key="i">
          <td>
            <span class="tag">{{item.over}}.{{item.bowl}}</span>
          </td>
          <td>
            <span class="has-text-danger">{{item.bowler}}</span>
            to
            <span class="has-text-primary">{{item.batter}}</span>
            , scored {{item.run }} run.
            {{item.commentary }} {{item.created |date}}
          </td>
          <td v-if="loggedIn" class="has-text-right td-edit-delete">
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
      @click="open_form(null,{overs:match.overs, batting_team_player,bowling_team_player,last_record:sorted.length?sorted[0]:null})"
      class="button is-primary"
    >Add Score</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
export default {
  props: ["inning", "match"],
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
  computed: {
    sorted() {
      return this.data.sort((a, b) => {
        if (a.over > b.over) return -1;
        if (a.over < b.over) return 1;
        if (a.bowl > b.bowl) return -1;
        if (a.bowl < b.bowl) return 1;
        return 0;
      });
    }
  },
  methods: {
    get_team_players(ref) {
      ref
        .collection("teams")
        .doc(this.inning.batting_team.id)
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
        .doc(this.inning.bowling_team.id)
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
