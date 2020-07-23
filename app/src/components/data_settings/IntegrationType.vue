<template>
  <div class="q-pa-md">
    <h5>{{$options.name}}</h5>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_type in integration_type"
        :key="a_integration_type.id"
      >
        <q-item-section>{{showTypeLabel(a_integration_type)}}</q-item-section>
       <q-item-section class="col-5 flex flex-left">
          <q-toggle
            v-model="a_integration_type.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            color="negative"
            label="Delete"
            size="xs"
            no-caps
            @click="deleteIntegrationType(a_integration_type.id)"
            unelevated rounded style="width:70px;border-radius:2px; margin-bottom:5px"
          />
          <q-btn
            color="info"
            label="Edit"
            size="xs"
            no-caps
            @click="editIntegrationType(a_integration_type)"
            unelevated rounded style="width:70px;border-radius:2px"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn no-caps color="secondary" label="Add" unelevated rounded style="width:70px;border-radius:2px" @click="newIntegrationType()" :disable="hideAdd" />
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
        <q-input v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].interventionTitle" label="Title" />
         <GlossaryEditor
        class="desc-editor"
        v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
         </q-tab-panel>
        </q-tab-panels>
        <div class="q-gutter-sm">
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="int_type_shell.categoryType"
          />
        </div>
        <q-card class="mycard">
          
          <q-card-section>
            <q-toggle
              v-model="int_type_shell.published"
              color="green"
              label="is Published"
            />
            <q-input
              v-model="int_type_shell.publicationDate"
              label="Publication date"
              readonly
            />
          </q-card-section>
    </q-card>
   
        <q-btn no-caps color="accent" label="Save" unelevated rounded style="width:70px;border-radius:2px" @click="saveIntegrationType()" />
        <q-btn no-caps class="button" label="Cancel" unelevated rounded style="width:70px;border-radius:2px" @click="cancelIntegrationType()" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import FileUploader from 'components/FileUploader'
import editEntityMixin from '../../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'

export default {
  name: "IntegrationType",
  mixins: [editEntityMixin],
  data() {
    return {
      int_type_shell: { id: -1, translations:[], categoryType: null },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      options:[]
    };
  },
  components:{
    GlossaryEditor
  },
  computed: {
    integration_type() {
      return this.$store.state.integration_type.integration_type;
    },
    integration_category() {
      return this.$store.state.integration_category.integration_category;
    },
    
  },
  methods: {
    deleteIntegrationType(index) {
      console.log(index);
      this.$store.dispatch(
        "integration_type/deleteIntegrationTypeElement",
        index
      );
    },
    saveIntegrationType() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch(
            "integration_type/saveIntegrationTypeElement",
            this.int_type_shell
          )
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch(
            "integration_type/editIntegrationTypeElement",
            this.int_type_shell
          )
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.hideAdd = false
      this.createShell()
    },
    newIntegrationType() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelIntegrationType() {
      console.log(this.normalizedOptions)
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editIntegrationType(integration_type) {
      this.isNew = false;
      this.hideForm = false;
      //this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
      this.mergeType(integration_type)
    },
    showTypeLabel (workingType) {
     
      return workingType.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].interventionTitle
    },
    createShell () {
      this.int_type_shell = {  id: -1, translations:[], categoryType: null, published: false, publicationDate: null, }
      this.languages.forEach(l => {
        this.int_type_shell.translations.push({ id: -1, lang: l.lang, interventionTitle: '', description: '', translationDate: null })
      });
    },
    mergeType (intervention_type) {
      console.log("MERGING")
      console.log(process)
      this.int_type_shell.id = intervention_type.id
      this.int_type_shell.link = intervention_type.link
      this.int_type_shell.published = intervention_type.published
      this.int_type_shell.publicationDate = intervention_type.publicationDate
      this.int_type_shell.categoryType = intervention_type.categoryType
      this.int_type_shell.interventionProcess = intervention_type.interventionProcess
      intervention_type.translations.forEach(pr => {
        console.log(pr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_type_shell.translations.length; i++) {
          if (this.int_type_shell.translations[i].lang == pr.lang) {
            this.int_type_shell.translations.splice(i, 1);
            this.int_type_shell.translations.push(JSON.parse(JSON.stringify(pr)))
            break;
          }
        }
      });

      console.log(this.int_type_shell)


    }
  },
  //store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("integration_type/fetchIntegrationType")
      .then(processes => {
        this.loading = false;
      });
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(processes => {
        this.integration_category.forEach((cat) => {
        var translation =  cat.translations.filter((transl) => {
          return transl.lang == this.activeLanguage
        })[0]
        this.options.push({ value: translation.id, label: translation.title })
})
        this.loading = false;
      });
  }
};
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>
