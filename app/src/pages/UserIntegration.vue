<template>
  <div id="first-div">
    <div
      class="q-pa-md col"
      id="second-div"
    >
      <div class="row container">
     <h3 class=" col-6 header">{{the_user.umUserName}}</h3>
     <span class="col-6 top-span">
     <q-btn class=add-button unelevated color="info" :data-cy="'interventionplan'.concat(theuserid)" rounded :label="$t('button.add_plan')" no-caps size="15px" @click="addInterventionPlan" />
     </span >
       <div class="row">
       <q-item >
      <q-item-section  avatar style="padding-right:0px; margin-right:-30px">
          <q-icon class="icon" name="panorama_fish_eye" />
        </q-item-section>
        <q-item-section>{{$t('input_labels.todo')}}</q-item-section>
      </q-item>
      <q-item >
        <q-item-section  avatar style="padding-right:0px; margin-right:-30px">
          <q-icon class="icon" name="circle" />
        </q-item-section>
        <q-item-section>{{$t('input_labels.validation_requested')}}</q-item-section>
      </q-item>
      <q-item >
        <q-item-section avatar style="padding-right:0px; margin-right:-30px">
          <q-icon  color="green" name="circle" />
        </q-item-section>
        <q-item-section>{{$t('input_labels.validated')}}</q-item-section>
      </q-item>
      </div>
    </div>
      </div>
    
    <div >
      <div
        class="q-pa-md"
        id="third-div"
        v-for="intervention_plan in intervention_plans"
        :key="intervention_plan.id"
      >
        <q-list
          bordered
          class="rounded-borders list"
        >
          <h4 id="header">
            <span id="first-span">
              {{intervention_plan.title}}
            </span>
            <span id="second-span">
              <q-btn
                id="button"
                icon-right="add"
                color="secondary"
                no-caps
                :data-cy="'add_intervention_to_plan'.concat(intervention_plan.id)"
                :label="$t('button.add_intervention')"
                :disable="hideAdd"
                @click="button_id = intervention_plan.id;addIntervention()"
              />
            </span>
          </h4>
         <IntegrationPlan
            v-for="intervention in intervention_plan.interventions"
            :key="intervention.id"
            :title="intervention.title"
            :description="intervention.description"
            :the_intervention_plan="intervention_plan"
            :intervention="intervention"
            :the_processes_list="processes_list"
            :model="intervention_shell"
            :hideForm="hideForm"
            :tenants="tenants"
            :completionDoc="the_pic"
            :intervention_categories="types"
            @fetchPic="findDoc"
            @editIntervention="editIntervention"
            @cancelIntervention="cancelIntervention"
            @saveIntervention="savingIntervention"
            @validated="validateIntervention"
            @deleteIntervention="deleteIntervention"
          >
          </IntegrationPlan>
        </q-list>
        <AddIntervention
        
          ref="add"
          :hideAdd="hideAdd"
          :model="intervention_shell"
          :the_intervention_plan="intervention_plan"
          :the_processes_list="processes_list"
          @addIntervention="addIntervention(); button_id = intervention_plan.id"
          @saveIntervention="savingIntervention"
          @cancelIntervention="cancelIntervention"
          :intervention_categories="types"
          :showAddForm="button_id != intervention_plan.id"
        >
        </AddIntervention>
        <q-btn
                id="button"
                icon-right="add"
                color="secondary"
                no-caps
                :data-cy="'delete_olan'.concat(intervention_plan.id)"
                :label="$t('button.delete')"
                :disable="hideAdd"
                @click="deletePlan(intervention_plan.id)"
              />
      </div>
    </div>
  </div>
</template>

<script>
import IntegrationPlan from 'components/IntegrationPlan'
import AddIntervention from 'components/AddIntervention'
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'



