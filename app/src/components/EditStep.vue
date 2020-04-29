<template>
<div>
  <div class=" q-pa-lg" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined :value="the_step.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step location </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined :value="the_step.location"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step cost </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined :value="the_step.cost"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Required documents </h5>
      </div>
      <div class=" q-pa-md col-8">
     <q-select
        filled
        :value="the_step.required_documents"
        clearable
        
        v-model="the_step.required_documents"
        multiple
        :options="documents_list"
        
        label="Required documents"
        style="width: 600px"
      />
      </div>
      </div>
      
       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Linked processes </h5>
      </div>
      <div class=" q-pa-md col-8">
     <q-select
        filled
        :value="the_step.linked_processes"
        clearable
        
        v-model="the_step.linked_processes"
        multiple
        :options="processes_list"
        
        label="linked processes"
        style="width: 600px"
      />
      </div>
      </div>

      

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input  type="textarea" filled :value="the_step.description"  />
      </div>
    </div>


   
    
    
   
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn color="red" label="Save" style="width:150px" />
    </div>
    <div class="q-pa-md col-6" style="text-align:left">
    <q-btn color="red" label="Back" style="width:150px"/>
    </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'PageIndex',
  

  data (){
    return {
      id: this.$route.params.id, 
      documents_list: [
        "document_1",
        "document_2",
        "document_3",
        "document_4",
        "document_5"
      ],
      processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      edit: {
        title:"",
        location:"",
        cost:"",
        required_documents:[],
        linked_processes:[],
        description:""
      }
  }
  },
   computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    the_step() {
      if(this.id != null){
        for(var i = 0; i< this.processes.length; i++){
          for(var j = 0; j< this.processes[i].steps.length; j++){
          if(this.processes[i].steps[j].id == this.id){
            console.log("id processo" + this.processes[i].id)
            console.log(this.processes[i])
            console.log("id route" + this.id)
            this.title= this.processes[i].title
            return this.processes[i].steps[j]
          }
          else{
            return this.edit
          }
        }
      }
      }
    }
},
 created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(flows => {
        console.log(flows)
        this.loading = false
      })
  },
}
</script>
<style scoped>

</style>
