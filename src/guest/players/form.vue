<template>
  <form @submit.prevent="save(form,data && data.id);$parent.close()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Player</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name*">
          <b-input type="text" v-model="form.name" placeholder="Ashu" required></b-input>
        </b-field>
        <b-field label="Type">
          <b-select expanded v-model="form.type" placeholder="Select player profile">
            <option
              v-for="(option,i) in ['captain','vice-captain','bowler','batter','keeper']"
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
  props: ["data", "save"],
  data() {
    return {
      form: {
        name: "",
      }
    };
  },
  created() {
    if (this.data) {
      this.form = _.pick(this.data, ["name", "type"]);
    }
  }
};
</script>

<style>
</style>