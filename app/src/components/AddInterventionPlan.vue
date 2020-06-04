<template>
<div style="padding-top:80px;">
  <div class="" style="width:750px;margin:0 auto; border-width:2px; border-color:#0f3a5d; border-radius: 10px;border-style: solid;">
  <div style="padding-top:40px; padding-left:40px; padding-bottom:40px; font-size:20pt; font-weight:600">
      Add Intervention Plan
  </div>
    <div class=" " style="display:inline-block; width:750px;border-width:2px;  margin-bottom: 1px;  padding-bottom:20px">
                  <div class=" q-pa-xsm row" style="text-align:center; padding-left:40px">
                    <div class=" q-pa-xsm col-2" style="width:65px">
                      <h5 style="text-align:left;margin-bottom:0px;margin-top:5px; font-size:15pt"> Title: </h5>
                    </div>
                    <div class="col-8" style="display: block;margin-bottom:0px;width:455px; padding-right:0px;">
                      <q-input  dense style=""   bg-color="grey-3" standout outlined v-model="plan.title" />
                    </div>
                    <div class="" style="display: block;margin-bottom:0px;width:140px; padding-right:0px;margin-left:20px; margin-right:27px">
                     <q-btn  color="secondary" style="border-radius:2px; width:140px;height:40px; font-weight:600"  unelevated no-caps label="Add Intervention" @click="newAction()" :disable="hideAdd" />
                    </div>
                  </div>
    </div>
    <q-list style="width:746px" bordered separator>
      <q-item
        
        
        v-for="an_action in plan.actions"
        :key="an_action.id"
      >
        <q-item-section style="font-size:18pt; font-weight:600">{{an_action.intervention_title}}</q-item-section>
        <q-item-section side>
          <q-btn
          class="button"
            
            label="Delete"
            size="12px"
            style="width:70px; margin-bottom:5px;border-radius:2px;font-weight:600;margin-right:10px"
            unelevated
            no-caps
            :id="an_action.intervention_title"
            @click="deleteAction($event)"
          />
          <q-btn
            color="info"
            label="Edit"
            size="12px"
            style="width:70px;border-radius:2px;font-weight:600; margin-right:10px"
            no-caps
            :id="an_action.intervention_title"
            @click="editAction($event)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card" style="width:746px">
      <q-card-section :hidden="hideForm" style="padding-left:0px; padding-right:0px; padding-top:0px; padding-bottom:0px;">
         <div style="background-color:#efefef; padding-left:0px; padding-right:0px" >
        <div class=" " style="display:inline-block; width:750px;border-width:2px;  margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Title </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px">
        <q-input  dense   bg-color="white" standout outlined v-model="action.intervention_title" />
      </div>
    </div>
   
         <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px; padding-top:10px">
        <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="action.description" />
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
        v-model="action.linked_processes_id"
        multiple
        :options="processes_list"
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
        v-model="action.category"
        :options="categories"
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
        <q-btn class="button" style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px; width:80px; font-weight:600" unelevated  no-caps  label="Cancel" @click="cancelAction($event)" />
        <q-btn  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px; width:135px;font-weight:600" unelevated no-caps color="accent" label="Save Changes" :id="plan.id" @click="saveAction(action)" />
        </div>
        </div>
      </q-card-section>
    </q-card>
     <div style="text-align:center; padding-bottom:10px">
     <q-btn  color="accent" style="width:100px; margin-top:10px; margin-right:10px;font-weight:600" :disable="hideAdd" unelevated no-caps label="Save plan" @click="savePlan(plan)" />
     <q-btn  color="info" style="width:100px; margin-top:10px;font-weight:600" :disable="hideAdd" unelevated no-caps label="Back" :to="'/migrant/' + this.id" />
  </div>
    
    </div>
    
    
   
  </div>

</template>

<script>
export default {
  name: "IntegrationType",
  data() {
    return {
      id:this.$route.params.id,
      hideForm: true,
      hideAdd: false,
      isNew: false,
      processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      plan: {
        id:null, 
        title:"",
        user_id:this.$route.params.id,
        actions:[{
        id:"a",
        intervention_title: "Attend a language course",
        description:"Learning the language is a fundamental step that you need to perform in order to get integrated in the community",
        linked_processes_id:["How to certify education degree","Renewal of residence permit for working reasons"],
        validated:false
      },
      {
        id:"b",
        intervention_title: "Find a job",
        description:"In order to be part of the community you have to find a job. A good starting point would be looking on the internet or at the employment exchange",
        linked_processes_id:["How to get driver licence recognized","How to get access to public funded housing"],
        validated:false
      }]
      },
      action:{
        id:"c",
        intervention_title:"",
        description:"",
        linked_processes_id:[],
        validated:false,
        category:""

      }, 
      categories:[]
    };
  },
  computed: {
    intervention_categories(){
         return this.$store.state.integration_category.integration_category;
      }
   
  },
  methods: {
    editAction(event){
      let targetId = event.currentTarget.id
      var editing = this.plan.actions.filter((filt) => {
        return filt.intervention_title == targetId
      })
      this.action = JSON.parse(JSON.stringify(editing[0]))
      this.isNew = false;
      this.hideForm = false;
      this.hideAdd = true
    },
    deleteAction(event) {
      var targetId = event.currentTarget.id
     var index = this.plan.actions.findIndex(item => item.intervention_title == targetId)
      this.plan.actions.splice(index, 1)

    },
    savePlan(plan){
      this.$store.dispatch('intervention_plan/saveInterventionPlan', plan)
      console.log("I am te store")
      console.log(this.$store.state.intervention_plan)
    },
    saveAction(value) {
      if (this.isNew) {
        // we are adding a new instance
        this.plan.actions.push(value)
        console.log(value)
        console.log(this.plan.actions)
        console.log("action saved")
      }
      else{
      var index = this.plan.actions.findIndex(item => item.id == value.id)
      this.plan.actions.splice(index, 1, value)
      }
      this.hideForm = true;
     this.hideAdd = false
     this.action ={}
    },
    newAction() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelAction() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    }
  },
  created() {
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(intervention_categories => {

         console.log(intervention_categories)
        for ( var i = 0; i<this.intervention_categories.length; i++){
        var the_category = {label: this.intervention_categories[i].title, value:this.intervention_categories[i].id}
        this.categories.push(the_category)
        this.loading = false;
        console.log("I am param id")
        console.log(this.id)
        }
      })
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