<template>
  <div id="div-2">
  <div id="div-3">
      Add Intervention Plan
  </div>
    <div id="div-4">
                  <div id="div-5" class=" q-pa-xsm row">
                    <div  id="div-6" class=" q-pa-xsm col-2">
                      <h5 id="header-1"> Title: </h5>
                    </div>
                    <div id="div-7" class="col-8">
                      <q-input dense bg-color="grey-3" maxlength="100" standout outlined v-model="plan_shell.title" />
                    </div>
                    <div id="div-8">
                     <q-btn id="add-button" color="secondary"  unelevated no-caps :label="$t('button.add_intervention')" @click="newAction()" :disable="hideAdd" />
                    </div>
                  </div>
    </div>
    <q-list id="list" bordered separator>
      <q-item
        v-for="an_action in plan_shell.interventions"
        :key="an_action.id"
      >
        <q-item-section id="item-section-1">{{an_action.intervention_title}}</q-item-section>
        <q-item-section side>
          <q-btn
            class="delete-button"
            :label="$t('button.delete')"
            size="12px"
            unelevated
            no-caps
            :id="an_action.id"
            @click="deleteAction($event)"
          />
          <q-btn
            color="info"
            class="edit-button"
            :label="$t('button.edit')"
            size="12px"
            no-caps
            :id="an_action.id"
            @click="editAction($event, an_action)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section id="card-section" :hidden="hideForm">
         <div id="div-9">
        <div id="div-10">
    <div id="div-11" class="q-pa-xsm row">
      <div id="div-12" class=" q-pa-xsm col-4">
        <h5 class="header-2"> Title </h5>
      </div>
      <div id="div-13" class="col-8">
        <q-input  dense   bg-color="white" standout outlined v-model="intervention_shell.intervention_title" />
      </div>
    </div>
    <div id="div-14" class=" q-pa-xsm row">
      <div class=" q-pa-xsm col-4">
        <h5 class="header-2"> Description </h5>
      </div>
      <div id="div-15" class="col-8">
        <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="intervention_shell.description" />
      </div>
    </div>
   <div id="div-16" class=" q-pa-xsm row">
      <div class=" q-pa-xsm col-4">
        <h5 class="header-3"> Related processes </h5>
      </div>
      <div id="div-17" class=" q-pa-md col-8">
     <q-select
        class="select"
        filled
        clearable
        v-model="intervention_shell.linked_processes_id"
        multiple
        :options="processes_list"
        bg-color="white"
        :label="$t('input_labels.related_processes')"
      />
      </div>
      </div>
       <div id="div-18" class=" q-pa-xsm row">
      <div class=" q-pa-xsm col-4">
        <h5 class="header-3">  Category </h5>
      </div>
      <div id="div-19" class=" q-pa-md col-8">
     <q-select
        class="select"
        filled
        clearable
        emit-value
        map-options
        v-model="intervention_shell.interventionType"
        :options="types"
        bg-color="white"
        :label="$t('input_labels.intervention_type')"
      />
      </div>
      </div>
        </div>
        <div class="q-gutter-sm">
         </div>
         <div id="div-20">
        <q-btn class="form-delete-button" unelevated  no-caps  :label="$t('button.cancel')" @click="cancelAction($event)" />
        <q-btn  class="form-save-button"  unelevated no-caps color="accent" :label="$t('button.save')" :id="plan_shell.id" @click="saveAction()" />
        </div>
        </div>
      </q-card-section>
    </q-card>
     <div id="div-21">
     <q-btn class="page-button" color="accent"  :disable="hideAdd" unelevated no-caps :label="$t('button.save')" @click="savePlan()" />
     <q-btn class="page-button" color="info"  :disable="hideAdd" unelevated no-caps :label="$t('button.back')" @click="goBack" />
  </div>
    </div>

