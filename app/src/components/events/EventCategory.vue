<template>
  <div :id="$options.name" v-if="!loading">
    <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 30px;line-height: 41px;color:white; background-color:#FF7C44">{{$t("events.categories_title")}}</div>
    <span v-if="errorMessage">{{$t(errorMessage)}}</span>
    <upload-button
      entity="event_category"
      class="q-mt-xl q-mx-xl q-mb-md"
      @uploadSuccess="initialize()"
      @uploadError="printBatchError($event)"
    ></upload-button>
    <q-list
      bordered
      separator
      class="q-pa-sm q-mx-xl q-mb-xl element-list"
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
    <q-card
      flat
      class="my-card"
    >
      <q-card-section align="center">
        <q-btn
          no-caps
          class="q-mr-sm go-back-btn"
          outline
          :label="$t('button.go_back')"
          @click="$router.go(-1)"
        />
        <q-btn
          no-caps
          class="add-btn"
          :label="$t('button.add_category')"
          @click="newEventCategory()"
        />
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-input
          v-model="int_cat_shell.translations[0].category"
          :label="$t('input_labels.title')"
          class="q-mb-md"
          :readonly="int_cat_shell.published || (originalTranslationState !== 0)"
        />
        <div>
          <help-label
            :fieldLabel="$t('translation_states.translatable')"
            :helpLabel="$t('help.is_published')"
          ></help-label>
          <q-toggle
            v-model="add_translatable"
            color="accent"
            :disable="int_cat_shell.published || (originalTranslationState !== 0)"
            @input="changeTranslatable($event, int_cat_shell)"
          ></q-toggle>
          <br>
          <q-checkbox
            color="accent"
            v-model="linkable"
            :label="$t('input_labels.event_checkbox')"
            :readonly="int_cat_shell.published || (originalTranslationState !== 0)"
          />
        </div>
        <div align="center">
          <q-btn
            no-caps
            class="button q-mr-sm"
            unelevated
            rounded
            style="width:70px;border-radius:2px"
            :label="$t('button.cancel')"
            @click="cancelEventCategory()"
          />
          <q-btn
            no-caps
            class="add-btn"
            unelevated
            rounded
            style="width:70px;border-radius:2px"
            :label="$t('button.save')"
            @click="saveNewEventCategory()"
            :disable="int_cat_shell.published || (originalTranslationState !== 0)"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import HelpLabel from '../HelpLabel'
import { mapActions, mapGetters } from 'vuex'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'
import UploadButton from 'components/UploadButton'

export default {
  name: 'EventCategory',
  mixins: [
    translatedButtonMixin
  ],
  data() {
    return {
      int_cat_shell: { id: -1, translations: [] },
      hideForm: true,
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
    'upload-button': UploadButton
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
      this.hideForm = true
      this.createShell()
    },
    newEventCategory() {
      this.originalTranslationState = 0
      this.linkable = false
      this.add_translatable = false
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelEventCategory() {
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      this.linkable = false
      this.add_translatable = false
    },
    editEventCategory(event_category) {
      this.isNew = false
      this.hideForm = false
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
              const translation = ec.translations.filter(this.translationFilter)[0]
              this.availableTranslations[ec.id] = ec.translations
                .filter((t) => t.translated && (new Date(t.translationDate) >= new Date(translation.translationDate)))
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
a {
  text-decoration: none;
  color: #000000;
}
.button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
.element-list {
  overflow-y: scroll;
  max-height: 75vh;
}
.category-title {
  font-weight: 600;
  font-family: "Nunito";
}
.add-btn {
  color: white;
  background-color: #0b91ce;
}
.go-back-btn {
  color: #9e1f63;
}
</style>
