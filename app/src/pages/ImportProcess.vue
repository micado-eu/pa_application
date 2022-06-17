<template>
  <div>
    <div
      class="banner"
    >
      {{ $t('button.import_process') }}
    </div>
    <hr style="border: 1px solid #0F3A5D">
    <q-file
      filled
      bottom-slots
      v-model="model"
      :label="$t('input_labels.process_file')"
      counter
      @input="test"
    >
      <template v-slot:prepend>
        <q-icon
          name="cloud_upload"
          @click.stop
        />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop="model = null"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:hint>
        {{ $t('help.process_file') }}
      </template>
    </q-file>

    <!-- <input
      type="file"
      id="selectFiles"
      value="Import"
    ><br>
    <q-btn
      id="import"
      @click="importProcess"
      color="secondary"
      unelevated
      rounded
      label="Import file"
      no-caps
      size="15px"
    />
    <q-btn
      @click="downloadJson"
      color="secondary"
      unelevated
      rounded
      label="Download Json"
      no-caps
      size="15px"
    />-->
    <!--<pre id="result"></pre>-->
    <div v-if="process != null">
      <div id="div-1">
        <q-card class="container">
          <div
            class=" q-pa-xsm "
            id="div-2"
            style="padding-bottom:0px"
          >
            <div
              class="title"
              style="text-align:left"
            >
              {{ $t('input_labels.process_name') }}
            </div>
           
            <div style="text-align:left">
              {{ this.process.process[0].translations.filter(filterTranslationModel(this.activeLanguage))[0].process }}
            </div>
          </div>

          <div
            id="div-4"
            class=""
          >
            <div
              class="title"
              style="text-align:left"
            >
              {{ $t('input_labels.process_description') }}
            </div>
            
            <div style="text-align:left">
              <glossary-editor-viewer
                :content="process.process[0].translations.filter(filterTranslationModel(this.activeLanguage))[0].description"
                :key="process.process[0].translations.filter(filterTranslationModel(this.activeLanguage))[0].description"
              />
            </div>
          </div>
          <div
            id="div-4"
            class=""
          >
            <div
              class="title"
              style="text-align:left"
            >
              {{ $t('input_labels.generated_docs') }}
            </div>
            
            <div
              v-for="doc in this.process.process[0].documents"
              :key="doc.id"
              class="row"
            >
              <div
                class="col"
                style="text-align:left"
              >
                {{ doc.translations.filter(filterTranslationModel(activeLanguage))[0].document }}
              </div>
              <div
                class="col"
                style="display: flex;align-items: center;justify-content: right"
              >
                <q-btn
                  unelevated
                  rounded
                  class="associate"
                  :label="$t('button.associate')"
                  @click="associateDocProcess(doc.id)"
                  no-caps
                  size="15px"
                />
                <q-btn
                  unelevated
                  rounded
                  class="create"
                  :label="$t('button.create')"
                  no-caps
                  @click="createDocProcess(doc.id)"
                  size="15px"
                />
                <q-btn
                  unelevated
                  rounded
                  class="delete"
                  :label="$t('button.delete')"
                  @click="deleteProcessDoc(doc.id)"
                  no-caps
                  size="15px"
                />      
              </div>              
            </div>
          </div>
        </q-card>
      </div>
      <div style="text-align:center; padding-top:10px">
        <q-btn
          unelevated
          class="associate"
          rounded
          :label="$t('button.save_process')"
          no-caps
          @click="saveProcess"
          size="15px"
        />
      </div>  
      <div v-if="true">
        <div id="div-1">
          <q-card class="container">
            <div
              class=" q-pa-xsm "
              id="div-2"
              style="padding-bottom:0px"
            >
              <div
                class="title"
                style="text-align:left"
              >
                {{ $t('input_labels.steps') }}
              </div>
              <q-list
                bordered
                class="rounded-borders"
                style="margin-bottom:10px"
              >
                <q-expansion-item
                  expand-separator
                  v-for="doc in process.steps" 
                  icon="perm_identity"
                  :key="doc.id"
                >
                  <template v-slot:header>
                    <q-item-section style="font-size:20px;text-align:left">
                      {{ doc.translations.filter(filterTranslationModel("en"))[0].step }}
                    </q-item-section>
                  </template>
                  <q-card>
                    <div
                      class="title_lower"
                      style="text-align:left;padding-left:16px"
                    >
                      {{ $t('input_labels.step_description') }}
                    </div>
                    <q-card-section style="text-align:left">
                      {{ doc.translations.filter(filterTranslationModel("en"))[0].description }}
                    </q-card-section>
                    <div
                      class="title_lower"
                      style="text-align:left;padding-left:16px"
                    >
                      {{ $t('input_labels.associate_docs') }}
                    </div>
                    <q-card-section
                      v-for="docu in doc.documents"
                      :key="docu.id"
                      class="row"
                    >
                      <div
                        class="col"
                        style="text-align:left"
                      >
                        {{ docu.translations.filter(filterTranslationModel(activeLanguage))[0].document }}
                      </div>
                      <div
                        class="col"
                        style="display: flex;align-items: center;justify-content: right"
                      >
                        <q-btn
                          unelevated
                          rounded
                          class="associate"
                          @click="associate(doc.id,docu.id)"
                          :label="$t('button.associate')"
                          no-caps
                          size="15px"
                        />
                        <q-btn
                          unelevated
                          rounded
                          class="create"
                          :label="$t('button.create')"
                          @click="createDoc(doc.id,docu.id)"
                          no-caps
                          size="15px"
                        />
                        <q-btn
                          unelevated
                          rounded
                          class="delete"
                          :label="$t('button.delete')"
                          @click="deleteStepDoc(doc.id,docu.id)"
                          no-caps
                          size="15px"
                        />
                      </div>      
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </q-card>
        </div>
        <div style="text-align:center;  padding-top:10px">
          <q-btn
            class="associate"
            unelevated
            rounded
            :label="$t('button.save_steps')"
            @click="saveSteps"
            no-caps
            size="15px"
          />               
        </div>
      </div>
    </div>
    <q-dialog
      v-model="associating"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ $t('input_labels.associate_doc_text') }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            filled
            dense
            clearable
            emit-value
            map-options
            v-model="linked_doc"
            :options="t_docs"
            :label="$t('input_labels.doc_type')"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            :data-cy="'cancel'"
            :label="$t('button.cancel')"
            color="accent"
            v-close-popup
            @click="cancel"
          />
          <q-btn
            :label="$t('button.associate')"
            color="accent"
            :data-cy="'validatetask'"
            @click="associateDoc"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="associating_process"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ $t('input_labels.associate_doc_text') }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            filled
            dense
            clearable
            emit-value
            map-options
            v-model="linked_doc"
            :options="t_docs"
            :label="$t('input_labels.doc_type')"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            :data-cy="'cancel'"
            :label="$t('button.cancel')"
            color="accent"
            v-close-popup
            @click="cancel"
          />
          <q-btn
            :label="$t('button.associate')"
            color="accent"
            :data-cy="'validatetask'"
            @click="saveAssociatedDocProcess"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import storeMappingMixin from '../mixin/storeMappingMixin'
