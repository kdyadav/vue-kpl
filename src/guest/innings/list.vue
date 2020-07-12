<template>
  <div>
    <div class="columns">
      <div class="column" v-for="(item,i) in data" :key="i">
        <div class="card" style="padding:0">
          <header class="card-header">
            <p class="card-header-title">
              {{item.name}}
              <span
                class="tag"

              >Batting :: {{item.batting_team.name}} </span>
            </p>
            <span v-if="loggedIn && has_write_access(item)" class="card-header-icon" aria-label="more options">
              <a @click="delete_item(item.id)">
                <i class="fa fa-trash"></i>
              </a>
              |
              <a @click="open_form(item)">
                <i class="fa fa-edit"></i>
              </a>
            </span>
          </header>
          <div class="card-content"  style="padding:5px">
            <ScoreList :match="match" :inning="item" />
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="loggedIn && data.length<=1"
      @click="open_form(null,{name:data.length+1})"
      class="button is-primary"
    >Add Inning</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
import ScoreList from "../score/list";
export default {
  props:['match'],
  mixins: [CRUD],
  components: { ScoreList },
  data() {
    return { formComponent };
  },
  computed: {
    ...mapState(["fb"])
  },
  created() {
    this.ref = this.fb
      .collection("tournaments")
      .doc(this.$route.params.tournament_id)
      .collection("matches")
      .doc(this.$route.params.id)
      .collection("innings");
    this.get_data();
  }
};
</script>
