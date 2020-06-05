<template>
  <form @submit.prevent="save(form,data && data.id);$parent.close()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Inning</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name*">
          <b-input type="text" v-model="form.name" placeholder="Match 1" required></b-input>
        </b-field>
        <b-field label="Batting">
          <b-select
            @input="select_batting_team"
            expanded
            v-model="form.batting_team"
            placeholder="Select a name"
          >
            <option v-for="option in teams" :value="option" :key="option.id">{{ option.name }}</option>
          </b-select>
        </b-field>
        <b-field label="Bowling">
          <b-select
            @input="select_bowling_team"
            expanded
            v-model="form.bowling_team"
            placeholder="Select a name"
          >
            <option v-for="option in teams" :value="option" :key="option.id">{{ option.name }}</option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <button class="button is-primary">Save</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["data", "save", "name"],
  data() {
    return {
      teams: [],
      form: {
        name: "Inning " + this.name,
        bowling_team: null,
        batting_team: null
      }
    };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    this.fb
      .collection("tournaments")
      .doc(this.$route.params.tournament_id)
      .collection("matches")
      .doc(this.$route.params.id)
      .collection("teams")
      .onSnapshot(querySnapshot => {
        this.teams = [];
        querySnapshot.forEach(doc => {
          this.teams.push({ ...doc.data(), id: doc.id });
        });
      });

    if (this.data) {
      this.form = _.pick(this.data, ["name", "bowling_team", "batting_team"]);
    }
  },
  methods: {
    select_batting_team() {
      this.form.bowling_team =
        this.form.batting_team == this.teams[0] ? this.teams[1] : this.teams[0];
    },
    select_bowling_team() {
      this.form.batting_team =
        this.form.bowling_team == this.teams[0] ? this.teams[1] : this.teams[0];
    }
  }
};
</script>

<style>
</style>