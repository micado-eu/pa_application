<template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">{{ $t("data_settings.topics") }}</h5>
      <div class="col-6 div-1">
        <q-btn
          :data-cy="'addtopic'"
          color="info"
          no-caps
          :label="$t('button.add_topic')"
          @click="newTopic()"
          :disable="hideAdd"
          class="add-button"
        />
      </div>
    </div>
    <q-card class="q-pa-xl div-2" :hidden="hideForm">
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class=""
      >
        <!-- it seems that the following q-input causes a console error saying that he cannot read the property topic of undefined -->
        <HelpLabel
          :fieldLabel="$t('input_labels.topic')"
          :helpLabel="$t('help.topic')"
          class="div-3"
          style="padding-top: 10px"
        />

        <q-input
          outlined
          filled
          dense
          ref="topic"
          counter
          :maxlength="$envconfig.titleLimit"
          :hint="$t('input_labels.required')"
          :rules="[
            (val) =>
              val.length <= $envconfig.titleLimit ||
              'Please use maximum 20 characters',
            (val) => !!val || 'Field is required',
          ]"
          v-model="
            int_topic_shell.translations.filter(
              (top) => top.translated == false
            )[0].topic
          "
          :readonly="
            !(
              (int_topic_shell.translations.filter((top) => top.translated == false)[0].translationState == 0) && (int_topic_shell.published == false)
            )
          "
          :label="$t('input_labels.topic_placeholder')"
        />
        <!--- <div>
            <TranslateStateButton
              v-model="int_topic_shell.translations.filter(top => top.published == false)[0].translationState"
              :objectId="int_topic_shell.id"
              @micado-change="(id) => {changeTranslationState(int_topic_shell, id.state)}"
              @return-to-edit="(id) => {
                  changeTranslationState(int_topic_shell, id.state)
                  deleteTranslationProd(int_topic_shell.id)
                  int_topic_shell.published = false
                }"
            />
          </div> -->
          <HelpLabel
          :field-label="$t('input_labels.description')"
          :help-label="$t('help.user_type_description')"
          style="padding-top: 10px"
          class="div-3"
        />
        <GlossaryEditor
          class="desc-editor"
          :readonly="
            !(
              int_topic_shell.translations.filter(
                (top) => top.translated == false
              )[0].translationState == 0 &&
              int_topic_shell.published == false
            )
          "
          v-model="
            int_topic_shell.translations.filter(
              (top) => top.translated == false
            )[0].description
          "
          :lang="
            int_topic_shell.translations.filter(
              (top) => top.translated == false
            )[0].lang
          "
          ref="editor"
        />
        <FileUploader
          :Image="topicimage"
          :icon="int_topic_shell.icon"
          @upload="getFiles"
          :label="$t('help.topic_icon')"
          :published="int_topic_shell.published"
          style="padding-bottom: 10px"
        >
        </FileUploader>
        <div class="col-2">
          <HelpLabel
            :fieldLabel="$t('input_labels.parent_topic')"
            :helpLabel="$t('help.parent_topic')"
            style="padding-left: 17px"
          />
        </div>
        <q-select
          filled
          data-cy="father_topics"
          dense
          :readonly="int_topic_shell.published"
          clearable
          v-model="int_topic_shell.father"
          emit-value
          map-options
          :options="topicOptions"
          class="select"
        />
        <div class="row">
          <div class="col-2" style="min-width: 200px">
            <HelpLabel
              :fieldLabel="$t('translation_states.translatable')"
              :helpLabel="$t('help.is_published')"
              style="padding-left: 17px"
            />
          </div>
          <div class="col" style="padding-top: 2px">
            <!-- <q-toggle
            v-model="int_topic_shell.published"
            color="accent"
            :disable="int_topic_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event,int_topic_shell.id) "
          />-->
            <q-toggle
              :value="
                int_topic_shell.translations.filter(
                  (top) => top.translated == false
                )[0].translationState == 1
              "
              color="accent"
              @input="makeTranslatable($event)"
            />
          </div>
        </div>
        <hr id="hr" />
        <q-btn
          :data-cy="'canceltopic'"
          no-caps
          class="delete-button"
          unelevated
          rounded
          :label="$t('button.cancel')"
          type="reset"
          @click="cancelTopic()"
        />
        <q-btn
          :data-cy="'savetopic'"
          no-caps
          color="accent"
          unelevated
          rounded
          :disable="int_topic_shell.published"
          :label="$t('button.save')"
          class="button"
          type="input"
        />
      </form>
    </q-card>
    <q-item>
      <q-item-section class="col-1 flex flex-left">
        {{ $t("input_labels.image") }}
      </q-item-section>
      <q-item-section class="col-6 flex flex-left">
        {{ $t("input_labels.name") }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t("input_labels.is_published") }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t("input_labels.transl_state") }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t("input_labels.edit") }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t("input_labels.delete") }}
      </q-item-section>
    </q-item>

    <q-list bordered separator>
      <div v-for="a_topic in topic" :key="a_topic.id">
        <q-item>
          <q-item-section class="col-1 flex flex-left">
            <q-img :src="a_topic.icon" spinner-color="white" id="image" />
          </q-item-section>
          <q-item-section class="col-6 flex flex-left">{{
            showTopicLabel(a_topic)
          }}</q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-toggle
              v-model="a_topic.published"
              color="accent"
              :id="a_topic.id"
              :disable="
                a_topic.translations.filter((top) => top.translated == false)[0]
                  .translationState != 1
              "
              @input="isPublished($event, a_topic.id)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ getTranslationState(a_topic.id) }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'edittopic'.concat(a_topic.id)"
              id="icon"
              name="img:statics/icons/Edit.png"
              size="md"
              @click.stop="editingTopic(a_topic)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'deletetopic'.concat(a_topic.id)"
              name="img:statics/icons/Icon - Delete.svg"
              @click.stop="deletingTopic(a_topic.id)"
              size="md"
            />
          </q-item-section>
        </q-item>
        <div class="row pad">
          <p style="padding-top: 8px; margin-bottom: 0px; padding-left: 20px">
            {{ $t("input_labels.available_transl") }}:
          </p>
          <q-chip
            v-for="lang in a_topic.translations.filter((lang) => {
              return lang.topic.length > 1 && lang.translated == true;
            })"
            :key="lang.lang"
            >{{ lang.lang }}</q-chip
          >
        </div>
        <hr style="margin-bottom: 0px" />
      </div>
    </q-list>
    <q-card class="my-card"> </q-card>
  </div>
