<template>
  <div>
    <div class="columns">
      <div class="column" v-for="(item,i) in data" :key="i">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{item.name}}</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <a @click="delete_item(item.id)">
                <i class="fa fa-trash"></i>
              </a>
              |
              <a @click="open_form(item)">
                <i class="fa fa-edit"></i>
              </a>
            </a>
          </header>
          <div class="card-content">
            <playerList :team_id="item.id" />
          </div>
        </div>
      </div>
    </div>

    <button v-if="data.length<=1" @click="open_form()" class="button is-primary">Add New</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CRUD from "../crud.mixin";
import formComponent from "./form";
import playerList from "../players/list";
export default {
  mixins: [CRUD],
  components: { playerList },
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
      .collection("innings");
    this.get_data();
  }
};
</script>
