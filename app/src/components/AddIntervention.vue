<template>
  <div style="width:750px">
    <div>

   
    
         <q-card-section :hidden="showAddForm" style="padding-left:0px; padding-right:0px" >
        <div style="background-color:#efefef; padding-left:0px; padding-right:0px" >
        <div class=" " style="display:inline-block; width:750px;border-width:2px;  margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Title </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px">
        <q-input  dense   bg-color="white" standout outlined v-model="model.intervention_title" />
      </div>
    </div>
    
   
         <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px; padding-top:10px">
        <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="model.description" />
      </div>
    </div>



       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left; padding-left:30px"> Related processes </h5>
      </div>
      <div class=" q-pa-md col-8" style="margin-top:14px; margin-bottom:0px; padding-bottom:0px">
     <q-select
        filled
        clearable
        v-model="model.linked_processes_id"
        multiple
        :options="the_processes_list"
        bg-color="white"
        label="Related Processes"
        style="width: 450px"
      />
      </div>
      </div>
      
       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left; padding-left:30px">  Category </h5>
      </div>
      <div class=" q-pa-md col-8" style="margin-top:14px; margin-bottom:0px; padding-bottom:0px">
     <q-select
        filled
        clearable
        v-model="model.category"
        :options="intervention_categories"
        bg-color="white"
        label="Intervention Category"
        style="width: 450px"
      />
      </div>
      </div>
        </div>
        
        <div class="q-gutter-sm">
         
        </div>
         <div style="text-align:center">
        <q-btn  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px" unelevated  no-caps  label="Cancel" @click="cancelIntervention($event)" />
        <q-btn  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px" unelevated no-caps color="accent" label="Save Changes" :id="the_intervention_plan.id" @click="saveIntervention($event)" />
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
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>
