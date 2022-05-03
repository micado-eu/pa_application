<template>
  <div>
    <div class="div-2">
      <form
        @submit.prevent.stop="onSubmitPlan"
        @reset.prevent.stop="onResetPlan"
        class=""
      >
        <div id="div-3">
          {{ $t('input_labels.add_intervention_plan') }}
        </div>
        <div id="div-4">
          <div
            id="div-5"
            class=" q-pa-xsm row"
          >
            <div class=" q-pa-xsm col-2">
              <HelpLabel
                :field-label="$t('input_labels.title')"
                :help-label="$t('help.intervention_plan_title')"
                class="header-1"
                style="padding-top:5px"
              />  
            </div>
            <div
              id="div-7"
              class="col-9"
            >
              <q-input 
                dense 
                bg-color="grey-3" 
                :rules="[
                  val => val.length <= 100 || 'Please use maximum 100 characters',
                  val => !!val || 'Field is required'
                ]"
                ref="title_plan"
                :hint="$t('input_labels.required')" 
                counter 
                maxlength="100" 
                standout 
                outlined 
                v-model="plan_shell.title"
              />
            </div>
          </div>
        </div>
        <q-list
          id="list"
          bordered
          separator
        >
          <q-item
            style="padding-left:60px; padding-right:60px"
            v-for="an_action in plan_shell.interventions"
            :key="an_action.id"
          >
            <q-item-section
              class="col-10"
              id="item-section-1"
            >
              {{ an_action.title }}
            </q-item-section>
            <q-item-section class="col-1 flex flex-center margin">
              <IconWithTooltip
                :icon="'img:statics/icons/Edit.png'"
                :id="an_action.id"
                :tooltip="$t('help.edit_intervention')"
                @click.native="editAction($event, an_action)"
              />
            </q-item-section>
            <q-item-section class="col-1 flex flex-center margin">
              <IconWithTooltip
                :icon="'img:statics/icons/Icon - Delete.svg'"
                :id="an_action.id"
                :tooltip="$t('help.delete_intervention')"
                @click.native="deleteAction($event)"
              />
            </q-item-section>
          </q-item>
        </q-list>
    
        <div id="div-21">
          <q-btn
            class="page-button"
            style="width:110px"
            :data-cy="'cancelinterventionplan'"
            color="info"
            :disable="hideAdd"
            unelevated
            no-caps
            :label="$t('button.go_back')"
            @click="goBack"
          />
          <q-btn
            class="page-button"
            style="width:140px"
            :data-cy="'addintervention'"
            color="secondary"
            unelevated
            no-caps
            :label="$t('button.add_intervention')"
            @click="newAction()"
            :disable="hideAdd"
          />
          <q-btn
            class="page-button"
            style="width:140px"
            :data-cy="'saveinterventionplan'"
            color="accent"
            :disable="hideAdd"
            unelevated
            no-caps
            :label="$t('button.save_plan')"
            type="submit"
          />
        </div>
      </form>
    </div>
    <div
      class="div-2"
      :hidden="hideForm"
    >
      <q-card class="my-card">
        <form
          @submit.prevent.stop="onSubmitIntervention"
          @reset.prevent.stop="onResetIntervention"
          class=""
        >
          <q-card-section
            id="card-section"
            :hidden="hideForm"
          >
            <div id="div-9">
              <h5 class="title">
                {{ $t('input_labels.new_intervention') }}
              </h5>
              <div id="div-10">
                <div
                  id="div-11"
                  class="q-pa-xsm row"
                >
                  <div
                    id="div-12"
                    class=" q-pa-xsm col-3"
                  >
                    <HelpLabel
                      :field-label="$t('input_labels.title')"
                      :help-label="$t('help.intervention_title')"
                      class="header-2"
                      style="padding-top:10px;font-size:16px"
                    />     
                  </div>
                  <div
                    id="div-13"
                    class="col-9"
                  >
                    <q-input 
                      bg-color="grey-3" 
                      :hint="$t('input_labels.required')"
                      ref="title_action"
                      :rules="[
                        val => val.length <= 100 || 'Please use maximum 100 characters',
                        val => !!val || 'Field is required'
                      ]"
                      dense
                      maxlength="100"
                      counter 
                      standout
                      outlined
                      v-model="intervention_shell.title"
                    />
                  </div>
                </div>
                <div
                  id="div-14"
                  class=" q-pa-xsm row"
                >
                  <div class=" q-pa-xsm col-3">
                    <HelpLabel
                      :field-label="$t('input_labels.description')"
                      :help-label="$t('help.intervention_description')"
                      class="header-2"
                      style="font-size:16px"
                    />      
                  </div>
                  <div
                    id="div-15"
                    class="col-9"
                  >
                    <q-input
                      bg-color="grey-3"
                      dense
                      type="textarea"
                      standout
                      outlined
                      v-model="intervention_shell.description"
                    />
                  </div>
                </div>
                <div
                  id="div-18"
                  class=" q-pa-xsm row"
                >
                  <div class=" q-pa-xsm col-3">
                    <HelpLabel
                      :field-label="$t('input_labels.type')"
                      :help-label="$t('help.intervention_assigned_type')"
                      class="header-3"
                      style="font-size:16px"
                    />    
                  </div>
                  <div
                    id="div-19"
                    class=" q-pa-md col-9"
                  >
                    <q-select
                      class="select"
                      :hint="$t('input_labels.required')"
                      ref="type_action"
                      filled
                      dense
                      :lazy-rules="true"
                      :rules="[val => val != null || 'Field is required']"
                      clearable
                      emit-value
                      map-options
                      v-model="intervention_shell.interventionType"
                      :options="types"
                      :label="$t('input_labels.intervention_type')"
                    />
                  </div>
                </div>
              </div>
              <div class="q-gutter-sm" />
              <div id="div-20">
                <q-btn
                  class="form-delete-button"
                  :data-cy="'cancelintervention'"
                  unelevated
                  no-caps
                  :label="$t('button.cancel')"
                  type="reset"
                  @click="cancelAction($event)"
                />
                <q-btn
                  class="form-save-button"
                  :data-cy="'saveintervention'"
                  unelevated
                  no-caps
                  color="accent"
                  :label="$t('button.add_intervention')"
                  :id="plan_shell.id"
                  type="submit"
                />
              </div>
            </div>
          </q-card-section>
        </form>
      </q-card>
    </div>
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
import HelpLabel from 'components/HelpLabel'
import IconWithTooltip from 'components/IconWithTooltip'


