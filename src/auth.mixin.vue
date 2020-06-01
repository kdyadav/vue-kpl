<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loggedIn","current_user"])
  }
};
</script>