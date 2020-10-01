<template>
  <div id="first-div">
    <div
      class="q-pa-md col"
      id="second-div"
    >
      <UserProfile :user="the_user">
      </UserProfile>
    </div>
    <div >
      <div
        class="q-pa-md"
        id="third-div"
        v-for="intervention_plan in intervention_plans"
        :key="intervention_plan.id"
      >
        <q-list
          id="list"
          bordered
          class="rounded-borders"
        >
          <h4 id="header">
            <span id="first-span">
              {{intervention_plan.title}}
            </span>
            <span id="second-span">
              <q-btn
                id="button"
                icon-right="add"
                color="accent"
                no-caps
                :label="$t('button.add_intervention')"
                :disable="hideAdd"
                @click="button_id = intervention_plan.id;addIntervention()"
              />
            </span>
          </h4>

          <IntegrationPlan
            v-for="intervention in intervention_plan.interventions"
            :key="intervention.id"
            :title="getTitle(intervention.interventionType)"
            :description="getDescription(intervention.interventionType)"
            :the_intervention_plan="intervention_plan"
            :intervention="intervention"
            :the_processes_list="processes_list"
            :model="intervention_shell"
            :hideForm="hideForm"
            :intervention_categories="types"
            @editIntervention="editIntervention"
            @cancelIntervention="cancelIntervention"
            @saveIntervention="savingIntervention"
            @validated="validateIntervention"
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

      </div>
    </div>
  </div>
</template>

<script>
import IntegrationPlan from 'components/IntegrationPlan'
import AddIntervention from 'components/AddIntervention'
import UserProfile from 'components/UserProfile'
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
      users: 'user/users'
    }, actions: {
      saveIntervention: 'intervention_plan/saveIntervention',
      editIntervention: 'intervention_plan/editIntervention',
      fetchInterventionPlan: 'intervention_plan/fetchInterventionPlan',
      fetchSpecificUser: 'user/fetchSpecificUser',
      fetchIntegrationType: 'integration_type/fetchIntegrationType'
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
        validatingUserId: 1,
        validatingUserTenant: -1234,
        assignmentDate: '2016-06-22 19:10:25-07',
        validationRequestDate: '2016-06-22 19:10:25-07',
      },

      selected_plan: null,
      validation: null,
      types: []

    }
  },
  components: {
    IntegrationPlan, AddIntervention, UserProfile
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
        validationDate: null,
        completed: false,
        validatingUserId: 1,
        validatingUserTenant: -1234,
        assignmentDate: '2016-06-22 19:10:25-07',
        validationRequestDate: '2016-06-22 19:10:25-07',
      }
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
    savingIntervention (value) {

      console.log(this.isNew)
      var targetId = event.currentTarget.id
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId

      })
      if (this.isNew) {
        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        console.log(this.selected_plan)
        this.selected_plan.interventions.push(this.intervention_shell)
        var payload = {intervention: this.intervention_shell, plan: this.selected_plan}
        //this.saveIntervention(payload)
        this.$store.dispatch('intervention_plan/saveIntervention', { intervention: this.intervention_shell, plan: this.selected_plan })
        console.log("")
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
    var payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    this.fetchSpecificUser(payload)
      .then(users => {
        this.loading = false
        var temp = this.users.filter((filt) => {
          return filt.umId == this.theuserid
        })
        this.the_user = temp[0]
      })
    console.log(this.$store);
    this.fetchInterventionPlan(this.theuserid)
      .then(intervention_plans => {
        console.log("these are the returned plans")
        console.log(intervention_plans)
        this.loading = false
      })
      this.fetchIntegrationType()
      .then(integration_types => {
        console.log("got integration types")
        console.log(integration_types)
        integration_types.forEach(ut => {
          var the_integration_types = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].interventionTitle, value: ut.id }
          this.types.push(the_integration_types)
        })
      })
      console.log("i am intervention_categories")
      console.log(this.intervention_types)
  }
}
</script>
<style scoped>
#first-div{
  padding-left:25px;
}

#second-div {
  width:800px;
  margin:0 auto;
}

#third-div {
  width:750px;
  margin:0 auto;
  padding-left:0px;
}

#list{
  width:750px;
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
  width:750px;
  padding-left:5px;
  background-color:#0f3a5d;
  color:white;
  border-top-left-radius:10px;
  border-top-right-radius:10px
}

#first-span{
  padding-left:30px;
}

#second-span{
  float:right;
  margin-right:15px;
}

#button{
  margin-top:0px;
  border-radius:2px;
}
</style>
