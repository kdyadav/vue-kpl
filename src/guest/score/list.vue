<template>
  <div class="score-list">
    <b-tabs v-model="activeTab">
      <b-tab-item :label="total+'-'+ total_out + ' | Commentary'">
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
                {{item.commentary }}
                <!-- p{{item.created | date}} -->
              </td>
              <td v-if="loggedIn" class="has-text-right td-edit-delete">
                <a @click="delete_item(item.id)">
                  <i class="fa fa-trash"></i>
                </a>
                |
                <a
                  @click="open_form(item,{batting_team_player,bowling_team_player})"
                >
                  <i class="fa fa-edit"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab-item>
      <b-tab-item label="Scorecard">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Batsman</th>
              <th>R</th>
              <th>B</th>
              <th>4</th>
              <th>6</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in batters_score" :key="i">
              <td>{{item.batter}}</td>
              <td>{{item.run}}</td>
              <td>{{item.bowl}}</td>
              <td>{{item.four}}</td>
              <td>{{item.six}}</td>
              <td>{{(item.run*100/item.bowl).toFixed(2)}}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{{total}}-{{total_out}}</td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Bowler</th>
              <th>O</th>
              <th>R</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in bowler_score" :key="i">
              <td>{{item.bowler}}</td>
              <td>{{parseInt(item.bowl/6)}}{{(item.bowl%6)?"."+(item.bowl%6):""}}</td>
              <td>{{item.run}}</td>
              <td>{{ calculate_eco(item) }}</td>
            </tr>
          </tbody>
        </table>
      </b-tab-item>
    </b-tabs>
    <br />
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
    return {
      activeTab: 0,
      formComponent,
      batting_team_player: [],
      bowling_team_player: []
    };
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
    },
    total() {
      return _.sumBy(this.data, s => s.run);
    },
    batters_score() {
      return _.map(_.groupBy(this.data, "batter"), scores => {
        return {
          batter: scores[0].batter,
          run: _.sumBy(scores, s => s.run),
          bowl: _.filter(scores, { bowl_type: "Bowl" }).length,
          four: _.filter(scores, { run: 4 }).length,
          six: _.filter(scores, { run: 6 }).length
        };
      });
    },
    bowler_score() {
      return _.map(_.groupBy(this.data, "bowler"), scores => {
        return {
          bowler: scores[0].bowler,
          run: _.sumBy(scores, s => s.run),
          bowl: _.filter(scores, { bowl_type: "Bowl" }).length
          // wide: _.filter(scores, { bowl_type: "Wide" }).length,
          // no:_.filter(scores, { bowl_type: "No" }).length
        };
      });
    },
    total_out() {
      return _.filter(this.data, { is_out: true }).length;
    }
  },
  methods: {
    calculate_eco(item) {
      return (
        item.run /
        parseFloat(
          `${parseInt(item.bowl / 6)}.${((item.bowl % 6) * 100) / 6 || 0}`
        )
      ).toFixed(1);

      // (
      // item.run /
      // parseFloat(`${parseInt(item.bowl / 6)}.${item.bowl % 6 || 0}`)
      // )
    },
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
<style lang="scss" scoped>
.score-list {
  .tab-content {
    padding: 0;
  }
}
</style>
