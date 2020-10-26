  <template>
  <div>
    <div class="title">{{$t('input_labels.manage_steps')}} - {{ this.title }}</div>
    <div class="container">
      <div>
        <q-card
          v-if="this.editing"
          class="div-2"
        >
          <div class=" q-pa-lg ">
            <div class=" q-pa-xsm row ">
              <q-tabs
                v-model="langTab"
                dense
                class="bg-grey-2 width"
                active-color="accent"
                indicator-color="accent"
                align="justify"
                narrow-indicator
              >
                <q-tab
                  v-for="language in languages"
                  :key="language.lang"
                  :name="language.name"
                  :label="language.name"
                />
              </q-tabs>
              <q-tab-panels
                v-model="langTab"
                animated
                class="bg-grey-2 inset-shadow width "
              >
                <q-tab-panel
                  v-for="language in languages"
                  :key="language.lang"
                  :name="language.name"
                >
                  <div
                    class=" q-pa-xsm "
                    id="div-2"
                  >

                    <div class="labels">{{$t('input_labels.step_name')}} </div>

                    <q-input
                      dense
                      bg-color="grey-3"
                      standout
                      outlined
                      counter
                      maxlength="50"
                      :rules="[ val => val.length <= 50 || 'Please use maximum 5 characters']"
                      :readonly="!(step_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
                      v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].step"
                      :label="$t('input_labels.process_name')"
                    />
                  </div>

                  <div
                    id="div-4"
                    class="q-pa-xsm"
                  >

                    <div class="labels"> {{$t('input_labels.step_description')}} </div>
                    <GlossaryEditor
                      class="desc-editor"
                      v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
                      :lang="language.lang"
                      ref="editor"
                    />

                  </div>
                  <div>
                    <TranslateStateButton
                      v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState"
                      :isForDefaultLanguage="language.lang===activeLanguage"
                      :objectId="step_shell.id"
                      :readonly="!(language.lang===activeLanguage)"
                      @micado-change="(id) => {changeTranslationState(step_shell, id.state)}"
                    />
                  </div>
                </q-tab-panel>
              </q-tab-panels>
              <div
                id="location"
                style="width:100%"
              >

                <div class="labels">{{$t('input_labels.step_location')}} </div>

                <q-input
                  dense
                  class="no-pad"
                  bg-color="grey-3"
                  standout
                  outlined
                  @blur="updateField()"
                  counter
                  maxlength="50"
                  :rules="[ val => val.length <= 50 || 'Please use maximum 5 characters']"
                  v-model="step_shell.location"
                  :label="$t('input_labels.step_location')"
                />
              </div>
              <div
                id="location"
                style="width:100%"
              >

                <div class="labels">{{$t('input_labels.step_cost')}} </div>

                <q-input
                  dense
                  class="no-pad"
                  bg-color="grey-3"
                  standout
                  outlined
                  @blur="updateField()"
                  maxlength="50"
                  :rules="[ val => val.length <= 50 || 'Please use maximum 5 characters']"
                  v-model="step_shell.cost"
                  :label="$t('input_labels.step_cost')"
                />
              </div>

              <div class="row width-2">
                <q-btn
                  class="add-step-document"
                  color="accent"
                  no-caps
                  unelevated
                  :label="$t('button.add_document')"
                  @click="addStepDocument()"
                />
              </div>

              <div
                class="row width-3"
                v-if="stepdocadd"
              >
                <div class="col-6">
                  <q-select
                    filled
                    dense
                    clearable
                    v-model="step_doc_shell.idDocument"
                    emit-value
                    map-options
                    id="select"
                    :options="filtered_t_docs"
                    :label="$t('input_labels.required_documents')"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    class="input"
                    :label="$t('input_labels.doc_cost')"
                    dense
                    bg-color="grey-3"
                    standout
                    outlined
                    v-model="step_doc_shell.cost"
                  />
                </div>
                <div class="col-3">
                  <q-btn
                    id="save-step-document"
                    color="accent"
                    no-caps
                    unelevated
                    :label="$t('button.save_document')"
                    @click="saveStepDocument()"
                  />
                </div>
              </div>

              <div
                v-if="step_shell.documents != null "
                class="row "
                style="width:100%"
              >

                <div class="col-9 flex flex-left labels">
                  {{$t('input_labels.doc')}}
                </div>
                <div class="col-2 flex flex-center labels ">
                  {{$t('input_labels.cost')}}
                </div>
                <div class="col-1 flex flex-center labels">
                  {{$t('input_labels.delete')}}
                </div>
              </div>
              <q-list id="list">
                <StepDocumentElement
                  v-for="stepdoc in step_shell.documents"
                  :key="stepdoc.id"
                  :stepdoc="stepdoc"
                  :docs_type="t_docs"
                  @deleteDoc="deleteDoc"
                />
              </q-list>
              <!--
               
    -->
              <div
                id="location"
                style="width:100%"
              >

                <div class="labels">{{$t('input_labels.related_processes')}} </div>

                <q-select
                  filled
                  dense
                  clearable
                  v-model="step_shell.linked_processes"
                  multiple
                  :options="processes_list"
                  :label="$t('input_labels.related_processes')"
                />
              </div>
            </div>

            <div class="row">
              <div class="q-pa-md col-4 left">
                <q-btn
                  color="accent"
                  no-caps
                  unelevated
                  :label="$t('button.save')"
                  @click="saveStep()"
                  class="button"
                />
              </div>
              <div class="q-pa-md col-4 left">
                <q-btn
                  class="delete-button"
                  no-caps
                  unelevated
                  :label="$t('button.back')"
                  @click="cancelEditStep()"
                />
              </div>
              <div class="q-pa-md col-4 left">
                <q-btn
                  class="delete-button"
                  no-caps
                  unelevated
                  :label="$t('button.delete')"
                  @click="deleteElement()"
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <q-card class="my-card">
        <q-card-section>
          <cytoscape
            ref="cyRef"
            :config="configcy"
            :preConfig="preConfig"
            :afterCreated="afterCreated"
          >
            <cy-element
              v-for="def in elements"
              :key="`${def.data.id}`"
              :definition="def"
              v-on:click="editStep($event, def)"
              v-on:remove="removeElement($event,def)"
              v-on:ehcomplete="addingEdge"
            />

          </cytoscape>
        </q-card-section>
      </q-card>
    </div>
    <div class="row div-6">
      <div class="col right">
        <q-btn
          class="delete-button-2"
          no-caps
          unelevated
          :label="$t('button.back')"
          @click="cancelStep"
        />
      </div>
      <div class="col center">
        <q-btn
          color="secondary"
          unelevated
          :label="$t('button.add_step')"
          class="button-3"
          no-caps
          size="15px"
          @click="addingNode"
        />
      </div>
      <div class="col left">
        <q-btn
          class="button-2"
          color="accent"
          unelevated
          :label="$t('button.save_graph')"
          no-caps
          size="15px"
          @click="savingGraph"
        />

      </div>

    </div>
  </div>
  </div>
