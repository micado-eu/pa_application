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
                      <q-input  dense style=""   bg-color="grey-3" standout outlined v-model="plan_shell.title" />
                    </div>
                    <div class="" style="display: block;margin-bottom:0px;width:140px; padding-right:0px;margin-left:20px; margin-right:27px">
                     <q-btn  color="secondary" style="border-radius:2px; width:140px;height:40px; font-weight:600"  unelevated no-caps :label="$t('button.add_intervention')" @click="newAction()" :disable="hideAdd" />
                    </div>
                  </div>
    </div>
    <q-list style="width:746px" bordered separator>
      <q-item
        
        
        v-for="an_action in plan_shell.interventions"
        :key="an_action.id"
      >
        <q-item-section style="font-size:18pt; font-weight:600">{{an_action.intervention_title}}</q-item-section>
        <q-item-section side>
          <q-btn
          class="button"
            
            :label="$t('button.delete')"
            size="12px"
            style="width:70px; margin-bottom:5px;border-radius:2px;font-weight:600;margin-right:10px"
            unelevated
            no-caps
            :id="an_action.id"
            @click="deleteAction($event)"
          />
          <q-btn
            color="info"
            :label="$t('button.edit')"
            size="12px"
            style="width:70px;border-radius:2px;font-weight:600; margin-right:10px"
            no-caps
            :id="an_action.id"
            @click="editAction($event, an_action)"
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
        <q-input  dense   bg-color="white" standout outlined v-model="intervention_shell.intervention_title" />
      </div>
    </div>
   
         <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px; padding-top:10px">
        <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="intervention_shell.description" />
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
        v-model="intervention_shell.linked_processes_id"
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
        emit-value
        map-options
        v-model="intervention_shell.interventionType"
        :options="types"
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
        <q-btn class="button" style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px; width:80px; font-weight:600" unelevated  no-caps  :label="$t('button.cancel')" @click="cancelAction($event)" />
        <q-btn  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px; width:135px;font-weight:600" unelevated no-caps color="accent" :label="$t('button.save')" :id="plan_shell.id" @click="saveAction()" />
        </div>
        </div>
      </q-card-section>
    </q-card>
     <div style="text-align:center; padding-bottom:10px">
     <q-btn  color="accent" style="width:100px; margin-top:10px; margin-right:10px;font-weight:600" :disable="hideAdd" unelevated no-caps :label="$t('button.save')" @click="savePlan()" />
     <q-btn  color="info" style="width:100px; margin-top:10px;font-weight:600" :disable="hideAdd" unelevated no-caps :label="$t('button.back')" @click="goBack" />
  </div>
    
    </div>
    
    
   
  </div>

</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'

export default {
  name: "IntegrationType",
  props:["theuser", "theuserid"],
  mixins: [editEntityMixin],
  data() {
    return {
      
      hideForm: true,
      hideAdd: false,
      isNew: false,
      fakeId:1,
      processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      plan_shell: {
        id:null, 
        title:"",
        userId: this.theuserid,
        creationdate:'2016-06-22 19:10:25-07',
        endDate:'2016-06-22 19:10:25-07',
        caseManager:"john",
        userTenant:-1234,
        completed:false,
        interventions:[]
      },
     intervention_shell:{
        id:-1,
        listId:-1,
        interventionType:[],
        validationDate:null, 
        completed:false,
        validatingUserId: 1,
        validatingUserTenant: -1234,
        assignmentDate: '2016-06-22 19:10:25-07', 
        validationRequestDate:'2016-06-22 19:10:25-07', 
      },
     types:[]
    };
  },
  computed: {
    intervention_categories(){
         return this.$store.state.integration_category.integration_category;
      }
   
  },
  methods: {
    goBack(){
    this.$router.push({ name: 'interventionplan', params: { theuser: this.theuser } })
    },
    createPlanShell(){
      this.plan_shell = {
        id:null, 
        title:"",
        userId: Number(this.theuserid),
        creationdate:'2016-06-22 19:10:25-07',
        endDate:'2016-06-22 19:10:25-07',
        caseManager:"john",
        userTenant:-1234,
        completed:false,
        interventions:[]
      }
    },
      createInterventionShell () {
      this.intervention_shell = {  id:this.fakeId,
        listId:-1,
        interventionType:[],
        validationDate:null, 
        completed:false,
        validatingUserId: 1,
        validatingUserTenant: -1234,
        assignmentDate: '2016-06-22 19:10:25-07', 
        validationRequestDate:'2016-06-22 19:10:25-07', }
    },

 mergeIntervention (intervention) {
      console.log(intervention)
      this.intervention_shell.id = intervention.id
      this.intervention_shell.listId = intervention.listId
      this.intervention_shell.interventionType = JSON.parse(JSON.stringify(intervention.interventionType))
      this.intervention_shell.validationDate = intervention.validationDate
      this.intervention_shell.completed = intervention.completed
      this.intervention_shell.validatingUserId = intervention.validatingUserId
      this.intervention_shell.validatingUserTenant = intervention.validatingUserTenant
      this.intervention_shell.assignmentDate = intervention.assignmentDate
      this.intervention_shell.validationRequestDate = intervention.validationRequestDate


    },
    editAction(event, value){
      let targetId = event.currentTarget.id
      var editing = this.plan_shell.interventions.filter((filt) => {
        return filt.id == value.id
      })[0]
      this.mergeIntervention(value)
      //this.action = JSON.parse(JSON.stringify(editing[0]))
      this.isNew = false;
      this.hideForm = false;
      this.hideAdd = true
    },
    deleteAction(event) {
      var targetId = event.currentTarget.id
     var index = this.plan_shell.interventions.findIndex(item => item.id == targetId)
      this.plan_shell.interventions.splice(index, 1)
      this.$store.commit('intervention/deleteIntervention', this.intervention_shell.id)

    },
   async savePlan(){
      await this.$store.dispatch('intervention_plan/saveInterventionPlan', this.plan_shell)
      console.log("I am the plan shell")
      console.log(this.plan_shell)
       this.$router.push({ name: 'interventionplan', params: { theuser: this.theuser } })
    },
    saveAction() {
      if (this.isNew) {
        // we are adding a new instance
        this.plan_shell.interventions.push(this.intervention_shell)
        console.log(this.intervention_shell)
        console.log(this.plan_shell.interventions)
        console.log("action saved")
        this.$store.commit('intervention/saveIntervention', this.intervention_shell)
        this.fakeId+=1
      }
      else{
      var index = this.plan_shell.interventions.findIndex(item => item.id == this.intervention_shell.id)
      this.plan_shell.interventions.splice(index, 1, this.intervention_shell)
      this.$store.commit('intervention/editIntervention', this.intervention_shell)
      }
      this.hideForm = true;
     this.hideAdd = false
     
    },
    newAction() {
      this.createInterventionShell()
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
    this.createPlanShell()
    this.$store
      .dispatch("integration_type/fetchIntegrationType")
      .then(integration_types => {

         console.log(integration_types)
       integration_types.forEach(ut => {
          var the_integration_types = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].interventionTitle, value: ut.id }
          this.types.push(the_integration_types)
        })
        
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