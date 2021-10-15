<template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">{{ $t("data_settings.intervention_types") }}</h5>
      <div class="col-6 div-1">
        <q-btn
          :data-cy="'addtype'"
          color="info"
          no-caps
          :label="$t('button.add_type')"
          @click="newIntegrationType()"
          :disable="hideAdd"
          class="add-button"
        />
      </div>
    </div>
    <q-card class="q-pa-md div-2" :hidden="hideForm">
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class=""
      >
        <HelpLabel
          :fieldLabel="$t('input_labels.intervention_type')"
          :helpLabel="$t('help.intervention_type')"
          class="div-3"
        />
        <q-input
          counter
          ref="type_title"
          :hint="$t('input_labels.required')"
          maxlength="100"
          :rules="[
            (val) => val.length <= 100 || 'Please use maximum 100 characters',
            (val) => !!val || 'Field is required',
          ]"
          outlined
          filled
          dense
          :readonly="
            !(
              int_type_shell.translations.filter(
                (top) => top.translated == false
              )[0].translationState == 0 && int_type_shell.published == false
            )
          "
          v-model="
            int_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].interventionTitle
          "
          :label="$t('input_labels.type_placeholder')"
        />
        <HelpLabel
          :fieldLabel="$t('input_labels.description')"
          :helpLabel="$t('help.intervention_type_description')"
          class="div-3"
          style="padding-top: 10px"
        />
        <GlossaryEditor
          class="desc-editor"
          :readonly="
            !(
              int_type_shell.translations.filter(
                (top) => top.translated == false
              )[0].translationState == 0 && int_type_shell.published == false
            )
          "
          v-model="
            int_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].description
          "
          :lang="int_type_shell.translations.filter(
              (top) => top.translated == false
            )[0].lang"
          ref="editor"
        />
        <div class="q-gutter-sm">
          <HelpLabel
            :fieldLabel="$t('input_labels.category_type')"
            :helpLabel="$t('help.intervention_category_type')"
            class="div-4"
            style="padding-top: 10px"
          />
          <q-select
            filled
            :rules="[(val) => !!val || 'Field is required']"
            ref="category_type"
            :hint="$t('input_labels.required')"
            :readonly="int_type_shell.published"
            clearable
            v-model="int_type_shell.categoryType"
            emit-value
            map-options
            id="select"
            :options="options"
            :label="$t('input_labels.category_type')"
          />
        </div>
        <div class="q-gutter-sm">
          <HelpLabel
            :fieldLabel="$t('input_labels.integration_type_validators')"
            :helpLabel="$t('help.integration_type_validators')"
            class="div-4"
            style="padding-top: 10px"
          />
          <q-select
            filled
            :lazy-rules="true"
            :rules="[(val) => val.length > 0 || 'Field is required']"
            ref="validators"
            :hint="$t('input_labels.required')"
            clearable
            :readonly="int_type_shell.published"
            multiple
            v-model="int_type_shell.interventionTypeValidators"
            emit-value
            map-options
            id="select"
            :options="validatorsOptions"
            :label="$t('input_labels.integration_type_validators')"
          />
        </div>
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
            v-model="int_type_shell.published"
            color="accent"
            :disable="int_type_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event,int_type_shell.id)"
          />-->
            <q-toggle
              :value="
                int_type_shell.translations.filter(
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
          :data-cy="'canceltype'"
          no-caps
          class="delete-button"
          unelevated
          rounded
          :label="$t('button.cancel')"
          type="reset"
          @click="cancelIntegrationType()"
        />
        <q-btn
          :data-cy="'savetype'"
          no-caps
          :disable="int_type_shell.published"
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
      <q-item-section class="col-7 flex flex-left">
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
      <div
        v-for="a_integration_type in intervention_types"
        :key="a_integration_type.id"
      >
        <q-item>
          <q-item-section class="col-7 flex flex-left">{{
            showTypeLabel(a_integration_type)
          }}</q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-toggle
              v-model="a_integration_type.published"
              color="accent"
              :disable="
                a_integration_type.translations.filter((top) => top.translated == false)[0]
                  .translationState != 1
              "
              @input="isPublished($event, a_integration_type.id)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ getTranslationState(a_integration_type.id) }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'edittype'.concat(a_integration_type.id)"
              name="img:statics/icons/Edit.png"
              size="md"
              @click.stop="editIntegrationType(a_integration_type)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-icon
              :data-cy="'deletetype'.concat(a_integration_type.id)"
              name="img:statics/icons/Icon - Delete.svg"
              @click.stop="deletingIntegrationType(a_integration_type.id)"
              size="md"
            />
          </q-item-section>
        </q-item>
        <div class="row pad">
          <p style="padding-top: 8px; margin-bottom: 0px; padding-left: 15px">
            {{ $t("input_labels.available_transl") }}:
          </p>
          <q-chip
          style="background-color:#C4C4C4" text-color="white"
            v-for="lang in a_integration_type.translations.filter((lang) => {
              return lang.interventionTitle.length > 1 && lang.translated == true;
            })"
            :key="lang.lang"
            >{{ lang.lang.toUpperCase() }}</q-chip
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
import GlossaryEditor from "components/GlossaryEditor"
import editEntityMixin from "../../mixin/editEntityMixin"
import storeMappingMixin from "../../mixin/storeMappingMixin"
import translatedButtonMixin from "../../mixin/translatedButtonMixin"
import HelpLabel from "../HelpLabel"

