<template>
<div>
  <div class=" q-pa-lg" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Process Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined :value="the_process.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Process description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined :value="the_process.text"  />
      </div>
    </div>



    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Process tags </h5>
      </div>
      <div class=" q-pa-md col-4">
     <q-select
        filled
        :value="the_process.user_tags"
        clearable
        
        v-model="the_process.user_tags"
        multiple
        :options="u_tags"
        
        label="User Tags"
        style="width: 250px"
      />
      </div>
      
      <div class="q-pa-md col-4">
     <q-select
        filled
        :value="the_process.topic_tags"
        clearable
       
        v-model="the_process.topic_tags"
        multiple
        :options="t_tags"
        
        label="Topic Tags"
        style="width: 250px"
      />
      </div>
      </div >
    
    
   
  </div>
  <div class="row">
    <div class="q-pa-md col-4" style="text-align:center">
    <q-btn color="red" label="Back" style="width:150px" to="/processmanager"/>
    </div>
    <div class=" q-pa-md col-4" style="text-align:center">
    <q-btn color="red" label="Save changes" style="width:150px" />
    </div>
    <div class="q-pa-md col-4" style="text-align:center">
    <q-btn color="red" label="Manage steps" :disable="this.disabled" style="width:150px" :to="this.id + '/steps'"/>
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
      edit: {
        title:"",
        text:"", 
        user_tags:[],
        topic_tags:[]
      },
       u_tags: [
        { label: 'tag4', value: 'tag4'},
        { label: 'tag5', value: 'tag5'},
        { label: 'tag6', value: 'tag6'},
      ],
      t_tags: [
        { label: 'tag1', value: 'tag1'},
        { label: 'tag2', value: 'tag2'},
        { label: 'tag3', value: 'tag3'},
      ],
    }
  },
    computed:{
     processes() {
      return this.$store.state.flows.flows
    }, 
    the_process(){
      if(this.id != null){
        for(var i = 0; i< this.processes.length; i++){
          if(this.processes[i].id == this.id){
            console.log("id processo" + this.processes[i].id)
            console.log(this.processes[i])
            console.log("id route" + this.id)
            return this.processes[i]
          }
          else{
            return this.edit
          }
        }
      }
      else{
        return this.edit
      }
    }, 
    disabled() {
      if(this.id != null){
        return false
      }
      else{
        return true
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
