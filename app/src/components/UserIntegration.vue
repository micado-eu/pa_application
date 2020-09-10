<template>
  <div style="padding-left:25px">
    <div
      class="q-pa-md col"
      style="width:800px; margin:0 auto"
    >
      <UserProfile :user="the_user">
      </UserProfile>
    </div>
    <div style="">
      <div
        class="q-pa-md"
        style="width:750px; margin:0 auto; padding-left:0px"
        v-for="intervention_plan in intervention_plans"
        :key="intervention_plan.id"
      >
        <q-list
          bordered
          class="rounded-borders"
          style="width:750px; border-radius:10px"
        >
          <h4 style="padding-top:10px;font-size:20pt; font-weight:600;padding-bottom:20px; margin-top:0px; height:60px;margin-bottom:0px;width:750px; padding-left:5px; background-color:#0f3a5d; color:white; border-top-left-radius:10px;border-top-right-radius:10px">
            <span style="padding-left:30px">
              {{intervention_plan.title}}
            </span>
            <span style="float:right; margin-right:15px ">
              <q-btn
                icon-right="add"
                style="margin-top:0px;border-radius:2px"
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
            :title="intervention_plan.title"
            :the_intervention_plan="intervention_plan"
            :intervention="intervention"
            :the_processes_list="processes_list"
            :model="intervention_shell"
            :hideForm="hideForm"
            :intervention_categories="types"
            @editIntervention="editIntervention"
            @cancelIntervention="cancelIntervention"
            @saveIntervention="saveIntervention"
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
          @saveIntervention="saveIntervention"
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
import IntegrationPlan from './IntegrationPlan'
import AddIntervention from './AddIntervention'
import UserProfile from './UserProfile'
import editEntityMixin from '../mixin/editEntityMixin'
import { mapGetters, mapActions } from "vuex";



export default {
  name: 'PageIndex',
  props: ['theuser', 'theuserid'],
  mixins: [editEntityMixin],
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
    /*intervention_plans () {
      return this.$store.state.intervention_plan.intervention_plan
    },*/
    ...mapGetters("integration_type", ["intervention_types"]),
    ...mapGetters("integration_category", ["intervention_categories"]),
    ...mapGetters("intervention_plan", ["intervention_plans"]),
    ...mapGetters("user", ["users"]),



    /*intervention_types () {
      return this.$store.state.integration_type.integration_type
    },*/
    filteredplans () {
      return this.intervention_plans.filter((filt) => {
        console.log(filt)
        console.log(this.id)
        console.log(typeof (this.id))
        console.log(filt.user_id == this.id)
        return filt.user_id.includes(this.id)
      })
    },

    /*users () {
      return this.$store.state.user.user
    },*/
    filteredUsers () {
      return this.users.filter((filt) => {
        return filt.id == this.id
      })
    },

    /*intervention_categories () {
      return this.$store.state.integration_category.integration_category;
    }*/
  },
  methods: {
    ...mapActions("intervention_plan", [
      "saveIntervention",
      "editIntervention",
      "fetchInterventionPlan"
    ]),
    ...mapActions("user", [
      "fetchSpecificUser"
    ]),
    ...mapActions("integration_type", [
      "fetchIntegrationType"
    ]),
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
    saveIntervention (value) {

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
        console.log("I am the editing intervention")
        console.log(this.intervention_shell)

        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        console.log("i am selected plan interventions")
        console.log(this.selected_plan.interventions)
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
      console.log(this.isNew)

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
      /*  var targetId= value
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
       console.log(this.edit_action)*/

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
    console.log("in created")
    //console.log(this.theuser.umId)
    console.log("in created the user id is:")
    console.log(this.$route.query.theuserid)
    console.log("fetching user");
    var payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    console.log("I am user id")
    console.log(this.theuserid)
    //this.$store.dispatch('user/fetchSpecificUser', { userid: this.theuserid, tenantid: this.$migrant_tenant })
    this.fetchSpecificUser(payload)
      .then(users => {
        this.loading = false
        var temp = this.users.filter((filt) => {
          return filt.umId == this.theuserid
        })
        console.log("I am found user")
        console.log(temp)
        this.the_user = temp[0]
      })

    console.log(this.$store);
    //this.$store.dispatch('intervention_plan/fetchInterventionPlan', this.theuserid)
    this.fetchInterventionPlan(this.theuserid)
      .then(intervention_plans => {
        console.log("these are the returned plans")
        console.log(intervention_plans)
        this.loading = false
      })

    /* console.log(this.$store);
      this.$store
        .dispatch("integration_category/fetchIntegrationCategory")
        .then(intervention_categories => {
  
           console.log(intervention_categories)
          for ( var i = 0; i<this.intervention_types.length; i++){
          var the_category = {label: this.intervention_types[i].title, value:this.intervention_types[i].id}
          this.categories.push(the_category)
          this.loading = false;
          }
        })
        
    },*/
    //this.$store.dispatch("integration_type/fetchIntegrationType")
      this.fetchIntegrationType()
      .then(integration_types => {
        console.log("got integration types")
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
</style>
