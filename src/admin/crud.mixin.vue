<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      ref: null,
      data: [],
      form: {},
      errors: []
    };
  },
  computed: {
    ...mapState(["fb","current_user"])
  },
  methods: {
    get_data() {
      this.ref.onSnapshot(querySnapshot => {
        this.data = [];
        querySnapshot.forEach(doc => {
          this.data.push({ ...doc.data(), id: doc.id });
        });
      });
    },
    delete_item(id) {
      this.$buefy.dialog.confirm({
        title: "Deleting",
        message: "Are you sure about this action?",
        confirmText: "Delete Account",
        type: "is-danger",
        onConfirm: () => {
          this.ref
            .doc(id)
            .delete()
            .then(function() {
              this.$buefy.toast.open("Account deleted!");
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        }
      });
    },
    open_form(item, info = {}) {
      this.$buefy.modal.open({
        props: {
          data: item,
          save: this.save,
          ...info
        },
        parent: this,
        component: this.formComponent,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,

      });
    },
    save(data, id) {
      data = {...data,user_id:this.current_user.uid};
      
      (id ? this.ref.doc(id).set(data) : this.ref.add(data))
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>