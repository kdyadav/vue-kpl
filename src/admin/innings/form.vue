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
        name: "Inning 1"
      }
    };
  },
  created() {
    if (this.data) {
      this.form = _.pick(this.data, ["name"]);
    }
  }
};
</script>

<style>
</style>