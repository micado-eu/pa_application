<template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">
        {{ $t("data_settings.user_types") }}
      </h5>
      <div class="col-6 div-1">
        <q-btn
          :data-cy="'addusertype'"
          class="add-button"
          color="info"
          no-caps
          :label="$t('button.add_type')"
          @click="newUserType()"
          :disable="hideAdd"
        />
      </div>
    </div>
    <q-card
      class="q-pa-md div-2"
      :hidden="hideForm"
    >
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class=""
      >
        <HelpLabel
          :field-label="$t('input_labels.user_type')"
          :help-label="$t('help.user_type')"
          style="padding-top: 10px"
          class="div-3"
        />

        <q-input
          outlined
          filled
          dense
          counter
          :hint="$t('input_labels.required')"
          ref="user_type"
          :maxlength="$envconfig.titleLimit"
          :rules="[
            (val) =>
              val.length <= $envconfig.titleLimit ||
              'Please use maximum 20 characters',
            (val) => !!val || 'Field is required',
          ]"
          v-model="
            int_user_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].userType
          "
          :readonly="
            !(
              int_user_type_shell.translations.filter(
                (top) => top.translated == false
              )[0].translationState == 0 &&
              int_user_type_shell.published == false
            )
          "
          :label="$t('input_labels.user_type_placeholder')"
        />
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
              int_user_type_shell.translations.filter(
                (top) => top.translated == false
              )[0].translationState == 0 &&
              int_user_type_shell.published == false
            )
          "
          v-model="
            int_user_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].description
          "
          :lang="
            int_user_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].lang
          "
          ref="editor"
        />
        <FileUploader
          :image="userimage"
          :label="$t('help.user_type_icon')"
          :icon="int_user_type_shell.icon"
          @upload="getFiles"
          :published="int_user_type_shell.published"
        />
      
        <div class="row">
          <div
            class="col-2"
            style="min-width: 200px"
          >
            <HelpLabel
              :field-label="$t('translation_states.translatable')"
              :help-label="$t('help.is_published')"
              style="padding-left: 17px"
            />
          </div>
          <div
            class="col"
            style="padding-top: 2px"
          >
            <!--<q-toggle
              v-model="int_user_type_shell.published"
              color="accent"
              :disable="
                int_user_type_shell.translations.filter(
                  filterTranslationModel(this.activeLanguage)
                )[0].translationState < 2
              "
              @input="isPublished($event, int_user_type_shell.id)"
            />-->
            <q-toggle
              :value="
                int_user_type_shell.translations.filter(
                  (top) => top.translated == false
                )[0].translationState == 1
              "
              color="accent"
              @input="makeTranslatable($event)"
            />
          </div>
        </div>
        <hr id="hr">
        <q-btn
          :data-cy="'cancelusertype'"
          no-caps
          class="delete-button"
          unelevated
          rounded
          style=""
          :label="$t('button.cancel')"
          type="reset"
          @click="cancelUserType()"
        />
        <q-btn
          :data-cy="'saveusertype'"
          :disable="int_user_type_shell.published"
          no-caps
          color="accent"
          unelevated
          rounded
          class="button"
          :label="$t('button.save')"
          type="submit"
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
    <q-list
      bordered
      separator
    >
      <div
        v-for="a_user_type in user"
        :key="a_user_type.id"
      >
        <q-item>
          <q-item-section class="col-1 flex flex-left">
            <q-img
              :src="a_user_type.icon"
              spinner-color="white"
              id="image"
            />
          </q-item-section>
          <q-item-section class="col-6 flex flex-left">
            {{
              showUserTypeLabel(a_user_type)
            }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-toggle
              v-model="a_user_type.published"
              color="accent"
              :disable="
                a_user_type.translations.filter((top) => top.translated == false)[0]
                  .translationState != 1
              "
              @input="isPublished($event, a_user_type.id)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ getTranslationState(a_user_type.id) }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'edituser'.concat(a_user_type.id)"
              id="icon"
              name="img:statics/icons/Edit.png"
              size="md"
              @click.stop="editingUserType(a_user_type)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'deleteuser'.concat(a_user_type.id)"
              name="img:statics/icons/Icon - Delete.svg"
              @click.stop="deletingUserType(a_user_type.id)"
              size="md"
            />
          </q-item-section>
        </q-item>
        <div class="row pad">
          <p style="padding-top: 8px; margin-bottom: 0px; padding-left: 20px">
            {{ $t("input_labels.available_transl") }}:
          </p>
          <q-chip
            v-for="lang in a_user_type.translations.filter((lang) => {
              return lang.userType.length > 1 && lang.translated == true;
            })"
            :key="lang.lang"
          >
            {{ lang.lang }}
          </q-chip>
        </div>
        <hr style="margin-bottom: 0px">
      </div>
    </q-list>
  </div>
</template>

<script>
import FileUploader from "components/FileUploader"
import editEntityMixin from "../../mixin/editEntityMixin"
import GlossaryEditor from "components/GlossaryEditor"
import storeMappingMixin from "../../mixin/storeMappingMixin"
import translatedButtonMixin from "../../mixin/translatedButtonMixin"
import HelpLabel from "../HelpLabel"

