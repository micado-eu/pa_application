<template>
  <div>
    <div
      v-if="theprocess!=null"
      class="banner"
    >
      {{ $t('input_labels.edit_process') }} - {{ this.title }}
    </div>
    <div
      v-else
      class="banner"
    >
      {{ $t('input_labels.add_new_process') }}
    </div>

    <div id="div-1">

        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
              <q-card class="container">
        <div class="form-help">
          {{ $t("help.form") }} {{ this.$defaultLangString }}
        </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
            style="padding-bottom:0px"
          >
            <HelpLabel
              :field-label="$t('input_labels.process_name')"
              :help-label="$t('help.process_name')"
              class="div-3"
            />
           
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="process_name"
              outlined
              :maxlength="$envconfig.titleLimit"
              counter
              :readonly="!(
                (edit_process.translations.filter((top) => top.translated == false)[0].translationState == 0) && (edit_process.published == false)
              )"
              :rules="[ 
                val => val.length <= $envconfig.titleLimit || 'Please use maximum 50 characters',
                val => !!val || 'Field is required'
              ]"
              :hint="$t('input_labels.required')"
              v-model="edit_process.translations.filter(
                (top) => top.translated == false
              )[0].process"
            />
          </div>

          <div
            id="div-4"
            class=""
          >
            <HelpLabel
              :field-label="$t('input_labels.process_description')"
              :help-label="$t('help.process_description')"
              class="div-5"
            />
            
            <GlossaryEditor
              data-cy="description_input"
              class="desc-editor "
              style="width:100%; text-align:left"
              :readonly="!(
                (edit_process.translations.filter((top) => top.translated == false)[0].translationState == 0) && (edit_process.published == false)
              )"
              v-model="edit_process.translations.filter(
                (top) => top.translated == false
              )[0].description"
              :lang="edit_process.translations.filter(
                (top) => top.translated == false
              )[0].lang"
              ref="editor"
            />
          </div>

          <!-- <treeselect
          :multiple="true"
          :options="this.tree_options"
          :flat="true"
          :default-expand-level="1"
          placeholder="Try selecting some options."
          v-model="edit_process.processTopics"
          />-->
          <div
            class="   div-6"
            style="padding-top:0px"
          >
            <HelpLabel
              :field-label="$t('input_labels.generated_docs')"
              :help-label="$t('help.generated_docs')"
              class="tag"
              style="padding-bottom:15px"
            />
            <div class="row">
              <div class="col-9">
            <q-select
              data-cy="add_produced_doc"
              dense
              outlined
              style="padding-right:0px"
              clearable
              :readonly="edit_process.published == true"
              v-model="edit_process.producedDoc"
              @add="addDoc($event)"
              @remove="removeDoc($event)"
              @clear="clearAllDocs()"
              multiple
              emit-value
              map-options
              :options="this.docOptions"
              class="select"
            />
              </div>
              <div class="col-3">
            <NewDocumentProcess @new_doc="updateDocList"/>
              </div>
            </div>
          </div>
          <div class=" q-pa-xsm row div-6">
            <div class="col-6 tag">
              <HelpLabel
                :field-label="$t('input_labels.user_tags')"
                :help-label="$t('help.user_tags')"
                class="tag"
              />
            </div>
            <div class="col-6 tag">
              <HelpLabel
                :field-label="$t('input_labels.topic_tags')"
                :help-label="$t('help.topic_tags')"
                class="tag"
                style="padding-left:16px"
              />
            </div> 
          </div>
          <div
            class="q-pa-xsm row"
            id="div-7"
          >
            <div class="col-6 div-8">
              <treeselect
                :multiple="true"
                :options="this.tree_options_users"
                :flat="true"
                placeholder="Try selecting some options."
                v-model="edit_process.applicableUsers"
                @select="addUserTag($event)"
                @deselect="removeUserTag($event)"
                @clear="clearAllUsers()"
              >
               <!-- <div
                  slot="value-label"
                  slot-scope="{ node }"
                  :class="{unpublished: !node.raw.published}"
                >
                  {{ node.label }}
                </div>-->
                <label
                  slot="option-label"
                  slot-scope="{node}"
                  :class="{unpublished: !node.raw.published}"
                >
                  {{ node.label }}
                </label>
              </treeselect>
              <!--<q-select
                filled
                dense
                color="white"
                :readonly="edit_process.published == true"
                data-cy="add_user"
                clearable
                v-model="edit_process.applicableUsers"
                @add="addUserTag($event)"
                @remove="removeUserTag($event)"
                @clear="clearAllUsers()"
                multiple
                emit-value
                map-options
                :options="this.u_tags"
                class="select"
              />-->
              <!--  <q-chip
              v-for="tag in selected_u_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>-->
            </div>

            <div class="col-6 div-9" >
              <treeselect
                :multiple="true"
                :options="this.tree_options"
                :flat="true"
                :default-expand-level="1"
                placeholder="Try selecting some options."
                v-model="edit_process.processTopics"
                @select="addTopicTag($event)"
                @deselect="removeTopicTag($event)"
                @clear="clearAllTopics()"
              >
               <!-- <div
                  slot="value-label"
                  slot-scope="{ node }"
                  :class="{unpublished: !node.raw.published}"
                >
                  {{ node.label }}
                </div>-->
                <label
                  slot="option-label"
                  slot-scope="{node}"
                  :class="{unpublished: !node.raw.published}"
                >
                  {{ node.label }}
                </label>
              </treeselect>
              <!-- <q-select
              filled
              data-cy="add_topic"
              dense
              :readonly="edit_process.published == true"
              clearable
              v-model="edit_process.processTopics"
              @add="addTopicTag($event)"
              @remove="removeTopicTag($event)"
              @clear="clearAllTopics()"
              multiple
              emit-value
              map-options
              :options="this.t_tags"
              class="select"
            />
            <q-chip
              v-for="tag in selected_t_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>-->
            </div>
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
                  edit_process.translations.filter(
                    (top) => top.translated == false
                  )[0].translationState == 1
                "
                color="accent"
                @input="makeTranslatable($event)"
              />
            </div>
          </div>
          <div style="padding-left:166px; padding-right:166px">
            <hr id="hr-2">
            <CommentList 
              style="text-align:left;"
              :selected_process_comments="selected_process_comments"
            />
          </div>
          
                </q-card>
            <div class="container div-11">
              <q-btn
                :data-cy="'back_to_process'.concat(theprocessid)"
                class="delete-button"
                no-caps
                rounded
                :label="$t('button.cancel')"
                unelevated
                style="margin-right:15px"
                to="/guided_process_editor"
              />
             <!-- <q-btn
                :data-cy="'manageprocess'.concat(theprocessid)"
                color="secondary"
                no-caps
                rounded
                :label="$t('button.manage_steps')"
                unelevated
                :disable="this.disabled || edit_process.published"
                class="button"
                @click="manageProcess()"
              />-->

              <q-btn
                :data-cy="'saveprocess'.concat(theprocessid)"
                color="accent"
                no-caps
                rounded
                :disable="edit_process.published"
                :label="$t('button.save')"
                unelevated
                class="button"
                type="submit"
              />
            </div>

        </form>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import editEntityMixin from '../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import storeMappingMixin from '../mixin/storeMappingMixin'
