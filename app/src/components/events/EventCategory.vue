<template>
  <div :id="$options.name" v-if="!loading">
    <span v-if="errorMessage">{{$t(errorMessage)}}</span>
    <div class="justify-center row q-py-md">
      <div class="col-11 justify-center items-center row">
        <q-btn
          class="add-btn col-shrink q-px-lg"
          no-caps
          :label="$t('button.add_category')"
          @click="newEventCategory()"
        />
        <upload-button
          entity="event_category"
          class="col"
          @uploadSuccess="initialize()"
          @uploadError="printBatchError($event)"
        ></upload-button>
      </div>
      <div class="col-shrink row justify-center items-center">
        <q-btn
          class="go-back-btn"
          icon="img:statics/icons/Icon - Events (30x30).svg"
          @click="$router.go(-1)"
        >
        </q-btn>
      </div>
    </div>
    <hr>
    <q-list
      separator
      class="element-list"
    >
      <q-item
        clickable
        v-ripple
        v-for="(a_event_category, index) in eventCategories"
        :key="a_event_category.id"
      >
        <q-item-section>
          <span class="category-title">{{showCategoryLabel(a_event_category)}}</span>
          <br/>
          <div
            style="display: inline"
            v-if="availableTranslations[a_event_category.id]"
          >
            <span>
              {{ $t("input_labels.available_transl") }}:
            </span>
            <span 
              v-if="availableTranslations[a_event_category.id].length > 0"
            >
              <q-chip
                v-for="availableLang in availableTranslations[a_event_category.id]"
                :key="availableLang"
                >{{ availableLang }}
              </q-chip>
            </span>
            <span 
              v-else
            >
              <span>{{ $t("input_labels.no_available_transl") }}</span>
            </span>
          </div>
        </q-item-section>
        <q-item-section side>{{getTranslationStateText(a_event_category.translations.filter(translationFilter)[0].translationState)}}</q-item-section>
        <q-item-section
          side
          class="icon_btn_section"
        >
          <q-toggle
            v-model="a_event_category.published"
            color="accent"
            @input="showWarningPublish($event, a_event_category.id, index)"
            :disable="!a_event_category.translations.filter(translationFilter)[0].translationState"
          />
        </q-item-section>
        <q-item-section
          side
          class="icon_btn_section"
        >
          <q-btn
            no-caps
            unelevated
            round
            class="item-btn"
            icon="img:statics/icons/Icon - edit - orange (600x600).png"
            @click="editEventCategory(a_event_category)"
          />
        </q-item-section>
        <q-item-section
          side
          class="icon_btn_section"
        >
          <q-btn
            no-caps
            unelevated
            round
            class="item-btn"
            icon="img:statics/icons/Icon - Delete - magenta (600x600).png"
            @click="deleteOldEventCategory(a_event_category.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog 
      v-model="hideForm"
      class="dialog-full"
    >
      <div class="dialog-container">
        <div class="row justify-end">
          <q-btn class="col-shrink" icon="close" size="md" color="purple-8" flat round dense v-close-popup></q-btn>
        </div>
        <q-card
          flat
          class="dialog-card"
        >
          <q-card-section>
            <div class="q-mb-md">
              <help-label
                class="q-mb-sm"
                :fieldLabel="$t('input_labels.category') + ' *'"
                :helpLabel="$t('help.event_category')"
              ></help-label>
              <q-input
                outlined
                bg-color="grey-3"
                v-model="int_cat_shell.translations[0].category"
                class=""
                :readonly="int_cat_shell.published || (originalTranslationState !== 0)"
              />
            </div>
            <div class="row items-center q-mb-md">
              <help-label
                class="col-9 items-center"
                :fieldLabel="$t('input_labels.event_checkbox')"
                :helpLabel="$t('help.linkable_integration_plan')"
              ></help-label>
              <q-checkbox
                class="q-pt-sm"
                color="accent"
                v-model="linkable"
                :disable="int_cat_shell.published || (originalTranslationState !== 0)"
              />
            </div>
            <div class="row items-center">
              <help-label
                class="col-4 items-center"
                :fieldLabel="$t('translation_states.translatable')"
                :helpLabel="$t('help.is_published')"
              ></help-label>
              <q-toggle
                v-model="add_translatable"
                class="col items-center q-pt-sm"
                color="accent"
                :disable="int_cat_shell.published || (originalTranslationState !== 0)"
                @input="changeTranslatable($event, int_cat_shell)"
              ></q-toggle>
            </div>
          </q-card-section>
        </q-card>
        <div 
          align="center"
          class="btn-dialog-div"
        >
          <q-btn
            no-caps
            class="cancel-btn q-mr-lg q-px-md"
            unelevated
            :label="$t('button.cancel')"
            @click="cancelEventCategory()"
          />
          <q-btn
            no-caps
            class="save-btn q-px-md"
            unelevated
            :label="$t('button.save')"
            @click="saveNewEventCategory()"
            :disable="int_cat_shell.published || (originalTranslationState !== 0)"
          />
        </div>
      </div>
    </q-dialog>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import HelpLabel from '../HelpLabel'
