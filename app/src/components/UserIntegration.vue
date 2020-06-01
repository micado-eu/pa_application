<template>
<div style="padding-left:25px">
  <div class="q-pa-md col" style="width:800px; margin:0 auto">
   <UserProfile
   :user="the_user">
   </UserProfile>
  </div>
<div style="">
 <div class="q-pa-md" style="width:750px; margin:0 auto; padding-left:0px" v-for="intervention_plan in filteredplans" 
    :key="intervention_plan.id" >
    <q-list bordered class="rounded-borders" style="width:750px">
    <h4 style="padding-top:20px; padding-bottom:20px; margin-top:0px; margin-bottom:0px;width:750px; padding-left:5px; background-color:#0f3a5d; color:white"> {{intervention_plan.title}} </h4>

    <IntegrationPlan
    v-for="intervention in intervention_plan.actions" :key="intervention.id"
    :title="intervention_plan.title"
    :the_intervention_plan="intervention_plan"
    :intervention="intervention"
    :the_processes_list="processes_list"
    :model="edit_action"
    :hideForm="hideForm"
    :intervention_categories="categories"
    @editIntervention="editIntervention"
    @cancelIntervention="cancelIntervention"
    @saveIntervention="saveIntervention"
    >
    </IntegrationPlan>
</q-list>
    <AddIntervention
    ref="add"
    :hideAdd="hideAdd"
    :model="edit_action"
    :the_intervention_plan="intervention_plan"
    :the_processes_list="processes_list"
    @addIntervention="addIntervention(); button_id = intervention_plan.id"
    @saveIntervention="saveIntervention"
    @cancelIntervention="cancelIntervention"
    :intervention_categories="categories"
    :showAddForm="button_id != intervention_plan.id">
    </AddIntervention>


  </div>
</div>
</div>
</template>

<script>
import IntegrationPlan from './IntegrationPlan'
import AddIntervention from './AddIntervention'
import UserProfile from './UserProfile'

export default {
  name: 'PageIndex',
  

  data (){
    return {
      hideForm: true,
      isNew: false,
      the_user:[],
      button_id:null,
      hideAdd:false, 
       processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      id: this.$route.params.id,
      edit_action:{
         id:999,
        intervention_title:"",
        description:"",
        linked_processes_id:[],
        validated:false, 
        category:""
      }, 
      selected_plan:null,
      validation:null,
      categories:[]
      
    }
  },
  components: {
  IntegrationPlan, AddIntervention, UserProfile
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
        }, 
        
      intervention_categories(){
         return this.$store.state.integration_category.integration_category;
      }
    },
   methods: {
    saveIntervention(value){
      if(this.isNew){
        console.log(this.isNew)
         var targetId = event.currentTarget.id
      var editing = this.filteredplans.filter((filt) => {
        return filt.id == value
        
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      this.selected_plan.actions.push(this.edit_action)
       this.$store.dispatch('intervention_plan/editInterventionPlan', this.selected_plan)
       console.log("i am the store)")
       console.log(this.$store.state.intervention_plan)
       this.isNew = false
       this.hideAdd = false
       this.button_id = null
       console.log(this.isNew)

      }
      else{
      
      var editing = this.filteredplans.filter((filt) => {
        return filt.id == value
        
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      console.log(this.selected_plan.actions)
      var index = this.selected_plan.actions.findIndex(item => item.id == this.edit_action.id)
      this.selected_plan.actions.splice(index, 1, this.edit_action)
        this.$store.dispatch('intervention_plan/editInterventionPlan', this.selected_plan)
      this.hideForm = true
      this.hideAdd = false
      }
    },

      addIntervention(){
        console.log("adding interventions")
        console.log(this.isNew)
         this.isNew = true;
         console.log(this.isNew)
        this.edit_action = {
         id:999,
        intervention_title:"",
        description:"",
        linked_processes_id:[],
        validated:false, 
        category:""
      }
       
        this.hideAdd = true;
      
      },


      validateIntervention(event){
     
      },


    editIntervention(value) {
      this.button_id = null
      this.isNew = false
      this.hideAdd = true
      this.hideForm = false;
       var targetId= value
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
      console.log("going back")
      this.button_id = null
       this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false
     
    }
    },
  created () {
    console.log(this.$store);
    this.$store.dispatch('user/fetchUser')
      .then(users => {
        this.loading = false
         var temp = this.users.filter((filt) => {
          return filt.id == this.id
        })
        this.the_user=temp[0]
      })  
    
    console.log(this.$store);
    this.$store.dispatch('intervention_plan/fetchInterventionPlan')
       .then(intervention_plans => {
        this.loading = false
      })  
   
   console.log(this.$store);
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(intervention_categories => {

         console.log(intervention_categories)
        for ( var i = 0; i<this.intervention_categories.length; i++){
        var the_category = {label: this.intervention_categories[i].title, value:this.intervention_categories[i].id}
        this.categories.push(the_category)
        this.loading = false;
        }
      })
      
  },
 
}
</script>
<style scoped>

</style>