import translatedButtonMixin from '../mixin/translatedButtonMixin'
import CommentList from 'components/CommentList'
import HelpLabel from 'components/HelpLabel'
import NewDocumentProcess from 'components/NewDocumentProcess'


export default {
  name: 'PageIndex',
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        processes: 'flows/processes',
        topic: 'topic/topic',
        user: 'user_type/user',
        documents: 'document_type/document_types',
        steps: 'steps/steps',
        process_comments: 'comments/process_comments',
        steplinks: 'steplinks/steplinks',
        comments: 'comments/comments',
        tree_options:'topic/tree_options',
        tree_options_users:'user_type/tree_options'
      }, actions: {
        saveProcess: 'flows/saveProcess',
        fetchFlows: 'flows/fetchFlows',
        editProcess: 'flows/editProcess',
        fetchTopic: 'topic/fetchTopic',
        fetchUserType: 'user_type/fetchUserType',
        fetchDocumentType: 'document_type/fetchDocumentType',
        fetchCommentsByProcess: 'comments/fetchCommentsByProcess',
        fetchSteps: 'steps/fetchSteps',
        updatePublished: 'flows/updatePublished',
        saveTranslationProd: 'flows/saveTranslationProd',
        deleteTranslationProd: 'flows/deleteTranslationProd',
        saveStepTranslationProd: 'steps/saveTranslationProd',
        deleteStepTranslationProd: 'steps/deleteTranslationProd',
        saveSteplinkTranslationProd: 'steplinks/saveTranslationProd',
        deleteSteplinkTranslationProd: 'steplinks/deleteTranslationProd',
        fetchComments: 'comments/fetchComments',
        updateStepTranslation:'steps/updateStepTranslation',
        fetchSteplinksByProcessId: 'steplinks/fetchSteplinksByProcessId',
        updateSteplinkTranslation:'steplinks/updateSteplinkTranslation'
      }
    })],
  props: ["theprocessid"],
  components: {
    GlossaryEditor,CommentList,HelpLabel,Treeselect,NewDocumentProcess
  },
  data () {
    return {
      theprocess: null,
      id: this.$route.params.id,
      is_new: true,
      edit_process: { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "", published:false },
      u_tags: [

      ],
      selected_u_tags: [],
      t_tags: [
      ],
      selected_t_tags: [],
      docOptions: [],
      selectedDocs: [],
      selected_process_comments:[], 
      publishedOrig:false,
      related_steps:null, 
      related_links:null
    }
  },
  computed: {
    title () {
      return this.theprocess.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
    },

    disabled () {
      if (this.theprocessid != null) {
        return false
      }
      else {
        return true
      }
    }

  },
  methods: {
    updateDocList(value){
      this.fetchDocumentType()
      .then(docs => {
        this.docOptions = []
        console.log(docs)
        docs.forEach(ut => {
          var doc = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: ut.id }
          this.docOptions.push(doc)
        })
        console.log(this.docOptions)
      })

    },
    makeTranslatable(value) {
      console.log(value)
      if (value) {
        this.edit_process.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.edit_process.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    updateStepTranslationState(state){
      console.log("updating steps")
      if(this.related_steps){
      this.related_steps.forEach((step)=>{
        this.updateStepTranslation({id:step.id, translationState:state})
          })
      }
    },
      updateSteplinkTranslationState(state){
      console.log("updating steps")
      if(this.related_links){
      this.related_links.forEach((steplink)=>{
        this.updateSteplinkTranslation({id:steplink.id, translationState:state})
          })
      }
    },
    groupSteps(id){
      this.related_steps = this.steps.filter((step)=>{
        return step.idProcess== id
      })
    },
    onSubmit () {
      this.$refs.process_name.validate()
      if (this.$refs.process_name.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message:this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savingProcess(this.edit_process)
      }
    },
        onReset () {
       this.$refs.process_name.validate()

       this.$refs.process_name.resetValidation()
    },
    manageProcess () {
      this.$router.push({ name: 'editstep', params: { processId: this.theprocessid } })
    },
    addDoc (value) {
      console.log(value)

      var doc = this.documents.filter((a_doc) => {
        return a_doc.id == value.value
      })[0]
      var the_doc_transl = doc.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
      this.selectedDocs.push(the_doc_transl)

    },
    removeDoc (value) {
      console.log(value)
      var idx = this.selectedDocs.indexOf(value)
      this.selectedDocs.splice(value.index, 1)
    },
    clearAllDocs () {
      this.selectedDocs = []
    },
    addUserTag (value) {
      console.log(value)

      /*var the_user = this.user.filter((a_user) => {
        return a_user.id == value.value
      })[0]
      var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
      this.selected_u_tags.push(the_user_transl)*/
            console.log(value)
      this.selected_u_tags.push(value.label)

    },
    removeUserTag (value) {
      console.log(value)
      var idx = this.selected_u_tags.findIndex(item => item.id == value.id)
      this.selected_u_tags.splice(idx, 1)
    },
    clearAllUsers () {
      this.selected_u_tags = []
    },
    addTopicTag (value) {
      /*console.log(value)

      var the_topic = this.topic.filter((a_topic) => {
        return a_topic.id == value.value
      })[0]
      var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
      this.selected_t_tags.push(the_topic_transl)*/
      console.log(value)
      this.selected_t_tags.push(value.label)
    },
    removeTopicTag (value) {
      console.log(value)
      var idx = this.selected_t_tags.findIndex(item => item.id == value.id)
      this.selected_t_tags.splice(idx, 1)
    },
    clearAllTopics () {
      this.selected_t_tags = []
    },
   isPublished(event,value){
     console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_process =  this.processes.filter((doc)=>{
        return doc.id == value
      })[0]
      console.log("i am doc to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == value
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      console.log("i am links to publish")
      console.log(this.related_links)
      if( event == true){
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.publish_process'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({process:publishing_process, published:event})
            this.saveTranslationProd(value)
            this.saveStepTranslationProd(publishing_steps)
            this.saveSteplinkTranslationProd(this.related_links)
            setTimeout(() => { this.$router.push({ path: '/guided_process_editor' }) }, 300) } },
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.edit_process.published = false } }
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
            this.updatePublished({process:publishing_process, published:event})
            this.deleteTranslationProd(value)
            this.deleteStepTranslationProd(publishing_steps)
            this.deleteSteplinkTranslationProd(this.related_links)
            }},
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.edit_process.published = true } }
        ]
      })
       
      }
     },
    /*isPublished(value){
       console.log(value)
      var publishing_process =  value
      console.log("i am process to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == value.id
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      
      if( value.published == true){
        this.updatePublished({process:publishing_process, published: value.published})
        this.saveTranslationProd(value.id)
        this.saveStepTranslationProd(publishing_steps)

      }
      else{
        this.updatePublished({process:publishing_process, published: value.published})
      }
     },*/
    async savingProcess (value) {
      let workingProcess = JSON.parse(JSON.stringify(this.edit_process))

      if (this.is_new) {
        workingProcess.translations.push({
          id: -1,
          lang: this.activeLanguage,
          process: workingProcess.translations[0].process,
          description: workingProcess.translations[0].description,
          translationDate: null,
          translationState: workingProcess.translations[0]
            .translationState,
          translated: true
        })
        //}
        workingProcess.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        console.log(workingProcess)
        await this.saveProcess({process:workingProcess, defaultLang:this.$defaultLang})
        console.log(this.$store.state.flows)
        console.log(this.edit_process.id)
      }
      else {
        if (workingProcess.translations[0].translationState == 1) {
          console.log(workingProcess)
          workingProcess.translations.push({
            id: workingProcess.id,
            lang: this.activeLanguage,
            process: workingProcess.translations[0].process,
            description: workingProcess.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        workingProcess.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        await this.editProcess({process:workingProcess,defaultLang:this.$defaultLang })
        this.groupSteps(workingProcess.id)
        //this condition is necessary because if the user changes, for example, a topic while the translationstate
        //is 2, all steps and link would move to that translation state without being put into weblate
        //if the user creates new steps or links after the process has been put into translationstate = 2
        //he will have to manually select his state and send it to translation platform
        if(workingProcess.translations[0].translationState == 1){
        this.updateStepTranslationState(value.translations[0].translationState)
        this.updateSteplinkTranslationState(value.translations[0].translationState)
        }


        console.log("i am ublished orig")
        console.log(this.publishedOrig)
        console.log("i am published of the form")
        console.log(value.published)
        /*if(value.published != this.publishedOrig){
          this.isPublished(value)
        }*/
        console.log("I am this is new")
        console.log(this.is_new)
        console.log(value)
        console.log(this.edit_process)
        console.log(this.$store.state.flows)
      }
      setTimeout(() => { this.$router.push({ path: '/guided_process_editor' }) }, 500)
      
    },

    createShell () {
      this.edit_process = { id: -1, applicableUsers: [], translations: [], processTopics: [], producedDoc: [], link: "", published:false }
      this.edit_process.translations.push({
        id: -1,
        lang: this.activeLanguage,
        process: "",
        description: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
    },
    mergeProcess (process) {
      console.log("MERGING")
      console.log(process)
      this.edit_process.id = process.id
      this.edit_process.link = process.link
      //this.edit_process.published = process.published
      //this.edit_process.publicationDate = process.publicationDate
      this.edit_process.applicableUsersOrig = []
      this.edit_process.processTopicsOrig = []
      this.edit_process.published = process.published
      this.edit_process.translations = [
        process.translations.filter((top) => {
          return top.lang == this.$defaultLang && top.translated == false
        })[0]
      ]
      console.log("pre-topics foreach")
      if (process.producedDoc != null) {
        process.producedDoc.forEach(the_doc => {
          this.edit_process.producedDoc.push(the_doc.idDocument)

          var the_doc = this.documents.filter((a_doc) => {
            return a_doc.id == the_doc.idDocument
          })[0]
          var the_doc_transl = the_doc.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
          this.selectedDocs.push(the_doc_transl)
        })
      }
      // here we have to cycle on topics and use the processTopics data to set the chosen ones
      if (process.processTopics != null) {
        process.processTopics.forEach(the_topic => {
          this.edit_process.processTopics.push(the_topic.idTopic)
          console.log(this.topic)
          var the_topic = this.topic.filter((a_topic) => {
            return a_topic.id == the_topic.idTopic
          })[0]
          console.log(the_topic)
          var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
          this.selected_t_tags.push(the_topic_transl)
        })
      }

      if (process.applicableUsers != null) {
        process.applicableUsers.forEach(the_user => {
          this.edit_process.applicableUsers.push(the_user.idUserTypes)

          var the_user = this.user.filter((a_user) => {
            return a_user.id == the_user.idUserTypes
          })[0]
          var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
          this.selected_u_tags.push(the_user_transl)

        })
      }

      console.log("THE MERGED OBJECT")
      console.log(this.edit_process)




    }
  },
  async created () {
    console.log(this.$defaultLang)
    console.log(this.$defaultLangString)
    this.createShell()
     this.fetchSteps()
      .then(steps => {
        this.loading = false
        console.log(this.steps)
      })
    await this.fetchFlows()
      .then(flows => {
        console.log(this.processes)
        console.log(this.theprocessid)
        this.loading = false
        var temp = this.processes.filter((current_process) => {
          return current_process.id == this.theprocessid
        })[0]
        console.log(temp)
        this.theprocess = temp
        if(temp != null){
          this.publishedOrig = this.theprocess.published
        }
        console.log("I am the process")
        console.log(this.theprocess)
      })
    await this.fetchTopic()
      .then((topics) => {
        console.log(topics)
         var published_topics = topics.filter((top)=>{return top.published == true})
        published_topics.forEach(topic => {
          var the_topic = { label: topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic, value: topic.id }
          this.t_tags.push(the_topic)
        })

      })
    await this.fetchUserType()
      .then(user_type => {
        console.log(user_type)
        var published_user_type= user_type.filter((top)=>{return top.published == true})
        published_user_type.forEach(ut => {
          var the_user = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType, value: ut.id }
          this.u_tags.push(the_user)
        })
      })
    await this.fetchDocumentType()
      .then(docs => {
        console.log(docs)
        var published_docs= docs.filter((top)=>{return top.published == true})
        docs.forEach(ut => {
          var doc = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: ut.id }
          this.docOptions.push(doc)
        })
        console.log(this.docOptions)
      })
    console.log("THEPROCESS:")
    console.log(this.theprocess)
    
    if (this.theprocess != null) {
    this.fetchSteplinksByProcessId(Number(this.theprocessid))
      .then(steplinks => {
        this.related_links = steplinks
        console.log("THE STEPLINKS")
        console.log(steplinks)
      })

      this.fetchComments().then((commentlist)=>{
      console.log(commentlist)
      this.fetchCommentsByProcess(this.theprocessid).then((the_comments)=>{
        the_comments.forEach((comment) =>{
                  console.log("INSIDE FOREACH")
                  console.log(comment)
                  for(var i = 0; i < this.comments.length; i++){
                    console.log("INSIDE FOR")
                    if(comment.idcomment == this.comments[i].id){
                      console.log("INSIDE IF")
                      this.selected_process_comments.push(this.comments[i])
                      console.log(this.selected_process_comments)
                    }
                  }
                    })
      })
    })
    
      this.is_new = false
      this.mergeProcess(this.theprocess)
      console.log(this.edit_process)
      console.log
      
    }
    // }
  }

}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 150px;
  border-radius: 5px;
}
.button {
  width: 150px;
  border-radius: 5px;
}
.banner {
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
.container {
  display: inline-block;
  margin-bottom: 1px;
  width: 80%;
}
.tag {
  text-align: left;
  font-size: 15px;
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
#div-3 {
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding-bottom: 15px;
}
#div-4 {
  padding-bottom: 5px;
  padding-left: 150px;
  padding-right: 150px;
}
#div-5 {
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 15px;
}
.div-6 {
  padding-top: 20px;
  padding-left: 150px;
  padding-right: 150px;
}
#div-7 {
  padding-left: 150px;
  padding-right: 150px;
}
.div-8 {
  padding-top: 15px;
}
.select {
  width: 100%;
  padding-right:16px
}
.div-9 {
  padding-left:16px;
  
  padding-top: 15px;
}
#hr-1 {
  width: 85%;
  border: 0.999px solid #dadada;
  margin-top: 90px;
}
#hr-2 {
  width: 100%;
  border: 0.999px solid #dadada;
}
#div-10 {
  padding-top:30px;
  text-align: left;
  padding-left: 150px;
}
.div-11 {
  text-align: center;
  padding-top:10px
}
.left{
  text-align: left;
}
.desc-editor .editor-options {
  width: 100%;
  margin-bottom:10px
}
.form-help{
  padding-top:30px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}
.unpublished{
  color:red
}
.vue-treeselect__multi-value-label{
  padding-right: 5 px;
  user-select: none;
  white-space: normal;
}
</style>
