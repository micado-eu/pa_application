<template>
  <div class="q-pa-md">
    <h5>{{$options.name}}</h5>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="a_user_type in user_type" :key="a_user_type.id">
        <q-item-section>{{a_user_type.user_type}}</q-item-section>
        <q-item-section class="col-5 flex flex-center">
          <q-btn color="negative" unelevated rounded style="width:70px;border-radius:2px;margin-bottom:5px" label="Delete" size="xs" @click="deleteUserType(a_user_type.id)" />
          <q-btn color="info" unelevated rounded style="width:70px;border-radius:2px" label="Edit" size="xs" @click="editUserType(a_user_type)" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn color="secondary" unelevated rounded style="width:70px;border-radius:2px" label="Add" @click="newUserType()" :disable="hideAdd" />
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-input v-model="int_user_type_shell.user_type" label="User type" />
        <q-input
          v-model="int_user_type_shell.description"
          filled
          type="textarea"
          label="Description"
        />
        <q-btn color="accent" unelevated rounded style="width:70px;border-radius:2px" label="Save" @click="saveUserType()" />
        <q-btn class="button" unelevated rounded style="width:70px;border-radius:2px" label="Cancel" @click="cancelUserType()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "UserType",
  data() {
    return {
      int_user_type_shell: { id: -1, user_type: "", description: "" },
      hideForm: true,
      hideAdd: false,
      isNew: false
    };
  },
  computed: {
    user_type() {
      return this.$store.state.user_type.user_type;
    }
  },
  methods: {
    deleteUserType(index) {
      console.log(index);
      this.$store.dispatch("user_type/deleteUserType", index);
    },
    saveUserType() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch("user_type/saveUserTypeElement", this.int_user_type_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch("user_type/editUserTypeElement", this.int_user_type_shell)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.int_user_type_shell = { id: -1, user_type: "", description: "" };
    },
    newUserType() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelUserType() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editUserType(user_type) {
      this.isNew = false;
      this.hideForm = false;
      this.int_user_type_shell = JSON.parse(JSON.stringify(user_type));
    }
  },
  //store.commit('increment', 10)
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("user_type/fetchUserType").then(processes => {
      this.loading = false;
    });
  }
};
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>