export default {
  name: "IntegrationType",
  props:[ "theuserid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      intervention_categories: 'integration_category/intervention_categories'
    }, actions: {
      fetchIntegrationType: 'integration_type/fetchIntegrationType',
      saveInterventionPlan: 'intervention_plan/saveInterventionPlan'
    }
  })
  ],
  components:{HelpLabel,IconWithTooltip},
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
        title:"",
        description:"", 
        completed:false,
        validatingUserId: null,
        validatingUserTenant: null,
        assignmentDate: null, 
        validationRequestDate:null 
      },
     types:[]
    }
  },
  methods: {
    onSubmitPlan () {
      console.log("submitting plan")
      console.log(this.$refs.title_plan)
      this.$refs.title_plan.validate()
      if (this.$refs.title_plan.hasError) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savePlan()
        this.onResetPlan()
      }
    },
    onSubmitIntervention () {
      console.log("submitting intervention")
      console.log(this.$refs.title_action)
      console.log(this.$refs.type_action)
      this.$refs.title_action.validate()
      this.$refs.type_action.validate()
      if (this.$refs.title_action.hasError || this.$refs.type_action.hasError) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.saveAction()
        this.onResetIntervention()
      }
    },
        onResetPlan () {
       this.$refs.title_plan.resetValidation()
    },
    onResetIntervention () {
       this.$refs.title_action.resetValidation()
       this.$refs.type_action.resetValidation()
    },
    goBack(){
    this.$router.push({ name: 'interventionplan', params: { theuserid: this.theuserid } })
    },
    createPlanShell(){
      this.plan_shell = {
        id: -1, 
        title:"",
        userId: this.theuserid,
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
        interventionType:null,
        title:"",
        description:"",
        validationDate:null, 
        completed:false,
        validatingUserId:  null,
        validatingUserTenant: null,
        assignmentDate: null, 
        validationRequestDate:null }
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
      this.intervention_shell.title = intervention.title
      this.intervention_shell.description = intervention.description

    },
    editAction(event, value){
      console.log(value)
      let targetId = event.currentTarget.id
      var editing = this.plan_shell.interventions.filter((filt) => {
        return filt.id == value.id
      })[0]
      this.mergeIntervention(value)
      //this.action = JSON.parse(JSON.stringify(editing[0]))
      this.isNew = false
      this.hideForm = false
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
      this.hideForm = true
     this.hideAdd = false
     
    },
    newAction() {
      this.createInterventionShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelAction() {
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
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
}
</script>
<style scoped>
.my-card{
  width:798px;
  border-radius:10px
}
.edit-button{
  width:70px;
  border-radius:2px;
  font-weight:600; 
  margin-right:10px
}
#list{
  width:798px
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
  border-radius: 5px;
}
.form-delete-button{
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
  margin-top:15px;
  border-radius:5px;
  margin-right:10px;
  margin-bottom:10px;
  width:80px;
  font-weight:600
}
.form-save-button {
  margin-top:15px;
  border-radius:5px;
  margin-right:10px;
  margin-bottom:10px;
  width:140px;
  font-weight:600
}
.div-2{
  margin:0 auto;
  margin-top:80px;
  width:800px;
  border-width:1px;
  border-color:#C4C4C4;
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
  width:800px;border-width:2px;
  margin-bottom: 1px;
  padding-bottom:20px
}
#div-5{
  text-align:center;
  padding-left:60px
}

#div-7{
  display: block;
  margin-bottom:0px;
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
  border-radius:10px;
  padding-left:0px;
  padding-right:0px
}
#div-10{
  display:inline-block;
  width:800px;border-width:2px;
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
  padding-left:20px;
  padding-bottom:0px;
  padding-top:0px
}
#div-20{
  text-align:center;
  padding-top:30px
}
#div-21{
  text-align:center; padding-bottom:10px
}
.header-1{
  text-align:left;
  margin-bottom:0px;
  margin-top:0px;
  padding-top:0px;
  font-size:15pt
}
#item-section-1{
  font-size:20px; 
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
  text-align: left;
  margin-bottom: 0px;
  margin-top: 14px;
  padding-top: 22px;
  font-size: 15pt;
  padding-left: 30px;
}
.select{
  width: 548px
}
.title{
  padding-left:30px;
  margin-top:0px; 
  font-size:25px; 
  padding-top:40px;
  font-weight: 600;
  font-size: 25px;
}
</style>