</template>

<script>
import FileUploader from "components/FileUploader"
import editEntityMixin from "../../mixin/editEntityMixin"
import storeMappingMixin from "../../mixin/storeMappingMixin"
import translatedButtonMixin from "../../mixin/translatedButtonMixin"
import HelpLabel from "../HelpLabel"
import GlossaryEditor from "components/GlossaryEditor"


export default {
  name: "TopicType",
  mixins: [
    editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        topic: "topic/topic"
      },
      actions: {
        deleteTopic: "topic/deleteTopic",
        saveTopic: "topic/saveTopic",
        editTopic: "topic/editTopic",
        fetchTopic: "topic/fetchTopic",
        updatePublished: "topic/updatePublished",
        saveTranslationProd: "topic/saveTranslationProd",
        deleteTranslationProd: "topic/deleteTranslationProd"
      }
    })
  ],
  data() {
    return {
      int_topic_shell: { id: -1, translations: [], icon: "" },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      topicimage: null,
      publishedOrig: false
    }
  },
  components: {
    FileUploader,
    HelpLabel,
    GlossaryEditor
  },
  computed: {
    topicOptions() {
      var options = []
      this.topic.forEach((topic) => {
        if (topic.id != this.int_topic_shell.id) {
          var the_topic = {
            label: topic.translations.filter(
              this.filterTranslationModel(this.activeLanguage)
            )[0].topic,
            value: topic.id
          }
          options.push(the_topic)
        }
      })
      return options
    }
  },

  methods: {
    getTranslationState(id) {
      var cate = this.topic.filter((cat) => {
        return cat.id == id
      })[0]
      var state = cate.translations.filter((transl) => {
        return transl.lang == this.$defaultLang
      })[0].translationState
      if (state == 0) {
        return this.$i18n.t("translation_states.editing")
      } else if (state == 1) {
        return this.$i18n.t("translation_states.translatable")
      } else if (state == 2) {
        return this.$i18n.t("translation_states.translating")
      } else {
        return this.$i18n.t("translation_states.translated")
      }
    },
    onSubmit() {
      console.log(this.$refs.topic)
      this.$refs.topic.validate()
      if (this.$refs.topic.hasError) {
        this.formHasError = true
        this.$q.notify({
          color: "negative",
          message: this.$t("warning.req_fields")
        })
        return false
      } else {
        console.log("in else of submit")
        this.savingTopic()
        this.onReset()
      }
    },
    onReset() {
      //this.$refs.topic[0].validate()

      this.$refs.topic.resetValidation()
    },
    deletingTopic(index) {
      this.$q.notify({
        type: "warning",
        timeout: 0,
        message: this.$t("warning.delete_topic"),
        actions: [
          {
            label: this.$t("button.delete"),
            color: "red",
            handler: () => {
              console.log(index)
              this.deleteTopic(index)
            }
          },
          {
            label: this.$t("button.back"),
            color: "accent",
            handler: () => {
              console.log("not deleting")
            }
          }
        ]
      })
    },
    savingTopic() {
      //let workingTopic = JSON.parse(JSON.stringify(this.int_topic_shell));

      if (this.isNew) {
        //if(this.int_topic_shell.translations[0].translationState == 1){
        this.int_topic_shell.translations.push({
          id: -1,
          lang: this.activeLanguage,
          topic: this.int_topic_shell.translations[0].topic,
          description:this.int_topic_shell.translations[0].description,
          translationDate: null,
          translationState: this.int_topic_shell.translations[0]
            .translationState,
          translated: true
        })
        //}
        this.int_topic_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        // we are adding a new instance
        console.log(this.int_topic_shell)
        this.saveTopic(this.int_topic_shell).then((int_cat) => {
          console.log("saved")
        })
      } else {
        if (this.int_topic_shell.translations[0].translationState == 1) {
          console.log(this.int_topic_shell)
          this.int_topic_shell.translations.push({
            id: this.int_topic_shell.id,
            lang: this.activeLanguage,
            topic: this.int_topic_shell.translations[0].topic,
            description:this.int_topic_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        this.int_topic_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        console.log(this.int_topic_shell)

        // we are updating the exsisting
        this.editTopic(this.int_topic_shell).then((int_cat) => {
          console.log("updated")
        })
        /*if(this.int_topic_shell.published != this.publishedOrig){
          this.isPublished(this.int_topic_shell)
        }*/
      }
      this.topicimage = null
      this.hideAdd = false
      this.hideForm = true
      this.createShell()
    },
    makeTranslatable(value) {
      console.log(value)
      if (value) {
        this.int_topic_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.int_topic_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    isPublished(event, value) {
      console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_topic_temp = this.topic.filter((topic) => {
        return topic.id == value
      })[0]
      var publishing_topic = JSON.parse(JSON.stringify(publishing_topic_temp))
      if (event == true) {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.publish_topic"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  topic: publishing_topic,
                  published: event
                })
                this.saveTranslationProd(value)
                //this.cancelTopic();
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                console.log(document.getElementById(publishing_topic.id))
                this.topic.filter((topic) => {
                  return topic.id == value
                })[0].published = false
              }
            }
          ]
        })
      } else {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.unpublish_topic"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  topic: publishing_topic,
                  published: event
                })
                this.deleteTranslationProd(value)
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.topic.filter((topic) => {
                  return topic.id == value
                })[0].published = true
              }
            }
          ]
        })
      }
    },
    /* isPublished (value) {
      console.log(value)
       if( value.published == true){
        this.updatePublished({topic:value, published: value.published})
        this.saveTranslationProd(value.id)
      }
      else{
        this.updatePublished({topic:value, published: value.published})
      }
    },*/
    newTopic() {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelTopic() {
      this.topicimage = null
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
    },
    editingTopic(topic) {
      this.isNew = false
      this.hideForm = false
      this.mergeTopic(topic)
      this.publishedOrig = topic.published
    },

    showTopicLabel(workingTopic) {
      return workingTopic.translations.filter(
        this.filterTranslationModel(this.activeLanguage)
      )[0].topic
    },
    createShell() {
      this.int_topic_shell = {
        id: -1,
        translations: [],
        icon: "",
        father: null,
        published: false
      }
      this.int_topic_shell.translations.push({
        id: -1,
        lang: this.activeLanguage,
        topic: "",
        description:"",
        translationDate: null,
        translationState: 0,
        translated: false
      })
    },
    mergeTopic(topic) {
      console.log(topic)
      this.int_topic_shell.id = topic.id
      this.int_topic_shell.icon = topic.icon
      this.int_topic_shell.published = topic.published
      this.int_topic_shell.father = topic.father
      //this.int_topic_shell.published = topic.published
      //this.int_topic_shell.publicationDate = topic.publicationDate
      this.int_topic_shell.translations = [
        topic.translations.filter((top) => {
          return top.lang == this.activeLanguage && top.translated == false
        })[0]
      ]
      /*topic.translations.forEach(tr => {
        console.log(tr)
        for (var i = 0; i < this.int_topic_shell.translations.length; i++) {
          if (this.int_topic_shell.translations[i].lang == tr.lang) {
            this.int_topic_shell.translations.splice(i, 1)
            this.int_topic_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break
          }
        }
      })*/

      console.log(this.int_topic_shell)
    },
    getFiles(files) {
      console.log(files)
      console.log(this)
      console.log(self)
      let reader = new FileReader()
      // Convert the file to base64 text
      reader.readAsDataURL(files)
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: files.name,
          type: files.type,
          size: Math.round(files.size / 1000) + " kB",
          base64: reader.result,
          file: files
        }
        this.topicimage = fileInfo.base64
        this.int_topic_shell.icon = fileInfo.base64
        console.log(fileInfo)
      }
    }
  },
  created() {
    this.loading = true
    console.log(this.$store)
    this.$store.dispatch("topic/fetchTopic").then((processes) => {
      this.loading = false
    })
    this.createShell()
  }
}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 100px;
  border-radius: 2px;
  margin-right: 15px;
  margin-left: 10px;
  margin-top: 30px;
}
h5 {
  font-weight: bold;
}
.div-1 {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: right;
}
.div-2 {
  margin-bottom: 100px;
}
.add-button {
  width: 200px;
}
.button {
  width: 100px;
  border-radius: 2px;
  margin-top: 30px;
}
#div-3 {
  font-size: 16px;
  font-weight: 600;
}
#hr {
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #dadada;
}
.div-4 {
  padding-left: 20px;
  padding-bottom: 10px;
}
.div-5 {
  padding-left: 10px;
}
.div-6 {
  padding-left: 30px;
}
#image {
  height: 40px;
  max-width: 40px;
}
.section {
  font-size: 16px;
  font-weight: 600;
}
#icon {
  margin-right: 10px;
}
</style>