</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: "IntegrationType",
  props:[ "theuserid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      intervention_categories: 'integration_category/intervention_categories',
    }, actions: {
      fetchIntegrationType: 'integration_type/fetchIntegrationType',
      saveInterventionPlan: 'intervention_plan/saveInterventionPlan',
    }
  })
  ],
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
        id:-1, 
        title:"",
        userId: this.theuserid,
        creationdate:'2016-06-22 19:10:25-07',
        endDate:'2016-06-22 19:10:25-07',
        caseManager:"john",
        userTenant:Number(this.$migrant_tenant),
        completed:false,
        interventions:[]
      },
     intervention_shell:{
        id:-1,
        listId:-1,
        interventionType:[],
        validationDate:null, 
        completed:false,
        validatingUserId: this.theuserid,
        validatingUserTenant: Number(this.$migrant_tenant),
        assignmentDate: '2016-06-22 19:10:25-07', 
        validationRequestDate:'2016-06-22 19:10:25-07', 
      },
     types:[]
    };
  },
  methods: {
    goBack(){
    this.$router.push({ name: 'interventionplan', params: { theuserid: this.theuserid } })
    },
    createPlanShell(){
      this.plan_shell = {
        id: -1, 
        title:"",
        userId: Number(this.theuserid),
        creationDate:'2016-06-22 19:10:25-07',
        endDate:'2016-06-22 19:10:25-07',
        caseManager:"john",
        userTenant:Number(this.$migrant_tenant),
        completed:false,
        interventions:[]
      }
    },
      createInterventionShell () {
      this.intervention_shell = {  
        id:this.fakeId,
        listId:-1,
        interventionType:[],
        validationDate:null, 
        completed:false,
        validatingUserId: this.theuserid,
        validatingUserTenant: Number(this.$migrant_tenant),
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
      await this.saveInterventionPlan(this.plan_shell)
      console.log("I am the plan shell")
      console.log(this.plan_shell)
       this.$router.push({ name: 'interventionplan', params: { theuserid: this.theuserid } })
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
    this.fetchIntegrationType()
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
.my-card{
  width:746px
}
.edit-button{
  width:70px;
  border-radius:2px;
  font-weight:600; 
  margin-right:10px
}
#list{
  width:746px
}
#add-button{
  border-radius:2px;
  width:140px;
  height:40px;
  font-weight:600
}
.delete-button {
  width:70px;
  margin-bottom:5px;
  border-radius:2px;
  font-weight:600;
  margin-right:10px;
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
.page-button{
  width:100px;
  margin-top:10px;
  margin-right:10px;
  font-weight:600;
}
.form-delete-button{
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
  margin-top:15px;
  border-radius:2px;
  margin-right:10px;
  margin-bottom:10px;
  width:80px;
  font-weight:600
}
.form-save-button {
  margin-top:15px;
  border-radius:2px;
  margin-right:10px;
  margin-bottom:10px;
  width:135px;
  font-weight:600
}
#div-2{
  margin:0 auto;
  margin-top:80px;
  width:750px;
  border-width:2px;
  border-color:#0f3a5d;
  border-radius: 10px;
  border-style: solid;
}
#div-3{
  padding-top:40px;
  padding-left:40px;
  padding-bottom:40px;
  font-size:20pt; 
  font-weight:600;
}
#div-4{
  display:inline-block;
  width:750px;border-width:2px;
  margin-bottom: 1px;
  padding-bottom:20px
}
#div-5{
  text-align:center;
  padding-left:40px
}
#div-6{
  width:65px
}
#div-7{
  display: block;
  margin-bottom:0px;
  width:455px;
  padding-right:0px;
}
#div-8 {
  display: block;
  margin-bottom:0px;
  width:140px;
  padding-right:0px;
  margin-left:20px;
  margin-right:27px;
}
#div-9{
  background-color:#efefef;
  padding-left:0px;
  padding-right:0px
}
#div-10{
  display:inline-block;
  width:750px;border-width:2px;
  margin-bottom: 1px
}
#div-11{
  text-align:center;
  padding-left:30px
}

#div-13{
  margin: auto;display:
  block;margin-bottom:0px;
  padding-right:30px
}
#div-14{
  text-align:center;
  padding-left:30px
}
#div-15{
  margin: auto;display:
  block;margin-bottom:0px;
  padding-right:30px;
  padding-top:10px
}
#div-16{
  text-align:center
}
#div-17{
  margin-top:14px;
  margin-bottom:0px;
  padding-bottom:0px
}
#div-18{
  text-align:center
}
#div-19{
  margin-top:14px;
  margin-bottom:0px;
  padding-bottom:0px
}
#div-20{
  text-align:center
}
#div-21{
  text-align:center; padding-bottom:10px
}
#header-1{
  text-align:left;
  margin-bottom:0px;
  margin-top:5px;
  font-size:15pt
}
#item-section-1{
  font-size:18pt; 
  font-weight:600
}
#card-section{
  padding-left:0px; 
  padding-right:0px; 
  padding-top:0px; 
  padding-bottom:0px;
}
.header-2{
  text-align:left;
  margin-bottom:0px; 
  font-size:15pt
}
.header-3{
  text-align:left; 
  padding-left:30px
}
.select{
  width: 450px
}
</style>