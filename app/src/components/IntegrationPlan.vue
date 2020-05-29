<template>
  <div >
      <q-separator />
       <q-expansion-item 
        group="somegroup"
        :label="intervention.intervention_title"
         header-class="text-accent"
         @click="cancelIntervention"
      >
        <q-card>
          <q-card-section>
            {{intervention.description}}
            <div style="padding-top:10px" >
            Required documents: {{intervention.linked_processes_id}}
            </div>
            <div style="padding-top:10px" v-if="intervention.validated">
              <strong> Validated </strong>
              </div>
            <div style="padding-top:10px" v-else>
              <strong> Pending </strong>
              </div>
           <div class="q-pa-md q-gutter-sm  col" style="padding-left:0px; text-align:left">
            <q-btn size="11px" no-caps style="width:85px;margin-bottom:5px" rounded color="info"  :disable="intervention.validated" :id="intervention.id" label="Edit action" @click="editIntervention($event)"  />
            <q-btn size="11px" no-caps style="width:85px;margin-bottom:5px" rounded color="accent" :disable="intervention.validated" label="Validate" :id="intervention.id" @click="validateIntervention($event)" />
            <q-card-section :hidden="hideForm">
        <q-input style="padding-top:10px" v-model="model.intervention_title" label="Title" />
        <q-input  style="padding-top:10px" v-model="model.description" filled type="textarea" label="Description" />
        <q-select  style="padding-top:10px"
        filled
        clearable
        v-model="model.linked_processes_id"
        multiple
        :options="the_processes_list"
        label="linked processes"
        
      />
      <q-select  style="padding-top:10px"
        filled
        clearable
        v-model="model.category"
        
        :options="intervention_categories"
        label="Intervention category"
        
      />
        <div class="q-gutter-sm">
         
        </div>
        <q-btn  style="margin-top:15px" color="secondary" label="Save" :id="the_intervention_plan.id" @click="saveIntervention($event)" />
        <q-btn  style="margin-top:15px" color="secondary" label="Cancel" @click="cancelIntervention($event)" />
      </q-card-section>
           </div>
          </q-card-section>
          
        </q-card>
      </q-expansion-item>
      
      <q-separator />
    </div>
</template>

<script>
export default {
  name: "InterventionPlan",
  data(){
    return{
    }
  },
  components: {},
  props:["title", "the_intervention_plan", "model", "intervention", "the_processes_list", "hideForm", "intervention_categories"],
  computed: {},
  mounted() {},
  methods: {
    editIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('editIntervention', targetId)

    },
    validateIntervention(event){

    },
    saveIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('saveIntervention', targetId)

    },
    cancelIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('cancelIntervention')

    },
  }
};
</script>

<style>
</style>
