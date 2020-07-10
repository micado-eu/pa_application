<template>
  <div :id="$options.name" class="q-pa-md">
    <router-link :to="'#'+$options.name">
      <h5 @click="onClickTitle()">{{$options.name}}</h5>
    </router-link>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_category in integration_category"
        :key="a_integration_category.id"
      >
        <q-item-section>{{showCategoryLabel(a_integration_category)}}</q-item-section>
        <q-item-section class="col-2 flex flex-left">
          <q-toggle
            v-model="a_integration_category.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-5 flex flex-center">
          <q-btn
            color="negative"
            label="Delete"
            size="xs"
            no-caps
            @click="deleteIntegrationCategory(a_integration_category.id)"
            unelevated rounded style="width:70px;border-radius:2px;margin-bottom:5px" 
          />
          <q-btn
            color="info"
            label="Edit"
            size="xs"
            no-caps
            @click="editIntegrationCategory(a_integration_category)"
            unelevated rounded style="width:70px;border-radius:2px" 
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn color="secondary" label="Add" @click="newIntegrationCategory()" :disable="hideAdd" />
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
        <q-input v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].title" label="Standard" />
         </q-tab-panel>
        </q-tab-panels>
        <q-btn color="accent" unelevated rounded style="width:70px;border-radius:2px" label="Save" @click="saveIntegrationCategory()" />
        <q-btn class="button" unelevated rounded style="width:70px;border-radius:2px" label="Cancel" @click="cancelIntegrationCategory()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: "IntegrationCategory",
  mixins: [editEntityMixin],
  data() {
    return {
      int_cat_shell: { id: -1,  translations:[] },
      hideForm: true,
      hideAdd: false,
      isNew: false
    };
  },
  computed: {
    integration_category() {
      return this.$store.state.integration_category.integration_category;
    }
  },
  methods: {
    onClickTitle: function() {
      this.$emit("scroll", "#" + this.$options.name);
    },
    deleteIntegrationCategory(index) {
      console.log(index);
      this.$store.dispatch(
        "integration_category/deleteIntegrationCategory",
        index
      );
    },
    showCategoryLabel (workingCat) {
     
      return workingCat.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].title
    },
    saveIntegrationCategory() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch(
            "integration_category/saveIntegrationCategory",
            this.int_cat_shell
          )
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch(
            "integration_category/editCategoryTypeElement",
            this.int_cat_shell
          )
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.createShell()
    },
    newIntegrationCategory() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelIntegrationCategory() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editIntegrationCategory(integration_category) {
      this.isNew = false;
      this.hideForm = false;
      //this.int_cat_shell = JSON.parse(JSON.stringify(integration_category));
      this.mergeCategory(integration_category)
    },
      createShell () {
      this.int_cat_shell = { id: -1,  translations: [], published: false, publicationDate: null, }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_cat_shell.translations.push({ id: -1, lang: l.lang, title: '', translationDate: null })
      });
    },
    mergeCategory (category) {
      console.log(category)
      this.int_cat_shell.id = category.id
      category.translations.forEach(tr => {
        console.log(tr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_cat_shell.translations.length; i++) {
          if (this.int_cat_shell.translations[i].lang == tr.lang) {
            this.int_cat_shell.translations.splice(i, 1);
            this.int_cat_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break;
          }
        }
      });

      console.log(this.int_cat_shell)


    },
  },
  //store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
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
  border: 1px solid #C71f40;
}
</style>
