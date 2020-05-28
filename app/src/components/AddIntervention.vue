<template>
  <div><div>
    <q-btn  style="margin-top:15px" color="secondary" label="Add intervention"  :disable="hideAdd" @click="button_id =the_intervention_plan.id;  addIntervention($event)" />
         <q-card-section :hidden="the_intervention_plan.id != button_id">
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
        <div class="q-gutter-sm">
         
        </div>
        <q-btn  style="margin-top:15px" color="secondary" label="Save" :id="the_intervention_plan.id" @click="button_id = null;saveIntervention($event)" />
        <q-btn  style="margin-top:15px" color="secondary" label="Cancel" @click="button_id = null; cancelIntervention($event)" />
      </q-card-section>
    <br>
    </div>
    
   
    <br>
    </div>
</template>

<script>
export default {
  name: "AddIntervention",
  data(){
    return{
      button_id:null
    }
  },
  components: {},
   props:["hideAdd", "model", "the_processes_list", "the_intervention_plan","isNew" ],
  computed: {},
  mounted() {},
  methods: {
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
    addIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('addIntervention')
    },
    closeAdd(){
      this.button_id= 0
    }
    
  }, 
  created(){
  
  }
};
</script>

<style>
</style>