export default {
  name: "InterventionType",
  mixins: [
    editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        intervention_types: "integration_type/intervention_types",
        intervention_categories:
          "integration_category/intervention_categories_published",
        tenants: "tenant/tenants"
      },
      actions: {
        deleteIntegrationTypeElement:
          "integration_type/deleteIntegrationTypeElement",
        saveIntegrationTypeElement:
          "integration_type/saveIntegrationTypeElement",
        editIntegrationTypeElement:
          "integration_type/editIntegrationTypeElement",
        fetchIntegrationType: "integration_type/fetchIntegrationType",
        fetchIntegrationCategory:
          "integration_category/fetchIntegrationCategory",
        fetchTenants: "tenant/fetchTenants",
        updatePublished: "integration_type/updatePublished",
        saveTranslationProd: "integration_type/saveTranslationProd",
        deleteTranslationProd: "integration_type/deleteTranslationProd"
      }
    })
  ],
  data() {
    return {
      int_type_shell: { id: -1, translations: [], categoryType: null },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      options: [],
      validatorsOptions: [],
      publishedOrig: false
    }
  },
  components: {
    GlossaryEditor,
    HelpLabel
  },
  methods: {
    makeTranslatable(value) {
      console.log(value)
      if (value) {
        this.int_type_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.int_type_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    getTranslationState(id) {
      var cate = this.intervention_types.filter((cat) => {
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
      console.log(this.$refs.validators)
      console.log(this.$refs.validators.hasError)
      this.$refs.category_type.validate()
      this.$refs.validators.validate()
      this.$refs.type_title.validate()
      if (
        this.$refs.type_title.hasError ||
        this.$refs.validators.hasError ||
        this.$refs.category_type.hasError
      ) {
        this.formHasError = true
        this.$q.notify({
          color: "negative",
          message: this.$t("warning.req_fields")
        })
        return false
      } else {
        console.log("in else of submit")
        this.savingIntegrationType()
        this.onReset()
      }
    },
    onReset() {
      this.$refs.type_title.validate()
      this.$refs.category_type.validate()
      this.$refs.validators.validate()

      this.$refs.type_title.resetValidation()
      this.$refs.category_type.resetValidation()
      this.$refs.validators.resetValidation()
    },
    isPublished(event, value) {
      console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_type_temp = this.intervention_types.filter((type) => {
        return type.id == value
      })[0]
      var publishing_type = JSON.parse(JSON.stringify(publishing_type_temp))
      if (event == true) {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.publish_intervention_type"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  type: publishing_type,
                  published: event
                })
                this.saveTranslationProd(value)
                this.cancelIntegrationType()
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.intervention_types.filter((topic) => {
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
          message: this.$t("warning.unpublish_intervention_type"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  type: publishing_type,
                  published: event
                })
                this.deleteTranslationProd(value)
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.intervention_types.filter((topic) => {
                  return topic.id == value
                })[0].published = true
              }
            }
          ]
        })
      }
    },
    deletingIntegrationType(index) {
      this.$q.notify({
        type: "warning",
        timeout: 0,
        message: this.$t("warning.delete_intervention_type"),
        actions: [
          {
            label: this.$t("button.delete"),
            color: "red",
            handler: () => {
              console.log(index)
              this.deleteIntegrationTypeElement(index)
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
    savingIntegrationType() {
      if (this.isNew) {
        // we are adding a new instance
        this.int_type_shell.translations.push({
          id: -1,
          lang: this.activeLanguage,
          interventionTitle: this.int_type_shell.translations[0]
            .interventionTitle,
          description: this.int_type_shell.translations[0].description,
          translationDate: null,
          translationState: this.int_type_shell.translations[0]
            .translationState,
          translated: true
        })
        //}
        this.int_type_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        this.saveIntegrationTypeElement(this.int_type_shell).then((int_cat) => {
          console.log("saved")
        })
      } else {
        if (this.int_type_shell.translations[0].translationState == 1) {
          console.log(this.int_type_shell)
          this.int_type_shell.translations.push({
            id: this.int_type_shell.id,
            lang: this.activeLanguage,
            interventionTitle: this.int_type_shell.translations[0]
              .interventionTitle,
            description: this.int_type_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        // we are updating the exsisting
        this.editIntegrationTypeElement(this.int_type_shell).then((int_cat) => {
          console.log("updated")
        })
      }
      this.hideForm = true
      this.hideAdd = false
      this.createShell()
    },
    newIntegrationType() {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelIntegrationType() {
      this.onReset()
      console.log(this.normalizedOptions)
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      this.createShell()
    },
    editIntegrationType(integration_type) {
      if(integration_type.published){
                 this.$q.notify({
        message: this.$t('warning.published_edit'),
        color: 'red'
      })
      }
      else{
              this.isNew = false
      this.hideForm = false
      this.hideAdd = true
      // this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
      this.mergeType(integration_type)
      this.publishedOrig = integration_type.published
      }
    },
    showTypeLabel(workingType) {
      return workingType.translations.filter(
        this.filterTranslationModel(this.activeLanguage)
      )[0].interventionTitle
    },
    createShell() {
      this.int_type_shell = {
        id: -1,
        translations: [],
        categoryType: null,
        interventionTypeValidators: [],
        published: false
      }
      this.int_type_shell.translations.push({
        id: -1,
        lang: this.activeLanguage,
        interventionTitle: "",
        description: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
    },
    mergeType(intervention_type) {
      console.log("MERGING")
      console.log(process)
      this.int_type_shell.id = intervention_type.id
      this.int_type_shell.link = intervention_type.link
      this.int_type_shell.published = intervention_type.published
      // this.int_type_shell.published = intervention_type.published
      // this.int_type_shell.publicationDate = intervention_type.publicationDate
      this.int_type_shell.categoryType = intervention_type.categoryType
      //      this.int_type_shell.interventionTypeValidators = intervention_type.interventionTypeValidators
      //     const validators = []
      if (intervention_type.interventionTypeValidators) {
        intervention_type.interventionTypeValidators.forEach((v) => {
          this.int_type_shell.interventionTypeValidators.push(v.tenantId)
        })
        //      console.log('validators')
        //     console.log(validators)
        //     this.int_type_shell.interventionTypeValidators = [3]
        console.log(this.int_type_shell.interventionTypeValidators)
      }
      this.int_type_shell.interventionProcess =
        intervention_type.interventionProcess
      this.int_type_shell.translations = [
        intervention_type.translations.filter((top) => {
          return top.lang == this.activeLanguage && top.translated == false
        })[0]
      ]
      console.log("checking the merge")

      console.log(this.int_type_shell)
    }
  },

  created() {
    this.createShell()
    this.loading = true
    console.log(this.$store)
    this.fetchIntegrationType().then((processes) => {
      this.loading = false
    })
    this.fetchIntegrationCategory().then((processes) => {
      this.intervention_categories.forEach((cat) => {
        const translation = cat.translations.filter(
          (transl) => transl.lang == this.activeLanguage
        )[0]
        this.options.push({ value: translation.id, label: translation.title })
      })
      this.loading = false
    })
    this.fetchTenants().then((tenants) => {
      this.tenants.forEach((tenant) => {
        this.validatorsOptions.push({ value: tenant.id, label: tenant.name })
      })
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
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
}
.div-5 {
  font-size: 16px;
  font-weight: 600;
}
.div-6 {
  padding-left: 20px;
}
.div-7 {
  padding-bottom: 10px;
}
.div-8 {
  padding-left: 15px;
}
.div-9 {
  margin-left: 0px;
}
.div-10 {
  padding-left: 20px;
}
.section {
  font-size: 16px;
  font-weight: 600;
}
#icon {
  margin-right: 10px;
}
</style>