</template>


<script>
import Step from 'components/Step'
import configcy from '../configs/cytoscapeConfig'
import edgeHandles from 'cytoscape-edgehandles'
import { v4 as uuidv4 } from 'uuid'
import editEntityMixin from '../mixin/editEntityMixin'
import StepDocumentElement from 'components/StepDocumentElement'
import storeMappingMixin from '../mixin/storeMappingMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import translatedButtonMixin from '../mixin/translatedButtonMixin'





export default {
  //name: 'DocumentType',

  props: ["processId"],
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        processes: 'flows/processes',
        steps: 'steps/steps',
        steplinks: 'steplinks/steplinks',
        graphs: 'graphs/graphs',
        elements: 'graphs/elements',
        document_types: 'document_type/document_types'
      }, actions: {
        changeNode: 'graphs/changeNode',
        addNode: 'graphs/addNode',
        deleteNode: 'graphs/deleteNode',
        addEdge: 'graphs/addEdge',
        saveGraph: 'graphs/saveGraph',
        fetchGraphs: 'graphs/fetchGraphs',
        changeStep: 'steps/changeStep',
        addStep: 'steps/addStep',
        deleteStep: 'steps/deleteStep',
        fetchStepsByProcessId: 'steps/fetchStepsByProcessId',
        addStepLink: 'steplinks/addStepLink',
        fetchSteplinksByProcessId: 'steplinks/fetchSteplinksByProcessId',
        fetchDocumentType: 'document_type/fetchDocumentType'
      }
    })],

  components: {
    Step,
    StepDocumentElement,
    GlossaryEditor
  },
  data () {
    return {
      //   id: this.$route.params.id,
      configcy,
      mycy: null,
      is_new: false,
      graph_id: null,
      testdata: [],
      refresher: 0,
      editing: false,
      selected_node: "",
      t_docs: [],
      stepdocadd: false,
      filtered_t_docs: [],
      step_doc_shell: null,
      steplink_shell: null,
      model_docs: [],
      processes_list: [
        "How to certify education degree",
        "Renewal of residence permit for working reasons",
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      edit_step: {
        data: {
          title: "",
          location: "",
          cost: "",
          required_documents: [],
          linked_processes: [],
          description: "",
          process_id: []
        },
        step_shell: {},
        group: "",
        position: {}
      }
    }
  },




  computed: {
    title () {
      var temp = this.processes.filter((a_proc) => {
        return a_proc.id == this.processId
      })[0]
      console.log("i am temp")
      console.log(temp)
      return temp.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
    }
  },
  watch: {
    refresher: function () {
      this.$refs.cyRef.instance.layout({
        name: 'breadthfirst',
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        directed: true
      }).run()
      this.$refs.cyRef.instance.resize()
    }
  },

  methods: {
    updateField () {
      //console.log(this.step_shell)
      //console.log(this)
      this.$forceUpdate()
    },

    createShell () {
      this.step_shell = this.generateShell()
    },

    generateShell (id = -1) {
      let newstep = { id: id, documents: [], translations: [], cost: 0, idProcess: Number(this.processId), location: '', locationLon: 0, locationLat: 0, locationSpecific: false, is_new: false, to_delete: false, is_edited: false }
      this.languages.forEach(l => {
        newstep.translations.push({ id: id, lang: l.lang, step: '', description: '', translationDate: null, translationState: 0 })
      })
      return newstep
    },

    generateStepDocShell (id = null, idStep) {
      let newstepdoc = { idDocument: id, idStep: idStep, cost: 0, isOut: false }
      return newstepdoc
    },

    mergeStep (idStep) {
      console.log("MERGING")
      this.step_shell = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == idStep })[0]))

    },

    preConfig (cytoscape) {
      console.log("calling pre-config")

      // register edgehandles extension
      if (typeof cytoscape('core', 'edgehandles') !== 'function') {
        cytoscape.use(edgeHandles)
      }
    },

    // This get called when we click on the cytoscape node
    editStep (event, node) {
      console.log(node)
      if (node.group == "nodes") {
        console.log("editing")



        if (node.data.is_new) {
          console.log("NEW NODE")
          this.mergeStep(node.data.id)
        }
        else {
          console.log("I'm old")
          this.is_new = false
          this.mergeStep(node.data.id)
          console.log(node)
          if (node.data.required_documents != null) {
            this.model_docs = node.data.required_documents
          }
        }
        console.log("this is edit step")
        console.log(this.step_shell)
        this.editing = false
        this.editing = true
      }
    },
    saveStep () {
      // In edit_step we have the instance of step that we are working on
      this.changeStep(this.step_shell)
        .then(ret => {
          console.log("CHANGED THE STEP")
        })
      let newtitle = this.step_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].step
      this.changeNode({ title: newtitle, id: this.step_shell.id })
        .then(ret => {
          this.refresher += 1
        })

      this.editing = false
      this.stepdocadd = false
      this.createShell()
    },
    addingNode (event, cy) {
      let new_id = uuidv4()

      this.addNode({
        group: 'nodes',
        data: {
          id: new_id,
          is_new: true,
          latitude: 0,
          longitude: 0,
          is_edited: false,
          title: "",
          location: "",
          cost: "",
          required_documents: [],
          linked_processes: [],
          description: ""
        }
        //      position: { x: 150, y: 150 },
      })
        .then(ret => {
          console.log("ADDED A NODE")
          console.log(this.elements)
          this.refresher += 1
        })

      let newStep = this.generateShell(new_id)
      //      newStep.id = new_id
      newStep.is_new = true
      this.addStep(newStep)
        .then(ret => {
          console.log("ADDED STEP")
          console.log(this.steps)
        })

    },
    deleteElement () {
      this.deleteStep(this.step_shell.id)
        .then(ret => {
          console.log("DELETED STEP")
          console.log(this.steps)
        })
      this.deleteNode(this.step_shell.id)
        .then(res => {
        })
      console.log("MANAGE EDGES")
      this.editing = false
    },

    generateStepLink (id_edge, fromStep_edge, toStep_edge) {
      this.steplink_shell = { id: id_edge, is_new: true, fromStep: fromStep_edge, toStep: toStep_edge, is_edited: false, idProcess: Number(this.processId), translations: [] }
      this.languages.forEach(l => {
        this.steplink_shell.translations.push({ id: id_edge, lang: l.lang, description: '' })
      })
      return this.steplink_shell

    },

    addingEdge (sourceNode, targetNode, addedEles) {
      console.log("ADDING EDGE")
      console.log(sourceNode)
      console.log(targetNode)
      console.log(sourceNode._private.data.title)
      console.log(targetNode._private.data.title)
      console.log(addedEles)
      console.log(addedEles._private.map.keys())
      console.log(addedEles._private.map.entries())
      let newKey = ''
      let value = ''
      for ([newKey, value] of addedEles._private.map.entries()) {
        console.log(newKey)
        console.log(value)
      }
      console.log("Elementds in cytoscape")
      console.log(this.$refs.cyRef.instance.elements())
      console.log("Elementds in store")
      console.log(this.elements)

      this.$refs.cyRef.instance.elements().remove()

      this.generateStepLink(newKey, sourceNode._private.data.id, targetNode._private.data.id)
      this.addStepLink(this.steplink_shell)
      this.addEdge({
        group: 'edges',
        data: {
          id: newKey,
          is_new: true,
          source: sourceNode._private.data.id,
          target: targetNode._private.data.id,
          is_edited: false,
          description: ""
        }
        //      position: { x: 150, y: 150 },
      })
        .then(ret => {
          console.log("ADDED A EDGE")

          this.$refs.cyRef.instance.add(this.elements)
          console.log("Elementds in cytoscape")
          console.log(this.$refs.cyRef.instance.elements())
          console.log("Elementds in store")
          console.log(this.$store.state.steplinks.steplinks)
          console.log(this.elements)
          this.$refs.cyRef.instance.layout({
            name: 'breadthfirst',
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            directed: true
          }).run()
          this.$refs.cyRef.instance.resize()
        })
    },

    afterCreated (cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy)
      console.log(this.testdata)

      let defaults = {
        complete: (sourceNode, targetNode, addedEles) => this.addingEdge(sourceNode, targetNode, addedEles)
      }
      cy.edgehandles(defaults)
      console.log("i'm here")
    },

    async savingGraph () {
      // start saving elements
      // adding new steps
      console.log(this.$store.state.steplinks.steplinks)
      let postData = { steps: this.steps, steplinks: this.steplinks }
      console.log(JSON.stringify(postData))
      this.saveGraph(postData)
      this.$router.push('/guided_process_editor')
    },
    // this is used only for edges that get removed as a removal of a node that has edges
    removeElement (event, element, cy) {
      console.log("IN REMOVED")
      console.log(element)
    },
    async asyncForEach (array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
    },

    deleteDoc (event) {
      console.log("in delete doc in step manager")
      console.log(event)
      console.log(this.step_shell.documents)
      var idx = this.step_shell.documents.findIndex(doc => doc.idDocument == event)
      console.log(idx)
      this.step_shell.documents.splice(idx, 1)
      this.$forceUpdate()
    },
    addStepDocument () {
      this.stepdocadd = true
      this.step_doc_shell = this.generateStepDocShell(null, this.step_shell.id)
      let docs_in_step = []
      if (this.step_shell.documents != null) {
        this.step_shell.documents.forEach((doc) => {
          docs_in_step.push(doc.idDocument)
        })
      }
      console.log(docs_in_step)
      this.filtered_t_docs = this.t_docs.filter(adoc => {
        return !docs_in_step.includes(adoc.value)
      })
      console.log(this.filtered_t_docs)
    },
    saveStepDocument () {
      if (this.step_shell.documents == null) {
        this.step_shell.documents = []
      }
      this.step_shell.documents.push(this.step_doc_shell)
      console.log(this.step_shell)
      this.stepdocadd = false

    },
    cancelStep () {
      this.$router.push('/guided_process_editor')
    },
    cancelEditStep () {
      this.editing = false
      this.stepdocadd = false
    }
  },



  created () {
    this.loading = true
    this.createShell()
    console.log(this.step_shell)
    console.log("in created")
    console.log(this.processId)
    this.fetchStepsByProcessId(Number(this.processId))
      .then(steps => {
        console.log("THE STEPS")
        console.log(steps)
        this.loading = false
      })
    this.fetchSteplinksByProcessId(Number(this.processId))
      .then(steplinks => {
        console.log("THE STEPLINKS")
        console.log(steplinks)
        this.loading = false
      })


    this.fetchGraphs({ id: this.processId, userLang: this.$userLang })
      .then(graphs => {
        this.$refs.cyRef.instance.layout({
          name: 'breadthfirst',
          avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
          directed: true
        }).run()
        console.log("THE GRAPH")

        console.log(graphs)
        this.$refs.cyRef.instance.resize()
        this.refresher += 1

        console.log(this.refresher)

      })
    this.fetchDocumentType()
      .then(document_types => {
        console.log(document_types)
        document_types.forEach(document_type => {
          var the_doc = { label: document_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: document_type.id }
          this.t_docs.push(the_doc)
        })

      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.labels {
  font-size: 16px;
  font-weight: 600;
}
.container {
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.title {
  font-style: normal;
  height: 72px;
  text-align: center;
  padding-top: 15px;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  color: white;
  background-color: #ff7c44;
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 150px;
  border-radius: 2px;
}
.delete-button-2 {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 135px;
  border-radius: 5px;
}
.button {
  width: 150px;
  border-radius: 2px;
}
.button-2 {
  border-radius: 5px;
  width: 135px;
}
.button-3 {
  border-radius: 5px;
  width: 170px;
}
#div-1 {
  text-align: center;
  padding-top: 40px;
}
.div-2 {
  margin: 0 auto;
  width: 750px;
  margin-bottom: 1px;
}

.width {
  width: 100%;
}
.width-2 {
  width: 100%;
  padding-top: 10px;
}
.width-3 {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.width-4 {
  width: 450px;
}
.header {
  text-align: left;
  margin-bottom: 0px;
}
.under-header {
  margin: auto;
  display: block;
  margin-bottom: 0px;
}
.add-step-document {
  width: 150px;
  border-radius: 2px;
}
#select {
  width: 350px;
}
.input {
  width: 100px;
  margin: 0 auto;
}
.input-2 {
  padding-top: 10px;
}
#save-step-document {
  width: 150px;
  border-radius: 2px;
}
.div-4 {
  padding-top: 10px;
  padding-bottom: 10px;
}
#list {
  width: 700px;
}
.center {
  text-align: center;
}
#header-2 {
  text-align: left;
  margin-top: 14px;
}

.right {
  text-align: right;
}
.left {
  text-align: left;
}
.div-6 {
  text-align: center;
  padding-top: 10px;
}
#location {
  margin-top: 20px;
  width: 100%;
}
.no-pad {
  padding-bottom: 0px;
}
</style>


