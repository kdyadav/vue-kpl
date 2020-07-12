<template>
  <div class="card">
    <header class="card-header">
      <p @click="active=!active" class="card-header-title">{{item.name}}</p>
      <span v-if="loggedIn &&  has_write_access(item)" class="card-header-icon" aria-label="more options">
        <a @click="$parent.delete_item(item.id)">
          <i class="fa fa-trash"></i>
        </a>
        |
        <a @click="$parent.open_form(item)">
          <i class="fa fa-edit"></i>
        </a>
      </span>
    </header>
    <div class="card-content" v-show="active">
      <playerList :team_id="item.id" />
    </div>
  </div>
</template>

<script>
import playerList from "../players/list";
export default {
  components: { playerList },
  props: ["item"],
  data() {
    return {
      active: true
    };
  }
};
</script>

<style>
</style>