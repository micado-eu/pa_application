<template>
  <div class="q-pa-md">
    <q-input v-model="plan.title" label="Intervention plan title" />
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="an_action in plan.actions"
        :key="an_action.id"
      >
        <q-item-section>{{an_action.intervention_title}}</q-item-section>
        <q-item-section side>
          <q-btn
            color="negative"
            label="Delete"
            size="xs"
            :id="an_action.intervention_title"
            @click="deleteAction($event)"
          />
          <q-btn
            color="secondary"
            label="Edit"
            size="xs"
            :id="an_action.intervention_title"
            @click="editAction($event)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn color="secondary" label="Add" @click="newAction()" :disable="hideAdd" />
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-input v-model="action.intervention_title" label="Title" />
        <q-input v-model="action.description" filled type="textarea" label="Description" />
        <div class="q-gutter-sm">
          <q-select  style="padding-top:10px"
        filled
        clearable
        v-model="action.linked_processes_id"
        multiple
        :options="processes_list"
        label="linked processes"
        
      />
        </div>
        <q-btn color="secondary" label="Save" @click="saveAction(action)" />
        <q-btn color="secondary" label="Cancel" @click="cancelAction()" />
      </q-card-section>
    </q-card>
     <q-btn color="secondary" label="Save plan" @click="savePlan(plan)" />
  </div>
</template>

<script>
export default {
  name: "IntegrationType",
  data() {
    return {
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
        validated:false

      }
    };
  },
  computed: {
   
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
    
  }
};
</script>