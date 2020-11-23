<template>
  <div>
    <div
      v-if="theprocess!=null"
      class="banner"
    >{{$t('input_labels.edit_process')}} - {{this.title}}</div>
    <div
      v-else
      class="banner"
    >{{$t('input_labels.add_new_process')}}</div>

    <div id="div-1">
      <q-card class="container">

        <q-tab-panels
          v-model="langTab"
          class="bg-grey-2 inset-shadow  "
          animated
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
            <HelpLabel
            :fieldLabel="$t('input_labels.process_name')"
            :helpLabel="$t('help.process_name')"
            class="div-3" />
           
              <q-input
                dense
                data-cy="title_input"
                bg-color="grey-3"
                standout
                outlined
                maxlength="50"
                counter
                :readonly="!(edit_process.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
                :rules="[ val => val.length <= 50 || 'Please use maximum 5 characters']"
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].process"
                :label="$t('input_labels.process_name')"
              />
            </div>

            <div
              id="div-4"
              class="q-pa-xsm"
            >
             <HelpLabel
            :fieldLabel="$t('input_labels.process_description')"
            :helpLabel="$t('help.process_description')"
            class="div-5" />
            
              <GlossaryEditor
                data-cy="description_input"
                class="left"
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].description"
                :lang="language.lang"
                ref="editor"
              />

            </div>
            <div>
              <TranslateStateButton
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].translationState"
                :isForDefaultLanguage="language.lang===activeLanguage"
                :objectId="edit_process.id"
                :readonly="!(language.lang===activeLanguage)"
                @micado-change="(id) => {changeTranslationState(edit_process, id.state)}"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-separator />
        <q-tabs
          v-model="langTab"
          dense
          class="bg-grey-2"
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
        <div
          id=""
          class=" q-pa-xsm row div-6"
        >
        <HelpLabel
            :fieldLabel="$t('input_labels.generated_docs')"
            :helpLabel="$t('help.generated_docs')"
            class="tag" />
          <q-select
            data-cy="add_produced_doc"
            filled
            dense
            clearable
            v-model="edit_process.producedDoc"
            @add="addDoc($event)"
            @remove="removeDoc($event)"
            @clear="clearAllDocs()"
            multiple
            emit-value
            map-options
            :options="this.docOptions"
            :label="$t('input_labels.generated_docs')"
            class="select"
          />
        </div>
        <div  class=" q-pa-xsm row div-6">
          <div class="col-6 tag">
            <HelpLabel
            :fieldLabel="$t('input_labels.user_tags')"
            :helpLabel="$t('help.user_tags')"
            class="tag" />
            
          </div>
          <div class="col-6 tag">
            <HelpLabel
            :fieldLabel="$t('input_labels.topic_tags')"
            :helpLabel="$t('help.topic_tags')"
            class="tag" />
          </div> 
        </div>
        <div
          class="q-pa-xsm row"
          id="div-7"
        >
          <div class="col-6 div-8">
            <q-select
              filled
              dense
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
              :label="$t('input_labels.user_tags')"
              class="select"
            />
            <q-chip
              v-for="tag in selected_u_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>
          </div>

          <div class="col-6 div-9">
            <q-select
              filled
              data-cy="add_topic"
              dense
              clearable
              v-model="edit_process.processTopics"
              @add="addTopicTag($event)"
              @remove="removeTopicTag($event)"
              @clear="clearAllTopics()"
              multiple
              emit-value
              map-options
              :options="this.t_tags"
              :label="$t('input_labels.topic_tags')"
              class="select"
            />
            <q-chip
              v-for="tag in selected_t_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>
          </div>
        </div>

        <hr id="hr-2">
        <CommentList 
        style="text-align:left; padding-left:20px; padding-right:20px"
        :selected_process_comments="selected_process_comments"/>
        <hr id="hr-2">
        <div id="div-10">
          <div class="q-pa-md q-gutter-md col-4 div-11">
            <q-btn
            :data-cy="'back_to_process'.concat(theprocessid)"
              class="delete-button"
              no-caps
              rounded
              :label="$t('button.back')"
              unelevated
              style=""
              to="/guided_process_editor"
            />
            <q-btn
            :data-cy="'manageprocess'.concat(theprocessid)"
              color="secondary"
              no-caps
              rounded
              :label="$t('button.manage_steps')"
              unelevated
              :disable="this.disabled"
              class="button"
              @click="manageProcess()"
            />

            <q-btn
            :data-cy="'saveprocess'.concat(theprocessid)"
              color="accent"
              no-caps
              rounded
              :label="$t('button.save')"
              unelevated
              class="button"
              @click="savingProcess(edit_process)"
            />

          </div>
        </div>
      </q-card>

    </div>
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import storeMappingMixin from '../mixin/storeMappingMixin'
import translatedButtonMixin from '../mixin/translatedButtonMixin'
import CommentList from 'components/CommentList'
import HelpLabel from 'components/HelpLabel'


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
        process_comments: 'comments/process_comments',
        comments: 'comments/comments',
      }, actions: {
        saveProcess: 'flows/saveProcess',
        fetchFlows: 'flows/fetchFlows',
        editProcess: 'flows/editProcess',
        fetchTopic: 'topic/fetchTopic',
        fetchUserType: 'user_type/fetchUserType',
        fetchDocumentType: 'document_type/fetchDocumentType',
        fetchCommentsByProcess: 'comments/fetchCommentsByProcess',
        fetchComments: 'comments/fetchComments'
      }
    })],
  props: ["theprocessid"],
  components: {
    GlossaryEditor,CommentList,HelpLabel
  },
  data () {
    return {
      theprocess: null,
      id: this.$route.params.id,
      is_new: true,
      edit_process: { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "" },
      u_tags: [

      ],
      selected_u_tags: [],
      t_tags: [
      ],
      selected_t_tags: [],
      docOptions: [],
      selectedDocs: [],
      selected_process_comments:[]
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

      var the_user = this.user.filter((a_user) => {
        return a_user.id == value.value
      })[0]
      var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
      this.selected_u_tags.push(the_user_transl)

    },
    removeUserTag (value) {
      console.log(value)
      var idx = this.selected_u_tags.indexOf(value)
      this.selected_u_tags.splice(value.index, 1)
    },
    clearAllUsers () {
      this.selected_u_tags = []
    },
    addTopicTag (value) {
      console.log(value)

      var the_topic = this.topic.filter((a_topic) => {
        return a_topic.id == value.value
      })[0]
      var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
      this.selected_t_tags.push(the_topic_transl)

    },
    removeTopicTag (value) {
      console.log(value)

      this.selected_t_tags.splice(value.index, 1)
    },
    clearAllTopics () {
      this.selected_t_tags = []
    },
    async savingProcess (value) {
      let workingProcess = JSON.parse(JSON.stringify(this.edit_process))

      if (this.is_new) {
        console.log(workingProcess)
        await this.saveProcess(workingProcess)
        console.log(this.$store.state.flows)
        console.log(this.edit_process.id)
      }
      else {
        await this.editProcess(value)
        console.log("I am this is new")
        console.log(this.is_new)
        console.log(value)
        console.log(this.edit_process)
        console.log(this.$store.state.flows)
      }
      this.$router.push({ path: '/guided_process_editor' })
    },

    createShell () {
      this.edit_process = { id: -1, applicableUsers: [], translations: [], processTopics: [], producedDoc: [], link: "" }
      this.languages.forEach(l => {
        this.edit_process.translations.push({ id: -1, lang: l.lang, process: '', description: '', published: false, translationDate: null, translationState: 0 })
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
      process.translations.forEach(pr => {
        console.log(pr)

        for (var i = 0; i < this.edit_process.translations.length; i++) {
          if (this.edit_process.translations[i].lang == pr.lang) {
            this.edit_process.translations.splice(i, 1)
            this.edit_process.translations.push(JSON.parse(JSON.stringify(pr)))
            break
          }
        }
      })
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

          var the_topic = this.topic.filter((a_topic) => {
            return a_topic.id == the_topic.idTopic
          })[0]
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
    this.loading = true
    console.log(this.$defaultLangString)
    this.createShell()
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
        console.log("I am the process")
        console.log(this.theprocess)
      })
    await this.fetchTopic()
      .then(topics => {
        console.log(topics)
        topics.forEach(topic => {
          var the_topic = { label: topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic, value: topic.id }
          this.t_tags.push(the_topic)
        })

      })
    await this.fetchUserType()
      .then(user_type => {
        console.log(user_type)

        user_type.forEach(ut => {
          var the_user = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType, value: ut.id }
          this.u_tags.push(the_user)
        })
      })
    await this.fetchDocumentType()
      .then(docs => {
        console.log(docs)

        docs.forEach(ut => {
          var doc = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: ut.id }
          this.docOptions.push(doc)
        })
        console.log(this.docOptions)
      })
    console.log("THEPROCESS:")
    console.log(this.theprocess)
    
    if (this.theprocess != null) {
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
  border-radius: 2px;
}
.button {
  width: 150px;
  border-radius: 2px;
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
  padding-bottom: 20px;
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
  padding-left: 0px;
  padding-top: 15px;
}
.select {
  width: 90%;
}
.div-9 {
  padding-right: 45px;
  padding-top: 15px;
}
#hr-1 {
  width: 85%;
  border: 0.999px solid #dadada;
  margin-top: 90px;
}
#hr-2 {
  width: 85%;
  border: 0.999px solid #dadada;
}
#div-10 {
  text-align: left;
  padding-left: 150px;
}
.div-11 {
  display: inline-block;
}
.left{
  text-align: left;
}
</style>
