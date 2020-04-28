  <template>
  <div class="container" >
  <div style="text-align:center">
  <h3>{{this.title}}</h3>
  </div>
    <q-list  >
        <Step v-for="step in steps"
         :key="step.id"
         :Title="step.title"
         :Link="step.id">
        </Step>
    </q-list>
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
      title: ""
    }
  },

  computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    steps() {
      if(this.id != null){
        for(var i = 0; i< this.processes.length; i++){
          if(this.processes[i].id == this.id){
            console.log("id processo" + this.processes[i].id)
            console.log(this.processes[i])
            console.log("id route" + this.id)
            this.title= this.processes[i].title
            return this.processes[i].steps
          }
        }
      }
    }
     
  },



  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(processes => {
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
