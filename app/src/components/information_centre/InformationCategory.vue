<template>
  <div
    :id="$options.name"
    class="q-pa-md"
  >
    <router-link :to="'#'+$options.name">
      <h5 @click="onClickTitle()">Information centre categories</h5>
    </router-link>
    <span v-if="errorMessage">{{errorMessage}}</span>
    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="a_information_category in information_category"
        :key="a_information_category.id"
      >
        <q-item-section>{{showCategoryLabel(a_information_category)}}</q-item-section>
        <q-item-section class="col-5 flex flex-center">
          <q-btn
            color="negative"
            label="Delete"
            size="xs"
            no-caps
            @click="deleteInformationCategory(a_information_category.id)"
            unelevated
            rounded
            style="width:70px;border-radius:2px;margin-bottom:5px"
          />
          <q-btn
            color="info"
            label="Edit"
            size="xs"
            no-caps
            @click="editInformationCategory(a_information_category)"
            unelevated
            rounded
            style="width:70px;border-radius:2px"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn
          color="secondary"
          label="Add"
          @click="newInformationCategory()"
          :disable="hideAdd"
        />
      </q-card-section>
      <q-card-section :hidden="hideForm">
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
            <q-input
              v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].eventCategory"
              label="Event"
            />
          </q-tab-panel>
        </q-tab-panels>
        <div>
          <q-checkbox
            color="accent"
            v-model="linkable"
            label="Linkable to an integration plan?"
          />
        </div>
        <q-btn
          color="accent"
          unelevated
          rounded
          style="width:70px;border-radius:2px"
          label="Save"
          @click="saveInformationCategory()"
        />
        <q-btn
          class="button"
          unelevated
          rounded
          style="width:70px;border-radius:2px"
          label="Cancel"
          @click="cancelInformationCategory()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: "InformationCategory",
  mixins: [editEntityMixin],
  data() {
    return {
      int_cat_shell: { id: -1, translations: [] },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      linkable: false,
      errorMessage: ""
    };
  },
  computed: {
    information_category() {
      return this.$store.state.information_category.information_category;
    }
  },
  methods: {
    onClickTitle: function () {
      this.$emit("scroll", "#" + this.$options.name);
    },
    deleteInformationCategory(index) {
      this.$store.dispatch(
        "information_category/deleteInformationCategory",
        index
      ).catch(() => {
        this.errorMessage = "Cannot delete a category when an item has this category"
      });
    },
    showCategoryLabel(workingCat) {

      return workingCat.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].eventCategory
    },
    saveInformationCategory() {

      let content = { content: this.int_cat_shell, link_integration_plan: this.linkable }
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch(
            "information_category/saveInformationCategory",
            content
          )
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch(
            "information_category/editCategoryTypeElement",
            content
          )
      }
      this.linkable = false
      this.hideForm = true;
      this.createShell()
    },
    newInformationCategory() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelInformationCategory() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
      this.linkable = false
    },
    editInformationCategory(information_category) {
      this.isNew = false;
      this.hideForm = false;
      this.linkable = information_category.link_integration_plan
      //this.int_cat_shell = JSON.parse(JSON.stringify(information_category));
      this.mergeCategory(information_category)
    },
    createShell() {
      this.int_cat_shell = { id: -1, translations: [] }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_cat_shell.translations.push({ id: -1, lang: l.lang, eventCategory: '', translationDate: null })
      });
    },
    mergeCategory(category) {
      this.int_cat_shell.id = category.id
      category.translations.forEach(tr => {
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_cat_shell.translations.length; i++) {
          if (this.int_cat_shell.translations[i].lang == tr.lang) {
            this.int_cat_shell.translations.splice(i, 1);
            this.int_cat_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break;
          }
        }
      });

    },
  },
  //store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true;
    this.$store
      .dispatch("information_category/fetchInformationCategory")
      .then(processes => {
        this.loading = false;
      });

  }
};
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
</style>