import editEntityMixin from '../mixin/editEntityMixin'
const GlossaryEditorViewer = () => import("components/GlossaryEditorViewer")


export default {
  //name: 'Error404'
  data(){
    return{
      process:null,
      associating:false,
      associating_process:false,
      step_id:null,
      doc_id:null,
      linked_doc:null,
      t_docs:[],
      process_saved:false,
      model:null
    }
  },
  components:{
GlossaryEditorViewer
  },
   mixins: [editEntityMixin,
   storeMappingMixin({
    getters: {
      document_types: 'document_type/document_types',
      processes: 'flows/processes'
    }, actions: {
       fetchDocumentType: "document_type/fetchDocumentType",
      savingProcess: 'flows/saveProcess',
      saveGraph: 'graphs/saveGraph',
      fetchFlows: 'flows/fetchFlows',
      saveDocumentType: 'document_type/saveDocumentType'

    }
  })],
  methods:{
    test(){
      console.log(this.model)
        const fr = new FileReader()

  fr.onload = e => {
    const result = JSON.parse(e.target.result)
    const formatted = JSON.stringify(result, null, 2)
    console.log(formatted)
    //we assign the formatted json to a data field so we can manipulate it later
    this.process = JSON.parse(formatted)
    console.log(this.process.process[0].documents)
    console.log(this.process.steps)
    //document.getElementById('result').innerHTML = formatted
  }
  fr.readAsText(this.model)
    },
    deleteStepDoc(step_id, doc_id){
      //We look for the specific step and specific document and delete the document from that step
      var index = this.process.steps.filter((item) => item.id === step_id)[0].documents.findIndex(item => item.id === doc_id)
       console.log(index)
       this.process.steps.filter((item) => item.id === step_id)[0].documents.splice(index, 1)
        var index_doc = this.process.steps.filter((item) => item.id === step_id)[0].step_documents.findIndex(item => item.id_document === doc_id)
       console.log(index_doc)
       this.process.steps.filter((item) => item.id === step_id)[0].step_documents.splice(index_doc, 1)
    },
    deleteProcessDoc(doc_id){
      //We look for the specific document and delete the document from the process
       var index =  this.process.process[0].documents.findIndex(item => item.id === doc_id)
       this.process.process[0].documents.splice(index, 1)
    },
    createDocProcess(doc_id){
      //creates docs linked to the process
      //select the doc that needs to be created
      var new_doc = this.process.process[0].documents.filter((doc)=>{
        return doc.id == doc_id
      })[0]
      //it needs these two fields otherwise the save function will break
      new_doc.pictures= []
      new_doc.validators= [],
      //saving the doc
      this.saveDocumentType(new_doc)
            this.$q.loading.show({
        message: this.$t('input_labels.loading')
      })
      //setting a timeout with a loading to give the time to save the stuff 
      setTimeout(()=>{
        this.$q.loading.hide()
         this.$q.notify({
          message: 'Document has been saved and linked to this process',
          color: 'purple'
        })
      console.log(this.process.process[0])
      }, 3000)

    },
    createDoc(step_id, doc_id){
      //create docs linked to the step
      //take the specific document from the step
      var new_doc = this.process.steps.filter(step => step.id == step_id)[0].documents.filter((doc)=>{
        return doc.id == doc_id
      })[0]
      //it needs these two fields otherwise the save function will break
      new_doc.pictures= []
      new_doc.validators= []
      //saving the doc
      this.saveDocumentType(new_doc)
            this.$q.loading.show({
        message: this.$t('input_labels.loading')
      })
      //setting a timeout with a loading to give the time to save the stuff 
      setTimeout(()=>{
        this.$q.loading.hide()
         this.$q.notify({
          message: 'Document has been saved and linked to this process',
          color: 'purple'
        })
        //the id must be also changed in the step_document field, because that is the one that's used in the save
        //to associate a document to a step. Since we need the id of the newly created document, and the save function
        //pushes the doc as a last element into the store, we take the id of the last document in store
        this.process.steps.filter(step => step.id == step_id)[0].step_documents.filter((doc)=>{
        return doc.id_document == doc_id
      })[0].id_document = this.document_types[this.document_types.length -1].id
      console.log(this.process.steps)
      }, 3000)

    },
    saveProcess(){
      console.log(this.process)
      this.$q.loading.show({
        message: this.$t('input_labels.loading')
      })
      //we delete some fields and rename them, because the saving function wants them named
      //in a specific way which is different from what we get from the api request 
      var working_process = JSON.parse(JSON.stringify(this.process.process[0]))
      delete working_process.id
      delete working_process.documents
      working_process.producedDoc = []
      console.log(this.process.process[0])
      this.process.process[0].documents.forEach((doc) => {
        working_process.producedDoc.push(doc.id)
      })
      //we need to add these two empty fields otherwise the save function will break.
      //We can either save them as empty and then make the user go into the edit to add them
      //or we can add the selectors in the page to add them from here
    working_process.processTopics = []
    working_process.applicableUsers = []
      console.log(working_process)
      this.savingProcess({process:working_process})
      setTimeout(()=>{
        this.$q.loading.hide()
        this.process_saved = true
      this.$q.notify({
          message: 'Process has been saved',
          color: 'purple'
        })
      }, 3000)
    },
    saveSteps(){
      console.log(this.processes[this.processes.length -1])
      //we delete some fields and rename them, because the saving function wants them named
      //in a specific way which is different from what we get from the api request 
      this.process.steps.forEach((step) => {
        step.is_new = true
        step.idProcess = this.processes[this.processes.length -1].id
        step.locationSpecific=JSON.parse(JSON.stringify( step.location_specific))
        step.locationLon=JSON.parse(JSON.stringify( step.location_lon))
        step.locationLat=JSON.parse(JSON.stringify( step.location_lat))
        step.stepIcon=JSON.parse(JSON.stringify( step.step_icon))
        delete step.id_process
        delete step.location_specific
        delete step.location_lon
        delete step.location_lat
        delete step.step_icon
        if(step.step_documents != null){
        step.step_documents.forEach((doc)=>{
          doc.idStep = JSON.parse(JSON.stringify( doc.id_step))
          doc.isOut = JSON.parse(JSON.stringify( doc.is_out))
          doc.idDocument = JSON.parse(JSON.stringify( doc.id_document))
          delete doc.id_step
          delete doc.is_out
          delete doc.id_document
        })
        }

      })
      //we do the same as above for the steplinks
      this.process.steplinks.forEach((step) => {
        step.is_new = true
        step.id_process = this.processes[this.processes.length -1].id
        step.idProcess = this.processes[this.processes.length -1].id
        step.fromStep=JSON.parse(JSON.stringify( step.from_step))
        step.toStep=JSON.parse(JSON.stringify( step.to_step))
        delete step.from_step
        delete step.to_step


      })
      //we create a shell for saving and substitute the document field with the step_documents one,
      //because the saving function wants the formatting of step_documents, but the name of documents
      var working_steps = JSON.parse(JSON.stringify(this.process.steps))
      working_steps.forEach((step)=>{
        delete step.documents
        step.documents = JSON.parse(JSON.stringify(step.step_documents))
        delete step.step_documents
      })
      console.log(working_steps)
      console.log(this.process.steplinks)
       this.$q.loading.show({
        message: this.$t('input_labels.loading')
      })
      this.saveGraph({ steps: working_steps, steplinks: this.process.steplinks })
      setTimeout(()=>{
        this.$q.loading.hide()
        this.process_saved = true
      this.$q.notify({
          message: 'Steps have been saved',
          color: 'purple'
        })
      }, 3000)
    },
    associateDoc(){
      //associates existing doc to the one in the step
      console.log(this.linked_doc)
      //we take the full document which is selected via the select input
      var linked_document = this.document_types.filter((doc)=>{
        return doc.id == this.linked_doc
      })[0]
      console.log(linked_document)
      //we replace this document with the one in in the imported step, both in documents and step_documentes
       var index = this.process.steps.filter((item) => item.id === this.step_id)[0].documents.findIndex(item => item.id === this.doc_id)
       console.log(index)
       this.process.steps.filter((item) => item.id === this.step_id)[0].documents.splice(index, 1, linked_document)
        var index_doc = this.process.steps.filter((item) => item.id === this.step_id)[0].step_documents.findIndex(item => item.id_document === this.doc_id)
       console.log(index_doc)
       this.process.steps.filter((item) => item.id === this.step_id)[0].step_documents[index_doc].id_document = this.linked_doc
           this.step_id= null
          this.doc_id = null
          this.linked_doc = null
          console.log(this.process.steps)

    },
    saveAssociatedDocProcess(){
      //associates existing doc to the one in the process
      console.log(this.linked_doc)
      //we take the full document which is selected via the select input
      var linked_document = this.document_types.filter((doc)=>{
        return doc.id == this.linked_doc
      })[0]
      //we replace this document with the one in in the imported process
      var index = this.process.process[0].documents.findIndex(item => item.id === this.doc_id)
       console.log(index)
       this.process.process[0].documents.splice(index, 1, linked_document)
         this.step_id= null
          this.doc_id = null
          this.linked_doc = null
    },

    cancel(){
      //closes dialog
    this.step_id= null
    this.doc_id = null
    this.linked_document = null
    this.associating = false
    this.associating_process = false
    },
    associate(step_id, doc_id){
    //open association dialog for step
    console.log(step_id)
    console.log(doc_id)
    this.step_id= step_id
    this.doc_id = doc_id
    this.associating = true
    },
    associateDocProcess(doc_id){
      //open association dialog for process
      this.doc_id = doc_id
      this.associating_process = true
    },
    importProcess(){
//imports the process from a json file
  const files = document.getElementById('selectFiles').files
  if (files.length <= 0) {
    return false
  }
  console.log(files)
  const fr = new FileReader()

  fr.onload = e => {
    const result = JSON.parse(e.target.result)
    const formatted = JSON.stringify(result, null, 2)
    console.log(formatted)
    //we assign the formatted json to a data field so we can manipulate it later
    this.process = JSON.parse(formatted)
    console.log(this.process.process[0].documents)
    console.log(this.process.steps)
    //document.getElementById('result').innerHTML = formatted
  }
  fr.readAsText(files.item(0))
},
        downloadJson(){
          //download the json of the process, here for demonstrarion purposes
          //the final one will receive a json from an api call and then download it
      console.log()

        var element = document.createElement('a')
        element.setAttribute('href', "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.process,null, 4)))
        element.setAttribute('download', 'process.json')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        }
  },
  created() {
    this.fetchDocumentType().then((document_types) => {
          console.log(document_types)
          console.log("DOCUMENT TYPES FETCHED")
          document_types.forEach((document_type) => {
            var the_doc = {
              label: document_type.translations.filter(
                this.filterTranslationModel(this.activeLanguage)
              )[0].document,
              value: document_type.id
            }
            this.t_docs.push(the_doc)
          })
  })
  this.fetchFlows()
}
}
  
</script>
<style scoped>
.title{
  font-size: 25px;
  font-weight: bold;
}
.banner {
  font-style: normal;
  height: 72px;
  text-align: center;
  padding-top: 15px;
  font-weight: bold;
  font-size: 40px;
  line-height: 41px;
  color:#0F3A5D; 
  background-image: url("../statics/BG Pattern.svg");
}
.container {
  display: inline-block;
  margin-bottom: 1px;
  width: 80%;
}
#div-1 {
  text-align: center;
  padding-top: 40px;
}
#div-2 {
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 150px;
  padding-right: 150px;
}
#div-4 {
  padding-bottom: 5px;
  padding-left: 150px;
  padding-right: 150px;
}
.associate{
  background: #0F3A5D;
  border-radius: 5px;
  color:white;
  margin-right: 30px;
  width: 150px;
}
.create{
    background: #FF7C44;
border-radius: 5px;
color:white;
margin-right: 30px;
width: 150px;
}
.delete{
  margin-right: 30px;
width: 150px;

border: 1px solid #C71F40;
box-sizing: border-box;
border-radius: 5px;
}
.title_lower{
  font-size: 20px;
  font-weight: bold;
}
</style>