  <template>
  <div class="container" >
   <div style="text-align:center;">
   <div class="col" style="display:inline-block;text-align:left;width:600px">
   <h5> Manage Steps </h5>
  </div>
  <div class="col" style="display:inline-block;text-align:right;padding-right:15px">
   <q-btn style="width:135px; margin-bottom:15px" color="accent" rounded label="Add step" no-caps size="15px" to="/edit_step/" />
  </div>
  </div>
    <div style="text-align:center;">
    <q-list style="display:inline-block;width:750px" >
        <Step v-for="step in filteredSteps"
         :key="step.id"
         :Title="step.title"
         :Link="step.id"
         @remove="deleteStep"
         :Back="id">
        </Step>
    </q-list>
    </div>
  </div>
</template>


<script>
import Step from 'components/Step'

export default {
  //name: 'DocumentType',
  
  props: {
    msg: String
  },
  components: {
   Step
  },
  data () {
    return {
      id:this.$route.params.id,
      step_list:[]
    }
  },

  computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    steps() {
      return this.$store.state.steps.steps
    },
     filteredSteps() {
         console.log("hello")
         return this.steps.filter((filt) => {
          console.log("in fil")
          console.log(filt)
          console.log(typeof(this.id))
         console.log(filt.process_id)
          return filt.process_id.includes(this.id)
        })  
         
     }
  },
  methods: {
    deleteStep(value) {
      var deletedSteps = this.steps.filter((filt) => {
          console.log("in fil")
          console.log(filt.id == value)
          return filt.id == value
        })  
      this.$store.dispatch('steps/deleteSteps', deletedSteps[0].id)
    }
  },



  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(processes => {
        this.loading = false
      })  
    console.log(this.$store);
    this.$store.dispatch('steps/fetchSteps')
      .then(steps => {
        this.loading = false
      })  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}


</style>
