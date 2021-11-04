<template>
  <div>
    <div v-if="loading">
      {{$t('input_labels.loading')}}
    </div>
    <div v-else>
      
    <div id="content" >
      <div id="top-div">
        {{ $t('input_labels.guided_processes') }}
      </div>

        <div class="center container">
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
<div class="" style="text-align:right">
            <UploadButton entity="process" />
          </div>
        </div>
        <q-item class="container-labels">
              <q-item-section class="col-4 flex flex-left">
                {{ $t('input_labels.name') }}
              </q-item-section>
              <q-item-section
                class="col-1 flex flex-center top"
                style="margin-left:0px"
              >
                {{ $t('input_labels.is_published') }}
              </q-item-section>
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.transl_state') }}
              </q-item-section>
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.comments') }}
              </q-item-section>
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.edit') }}
              </q-item-section>
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.manage') }}
              </q-item-section> 
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.preview') }}
              </q-item-section>
              <q-item-section class="col-1 flex flex-center top">
                {{ $t('input_labels.delete') }}
              </q-item-section>
            </q-item>
                        <hr id="hr">

                </div>
        <div  id="term-defs" class="container-labels">

          <q-list id="list">
            
           
            <Process
              v-for="process in filteredProcesses"
              :key="process.id"
              :title="showProcessLabel(process)"
              :topics="process.processTopics"
              :users="process.applicableUsers"
              :process-topics="topics"
              :process-users="users"
              :link="process.id"
              :the-process="process"
              path="guided_process_editor"
              @remove="deletingProcess"
              @publish="isPublished"
            />
 
          </q-list>
        </div>
    </div>
  </div>
</template>


<script>
import Process from 'components/guided_process_editor/Process'
import storeMappingMixin from '../mixin/storeMappingMixin'
import editEntityMixin from '../mixin/editEntityMixin'
import UploadButton from 'components/UploadButton'



export default {
  name: 'ProcessManager',
  components: {
    Process,UploadButton
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
      deleteStepTranslationProd: 'steps/deleteTranslationProd',
      saveSteplinkTranslationProd: 'steplinks/saveTranslationProd',
      deleteSteplinkTranslationProd: 'steplinks/deleteTranslationProd'
      
    }
  })],
  data () {
    return {
      search: ' ',
      loading:true
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
          var searchArray = this.search.toLowerCase().split(" ")
          if (searchArray.every(string => curlangproc.process.toLowerCase().includes(string))) {
            return true
          }        })
      }
    }
  },
  methods: {
     /*isPublished(value){
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
     }*/
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
        return element.lang == currentLang
      }
    },
    showProcessLabel (workingProcess) {
      return workingProcess.translations.filter(
                (top) => top.translated == false && top.lang == this.$defaultLang
              )[0].process
    },
    isPublished(event){
     console.log("event ")
      console.log(event.isPublished)
      console.log("user id")
      console.log(event.process_id)
      var publishing_process =  this.processes.filter((doc)=>{
        return doc.id == event.process_id
      })[0]
      console.log("i am doc to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == event.process_id
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      console.log("i am links to publish")
      console.log(this.related_links)
      var publication_date = new Date().toISOString()
      var publishing_links = this.steplinks.filter((links)=>{
        return links.idProcess == event.process_id 
      })
      if( event.isPublished == true){
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.publish_process'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({process:publishing_process, published:event.isPublished, publishedDate: publication_date})
            this.saveTranslationProd(event.process_id)
            this.saveStepTranslationProd(publishing_steps)
            this.saveSteplinkTranslationProd(publishing_links)
             } },
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
             this.processes.filter((doc)=>{
              return doc.id == event.process_id
              })[0].published = false } }
        ]
      })
       
      }
      else{
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message:  this.$t('warning.unpublish_process'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({process:publishing_process, published:event.isPublished})
            this.deleteTranslationProd(event.process_id)
            this.deleteStepTranslationProd(publishing_steps)
            this.deleteSteplinkTranslationProd(publishing_links)
            }},
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.processes.filter((doc)=>{
              return doc.id == event.process_id
              })[0].published = true } }
        ]
      })
       
      }
     }

  },
  


  created () {
    console.log("in process list")
    var promises = []
    promises.push(this.fetchSteps())
    promises.push(this.fetchFlows())
    promises.push(this.fetchSteplinks())
    promises.push( this.fetchTopic({ defaultLang: this.$defaultLang, userLang: this.$userLang }))
    promises.push(this.fetchUserType({ defaultLang: this.$defaultLang, userLang: this.$userLang }))
    Promise.all(promises).then(()=>{
      this.loading=false
    })
    /*this.fetchFlows()
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
    })*/
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 0px;
  padding-left: 80px;
}
.container-labels {
  padding-top: 0px;
  padding-right: 96px;
  padding-bottom: 0px;
  padding-left: 96px;
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
  border-radius:5px
}
#list{
  display:inline-block; 
  width:100%; 
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
  margin-left:96px;
  margin-right:96px
}
#content {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;       
  }

</style>
