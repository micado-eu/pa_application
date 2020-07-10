  <template>
  <div class="container">
    <div>
      <div
        class="col"
        style="display:inline-block;text-align:left;width:600px"
      >
        <h5> Manage Steps </h5>
      </div>
      <div
        class="col"
        style="display:inline-block;text-align:right;padding-right:15px"
      >
        <q-btn
          style="width:135px; margin-bottom:15px;border-radius:2px"
          color="accent"
          unelevated
          rounded
          label="Add step"
          no-caps
          size="15px"
          @click="addNode"
        />
      </div>
      <div
        class="col"
        style="display:inline-block;text-align:right;padding-right:15px"
      >
        <q-btn
          style="width:135px; margin-bottom:15px;border-radius:2px"
          color="accent"
          unelevated
          rounded
          label="Save Graph"
          no-caps
          size="15px"
          @click="saveGraph"
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
              v-on:cxttapstart="deleteNode($event, def)"
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
            >
              <q-tab-panel
                v-for="language in languages"
                :key="language.lang"
                :name="language.name"
              >
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
                    v-model="step_shell.translations.filter(filterTranslationModel(language.lang))[0].title"
                  />
                </div>
                <div class=" q-pa-xsm row">
                  <div class=" q-pa-xsm col-4">
                    <h5 style="text-align:left"> Step description </h5>
                  </div>
                  <div
                    class="col-8"
                    style="margin: auto;display: block;"
                  >
                    <q-input
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
            <div class=" q-pa-xsm row">
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

            <div class=" q-pa-xsm row">
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

            <div
              class=" q-pa-xsm row"
              style="text-align:center"
            >
              <div class=" q-pa-xsm col-4">
                <h5 style="text-align:left"> Required documents </h5>
              </div>
              <div
                class=" q-pa-md col-8"
                style="margin-top:14px; margin-bottom:0px; padding-bottom:0px"
              >
                <q-select
                  filled
                  clearable
                  v-model="step_shell.documents"
                  multiple
                  :options="documents_list"
                  label="Required documents"
                  style="width: 450px"
                />
              </div>
            </div>

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


export default {
  //name: 'DocumentType',

  props: ["processId"],
  mixins: [editEntityMixin],

  components: {
    Step
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
      documents_list: [
        "document_1",
        "document_2",
        "document_3",
        "document_4",
        "document_5"
      ],
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
    graphs () {
      return this.$store.state.graphs.graphs
    },
    elements () {
      return this.$store.state.graphs.graphs.elements
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

    generateShell () {
      let newstep = { id: -1, documents: [], translations: [], cost: 0, idProcess: this.processId, location: null, locationLon: 0, locationLat: 0, locationSpecific: false }
      this.languages.forEach(l => {
        newstep.translations.push({ id: -1, lang: l.lang, step: '', description: '', translationDate: null })
      });
      return newstep
    },

    mergeStep (idStep) {
      console.log("MERGING")
      //     this.step_shell = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == idStep })[0]))
      this.step_shell = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == idStep })[0]))

    },

    deleteStep (value) {
      var deletedSteps = this.steps.filter((filt) => {
        //console.log("in fil")
        //console.log(filt.id == value)
        return filt.id == value
      })
      this.$store.dispatch('steps/deleteSteps', deletedSteps[0].id)
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

        this.editing = true

        if (node.data.is_new) {
          console.log("NEW NODE")
          this.mergeStep(node.data.id)
        }
        else {
          console.log("I'm old")
          this.is_new = false
          this.mergeStep(node.data.id)
        }
        //      this.edit_step = JSON.parse(JSON.stringify(this.steps.filter(step => { return step.id == node.id })[0]))
        console.log("this is edit step")

        console.log(this.step_shell)

      }
    },
    saveStep () {
      //     console.log(value)
      // In edit_step we have the instance of step that we are working on
      this.$store.dispatch('steps/changeStep', this.step_shell)
        .then(ret => {
          console.log("CHANGED THE STEP")
        })
      let newtitle = this.step_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].title
      this.$store.dispatch('graphs/changeNode', { title: newtitle, id: this.step_shell.id })
        .then(ret => {
          this.refresher += 1
        })

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

      let newStep = this.generateShell()
      newStep.id = new_id
      this.$store.dispatch('steps/addStep', newStep)
        .then(ret => {
          console.log("ADDED STEP")
          console.log(this.steps)
        })

    },


    afterCreated (cy) {
      // cy: this is the cytoscape instance

      console.log("after created", cy);
      //      this.cy = cy;
      //     this.mycy = cy;
      console.log(this.testdata)
      cy.edgehandles();
      //      cy.layout({ name: 'grid' }).run();
      //      cy.resize();
      console.log("i'm here")

    },

    saveGraph () {
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


