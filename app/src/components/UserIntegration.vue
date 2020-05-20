<template>
<div style="padding-left:25px">
  <div style="text-align:center">
   <div class="col" style="padding-right:20px;padding-left:20px">
    <h4 > {{this.filteredUsers[0].username}} </h4>
    </div>
<div class="col" style="display:inline-block;text-align:right;width:135px">
   <q-btn style="width:135px; margin-bottom:15px" color="accent" rounded label="Add Plan" no-caps size="15px" :to="this.id + '/add'" />
  </div>
  </div>
<div style="">
 <div class="q-pa-md" style="width:800px; display:inline-block" v-for="intervention_plan in filteredplans" 
    :key="intervention_plan.id">
    <q-list bordered >
      <h4 style="padding-top:20px; padding-bottom:20px; margin-top:0px; margin-bottom:0px; padding-left:5px; background-color:#0f3a5d; color:white"> {{intervention_plan.title}} </h4>
      <q-separator />
       <q-expansion-item v-for="intervention in intervention_plan.actions" :key="intervention.id"
        group="somegroup"
        :label="intervention.intervention_title"
         header-class="text-accent"
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
        <q-input style="padding-top:10px" v-model="edit_action.intervention_title" label="Title" />
        <q-input  style="padding-top:10px" v-model="edit_action.description" filled type="textarea" label="Description" />
        <q-select  style="padding-top:10px"
        filled
        clearable
        v-model="edit_action.linked_processes_id"
        multiple
        :options="processes_list"
        label="linked processes"
        
      />
        <div class="q-gutter-sm">
         
        </div>
        <q-btn  style="margin-top:15px" color="secondary" label="Save" :id="intervention_plan.id" @click="saveIntervention($event)" />
        <q-btn  style="margin-top:15px" color="secondary" label="Cancel" @click="cancelIntervention()" />
      </q-card-section>
           </div>
          </q-card-section>
          
        </q-card>
      </q-expansion-item>
      
      <q-separator />
      </q-list>
      
    <br>
    </div>
  </div>
</div>
</template>

<script>


export default {
  name: 'PageIndex',
  

  data (){
    return {
      hideForm: true,
      isNew: false,
       processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      id: this.$route.params.id,
      edit_action:{
        intervention_title:"",
        description:""
      }, 
      selected_plan:null,
      validation:null

      
    }
  },
  components: {
  
  },
    computed:{
      intervention_plans () {
      return this.$store.state.intervention_plan.intervention_plan
    },
      filteredplans () {
       return this.intervention_plans.filter((filt) => {
         console.log(filt)
         console.log(this.id)
         console.log(typeof(this.id))
         console.log(filt.user_id == this.id)
         return filt.user_id.includes(this.id)
       })
        },
        
       users () {
      return this.$store.state.user.user
    }, 
    filteredUsers () {
        return this.users.filter((filt) => {
          return filt.id == this.id
        })
        } 
    },
   methods: {
    saveIntervention(event){
      var targetId = event.currentTarget.id
      var editing = this.filteredplans.filter((filt) => {
        return filt.id == targetId
        
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      console.log(this.selected_plan.actions)
      var index = this.selected_plan.actions.findIndex(item => item.id == this.edit_action.id)
      this.selected_plan.actions.splice(index, 1, this.edit_action)
        this.$store.dispatch('intervention_plan/editInterventionPlan', this.selected_plan)
      this.hideForm = true
      },


      validateIntervention(event){
     
      },


    editIntervention(event) {
      this.isNew = true;
      this.hideForm = false;
       var targetId= event.currentTarget.id
      for(let i = 0; i < this.filteredplans.length; i++){
      var editing = this.filteredplans[i].actions.filter((filt) => {
        console.log(filt)
        console.log(targetId)
        console.log(filt.id == targetId)
        return filt.id == targetId
      })
      if(editing.length == 1){
        console.log("in if")
        console.log(editing)
        this.edit_action=JSON.parse(JSON.stringify(editing[0]))
        console.log(this.edit_action)
      }
      }
      console.log(this.edit_action)
     
    },
    cancelIntervention() {
       this.isNew = false;
      this.hideForm = true;
    }
    },
  created () {
    console.log(this.$store);
    this.$store.dispatch('user/fetchUser')
      .then(users => {
        this.loading = false
      })  
    
    console.log(this.$store);
    this.$store.dispatch('intervention_plan/fetchInterventionPlan')
       .then(intervention_plans => {
        this.loading = false
      })  
  
  },
 
}
</script>
<style scoped>

</style>
