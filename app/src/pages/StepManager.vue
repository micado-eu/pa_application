  <template>
  <div class="container">
    <h5> Manage Steps </h5>

    <div class="row">

      <div class="col">
        <q-btn
          color="accent"
          unelevated
          label="Add step"
          no-caps
          size="15px"
          @click="addNode"
        />
      </div>
      <div class="col">
        <q-btn
          color="accent"
          unelevated
          label="Save Graph"
          no-caps
          size="15px"
          @click="saveGraph"
        />

      </div>
      <div class="col">
        <q-btn
          class="button"
          color="accent"
          no-caps=""
          unelevated
          label="Back"
          @click="cancelStep"
          style="width:150px;border-radius:2px"
        />
      </div>
    </div>
    <div>
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
              v-on:ehcomplete="addEdge"
            />

          </cytoscape>
        </q-card-section>
      </q-card>
      <div
        style="text-align:center; padding-top:40px"
        v-if="this.editing"
      >
        <div
          class=" q-pa-lg"
          style="display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px"
        >
          <div
            class=" q-pa-xsm row"
            style="text-align:center"
          >
            <q-tabs
              v-model="langTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
              style="width:100%"
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
              style="width:100%"
            >
              <q-tab-panel
                v-for="language in languages"
                :key="language.lang"
                :name="language.name"
                
              >
              <div class="row">
                <div class=" q-pa-xsm col-4">
                  <h5 style="text-align:left;margin-bottom:0px"> Step Name </h5>
                </div>
                <div
                  class="col-8"
                  style="margin: auto;display: block;margin-bottom:0px"
                >
                  <q-input
                    rounded
                    dense
                    bg-color="grey-3"
                    standout
                    outlined
                   
                    v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].step"
                  />
                </div>
              </div>
                <div class=" q-pa-xsm row" style="width:100%">
                  <div class=" q-pa-xsm col-4">
                    <h5 style="text-align:left"> Step description </h5>
                  </div>
                  <div
                    class="col-8"
                    style="margin: auto;display: block;"
                  >
                    <q-input
                    style="padding-top:10px"
                      type="textarea"
                      dense
                      bg-color="grey-3"
                      filled
                      v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
                    />
                  </div>
                </div>

              </q-tab-panel>
            </q-tab-panels>
            <div class=" q-pa-xsm row" style="width:100%">
              <div class=" q-pa-xsm col-4">
                <h5 style="text-align:left;margin-bottom:0px"> Step location </h5>
              </div>
              <div
                class="col-8"
                style="margin: auto;display: block;margin-bottom:0px"
              >
                <q-input
                  rounded
                  dense
                  bg-color="grey-3"
                  standout
                  outlined
                  v-model="step_shell.location"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row" style="width:100%">
              <div class=" q-pa-xsm col-4">
                <h5 style="text-align:left;margin-bottom:0px"> Step cost </h5>
              </div>
              <div
                class="col-8"
                style="margin: auto;display: block;margin-bottom:0px"
              >
                <q-input
                  rounded
                  dense
                  bg-color="grey-3"
                  standout
                  outlined
                  v-model="step_shell.cost"
                />
              </div>
            </div>
            
            <div class="row" style="width:100%; padding-top:10px">
              <q-btn
                color="accent"
                no-caps=""
                unelevated
                label="Add document"
                @click="addStepDocument()"
                style="width:150px;border-radius:2px"
              />
            </div>
           
              
              <div class="row" style="width:100%; padding-top:10px; padding-bottom:10px" v-if="stepdocadd">
                <div class="col-6">
                <q-select
                  filled
                  clearable
                  v-model="step_doc_shell.idDocument"
                  emit-value
                  map-options
                  :options="filtered_t_docs"
                  label="Required documents"
                  style="width:350px"
                />
                </div>
                <div class="col-3" >
                <q-input
                style="width:100px;margin:0 auto"
                  rounded
                  dense
                  bg-color="grey-3"
                  standout
                  outlined
                  v-model="step_doc_shell.cost"
                />
                </div>
                <div class="col-3">
                <q-btn
                color="accent"
                no-caps=""
                unelevated
                label="Save document"
                @click="saveStepDocument()"
                style="width:150px;border-radius:2px"
              />
                </div>
              </div>
            
              <div class="row" style="padding-top:10px; padding-bottom:10px">
              <q-list  style="width:700px">
                <StepDocumentElement
                  v-for="stepdoc in step_shell.documents"
                  :key="stepdoc.id"
                  :stepdoc="stepdoc"
                  :docs_type="t_docs"
                  @deleteDoc="deleteDoc"
                />
              </q-list>
              </div>
              <!--
               
    -->
            
            <div
              class=" q-pa-xsm row"
              style="text-align:center"
            >
              <div class=" q-pa-xsm col-4">
                <h5 style="text-align:left; margin-top:14px"> Linked processes </h5>
              </div>
              <div
                class=" q-pa-md col-8"
                style="padding-top:0px"
              >
                <q-select
                  filled
                  clearable
                  v-model="step_shell.linked_processes"
                  multiple
                  :options="processes_list"
                  label="linked processes"
                  style="width: 450px"
                />
              </div>
            </div>

          </div>
          <div class="row">
            <div
              class="q-pa-md col-6"
              style="text-align:right"
            >
              <q-btn
                color="accent"
                no-caps=""
                unelevated
                label="Save"
                @click="saveStep()"
                style="width:150px;border-radius:2px"
              />
            </div>
            <div
              class="q-pa-md col-6"
              style="text-align:left"
            >
              <q-btn
                class="button"
                no-caps=""
                unelevated
                label="Back"
                @click="cancelEditStep()"
                style="width:150px;border-radius:2px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Step from 'components/Step'
