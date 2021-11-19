  <template>
  <div>
    <div class="title">{{$t('input_labels.manage_steps')}} - {{ this.title }}</div>
    <div class="container row" style="padding-bottom:0px">
      <div class="col-4" style="padding-right:10px" >
      <div class="row" style="margin-top:10px">
      <div class="col left">
        <q-btn
        :data-cy="'back_to_process'"
          class="delete-button-2"
          no-caps
          unelevated
          :label="$t('button.cancel')"
          @click="cancelStep"
        />
      </div>
      <div class="col center">
        <q-btn
        :data-cy="'addstep'"
          color="secondary"
          unelevated
          :label="$t('button.add_step')"
          class="button-3"
          no-caps
          size="15px"
          @click="addingNode"
        />
      </div>
      <div class="col right">
        <q-btn
        :data-cy="'savegraph'"
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
      <div  class="col-8 explanation" >
      <div>
         {{$t('help.add_step_explain')}}
         <br>
         {{$t('help.click_step_graph')}}
         <br>
         {{$t('help.add_edge_explain')}}
       </div>
      </div>
    </div>
    <div class="container row">
      
      <div class="col-4" style="padding-right:10px;">

        <q-card style=" height:728px">
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
              v-on:tap="editStep($event, def)"
              v-on:click="editStep($event, def)"
              v-on:remove="removeElement($event,def)"
              v-on:ehcomplete="addingEdge"
            />

          </cytoscape>
        </q-card-section>
      </q-card>
      </div>
       <div class="col-8"     
       v-if="this.editing_steplink"      
      >
       
        <q-card
          
          class="div-2"
        >
        <form
          @submit.prevent.stop="onSubmitLink"
          @reset.prevent.stop="onResetLink"
          class=""
        >
          <div class=" q-pa-lg ">
            <div class=" q-pa-xsm  ">
                  <div
                    class=" q-pa-xsm "
                    id="div-2"
                  >
                  <HelpLabel
                    :fieldLabel="$t('input_labels.link_name')"
                    :helpLabel ="$t('help.link_name')"
                    class="labels"
                  />
                    

                    <q-input
                      dense
                      data-cy="title_input"
                      ref="title_link_input"
                      bg-color="grey-3"
                      :hint="$t('input_labels.required')"
                      standout
                      outlined
                      counter
                      :maxlength="$envconfig.titleLimit"
                      @blur="updateField()"
                      :rules="[ val => val.length <= $envconfig.titleLimit || 'Please use maximum 50 characters',
                      val=> !!val || 'Field is required']"
                                          :readonly="!(
                      (steplink_shell.translations.filter((top) => top.translated == false)[0].translationState == 0)                    )"
                    v-model="steplink_shell.translations.filter(
                      (top) => top.translated == false
                    )[0].description"
                      :label="$t('input_labels.link_name')"
                    />
                  </div>
                           <div
            class=" q-pa-xsm row div-6"
            style="padding-bottom:20px"
          >
            <div
              class="col-3"
              style="min-width:180px; "
            >
              <HelpLabel
                :field-label="$t('translation_states.translatable')"
                :help-label="$t('help.is_published')"
                class="tag"
              />
            </div>
            <div
              class="col"
              style="padding-top:2px; text-align:left"
            >
              <!-- <q-toggle
                v-model="edit_process.published"
                :disable="edit_process.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
                @input="isPublished($event, edit_process.id)"
                color="accent"
              />-->
              <q-toggle
                :value="
                  steplink_shell.translations.filter(
                    (top) => top.translated == false
                  )[0].translationState == 1
                "
                color="accent"
                @input="makeTranslatableSteplink($event)"
              />
            </div>
          </div>
          <div   style="text-align:center">
                <q-btn
                  style="margin-right:15px"
                  class="delete-button"
                  no-caps
                  unelevated
                  :data-cy="'back_to_graph'"
                  :label="$t('button.back')"
                  type="reset"
                  @click="cancelEditStep()"
                />
                <q-btn
                  style="margin-right:15px"
                  :data-cy="'deletestep'"
                  class="delete-button"
                  no-caps
                  unelevated
                  :label="$t('button.delete_steplink')"
                  @click="deleteElementSteplink()"
                />
                <q-btn
                  color="accent"
                  no-caps
                  :data-cy="'savestep'"
                  unelevated
                  :label="$t('button.save_steplink')"
                  type="submit"
                  class="button"
                />
            </div>
            </div>
          </div>
              </form>
        </q-card>
       </div>
      <div v-else-if="this.editing" class="col-8"           
      >
      
        <q-card
          
          class="div-2"
        >
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
          <div class=" q-pa-lg ">
            <div class=" q-pa-xsm  ">
                 <div
                    class=" q-pa-xsm "
                    id="div-2"
                  >
                  <HelpLabel
                    :fieldLabel="$t('input_labels.step_name')"
                    :helpLabel ="$t('help.step_name')"
                    class="labels"
                  />
                    

                    <q-input
                      dense
                      data-cy="title_input"
                      ref="title_input"
                      bg-color="grey-3"
                      :hint="$t('input_labels.required')"
                      standout
                      outlined
                      counter
                      :maxlength="$envconfig.titleLimit"
                      @blur="updateField()"
                      :rules="[ val => val.length <= $envconfig.titleLimit || 'Please use maximum 50 characters',
                      val=> !!val || 'Field is required']"
                      :readonly="!(
                      (step_shell.translations.filter((top) => top.translated == false)[0].translationState == 0)
                    )"
                    v-model="step_shell.translations.filter(
                      (top) => top.translated == false
                    )[0].step"
                      :label="$t('input_labels.step_name')"
                    />
                  </div>

                  <div
                    id="div-4"
                    class="q-pa-xsm"
                  >
                   <HelpLabel
                    :fieldLabel="$t('input_labels.step_description')"
                    :helpLabel ="$t('help.step_description')"
                    class="labels"
                  />
                   
                    <GlossaryEditor
                      data-cy="description_input"
                      class="desc-editor"
                      v-model="step_shell.translations.filter(
                      (top) => top.translated == false
                    )[0].description"
                    :lang="step_shell.translations.filter(
                      (top) => top.translated == false
                    )[0].lang"
                      ref="editor"
                    />

                  </div>
                <div class="row">
               <div
                class="q-pa-sm col-6"
                  >
                  <HelpLabel
                    :fieldLabel="$t('input_labels.link')"
                    :helpLabel ="$t('help.link')"
                    class="labels"
                  />
                    

                    <q-input
                      dense
                      data-cy="link_input"
                      bg-color="grey-3"
                      standout
                      outlined
                      counter
                      @blur="updateField()"
                      v-model="step_shell.link"
                      :label="$t('input_labels.link')"
                    />
                  </div>
              <div
                class="q-pa-sm col-6"
              >
                  <HelpLabel
                    :fieldLabel="$t('input_labels.step_location')"
                    :helpLabel ="$t('help.step_location')"
                    class="labels"
                  />
                <div class="row">
                  <div class="col-11">
                <q-input
                  data-cy="location_input"
                  dense
                  :hint="$t('input_labels.required')"
                  class="no-pad"
                  bg-color="grey-3"
                  standout
                  outlined
                  @blur="updateField()"
                  counter
                  :maxlength="$envconfig.titleLimit"
                  :rules="[ val => val.length <= $envconfig.titleLimit ]"
                  v-model="step_shell.location"
                  :label="$t('input_labels.step_location')"
                />
                  </div>
                  <div class="col-1" style="text-align:center">
                <a  :href="gmap_location(step_shell.location)" target="_blank">
                <q-icon size="40px" class="icon" name="img:statics/icons/location.svg" />
                <q-tooltip>
                        {{$t('help.location_maps')}}
                </q-tooltip>
                </a>
                  </div>
                </div>
              </div>
                </div>
                <div class="row">
              <div class="q-pa-sm col-6">
                <HelpLabel
          :fieldLabel="$t('input_labels.icon')"
          :helpLabel ="$t('help.doc_type_icon')"
          class="field"
          style="padding-top:10px"
          /> 
    <q-select
        dense
        filled
        v-model="step_shell.stepIcon"
        :options="this.step_icons"
        :readonly="step_shell.published"
        color="teal"
        @input="addIcon($event)"
        @remove="removeIcon($event)"
        clearable
      >
      <template v-slot:selected>
          <q-chip
            v-if="step_shell.stepIcon"
            square  
          >
          <q-avatar>
          <img :src="step_icons.filter(icon => {return icon.label == step_shell.stepIcon})[0].value ">
        </q-avatar>
          </q-chip>
          <q-badge v-else></q-badge>
        </template>
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-img style="max-width:24px; max-heigth:24px" :src="scope.opt.value" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
              </div>
              <div
              class="q-pa-sm col-6"
              >
              <HelpLabel
                    :fieldLabel="$t('input_labels.step_cost')"
                    :helpLabel ="$t('help.step_cost')"
                    class="labels"
                  />
                <q-input
                  data-cy="cost_input"
                  dense
                  class="no-pad"
                  bg-color="grey-3"
                  standout
                  outlined
                  @blur="updateField()"
                  :maxlength="$envconfig.titleLimit"
                  :rules="[ val => val.length <= $envconfig.titleLimit || 'Please use maximum 5 characters']"
                  v-model="step_shell.cost"
                  :label="$t('input_labels.step_cost')"
                />
              </div>
                </div>

              <div class="row width-2" style="text-align:center">
                <q-icon class="q-mr-xs" size="24px" name="img:statics/icons/Help.png" />
                    <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">{{$t('help.required_documents')}}</q-tooltip>
                <q-btn
                  data-cy="add_step_document"
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
                <div class="col-8">
                  <q-select
                    data-cy="step_document_list"
                    dense
                    outlined
                    clearable
                    v-model="step_doc_shell.idDocument"
                    emit-value
                    map-options
                    id="select"
                    :options="filtered_t_docs"
                    :label="$t('input_labels.required_documents')"
                  />
                </div>
                <div class="col-2">
                  <q-input
                    data-cy="doc_cost"
                    class="input"
                    :label="$t('input_labels.doc_cost')"
                    dense
                    bg-color="grey-3"
                    standout
                    outlined
                    v-model="step_doc_shell.cost"
                  />
                </div>
                <div class="col-2">
                  <q-btn
                    data-cy="save_step_document"
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
                v-if="step_shell.documents "
                class="row "
                style="width:100%;"
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
                  style="padding-top:20px"
                />
              </q-list>
            </div>
            <hr>
                           <div
            class=" q-pa-xsm row div-6"
            style="padding-bottom:20px"
          >
            <div
              class="col-3"
              style="min-width:180px; "
            >
              <HelpLabel
                :field-label="$t('translation_states.translatable')"
                :help-label="$t('help.is_published')"
                class="tag"
              />
            </div>
            <div
              class="col"
              style="padding-top:2px; text-align:left"
            >
              <!-- <q-toggle
                v-model="edit_process.published"
                :disable="edit_process.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
                @input="isPublished($event, edit_process.id)"
                color="accent"
              />-->
              <q-toggle
                :value="
                  step_shell.translations.filter(
                    (top) => top.translated == false
                  )[0].translationState == 1
                "
                color="accent"
                @input="makeTranslatableStep($event)"
              />
            </div>
          </div>
            <div   style="text-align:center">
                <q-btn
                  style="margin-right:15px"
                  class="delete-button"
                  no-caps
                  unelevated
                  :data-cy="'back_to_graph'"
                  :label="$t('button.back')"
                  type="reset"
                  @click="cancelEditStep()"
                />
                <q-btn
                  style="margin-right:15px"
                  :data-cy="'deletestep'"
                  class="delete-button"
                  no-caps
                  unelevated
                  :label="$t('button.delete_step')"
                  @click="deleteElement()"
                />
                <q-btn
                  color="accent"
                  no-caps
                  :data-cy="'savestep'"
                  unelevated
                  :label="$t('button.save_step')"
                  type="submit"
                  class="button"
                />
            </div>
          </div>
        </form>
        </q-card>
      </div>

            
      <q-card 
      v-else  class="col-8"
      style="padding-left:10px"
      >
              <q-card-section>
              </q-card-section>
      </q-card>
    </div>
    <div class="row div-6">


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
import HelpLabel from 'components/HelpLabel'






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
        document_types: 'document_type/document_types',
        step_icons:'steps/step_icons'
      }, actions: {
        changeNode: 'graphs/changeNode',
        changeEdge: 'graphs/changeEdge',
        addNode: 'graphs/addNode',
        deleteNode: 'graphs/deleteNode',
        deleteEdge:'graphs/deleteEdge',
        addEdge: 'graphs/addEdge',
        saveGraph: 'graphs/saveGraph',
        fetchGraphs: 'graphs/fetchGraphs',
        changeStep: 'steps/changeStep',
        addStep: 'steps/addStep',
        deleteStep: 'steps/deleteStep',
        fetchStepsByProcessId: 'steps/fetchStepsByProcessId',
        addStepLink: 'steplinks/addStepLink',
        fetchFlows: 'flows/fetchFlows',
        fetchSteplinksByProcessId: 'steplinks/fetchSteplinksByProcessId',
        fetchDocumentType: 'document_type/fetchDocumentType',
        changeSteplink:"steplinks/changeSteplink",
        deleteStepLink:"steplinks/deleteStepLink",
        fetchStepIcons:'steps/fetchStepIcons'
      }
    })],

  components: {
    Step,
    StepDocumentElement,
    GlossaryEditor,
    HelpLabel
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
      title:null,
      editing: false,
      editing_steplink:false,
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
    makeTranslatableSteplink(value){
      console.log(value)
      if (value) {
        this.steplink_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.steplink_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
     makeTranslatableStep(value){
      console.log(value)
      if (value) {
        this.step_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.step_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    change(){
      this.$forceUpdate()
    },
    addIcon(value){
      console.log(value)
      this.step_shell.stepIcon = value.label
      console.log(this.step_shell)
    },
    removeIcon(){
      console.log(removing)
    },
    onSubmit () {
      console.log(this.$refs.title_input)

      this.$refs.title_input.validate()
      if (this.$refs.title_input.hasError) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.saveStep()
      }
    },
        onReset () {

       this.$refs.title_input[0].resetValidation()
    },
      onSubmitLink () {
      console.log(this.$refs.title_link_input)

      this.$refs.title_link_input.validate()
      if (this.$refs.title_link_input.hasError) {
        console.log("IN TSTEPLINK ERROR")
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("IN TSTEPLINK exact")
        console.log(this.steplink_shell)
        this.saveStepLink()
      }
    },
        onResetLink () {

       this.$refs.title_link_input[0].resetValidation()
    },
    gmap_location(location) {
      return "https://www.google.com/maps/search/?api=1&query=" + location
    },
    updateField () {
      //console.log(this.step_shell)
      //console.log(this)
      this.$forceUpdate()
    },

    createShell () {
      this.step_shell = this.generateShell()
    },

    generateShell (id = -1) {
      let newstep = { id: id, link:null, documents: [], translations: [], cost: 0, idProcess: Number(this.processId), location: '', locationLon: 0, locationLat: 0, locationSpecific: false, is_new: false, to_delete: false, is_edited: false }
      newstep.translations.push({
        id: id,
        lang: this.activeLanguage,
        step: "",
        description: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
      return newstep
    },

    generateStepDocShell (id = null, idStep) {
      let newstepdoc = { idDocument: id, idStep: idStep, cost: 0, isOut: false }
      return newstepdoc
    },

    mergeStep (idStep) {
            console.log("MERGING")
      var step = this.steps.filter(step => { return step.id == idStep })[0]
      console.log(step)
      this.step_shell = JSON.parse(JSON.stringify(step))
      this.step_shell.translations = [
        step.translations.filter((top) => {
          return top.lang == this.$defaultLang && top.translated == false
        })[0]
      ]
      console.log(this.step_shell)

    },
    
    mergeStepLink (idStepLink) {
      console.log("MERGING")
      var steplink = this.steplinks.filter(step => { return step.id == idStepLink })[0]
      this.steplink_shell = JSON.parse(JSON.stringify(steplink))
      this.steplink_shell.is_new = false
      this.steplink_shell.translations = [
        steplink.translations.filter((top) => {
          return top.lang == this.$defaultLang && top.translated == false
        })[0]
      ]

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
      console.log("EDITSTEP-----------")
      console.log(node.group)
      //console.log(event)
      if (node.group == "nodes") {
        console.log("editing")



        if (node.data.is_new) {
          //console.log("NEW NODE")
          this.mergeStep(node.data.id)
        }
        else {
          //console.log("I'm old")
          this.is_new = false
          this.mergeStep(node.data.id)
          //console.log(node)
          if (node.data.required_documents != null) {
            this.model_docs = node.data.required_documents
          }
        }
        console.log("this is edit step")
        //console.log(this.step_shell)
        this.editing = false
        this.editing_steplink = false
        this.editing = true
      }
      else{
        console.log("I am editing a steplink")
        console.log(node.data)
        if (node.data.is_new) {
          console.log("NEW EDGE")
          this.mergeStepLink(node.data.id)
          console.log(this.steplink_shell)
          console.log(node)
        }
        else {
          //console.log("I'm old")
          this.is_new = false
          this.mergeStepLink(node.data.id)
          console.log(this.steplink_shell)
          //console.log(node)
        }
        console.log("this is edit steplink")
        this.editing = false
      this.editing_steplink = true
      }
      
    },
    saveStep () {
      // In edit_step we have the instance of step that we are working on
      console.log("saving the step")
      if ( this.step_shell.is_new) {
        this.step_shell.translations.push({
          id: this.step_shell.id,
          lang: this.activeLanguage,
          step: this.step_shell.translations[0].step,
          description: this.step_shell.translations[0].description,
          translationDate: null,
          translationState: this.step_shell.translations[0]
            .translationState,
          translated: true
        })
        //}
        this.step_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
      }
      else{
        if (this.step_shell.translations[0].translationState == 1) {
          this.step_shell.translations.push({
            id: this.step_shell.id,
            lang: this.activeLanguage,
            step: this.step_shell.translations[0].step,
            description: this.step_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        this.step_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
      }
      console.log(this.step_shell)
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
        saveStepLink () {
      // In edit_step we have the instance of step that we are working on
      console.log("IN SAVING STEPLINK")
      //const index = this.steplink_shell.translations.findIndex(item => item.lang === this.activeLanguage && item.translated == true)
      //console.log(index)
      console.log(this.steplink_shell)
      if ( this.steplink_shell.is_new) {
        console.log("---------------PUSHING SECOND TRANSLATION-----------------")
                var weblate_link = {
          id: this.steplink_shell.id,
          lang: this.activeLanguage,
          description: this.steplink_shell.translations[0].description,
          translationDate: null,
          translationState: this.steplink_shell.translations[0]
            .translationState,
          translated: true
        }
        //this.steplink_shell.translations.splice(index, 1, weblate_link)
          this.steplink_shell.translations.push(weblate_link)
        //}
        this.steplink_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
      }
      else{
        if (this.steplink_shell.translations[0].translationState == 1) {
          var weblate_link = {
            id: this.steplink_shell.id,
            lang: this.activeLanguage,
            description: this.steplink_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          }
          //this.steplink_shell.translations.splice(index, 1, weblate_link)
                    this.steplink_shell.translations.push(weblate_link)

        }
        //this.steplink_shell.translations.splice(index, 1, weblate_link)
        console.log("--------in editing steplink----------")
        console.log(this.steplink_shell)
        this.steplink_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
      }
      console.log(this.steplink_shell)
      this.changeSteplink(this.steplink_shell)
        .then(ret => {
          console.log("CHANGED THE STEP")
        })
      let newtitle = this.steplink_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].description
      this.changeEdge({ title: newtitle, id: this.steplink_shell.id })
        .then(ret => {
          this.refresher += 1
        })

      this.editing = false
      this.stepdocadd = false
      this.createShell()
      this.editing_steplink = false
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
          link:null,
          cost: "",
          required_documents: [],
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
        deleteElementSteplink () {
      this.deleteStepLink(this.steplink_shell.id)
        .then(ret => {
          console.log("DELETED STEP")
          console.log(this.steps)
        })
      this.deleteEdge(this.steplink_shell.id)
        .then(res => {
        })
      console.log("MANAGE EDGES")
      this.editing_steplink = false
    },

    generateStepLink (id_edge, fromStep_edge, toStep_edge, is_new) {
      console.log("GENERATING LINK")
      this.steplink_shell = { id: id_edge, is_new: is_new, to_delete: false, is_edited: false, fromStep: fromStep_edge, toStep: toStep_edge, is_edited: false, idProcess: Number(this.processId), translations: [] }
     this.steplink_shell.translations.push({
        id: id_edge,
        lang: this.activeLanguage,
        description: "",
        translationDate: new Date().toISOString(),
        translationState: 1,
        translated: false
      })
      this.steplink_shell.translations.push({
        id: id_edge,
        lang: this.activeLanguage,
        description: "",
        translationDate: new Date().toISOString(),
        translationState: 1,
        translated: true
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

      this.generateStepLink(newKey, sourceNode._private.data.id, targetNode._private.data.id, true)
      this.addStepLink(this.steplink_shell)
      this.addEdge({
        group: 'edges',
        data: {
          id: newKey,
          is_new: true,
          source: sourceNode._private.data.id,
          target: targetNode._private.data.id,
          is_edited: false,
          description: "",
          title:""
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
      console.log("IN SAVING GRAPH")
      console.log(this.steps)
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
      this.$router.push('/guided_process_editor/edit/'+ this.processId)
    },
    cancelEditStep () {
      this.editing = false
      this.stepdocadd = false
      this.editing_steplink = false
    }
  },



  created () {
    this.loading = true
    this.createShell()
    console.log(this.step_shell)
    console.log("in created")
    console.log(this.processId)
    this.fetchFlows().then((flows)=>{
      console.log(flows)
       var temp = flows.filter((a_proc) => {
        return a_proc.id == this.processId
      })[0]
      console.log("i am temp")
      console.log(temp)
      this.title = temp.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
    })
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
    this.fetchStepIcons()

    this.fetchDocumentType()
      .then(document_types => {
        console.log(document_types)
        document_types.forEach(document_type => {
          if(document_type.published){
          var the_doc = { label: document_type.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: document_type.id }
          
             this.t_docs.push(the_doc)
          }
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
  padding-top: 20px;
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
  max-width: 150px;
border-radius: 5px;
}
.delete-button-2 {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  max-width: 135px;
  border-radius: 5px;
}
.button {
  max-width: 150px;
  border-radius: 5px;
}
.button-2 {
  border-radius: 5px;
  max-width: 135px;
}
.button-3 {
  border-radius: 5px;
  max-width: 170px;
}
#div-1 {
  text-align: center;
  padding-top: 40px;
}
.div-2 {
  margin: 0 auto;
  max-width: 100%;
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
  max-width: 450px;
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
  max-width: 150px;
  border-radius: 2px;
}
.div-4 {
  padding-top: 10px;
  padding-bottom: 10px;
}
#list {
  width:100%
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
.explanation{
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
</style>


