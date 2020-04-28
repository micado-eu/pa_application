  <template>
  <div class="container" >
  <div class="q-gutter-md row items-start">
   <div class="q-gutter-md q-pa-md  col-6 justify-center items-center" >
   <q-input items-center filled v-model="search" label="Search" />
  </div>
  <div class="q-gutter-md q-pa-md  col-5 justify-center items-center" style="text-align:center">
   <q-btn color="accent" label="Add Process"  />
  </div>
  </div>
    <q-list  >
        <Process v-for="process in filteredProcesses"
         :key="process.id"
         :Title="process.title"
         :Tag_1="process.user_tags"
         :Tag_2="process.topic_tags"
         :Link="process.id"
         Path="processmanager">
        </Process>
    </q-list>
  </div>
</template>


<script>
import Process from 'components/Process'


export default {
  name: 'DocumentType',
  props: {
    msg: String
  },
  components: {
   Process
  },
  data () {
    return {
      search: ' ',
    }
  },

  computed: {
     processes () {
      return this.$store.state.flows.flows
    }, 
    filteredProcesses () {
        //if none of the fields is filled in it will give the full list of processes
        if( this.search == "") {
          return this.processes
        }
        else {
          return this.processes.filter((filt) =>{
          //Splits the search field and puts the words in an array
          var searchArray = this.search.split(" ")
          if( searchArray.every(string => filt.title.toLowerCase().includes(string))){
              return true;
            }})
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
