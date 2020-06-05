<template>
  <form @submit.prevent="save(form,data && data.id);$parent.close()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Player</p>
      </header>
      <section class="modal-card-body">
        {{last_record}}
        <b-field label="Batter*">
          <b-select expanded v-model="form.batter" placeholder="Select a name">
            <option
              v-for="(option) in batting_team_player"
              :value="option.name"
              :key="option.id"
            >{{ option.name }}</option>
          </b-select>
        </b-field>

        <b-field label="Bowler*">
          <b-select v-if="form.bowl==1" expanded v-model="form.bowler" placeholder="Select a name">
            <option
              v-for="(option) in bowling_team_player"
              :value="option.name"
              :key="option.id"
            >{{ option.name }}</option>
          </b-select>
          <span v-else>{{form.bowler}}</span>
        </b-field>
        <b-field label="Over*">
          <b-input type="number" :min="1" :max="overs" v-model="form.over" placeholder="1" required></b-input>
        </b-field>
        <b-field label="bowl*">
          <b-select expanded v-model="form.bowl" placeholder="Select a name">
            <option v-for="(option,i) in [1,2,3,4,5,6]" :value="option" :key="i">{{ option }}</option>
          </b-select>
        </b-field>
        <b-field label="Run*">
          <b-select expanded v-model="form.run" placeholder="Select a name">
            <option v-for="(option,i) in [0,1,2,3,4,6]" :value="option" :key="i">{{ option }}</option>
          </b-select>
        </b-field>
        <b-field label="Bowl-Type*">
          <b-select expanded v-model="form.bowl_type" placeholder="Select a name">
            <option
              v-for="(option,i) in ['Bowl','Wide','No','Dead']"
              :value="option"
              :key="i"
            >{{ option }}</option>
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
export default {
  props: [
    "overs",
    "data",
    "save",
    "batting_team_player",
    "bowling_team_player",
    "last_record"
  ],
  data() {
    return {
      form: {
        batter: "",
        bowler: "",
        over: 1,
        bowl: 1,
        bowl_type: "Bowl",
        run: 0,
        commentary: "",
        created: Date.now()
      }
    };
  },
  created() {
    if (this.last_record) {
      this.form.batter = this.last_record.batter;
      this.form.bowler = this.last_record.bowler;
      this.form.over = this.last_record.over;

      if (
        this.last_record.bowl_type == "Bowl" &&
        this.last_record.bowl + 1 <= 6
      )
        this.form.bowl = this.last_record.bowl + 1;

      if (this.last_record.bowl_type == "Bowl" && this.last_record.bowl + 1 > 6)
        this.form.over = +this.last_record.over + 1;
    } else if (this.data) {
      this.form = _.pick(this.data, [
        "batter",
        "bowler",
        "over",
        "bowl",
        "bowl_type",
        "run",
        "commentary"
      ]);
    }
  }
};
</script>

<style>
</style>