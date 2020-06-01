<template>
  <div class="q-pa-md">
    <h5>{{$options.name}}</h5>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_type in integration_type"
        :key="a_integration_type.id"
      >
        <q-item-section>{{a_integration_type.title}}</q-item-section>
        <q-item-section side>
          <q-btn
            color="negative"
            label="Delete"
            size="xs"
            no-caps
            @click="deleteIntegrationType(a_integration_type.id)"
            unelevated rounded style="width:70px;border-radius:2px; margin-bottom:5px"
          />
          <q-btn
            color="secondary"
            label="Edit"
            size="xs"
            no-caps
            @click="editIntegrationType(a_integration_type)"
            unelevated rounded style="width:70px;border-radius:2px"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn no-caps color="secondary" label="Add" unelevated rounded style="width:70px;border-radius:2px" @click="newIntegrationType()" :disable="hideAdd" />
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-input v-model="int_type_shell.title" label="Title" />
        <q-input v-model="int_type_shell.description" filled type="textarea" label="Description" />
        <div class="q-gutter-sm">
          <q-option-group
            :options="normalizedOptions"
            label="Notifications"
            type="radio"
            v-model="int_type_shell.category_type"
          />
        </div>
        <q-btn no-caps color="secondary" label="Save" unelevated rounded style="width:70px;border-radius:2px" @click="saveIntegrationType()" />
        <q-btn no-caps color="secondary" label="Cancel" unelevated rounded style="width:70px;border-radius:2px" @click="cancelIntegrationType()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "IntegrationType",
  data() {
    return {
      int_type_shell: { id: -1, title: "", description: "", category_type: 2 },
      hideForm: true,
      hideAdd: false,
      isNew: false
    };
  },
  computed: {
    integration_type() {
      return this.$store.state.integration_type.integration_type;
    },
    integration_category() {
      return this.$store.state.integration_category.integration_category;
    },
    normalizedOptions() {
      // this.myOptions would be your source
      return this.integration_category.map(opt => {
        return { value: opt.id, label: opt.title };
      });
    }
  },
  methods: {
    deleteIntegrationType(index) {
      console.log(index);
      this.$store.dispatch(
        "integration_type/deleteIntegrationTypeElement",
        index
      );
    },
    saveIntegrationType() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch(
            "integration_type/saveIntegrationTypeElement",
            this.int_type_shell
          )
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch(
            "integration_type/editIntegrationTypeElement",
            this.int_type_shell
          )
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.int_type_shell = {
        id: -1,
        title: "",
        description: "",
        category_type: 2
      };
    },
    newIntegrationType() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelIntegrationType() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editIntegrationType(integration_type) {
      this.isNew = false;
      this.hideForm = false;
      this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
    }
  },
  //store.commit('increment', 10)
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("integration_type/fetchIntegrationType")
      .then(processes => {
        this.loading = false;
      });
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(processes => {
        this.loading = false;
      });
  }
};
</script>