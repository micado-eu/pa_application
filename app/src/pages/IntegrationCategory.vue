<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_category in integration_category"
        :key="a_integration_category.id"
      >
        <q-item-section>
          {{a_integration_category.title}}
          <q-btn
            color="negative"
            label="Delete"
            @click="deleteIntegrationCategory(a_integration_category.id)"
          />
          <q-btn
            color="secondary"
            label="Edit"
            @click="editIntegrationCategory(a_integration_category.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    };
  },
  computed: {
    integration_category() {
      return this.$store.state.integration_category.integration_category;
    }
  },
  methods: {
    deleteIntegrationCategory(index) {
      console.log(index);
      this.$store.commit(
        "integration_category/deleteIntegrationCategory",
        index
      );
    },
    editIntegrationCategory(index){

    }
  },
  //store.commit('increment', 10)
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(processes => {
        this.loading = false;
      });
  }
};
</script>