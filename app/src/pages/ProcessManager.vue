  <template>
  <div >
  <div id="top-div" >{{$t('input_labels.guided_processes')}}</div>
  <div class="container">
    <div class="center">
      <div
        id="div-1"
        class="col-10"
      >
        <q-input
          id="input"
          dense
          items-center
          filled
          v-model="search"
          :label="$t('input_labels.search')"
        >
          <template v-slot:append>
            <q-avatar>
              <q-icon name="search" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div
        id="div-2"
        class="col-2"
      >
        <q-btn
          :data-cy="'addprocess'"
          id="button"
          color="secondary"
          unelevated
          rounded
          :label="$t('button.add_process')"
          no-caps
          size="15px"
          to="guided_process_editor/edit"
        />
      </div>
    </div>
    <div class="center">
      <q-list id="list">
    <q-item class="row" id="item">
    <q-item-section class="col-7 flex flex-left" id="left">
        {{$t('input_labels.name')}}
    </q-item-section>
    <q-item-section class="col-1 flex flex-left">
        {{$t('input_labels.is_published')}}
      </q-item-section>
    <q-item-section class="col-1 flex flex-center" id="section">
       {{$t('input_labels.edit')}}
    </q-item-section>
    <q-item-section class="col-1 flex flex-center">
    {{$t('input_labels.manage')}}
    </q-item-section> 
    <q-item-section class="col-1 flex flex-center">
      {{$t('input_labels.delete')}}
    </q-item-section>
        </q-item>
        <hr id="hr">
        <Process
          v-for="process in filteredProcesses"
          :key="process.id"
          :Title="showProcessLabel(process)"
          :Topics="process.processTopics"
          :Users="process.applicableUsers"
          :processTopics="topics"
          :processUsers="users"
          :Link="process.id"
          :theProcess="process"
          Path="guided_process_editor"
          @remove="deletingProcess"
          @publish="isPublished"
        >
        </Process>
      </q-list>
    </div>
  </div>
  </div>
</template>


<script>
import Process from 'components/guided_process_editor/Process'
import storeMappingMixin from '../mixin/storeMappingMixin'
import editEntityMixin from '../mixin/editEntityMixin'


export default {
  name: 'ProcessManager',
  components: {
    Process
  },
  mixins: [editEntityMixin,
   storeMappingMixin({
    getters: {
      processes: 'flows/processes',
      steps: 'steps/steps',
      steplinks: 'steplinks/steplinks',
      topics: 'topic/topic',
      users: 'user_type/user'
    }, actions: {
      deleteProcess: 'flows/deleteProcess',
      fetchFlows: 'flows/fetchFlows',
      fetchSteplinks: 'steplinks/fetchSteplinks',
      fetchSteps: 'steps/fetchSteps',
      fetchTopic: 'topic/fetchTopic',
      fetchUserType: 'user_type/fetchUserType',
      updatePublished: 'flows/updatePublished',
      saveTranslationProd: 'flows/saveTranslationProd',
      deleteTranslationProd: 'flows/deleteTranslationProd',
      saveStepTranslationProd: 'steps/saveTranslationProd',
      deleteStepTranslationProd: 'steps/deleteTranslationProd'
    }
  })],
  data () {
    return {
      search: ' '
    }
  },

  computed: {
    filteredProcesses () {
      //if none of the fields is filled in it will give the full list of processes
      if (this.search == "") {
        return this.processes
      }
      else {
        return this.processes.filter((a_process) => {
          console.log(this.activeLanguage)
          var curlangproc = a_process.translations.filter((transl) => { return transl.lang == this.activeLanguage })[0]
          //Splits the search field and puts the words in an array
          var searchArray = this.search.split(" ")
          if (searchArray.every(string => curlangproc.process.toLowerCase().includes(string))) {
            return true;
          }        })
      }
    }
  },
  methods: {
     isPublished(value){
       console.log(value)
      var publishing_process =  this.processes.filter((process)=>{
        return process.id == value.process_id
      })[0]
      console.log("i am process to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == value.process_id
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      
      if( value.isPublished == true){
        this.updatePublished({process:publishing_process, published: value.isPublished})
        this.saveTranslationProd(value.process_id)
        this.saveStepTranslationProd(publishing_steps)

      }
      else{
        this.updatePublished({process:publishing_process, published: value.isPublished})
        this.deleteTranslationProd(value.process_id)
        this.deleteStepTranslationProd(publishing_steps)
      }
     },
    deletingProcess (value) {
      console.log(value)
      var deletedProcess = this.processes.filter((filt) => {
        console.log("in fil")
        console.log(filt)
        return filt.id == value
      })
      console.log("I am deleted process")
      console.log(deletedProcess[0])
      var deletedSteps = this.steps.filter((step) =>{
        return step.idProcess == deletedProcess[0].id
      })
      console.log("I am deleted steps")
      console.log(deletedSteps)
      var deletedStepLinks = this.steplinks.filter((steplink) =>{
        return steplink.idProcess == deletedProcess[0].id
      })
      console.log("I am deleted steplinks")
      console.log(deletedStepLinks)
      var payload =  { process:deletedProcess[0].id, steps: deletedSteps, steplinks: deletedStepLinks, comments:deletedProcess[0].comments}
      this.deleteProcess(payload)
    },
    filterTranslationModel (currentLang) {
      return function (element) {
        return element.lang == currentLang;
      }
    },
    showProcessLabel (workingProcess) {
      return workingProcess.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
    }
  },



  created () {

    this.fetchFlows()
      .then(processes => {
        this.loading = false
        console.log(this.processes)
      })
    this.fetchSteps()
      .then(steps => {
        this.loading = false
        console.log(this.steps)
      })
     this.fetchSteplinks()
      .then(steplinks => {
        this.loading = false
        console.log(this.steplinks)
      })
      this.fetchTopic({ defaultLang: this.$defaultLang, userLang: this.$userLang })  
    this.fetchUserType({ defaultLang: this.$defaultLang, userLang: this.$userLang })
    .then(user_types =>{
      console.log("in user type")
      console.log(user_types)
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
#top-div{
  font-style: normal;
  height:72px;
  text-align: center; 
  padding-top:15px;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  color:white; 
  background-color:#FF7C44
}
.center{
  text-align:center;
}
#div-1{
  display:inline-block;
  width:80%;
  padding-right:30px;
  padding-left:0px
}
#div-2{
  display:inline-block;
  text-align:right;
  width:150px
}
#input{
  border-radius:10px;
  width:100%;
  font-size:18px
}
#button{
  width:150px; 
  margin-bottom:15px;
  border-radius:2px
}
#list{
  display:inline-block; 
  width:90%; 
  padding-top:20px
}
#item{
  padding-left:16px; 
  padding-bottom:0px
}
#left{
  text-align:left
}
#section{
  margin-left:20px
}
#hr{
  margin-bottom:60px
}
</style>
