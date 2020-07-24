<template>
<div>
  <div class=" q-pa-lg" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="edit_step.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step location </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="edit_step.location"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step cost </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="edit_step.cost"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Required documents </h5>
      </div>
      <div class=" q-pa-md col-8">
     <q-select
        filled
        clearable
        
        v-model="edit_step.required_documents"
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
        
        clearable
        
        v-model="edit_step.linked_processes"
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
        <q-input  type="textarea" filled v-model="edit_step.description"  />
      </div>
    </div>


   
    
    
   
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn color="red" :label="$t('button.save')" @click="saveStep(edit_step)" style="width:150px" />
    </div>
    <div class="q-pa-md col-6" style="text-align:left">
    <q-btn color="red" :label="$t('button.back')"  style="width:150px"/>
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
      is_new: true,
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
      edit_step: {
        title:"",
        location:"",
        cost:"",
        required_documents:[],
        linked_processes:[],
        description:"", 
        process_id:[]
      }
  }
  },
   methods: {
     saveStep(value) {
        if(this.is_new){
          this.$store.dispatch('steps/saveSteps', value)
          console.log("I am the store")
          console.log(this.$store.state.steps)
          console.log(this.edit_step.id)
          //this.$router.push({ path: `/processmanager/edit//${this.edit_process.id}` })
        }
        else{
          console.log(this.is_new)
          this.$store.dispatch('steps/editSteps', value);
      console.log(value)
      console.log(this.steps)
      console.log("I am the store")
      console.log(this.$store.state.steps)
     }
   }
   },
   computed: {
     steps () {
      return this.$store.state.steps.steps
    }
},
 created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('steps/fetchSteps')
      .then(steps => {
        console.log(steps)
        this.loading = false
      })
       if(this.id != null){
        this.is_new = false
        console.log("hello")
         var filteredStep = this.steps.filter((filt) => {
          console.log("in fil")
          console.log(filt)
          console.log(filt.id == this.id)
          return filt.id == this.id
         
         })  
         this.edit_step = Object.assign({},filteredStep[0]);
        console.log(this.edit_step)
          console.log(" I am the param id" + this.id)
    }
  },
}
</script>
<style scoped>

</style>
