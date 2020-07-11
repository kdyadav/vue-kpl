<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loggedIn", "current_user"])
  },
  methods: {
    has_write_access(item) {
      return this.current_user.uid === item.user_id;
    }
  }
};
</script>