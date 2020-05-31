<template>
  <div>
    <div>
      <h4>{{details.name}}</h4>
    </div>
    <TeamList />
    <InningsList />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
// import formComponent from "./form";
import TeamList from "../teams/list";
import InningsList from "../innings/list";
export default {
  components: { TeamList, InningsList },
  data() {
    return { ref: null, details: {}, teams: [] };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    this.ref = this.fb
      .collection("tournaments")
      .doc(this.$route.params.tournament_id)
      .collection("matches")
      .doc(this.$route.params.id);

    this.ref.get().then(doc => {
      this.details = doc.data();
    });
    this.ref.collection("teams").onSnapshot(querySnapshot => {
      this.teams = [];
      querySnapshot.forEach(doc => {
        this.teams.push({ ...doc.data(), id: doc.id });
      });
    });
  },
  methods: {
    add_team() {
      this.ref.collection("teams").add({ name: "team" });
    }
  }
};
</script>
<style>
</style>