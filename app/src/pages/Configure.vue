<template>
  <q-page class="flex flex-center">
  <q-card class="my-card">
  <q-card-section>
        <div class="text-h6">Migrant application configuration</div>
      </q-card-section>
    <q-card-section>
    <q-option-group
      v-model="features"
      :options="options"
      color="yellow"
      type="toggle"
    />
        <q-btn color="primary" glossy label="Save" />
    </q-card-section>
   </q-card>

    {{group}}
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      group: [ 'FEATURE1' ],
      options: [
        {
          label: 'Feature1',
          value: 'FEATURE1'
        },
        {
        label: 'Feature2',
        value: 'FEATURE2'
        },
        {
        label: 'Feature3',
        value: 'FEATURE3'
        }
      ]
    }
  },
  computed: {
    features:{
      get () {
        return this.$store.state.features.features
      },
      set (value) {
        this.$store.commit('features/setFeatures', value)
      }
    }
  },
  created () {
    console.log(this.$store);
    this.$store.dispatch('features/fetchFeatures')
      .then(features => {
//        this.loading = false
      })
  }
}
</script>