export default {
  name: 'PageIndex',
  props: ['theuserid'],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      intervention_types: 'integration_type/intervention_types',
      intervention_categories: 'integration_category/intervention_categories',
      intervention_plans: 'intervention_plan/intervention_plans',
      users: 'user/users',
      documents: 'documents/my_documents',
      completion_documents: 'documents/completion_documents',
      tenants: 'tenant/tenants'
    }, actions: {
      saveIntervention: 'intervention_plan/saveIntervention',
      editIntervention: 'intervention_plan/editIntervention',
      fetchInterventionPlan: 'intervention_plan/fetchInterventionPlan',
      fetchSpecificUser: 'user/fetchSpecificUser',
      fetchIntegrationType: 'integration_type/fetchIntegrationType',
      fetchDocuments: 'documents/fetchDocuments',
      fetchCompletionDocuments: 'documents/fetchCompletionDocuments',
      fetchTenants: 'tenant/fetchTenants',
      deletingIntervention: 'intervention_plan/deleteIntervention',
      deleteInterventionPlan: 'intervention_plan/deleteInterventionPlan'
  }
  })
  ],
  data () {
    return {
      hideForm: true,
      isNew: false,
      the_user: [],
      button_id: null,
      hideAdd: false,
      processes_list: [
        "How to certify education degree",
        "Renewal of residence permit for working reasons",
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      id: this.$route.params.id,
      edit_action: {
        id: 999,
        intervention_title: "",
        description: "",
        linked_processes_id: [],
        validated: false,
        category: ""
      },
      intervention_shell: {
        id: -1,
        listId: -1,
        interventionType: [],
        validationDate: null,
        completed: false,
        title:"",
        description:"",
        validatingUserId:  Number(this.theuserid),
        validatingUserTenant: Number(this.$migrant_tenant),
        assignmentDate: null,
        validationRequestDate: null
      },

      selected_plan: null,
      validation: null,
      types: [], 
      the_pic: null

    }
  },
  components: {
    IntegrationPlan, AddIntervention
  },
  computed: {
    filteredplans () {
      return this.intervention_plans.filter((filt) => {
        return filt.user_id.includes(this.id)
      })
    },

    filteredUsers () {
      return this.users.filter((filt) => {
        return filt.id == this.id
      })
    }
  },
  methods: {
    findDoc(intervention){
      console.log("fetching doc")
      console.log(this.$store.state.documents.completion_documents)
      console.log(this.completion_documents)
      this.the_pic = null
      //console.log(id)
      var intervention_doc = this.completion_documents.filter((doc)=>{
        return doc.idIntervention == intervention.id
      })[0]
      if(intervention_doc!= null){
        var the_doc= this.documents.filter((document) => {
        return document.id == intervention_doc.idDocument
      })[0]
      console.log(the_doc)
      if(the_doc != null){
        console.log("inside if")
         this.the_pic = the_doc.pictures[0].picture
      }
      else{
                console.log("inside if")

        this.the_pic = null
      }
      }
      
     
    },
     addInterventionPlan(){
       console.log(this.user)
      this.$router.push({ name: 'addinterventionplan', params: { theuser: this.the_user, theuserid: this.the_user.umId } })
    },
    deletePlan(id){
       this.$q.notify({
        type: 'warning',
        message: 'Warning: This will delete the plan and all of its interventions. Proceed?',
        actions: [
          { label: 'Delete', color: 'red', handler: () => { 
             console.log("inside deleting plan")
             console.log(id)
             this.deleteInterventionPlan(id) } },
          { label: 'Back', color: 'accent', handler: () => { console.log("not deleting") } }
        ]
      })
     
    },
    
    getTitle(id){
      console.log(id)
      var temp_title = this.intervention_types.filter((int)=>{
        return int.id == id
      })[0]
      console.log(temp_title)
    var lang = temp_title.translations.filter((transl) =>{
      return transl.lang == this.activeLanguage
    })[0].interventionTitle
    return lang
    },
    getDescription(id){
      console.log(id)
      var temp_title = this.intervention_types.filter((int)=>{
        return int.id == id
      })[0]
      console.log(temp_title)
    var lang = temp_title.translations.filter((transl) =>{
      return transl.lang == this.activeLanguage
    })[0].description
    console.log(lang)
    return lang
    },
    createShell (id_plan) {
      this.intervention_shell = {
        id: -1,
        listId: id_plan,
        interventionType: [],
        title:"",
        description:"",
        validationDate: null,
        completed: false,
        validatingUserId: null,
        validatingUserTenant: null,
        assignmentDate: null,
        validationRequestDate: null
      }
    },

    mergeIntervention (intervention) {
      console.log("I am intervention")
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
      console.log("merged intervention")
      console.log(this.intervention_shell)
    },
    deleteIntervention(value){
      console.log("in delete")
      console.log(value)
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId

      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      this.deletingIntervention({intervention_id: value.id, plan_id:this.selected_plan.id})
    },
    savingIntervention (value) {

      console.log(this.isNew)
      var targetId = event.currentTarget.id
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId

      })
      if (this.isNew) {
      console.log("this is the new intervention")
      console.log(value)

        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        console.log(this.selected_plan)
        this.selected_plan.interventions.push(this.intervention_shell)
        var payload = {intervention: this.intervention_shell, plan: this.selected_plan}
        //this.saveIntervention(payload)
        this.$store.dispatch('intervention_plan/saveIntervention', { intervention: this.intervention_shell, plan: this.selected_plan })
        this.isNew = false
        this.hideAdd = false
        this.button_id = null
        console.log(this.isNew)

      }
      else {
        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        var index = this.selected_plan.interventions.findIndex(item => item.id == this.intervention_shell.id)
        this.selected_plan.interventions.splice(index, 1, this.intervention_shell)
        var payload = { intervention: this.intervention_shell, plan: this.selected_plan }
        //this.editIntervention(payload)
        this.$store.dispatch('intervention_plan/editIntervention', { intervention: this.intervention_shell, plan: this.selected_plan })
        this.hideForm = true
        this.hideAdd = false
      }
    },

    addIntervention () {
      this.createShell(this.button_id)
      console.log("adding interventions")
      console.log(this.isNew)
      this.isNew = true;
      this.hideAdd = true;

    },


    validateIntervention (value) {
      console.log("in validation page")
      console.log(value)
      this.mergeIntervention(value)
      this.intervention_shell.completed = JSON.parse(JSON.stringify(true))
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      console.log("i am selected plan interventions")
      console.log(this.selected_plan.interventions)
      var index = this.selected_plan.interventions.findIndex(item => item.id == this.intervention_shell.id)
      this.selected_plan.interventions.splice(index, 1, this.intervention_shell)
      var payload = { intervention: this.intervention_shell, plan: this.selected_plan }
      this.editIntervention(payload)
      //this.$store.dispatch('intervention_plan/editIntervention', { intervention: this.intervention_shell, plan: this.selected_plan })


    },


    editIntervention (value) {
      this.mergeIntervention(value)
      this.button_id = null
      this.isNew = false
      this.hideAdd = true
      this.hideForm = false;
      this.$forceUpdate()
      console.log(this.intervention_shell)
    },

    cancelIntervention () {
      console.log("going back")
      this.button_id = null
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false

    }
  },
  created () {
    var promise= []
    promise.push(this.fetchTenants())
    promise.push(this.fetchCompletionDocuments())
    /*.then(completion_docs =>{
      console.log("I am the completion documents")
      console.log(completion_docs)
    })*/
     promise.push(this.fetchDocuments(this.theuserid))
     /*.then(docs =>{
      console.log("I am the docs of this user")
      console.log(docs)
    })*/
    promise.push(this.fetchInterventionPlan(this.theuserid))
      /*.then(intervention_plans => {
        console.log("these are the returned plans")
        console.log(intervention_plans)
        this.loading = false
      })*/
      Promise.all(promise).then((promise_return)=>{
        console.log(this.intervention_plans)
        console.log(this.completion_docs)
        console.log(promise_return)
        console.log("returned all promises")
         this.fetchIntegrationType()
      .then(integration_types => {
        console.log("got integration types")
        console.log(integration_types)
        integration_types.forEach(ut => {
          var the_integration_types = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].interventionTitle, value: ut.id }
          this.types.push(the_integration_types)
        })
      })
    
      
    
    var payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    this.fetchSpecificUser(payload)
      .then(users => {
        this.the_user = users
        console.log("return from fetch specific user")
        console.log(users)
      })  
      })
      console.log(this.completion_docs)
      console.log("FINISHED CREATED")
      
    
  }
}
</script>
<style scoped>
#first-div{
  padding-left:25px;
}

#second-div {
  width:900px;
  margin:0 auto;
  padding-left:0px;
  padding-right:0px
}

#third-div {
  width:900px;
  margin:0 auto;
  padding-left:0px;
}

.list{
  width:900px;
  border-radius:10px;
}

#header{
  padding-top:10px;
  font-size:20pt;
  font-weight:600;
  padding-bottom:20px;
  margin-top:0px;
  height:60px;
  margin-bottom:0px;
  width:900px;
  padding-left:5px;
  background-color:#0f3a5d;
  color:white;
  border-top-left-radius:10px;
  border-top-right-radius:10px
}

#first-span{
  padding-left:30px;
  font-size:25px
}

#second-span{
  float:right;
  margin-right:15px;
}

#button{
  margin-top:0px;
  border-radius:2px;
}
.header{
  margin-bottom:0px;
  padding-left:12px;
  width:65%; 
  font-size:25pt; 
  font-weight:600
}
.top-span{
  text-align:right; 
  width:35%;
  display: inline-block; 
  vertical-align:middle
}
.add-button{
  width:150px; 
  margin-top:37px; 
  margin-bottom:30px;
  margin-left:5px; 
  border-radius:2px
}
.icon{
  color:#ffd02c
}
</style>