//import { Core, EventObject } from 'cytoscape'
import configcy from '../configs/cytoscapeConfig'
import edgeHandles from 'cytoscape-edgehandles'
import { v4 as uuidv4 } from 'uuid';
import editEntityMixin from '../mixin/editEntityMixin'
import StepDocumentElement from 'components/StepDocumentElement'


export default {
  //name: 'DocumentType',

  props: ["processId"],
  mixins: [editEntityMixin],

  components: {
    Step,
    StepDocumentElement
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
      },
    }
  },




  computed: {
    processes () {
      return this.$store.state.flows.flows
    },
    steps () {
      return this.$store.state.steps.steps
    },
    steplinks () {
      return this.$store.state.steplinks.steplinks
    },
    graphs () {
      return this.$store.state.graphs.graphs
    },
    elements () {
      return this.$store.state.graphs.graphs.elements
    },
    document_types () {
      return this.$store.state.document_type.document_type
    },
  },
  watch: {
    refresher: function () {
      this.$refs.cyRef.instance.layout({
        name: 'breadthfirst',
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        directed: true,
      }).run();
      this.$refs.cyRef.instance.resize();
    }
  },

  methods: {

    createShell () {
      this.step_shell = this.generateShell()
    },

    generateShell (id = -1) {
      let newstep = { id: id, documents: [], translations: [], cost: 0, idProcess: Number(this.processId), location: '', locationLon: 0, locationLat: 0, locationSpecific: false, is_new: false, to_delete: false, is_edited: false }
      this.languages.forEach(l => {
        newstep.translations.push({ id: id, lang: l.lang, step: '', description: '', translationDate: null })
      });
      return newstep
    },

    generateStepDocShell (id = -1, idStep) {
      let newstepdoc = { idDocument: id, idStep: idStep, cost: 0 }
      return newstepdoc
    },

    mergeStep (idStep) {
      console.log("MERGING")
      //     this.step_shell = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == idStep })[0]))
      this.step_shell = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == idStep })[0]))

    },


    preConfig (cytoscape) {
      console.log("calling pre-config");

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
        //      this.edit_step = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == node.id })[0]))
        console.log("this is edit step")

        console.log(this.step_shell)
        this.editing = false
        this.editing = true

      }
    },
    saveStep () {
      //     console.log(value)
      // In edit_step we have the instance of step that we are working on
      //      let changedDocs = this.document_types.filter(doc => { return this.model_docs.includes(doc.id) })
      //      this.step_shell.documents = changedDocs
      this.$store.dispatch('steps/changeStep', this.step_shell)
        .then(ret => {
          console.log("CHANGED THE STEP")
        })
      let newtitle = this.step_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].step
      this.$store.dispatch('graphs/changeNode', { title: newtitle, id: this.step_shell.id })
        .then(ret => {
          this.refresher += 1
        })

      this.editing = false
      this.stepdocadd = false
      this.createShell()
    },
    addNode (event, cy) {
      let new_id = uuidv4()
      this.$store.dispatch('graphs/addNode', {
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
          description: ""        },
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
      this.$store.dispatch('steps/addStep', newStep)
        .then(ret => {
          console.log("ADDED STEP")
          console.log(this.steps)
        })

    },
    deleteElement (event, element, cy) {
      /*
            console.log("these are the testdata")
      
            console.log(element)
            if (element.group == 'node') {
              this.$store.dispatch('steps/deleteStep', element.data.id)
                .then(ret => {
                  console.log("DELETED STEP")
                  console.log(this.steps)
                })
      
              this.$store.dispatch('graphs/deleteNode', element.data.id)
                .then(res => {
      
                })
            } else {
              console.log("MANAGE EDGES")
            }
            */
    },
    generateStepLink(id_edge, fromStep_edge, toStep_edge){
      this.steplink_shell ={id : id_edge, is_new:true, fromStep: fromStep_edge, toStep: toStep_edge, is_edited:false, idProcess:Number(this.processId), translations:[]}
      this.languages.forEach(l => {
        this.steplink_shell.translations.push({ id: id_edge, lang: l.lang, description: '' })
      });
      return this.steplink_shell

    }, 

    addEdge (sourceNode, targetNode, addedEles) {
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
        console.log(newKey);
        console.log(value);

      }
      // this.$refs.cyRef.instance.remove('[id = ' + newKey + ']');
      console.log("Elementds in cytoscape")
      console.log(this.$refs.cyRef.instance.elements())
      console.log("Elementds in store")
      console.log(this.elements)

      this.$refs.cyRef.instance.elements().remove();
      
      this.generateStepLink(newKey, sourceNode._private.data.id, targetNode._private.data.id )
      this.$store.dispatch('steplinks/addStepLink', this.steplink_shell)
      this.$store.dispatch('graphs/addEdge', {
        group: 'edges',
        data: {
          id: newKey,
          is_new: true,
          source: sourceNode._private.data.id,
          target: targetNode._private.data.id,
          is_edited: false,
          description: ""        },
        //      position: { x: 150, y: 150 },
      })
        .then(ret => {
          console.log("ADDED A EDGE")

          this.$refs.cyRef.instance.add(this.elements);
          console.log("Elementds in cytoscape")
          console.log(this.$refs.cyRef.instance.elements())
          console.log("Elementds in store")
          console.log(this.$store.state.steplinks.steplinks)
          console.log(this.elements)
          this.$refs.cyRef.instance.layout({
            name: 'breadthfirst',
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            directed: true,
          }).run();
          this.$refs.cyRef.instance.resize();
        })

      //    console.log("the orig elements")
      //    console.log(this.elements)

      /*
          if (element.group == 'edges') {
            if (element.data.is_new != null && element.data.is_new) {
              // here we manage new edges
              console.log("managinf edge")
            }
          }
          */
    },

    afterCreated (cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy);
      //      this.cy = cy;
      //     this.mycy = cy;
      console.log(this.testdata)

      let defaults = {
        complete: (sourceNode, targetNode, addedEles) => this.addEdge(sourceNode, targetNode, addedEles)
      }

      cy.edgehandles(defaults);
      //      cy.layout({ name: 'grid' }).run();
      //      cy.resize();
      console.log("i'm here")

    },

    async saveGraph () {
      // start saving elements
      // adding new steps
      console.log(this.$store.state.steplinks.steplinks)
      let postData = { steps: this.steps, steplinks: this.steplinks }
      console.log(JSON.stringify(postData))

      this.$store.dispatch('graphs/saveGraph', postData)

      /*
      const saveSteps = async () => {
        await this.asyncForEach(this.steps, async (step) => {
          console.log(step)
          if (step.is_new) {
            await this.$store.dispatch('steps/saveStep', step)
          }
        })
        console.log("after foreach save topics")
      }
      await saveSteps()
      */

      // updating chenged steps
      // adding new steplink
      // updating changed steplin
      // deleting steplink
      // deleting step


    },
    // this is used only for edges that get removed as a removal of a node that has edges
    removeElement (event, element, cy) {
      console.log("IN REMOVED")
      console.log(element)
    },
    async  asyncForEach (array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    },

    deleteDoc (event) {
      console.log("in delete doc in step manager")
      console.log(event)
      /*console.log(this.step_shell.documents)
      var idx = this.step_shell.documents.findIndex(doc => doc.idDocument == event)
      console.log(idx)
      this.step_shell.documents.splice(idx, 1)*/
    },
    addStepDocument () {
      this.stepdocadd = true
      this.step_doc_shell = this.generateStepDocShell(-1, this.step_shell.id)
      let docs_in_step = []
      if(this.step_shell.documents != null){
      this.step_shell.documents.forEach((doc) => {
        docs_in_step.push(doc.idDocument)
      });
      }
      console.log(docs_in_step)
      this.filtered_t_docs = this.t_docs.filter(adoc => {
        return !docs_in_step.includes(adoc.value)
      })
      console.log(this.filtered_t_docs)
    },
    saveStepDocument () {
      if(this.step_shell.documents == null){
          this.step_shell.documents =[]
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
    console.log("in created")
    console.log(this.processId)
    this.$store.dispatch('steps/fetchStepsByProcessId', this.processId)
      .then(steps => {
        console.log("THE STEPS")
        console.log(steps)
        this.loading = false
      })

    this.$store.dispatch('steplinks/fetchSteplinksByProcessId', this.processId)
      .then(steplinks => {
        console.log("THE STEPLINKS")
        console.log(steplinks)
        this.loading = false
      })


    this.$store.dispatch('graphs/fetchGraphs', { id: this.processId, userLang: this.$userLang })
      .then(graphs => {
        this.$refs.cyRef.instance.layout({
          name: 'breadthfirst',
          avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
          directed: true,
        }).run();
        console.log("THE GRAPH")

        console.log(graphs)
        this.$refs.cyRef.instance.resize();
        //       this.$refs.cyRef.instance.fit();

        this.refresher += 1

        console.log(this.refresher)

      })
    this.$store.dispatch('document_type/fetchDocumentType')
      .then(document_types => {
        console.log(document_types)
        document_types.forEach(document_type => {
          var the_doc = { label: document_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: document_type.id }
          this.t_docs.push(the_doc)
        })

      })
  },
  /*
  mounted () {
    console.log("in mounted")
    this.$refs.cyRef.instance.layout({ name: 'grid' }).run();
  },
  */
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

.button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
</style>


