<template>
  <div :id="$options.name">
    <div style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 30px;line-height: 41px;color:white; background-color:#FF7C44">{{$t("events.categories_title")}}</div>
    <span v-if="errorMessage">{{$t(errorMessage)}}</span>
    <q-list
      bordered
      separator
      class="q-pa-sm q-ma-xl element-list"
    >
      <q-item
        clickable
        v-ripple
        v-for="a_event_category in eventCategories"
        :key="a_event_category.id"
      >
        <q-item-section class="category-title">{{showCategoryLabel(a_event_category)}}</q-item-section>
        <q-item-section
          side
          class="icon_btn_section"
        >
          <q-toggle
            v-model="a_event_category.published"
            color="green"
            @input="updatePublishedCat($event, a_event_category.id)"
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
        <q-tabs
          v-model="langTab"
          dense
          class="text-grey"
          active-color="black"
          indicator-color="black"
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
            <q-input
              v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].category"
              :label="$t('input_labels.event')"
            />
          </q-tab-panel>
        </q-tab-panels>
        <div>
          <help-label
            :fieldLabel="$t('input_labels.is_published')"
            :helpLabel="$t('help.is_published')"
          ></help-label>
          <q-toggle
            v-model="add_published"
            color="green"
          ></q-toggle>
          <br>
          <q-checkbox
            color="accent"
            v-model="linkable"
            :label="$t('input_labels.event_checkbox')"
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
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'
import HelpLabel from '../HelpLabel'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EventCategory',
  mixins: [editEntityMixin],
  data() {
    return {
      int_cat_shell: { id: -1, translations: [] },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      linkable: false,
      errorMessage: '',
      disabledDelete: [],
      add_published: false
    }
  },
  components: {
    'help-label': HelpLabel
  },
  computed: {
    ...mapGetters('event_category', ['eventCategories']),
    ...mapGetters('event', ['event'])
  },

  methods: {
    ...mapActions('event_category', [
      'deleteEventCategory',
      'saveEventCategory',
      'editCategoryTypeElement',
      'fetchEventCategory',
      'updatePublished'
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
        return workingCat.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].category
      }
    },
    saveNewEventCategory() {
      const content = { link_integration_plan: this.linkable, published: this.add_published, ...this.int_cat_shell }
      if (this.isNew) {
        // we are adding a new instance
        this.saveEventCategory(
          content
        )
      } else {
        // we are updating the exsisting
        this.editCategoryTypeElement(
          content
        )
      }
      this.linkable = false
      this.add_published = false
      this.hideForm = true
      this.createShell()
    },
    newEventCategory() {
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelEventCategory() {
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      this.add_published = false
      this.linkable = false
    },
    editEventCategory(event_category) {
      this.isNew = false
      this.hideForm = false
      this.linkable = event_category.link_integration_plan
      this.add_published = event_category.published
      // this.int_cat_shell = JSON.parse(JSON.stringify(event_category));
      this.mergeCategory(event_category)
    },
    createShell() {
      this.int_cat_shell = { id: -1, translations: [] }
      this.languages.forEach((l) => {
        //       console.log(l)
        this.int_cat_shell.translations.push({
          id: -1, lang: l.lang, category: '', translationDate: null
        })
      })
    },
    mergeCategory(category) {
      this.int_cat_shell.id = category.id
      category.translations.forEach((tr) => {
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (let i = 0; i < this.int_cat_shell.translations.length; i++) {
          if (this.int_cat_shell.translations[i].lang == tr.lang) {
            this.int_cat_shell.translations.splice(i, 1)
            this.int_cat_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break
          }
        }
      })
    },
    updatePublishedCat(value, id) {
      this.updatePublished({ id, published: value })
    }
  },
  // store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true
    this.fetchEventCategory()
      .then((processes) => {
        this.fetchEvent().then(() => {
          for (const inf of this.event) {
            if (!this.disabledDelete.includes(inf.category)) {
              this.disabledDelete.push(inf.category)
            }
          }
          this.loading = false
        })
      })
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
