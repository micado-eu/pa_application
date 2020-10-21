<template>
  <div class=container>
    <div>
      <q-card-section
        :hidden="showAddForm"
        class="card"
      >
        <div class="div-1">
          <div class="div-2">
            <div class=" q-pa-xsm row div-3">
              <div class=" q-pa-xsm col-4">
                <h5 class="header"> {{$t('input_labels.title')}} </h5>
              </div>
              <div class="col-8 div-4">
                <q-input
                  max-length="100"
                  counter
                  dense
                  bg-color="white"
                  standout
                  outlined
                  v-model="model.title"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row div-5">
              <div class=" q-pa-xsm col-4">
                <h5 class="header"> {{$t('input_labels.description')}} </h5>
              </div>
              <div class="col-8 div-4">
                <q-input
                  dense
                  type="textarea"
                  bg-color="white"
                  standout
                  outlined
                  v-model="model.description"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row center">
              <div class=" q-pa-xsm col-4">
                <h5 class="header-2"> {{$t('input_labels.related_processes')}} </h5>
              </div>
              <div class=" q-pa-md col-8 div-6">
                <q-select
                  filled
                  clearable
                  v-model="model.linked_processes_id"
                  multiple
                  :options="the_processes_list"
                  bg-color="white"
                  :label="$t('input_labels.related_processes')"
                  class="width"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row center">
              <div class=" q-pa-xsm col-4">
                <h5 class="header-2"> {{$t('input_labels.type')}} </h5>
              </div>
              <div class=" q-pa-md col-8 div-6">
                <q-select
                  filled
                  clearable
                  emit-value
                  map-options
                  v-model="model.interventionType"
                  :options="intervention_categories"
                  bg-color="white"
                  :label="$t('input_labels.intervention_type')"
                  class="width"
                />
              </div>
            </div>
          </div>

          <div class="q-gutter-sm">

          </div>
          <div class="center">
            <q-btn
              class="delete-button"
              unelevated
              no-caps
              :label="$t('button.cancel')"
              @click="cancelIntervention($event)"
            />
            <q-btn
              class="button"
              unelevated
              no-caps
              color="accent"
              :label="$t('button.save')"
              :id="the_intervention_plan.id"
              @click="saveIntervention($event, model)"
            />
          </div>
        </div>
      </q-card-section>
      <br>
    </div>

    <br>
  </div>
</template>

<script>
export default {
  name: "AddIntervention",
  data () {
    return {

    }
  },
  components: {},
  props: ["hideAdd", "model", "the_processes_list", "the_intervention_plan", "intervention_categories", "showAddForm"],
  computed: {

  },
  mounted () { },
  methods: {
    saveIntervention (event, value) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(value)
      this.$emit('saveIntervention', value)

    },
    cancelIntervention (event) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('cancelIntervention')

    },
    addIntervention (event) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('addIntervention')
    }

  },
  created () {

  }
}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  margin-top: 15px;
  border-radius: 2px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.button {
  margin-top: 15px;
  border-radius: 2px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.container {
  width: 750px;
}
.card {
  padding-left: 0px;
  padding-right: 0px;
}
.div-1 {
  background-color: #efefef;
  padding-left: 0px;
  padding-right: 0px;
}
.div-2 {
  display: inline-block;
  width: 750px;
  border-width: 2px;
  margin-bottom: 1px;
}
.div-3 {
  text-align: center;
  padding-left: 30px;
}
.header {
  text-align: left;
  margin-bottom: 0px;
  font-size: 15pt;
}
.div-4 {
  margin: auto;
  display: block;
  margin-bottom: 0px;
  padding-right: 30px;
  padding-top: 10px;
}
.div-5 {
  text-align: center;
  padding-left: 30px;
}
.center {
  text-align: center;
}
.header-2 {
  text-align: left;
  padding-left: 30px;
}
.div-6 {
  margin-top: 14px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.width {
  width: 450px;
}
</style>