import { mapActions, mapGetters } from 'vuex'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'
import UploadButtonInversed from 'components/UploadButtonInversed'

export default {
  name: 'EventCategory',
  mixins: [
    translatedButtonMixin
  ],
  data() {
    return {
      int_cat_shell: { id: -1, translations: [] },
      hideForm: false,
      hideAdd: false,
      isNew: false,
      linkable: false,
      errorMessage: '',
      disabledDelete: [],
      add_translatable: false,
      availableTranslations: {},
      originalTranslationState: 0,
      loading: false
    }
  },
  components: {
    'help-label': HelpLabel,
    'upload-button': UploadButtonInversed
  },
  computed: {
    ...mapGetters('event_category', ['eventCategories', 'eventCategoryById']),
    ...mapGetters('event', ['event'])
  },

  methods: {
    ...mapActions('event_category', [
      'deleteEventCategory',
      'saveEventCategory',
      'editCategoryTypeElement',
      'fetchEventCategory',
      'updatePublished',
      'deleteProdTranslations',
      'saveEventCategoryTranslationProd',
      'updateEventCategoryTranslation'
    ]),
    ...mapActions('event', ['fetchEvent']),
    onClickTitle() {
      this.$emit('scroll', `#${this.$options.name}`)
    },
    deleteOldEventCategory(index) {
      if (this.disabledDelete.includes(index)) {
        this.errorMessage = 'events.categories_error'
      } else {
        this.deleteEventCategory(index)
          .catch(() => {
            this.errorMessage = 'events.categories_error'
          })
      }
    },
    showCategoryLabel(workingCat) {
      if (workingCat.translations) {
        return workingCat.translations.filter(this.translationFilter)[0].category
      }
    },
    saveNewEventCategory() {
      const content = { link_integration_plan: this.linkable, ...this.int_cat_shell }
      if (this.isNew) {
        content.translations[1] = Object.assign({}, content.translations[0])
        content.translations[1].translated = true
        // we are adding a new instance
        this.saveEventCategory(
          content
        ).then((ec) => {
          this.availableTranslations[ec.id] = [this.$defaultLang]
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while saving event category: ${err}`
          })
        })
      } else {
        // we are updating the exsisting
        this.editCategoryTypeElement(
          content
        ).then(() => {
          this.availableTranslations[content.id] = [this.$defaultLang]
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while saving event category: ${err}`
          })
        })
      }
      // Cleanup
      this.originalTranslationState = 0
      this.linkable = false
      this.add_translatable = false
      this.hideForm = false
      this.createShell()
    },
    newEventCategory() {
      this.originalTranslationState = 0
      this.linkable = false
      this.add_translatable = false
      this.isNew = true
      this.hideForm = true
      this.hideAdd = true
    },
    cancelEventCategory() {
      this.isNew = false
      this.hideForm = false
      this.hideAdd = false
      this.linkable = false
      this.add_translatable = false
      this.createShell()
    },
    editEventCategory(event_category) {
      this.isNew = false
      this.hideForm = true
      this.linkable = event_category.link_integration_plan
      this.add_translatable = !event_category.translations.filter(this.translationFilter)[0].translationState
      this.originalTranslationState = event_category.translations.filter(this.translationFilter)[0].translationState
      // this.int_cat_shell = JSON.parse(JSON.stringify(event_category));
      this.mergeCategory(event_category)
    },
    createShell() {
      this.int_cat_shell = { id: -1, translations: [] }
      this.int_cat_shell.translations.push({
        id: -1, lang: this.$defaultLang, translated: false, category: '', translationDate: null, translationState: 0
      })
    },
    mergeCategory(category) {
      this.int_cat_shell.id = category.id
      const defaultTranslations = category.translations.filter(t => t.lang === this.$defaultLang)
      this.int_cat_shell.translations[0] = Object.assign({}, defaultTranslations.filter(t => !t.translated)[0])
      if (this.int_cat_shell.translations[0].translationState === 1) {
        this.int_cat_shell.translations[1] = Object.assign({}, defaultTranslations.filter(t => t.translated)[0])
      }
      this.add_translatable = this.int_cat_shell.translations[0].translationState === 1
      this.linkable = category.link_integration_plan
    },
    showWarningPublish(event, id, idx) {
      if (event == true) {
        this.$q.notify({
          type: 'warning',
          timeout: 0,
          message: this.$t("lists.publish_warning"),
          actions: [
            {
              label: this.$t("lists.yes"), color: 'accent', handler: () => {
                Promise.all([
                  this.saveEventCategoryTranslationProd(id).catch((err) => {
                    this.$q.notify({
                      type: 'negative',
                      message: `Error while saving event category production translation: ${err}`
                    })
                  }),
                  this.updatePublished({ id, published: true }).catch((err) => {
                    this.$q.notify({
                      type: 'negative',
                      message: `Error while updating published state: ${err}`
                    })
                  })
                ]).then(() => console.log("published"))
              }
            },
            {
              label: this.$t("lists.no"), color: 'red', handler: () => {
               this.eventCategoryById(id).published = false
              }
            }
          ]
        })

      }
      else {
        this.$q.notify({
          type: 'warning',
          message: this.$t("lists.unpublish_warning"),
          actions: [
            {
              label: this.$t("lists.yes"), color: 'accent', handler: () => {
                let ecElem = this.eventCategoryById(id)
                let promises = []
                const translation = Object.assign({}, ecElem.translations.filter(t => !t.translated)[0])
                translation.translationState = 0
                promises.push(
                  this.updateEventCategoryTranslation(translation).catch((err) => {
                    this.$q.notify({
                      type: 'negative',
                      message: `Error while saving event translation: ${err}`
                    })
                  })
                )
                promises.push(
                  this.deleteProdTranslations(id).catch((err) => {
                    this.$q.notify({
                      type: 'negative',
                      message: `Error while deleting event production translations: ${err}`
                    })
                  }),
                  this.updatePublished({ id, published: false }).catch((err) => {
                    this.$q.notify({
                      type: 'negative',
                      message: `Error while updating published state: ${err}`
                    })
                  })
                )
                Promise.all(promises).then(() => console.log("unpublished"))
              }
            },
            {
              label: this.$t("lists.no"), color: 'red', handler: () => {
                this.eventCategoryById(id).published = true
              }
            }
          ]
        })

      }
    },
    translationFilter(translation) {
      return !translation.translated && (translation.lang === this.$defaultLang)
    },
    getTranslationStateText(translationStateNumber) {
      switch (translationStateNumber) {
        case 0: return this.$t("translation_states.editing")
        case 1: return this.$t("translation_states.translatable")
        case 2: return this.$t("translation_states.translating")
        case 3: return this.$t("translation_states.translated")
        default: return this.$t("translation_states.unknown")
      }
    },
    changeTranslatable(event, int_cat_shell) {
      int_cat_shell.translations[0].translationState = event ? 1 : 0
    },
    initialize() {
      this.loading = true
      this.createShell()
      this.fetchEventCategory()
        .then((processes) => {
          this.fetchEvent().then(() => {
            for (const inf of this.event) {
              if (!this.disabledDelete.includes(inf.category)) {
                this.disabledDelete.push(inf.category)
              }
            }
            for (const ec of this.eventCategories) {
              this.availableTranslations[ec.id] = ec.translations
                .filter((t) => t.translated)
                .map((t) => t.lang)
            }
            this.loading = false
          }).catch((err) => {
            console.error(err)
            this.$q.notify({
              type: 'negative',
              message: `Error while fetching events: ${err}`
            })
          })
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while fetching event categories: ${err}`
          })
        })
    },
    printBatchError(error) {
      this.$q.notify({
        type: 'negative',
        message: `Error while uploading: ${error}`
      })
    }
  },
  // store.commit('increment', 10)
  created() {
    this.initialize()
  }
}
</script>
<style scoped>
.cancel-btn {
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 16px;
  border: 1px solid #c71f40;
}
.element-list {
  padding-left: 245px;
  padding-right: 245px;
  padding-top: 75px;
}
.category-title {
  font-weight: 600;
  font-family: "Nunito";
}
.add-btn {
  color: white;
  background-color: #0b91ce;
}
.save-btn {
  color: white;
  background-color: #0F3A5D;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #0F3A5D;
}
.go-back-btn {
  color: white;
  background-color: #0F3A5D;
}
.dialog-container {
  background-color: white;
  width: 800px;
  max-width: 85vw;
}
.dialog-card {
  border: 1px solid #DADADA;
  border-radius: 5px;
  margin-left: 125px;
  margin-right: 125px;
  margin-top: 84px;
  padding-right: 75px;
  padding-left: 75px;
  padding-top: 60px;
  padding-bottom: 60px;
}
.btn-dialog-div {
  margin-top: 30px;
  margin-bottom: 136px;
}
</style>
