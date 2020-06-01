<template>
  <div >
    <div>

   
    <q-btn  style="margin-top:15px;border-radius:2px" color="accent" no-caps label="Add intervention" :disable="hideAdd" @click="addIntervention($event)" />
         <q-card-section :hidden="showAddForm">
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
        <q-btn  style="width:70px; margin-top:15px;margin-right:15px" no-caps color="accent" label="Save" :id="the_intervention_plan.id" @click="saveIntervention($event)" />
        <q-btn  style="width:70px; margin-top:15px;margin-right:15px" no-caps color="info" label="Cancel" @click=" cancelIntervention($event)" />
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
    
    }
  },
  components: {},
   props:["hideAdd", "model", "the_processes_list", "the_intervention_plan","intervention_categories", "showAddForm" ],
  computed: {
   
  },
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
    
  }, 
  created(){
  
  }
};
</script>

<style>
</style>
