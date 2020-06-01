<template>
<div style="text-align:center; padding-top:40px">
  <div class="" style=" display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class="col-4" style="padding-left:40px">
        <h5 style="text-align:left;font-size:15px;"> Process Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;padding-right:40px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_process.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class="col-4" style="padding-left:40px">
        <h5 style="text-align:left;font-size:15px; margin:0"> Process description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;padding-right:40px">
        <q-input rounded dense type="textarea" bg-color="grey-3" standout outlined v-model="edit_process.text"  />
      </div>
    </div>



    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" col-4" style="padding-left:40px">
        <h5 style="text-align:left;font-size:15px"> Process tags </h5>
      </div>
      <div class="col-4" style="padding-left:0px; padding-top:15px">
     <q-select
        filled
        dense
        clearable
        
        v-model="edit_process.user_tags"
        multiple
        :options="this.u_tags"
        
        label="User Tags"
        style="width: 200px"
      />
      </div>
      
      <div class="col-4" style="padding-right:45px; padding-top:15px">
     <q-select
        filled
        dense
        clearable
        v-model="edit_process.topic_tags"
        multiple
        :options="this.t_tags"
        label="Topic Tags"
        style="width: 200px"
      />
      </div>
      </div >
    
    
   
  </div>
  <div  style="text-align:center">
    <div class="q-pa-md q-gutter-md col-4" style="display:inline-block">
    <q-btn color="secondary" no-caps rounded label="Manage steps"  unelevated :disable="this.disabled" style="width:150px;border-radius:2px" :to="this.id + '/steps'"/>
    
    <q-btn color="info" no-caps rounded label="Save changes"  unelevated style="width:150px;border-radius:2px" @click="saveProcess(edit_process)"/>
    
    
    <q-btn color="accent" no-caps rounded label="Back"  unelevated style="width:150px;border-radius:2px" to="/guided_process_editor"/>
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
      edit_process: {
        title:"",
        text:"", 
        user_tags:[],
        topic_tags:[]
      },
       u_tags: [
        
      ],
      t_tags: [
        
      ],
    }
  },
    computed:{
     processes() {
      return this.$store.state.flows.flows
    }, 
    topic() {
      return this.$store.state.topic.topic
    }, 
    user() {
      return this.$store.state.user_type.user_type
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
   methods: {
     saveProcess(value) {
        if(this.is_new){
          this.$store.dispatch('flows/saveProcess', value)
          console.log(this.$store.state.flows)
          console.log(this.edit_process.id)
          //this.$router.push({ path: `/processmanager/edit//${this.edit_process.id}` })
        }
        else{
          this.$store.dispatch('flows/editProcess', value);
          console.log(this.is_new)
      console.log(value)
      console.log(this.processes)
      console.log(this.$store.state.flows)
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
      this.$store.dispatch('topic/fetchTopic')
      .then(topic => {
        console.log(topic)
        for ( var i = 0; i<this.topic.length; i++){
        var the_topic = {label: this.topic[i].topic, value:this.topic[i].id}
        this.t_tags.push(the_topic)
      }
        this.loading = false
      })
      this.$store.dispatch('user_type/fetchUserType')
      .then(user_type => {
        console.log(user_type)

       for ( var j = 0; j<this.user.length; j++){
        var the_user = {label: this.user[j].user_type, value:this.user[j].id}
        this.u_tags.push(the_user)
      }
        this.loading = false
      })
      
      if(this.id != null){
         console.log("ciso ")
        this.is_new=false
        console.log("hello")
         var filteredProcesses = this.processes.filter((filt) => {
          console.log("in fil")
          console.log(filt)
          console.log(filt.id == this.id)
          return filt.id == this.id
        
         })  
         this.edit_process = Object.assign({},filteredProcesses[0]);
        console.log(this.edit_process)
         
    }
  },
 
}
</script>
<style scoped>

</style>