export default {
  name: "UserType",
  mixins: [
    editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        user: "user_type/user"
      },
      actions: {
        deleteUserType: "user_type/deleteUserType",
        fetchUserType: "user_type/fetchUserType",
        saveUserType: "user_type/saveUserType",
        editUserType: "user_type/editUserType",
        updatePublished: "user_type/updatePublished",
        saveTranslationProd: "user_type/saveTranslationProd",
        deleteTranslationProd: "user_type/deleteTranslationProd"
      }
    })
  ],
  data() {
    return {
      int_user_type_shell: {
        id: -1,
        user_type: null,
        translations: [],
        icon: ""
      },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      userimage: null,
      publishedOrig: false
    }
  },
  components: {
    FileUploader,
    GlossaryEditor,
    HelpLabel
  },

  methods: {
    makeTranslatable(value) {
      console.log(value)
      if (value) {
        this.int_user_type_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.int_user_type_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    getTranslationState(id) {
      var cate = this.user.filter((cat) => {
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
      console.log(this.$refs.user_type)
      this.$refs.user_type.validate()
      if (this.$refs.user_type.hasError) {
        this.formHasError = true
        this.$q.notify({
          color: "negative",
          message: this.$t("warning.req_fields")
        })
        return false
      } else {
        console.log("in else of submit")
        this.savingUserType()
        this.onReset()
      }
    },
    onReset() {
      //this.$refs.topic[0].validate()

      this.$refs.user_type.resetValidation()
    },
    deletingUserType(index) {
      this.$q.notify({
        type: "warning",
        timeout: 0,
        message: this.$t("warning.delete_user_type"),
        actions: [
          {
            label: this.$t("button.delete"),
            color: "red",
            handler: () => {
              console.log(index)
              this.deleteUserType(index)
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
    savingUserType() {
      if (this.isNew) {
        // we are adding a new instance
        this.int_user_type_shell.translations.push({
          id: -1,
          lang: this.activeLanguage,
          userType: this.int_user_type_shell.translations[0].userType,
          description: this.int_user_type_shell.translations[0].description,
          translationDate: null,
          translationState: this.int_user_type_shell.translations[0]
            .translationState,
          translated: true
        })
        //}
        this.int_user_type_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        this.saveUserType(this.int_user_type_shell).then((int_cat) => {
          console.log("saved")
        })
      } else {
        if (this.int_user_type_shell.translations[0].translationState == 1) {
          console.log(this.int_user_type_shell)
          this.int_user_type_shell.translations.push({
            id: this.int_user_type_shell.id,
            lang: this.activeLanguage,
            userType: this.int_user_type_shell.translations[0].userType,
            description: this.int_user_type_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        this.int_user_type_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        // we are updating the exsisting
        console.log("IN EDITING")
        this.editUserType(this.int_user_type_shell).then((int_cat) => {
          console.log("updated")
        })
        /*if(this.int_user_type_shell.published != this.publishedOrig){
          this.isPublished(this.int_user_type_shell)
        }*/
      }
      this.userimage = null
      this.hideForm = true
      this.hideAdd = false
      this.createShell()
    },
    newUserType() {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    editingUserType(user_type) {
      this.isNew = false
      this.hideForm = false
      //this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
      this.mergeUserType(user_type)
      this.publishedOrig = user_type.published
      console.log(
        this.int_user_type_shell.translations.filter(
          this.filterTranslationModel(this.activeLanguage)
        )[0]
      )
    },
    showUserTypeLabel(workingTopic) {
      return workingTopic.translations.filter(
        this.filterTranslationModel(this.activeLanguage)
      )[0].userType
    },
    createShell() {
      this.int_user_type_shell = {
        id: -1,
        user_type: null,
        translations: [],
        icon: "",
        published: false
      }
      this.int_user_type_shell.translations.push({
        id: -1,
        lang: this.activeLanguage,
        userType: "",
        description: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
    },
    mergeUserType(user_type) {
      console.log(user_type)
      this.int_user_type_shell.id = user_type.id
      this.int_user_type_shell.icon = user_type.icon
      this.int_user_type_shell.published = user_type.published
      //this.int_user_type_shell.published = user_type.published
      //this.int_user_type_shell.publicationDate = user_type.publicationDate
      this.int_user_type_shell.translations = [
        user_type.translations.filter((top) => {
          return top.lang == this.activeLanguage && top.translated == false
        })[0]
      ]
      console.log(this.int_user_type_shell)
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
        this.userimage = fileInfo.base64
        this.int_user_type_shell.icon = fileInfo.base64
        console.log(fileInfo)
      }
    },
    isPublished(event, value) {
      console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_user_temp = this.user.filter((user) => {
        return user.id == value
      })[0]
      var publishing_user = JSON.parse(JSON.stringify(publishing_user_temp))
      if (event == true) {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.publish_user_type"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  user: publishing_user,
                  published: event
                })
                this.saveTranslationProd(value)
                this.cancelUserType()
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.user.filter((topic) => {
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
          message: this.$t("warning.unpublish_user_type"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  user: publishing_user,
                  published: event
                })
                this.deleteTranslationProd(value)
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.user.filter((topic) => {
                  return topic.id == value
                })[0].published = true
              }
            }
          ]
        })
      }
    },
    /*isPublished(value){
      if( value.published == true){
        this.updatePublished({user:value, published: value.published})
        this.saveTranslationProd(value.id)
      }
      else{
        this.updatePublished({user:value, published: value.published})
      }
   },*/
    cancelUserType() {
      this.userimage = null
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
    }
  },
  created() {
    this.createShell()
    this.loading = true
    console.log(this.$store)
    this.fetchUserType().then((processes) => {
      this.loading = false
    })
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
.div-3 {
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
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