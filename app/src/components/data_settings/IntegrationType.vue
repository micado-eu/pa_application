<template>
  <div class="q-pa-md">
    <div class="row">
    <h5 class="col-6">{{$options.name}}</h5>
    <div class="col-6" style="margin-top:40px;margin-bottom:40px; text-align:right">
     <q-btn
          color="info"
          no-caps
          :label="$t('button.add_type')"
          @click="newIntegrationType()"
          :disable="hideAdd"
          style="width:200px"
        />
  </div>
    </div>
    <q-card class="q-pa-md" :hidden="hideForm" style="margin-bottom:100px">
      
        <q-tab-panels
          v-model="langTab"
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
          <div style="font-size:16px; font-weight:600; padding-top:10px; padding-bottom:10px"> {{$t('input_labels.intervention_type')}} </div>
        <q-input 
        outlined
        filled
        dense
        v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].interventionTitle"
        :label="$t('input_labels.type_placeholder')" />
        <div style="font-size:16px; font-weight:600; padding-top:10px; padding-bottom:10px"> {{$t('input_labels.description')}} </div>
         <GlossaryEditor
        class="desc-editor"
        v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
         </q-tab-panel>
        </q-tab-panels>
        <div class="q-gutter-sm">
          <div style="font-size:16px; font-weight:600; padding-top:10px; padding-bottom:10px; padding-left:16px"> {{$t('input_labels.category_type')}} </div>
          <q-option-group
            :options="options"
            label="Notifications"
            type="radio"
            v-model="int_type_shell.categoryType"
          />
        </div>
     
           <q-card-section class="row">
              <div class="col-8">
                <div style="font-size:16px; font-weight:600"> {{$t('input_labels.publication_date')}} </div>
            <q-input
            outlined
            filled
            dense
              v-model="int_type_shell.publicationDate"
              :label="$t('input_labels.publication_date')"
              readonly
            />
            </div>
            <div class="col-4" style="padding-left:20px;">
              <div style="font-size:16px; font-weight:600"> {{$t('input_labels.is_published')}} </div>
            <q-toggle
              :value="int_type_shell.published"
              color="green"
              @input="isPublished(!int_type_shell.published,$event)"
              left-label
            />
            </div>
                  </q-card-section>

          
          
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
        <hr style="margin-left:15px;margin-right:15px;border: 1px solid #DADADA;" >
            <q-btn
          no-caps
          class="button"
          unelevated
          rounded
          style="width:100px;border-radius:2px;margin-right:15px; margin-left:10px; margin-top:30px"
          :label="$t('button.cancel')"
          @click="cancelIntegrationType()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          style="width:100px;border-radius:2px;margin-top:30px"
          :label="$t('button.save')"
          @click="saveIntegrationType()"
        />
        
        </q-card>
    <div class="row" style=" padding-bottom:10px">
    <div class="col-9 flex flex-left" style="padding-left:15px;">
      {{$t('input_labels.name')}}
    </div>
    <div class="col-1 flex flex-left">
      {{$t('input_labels.is_published')}}
    </div>
    <div class="col-1 flex flex-center" style="margin-left:0px">
      {{$t('input_labels.edit')}}
    </div> 
    <div class="col-1 flex flex-center" style="padding-left:20px">
      {{$t('input_labels.delete')}}
    </div>
      </div>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_type in integration_type"
        :key="a_integration_type.id"
      >
        <q-item-section class="col-9 flex flex-left" style="font-size:16px; font-weight:600">{{showTypeLabel(a_integration_type)}}</q-item-section>
       <q-item-section class="col-1 flex flex-left">
          <q-toggle
            v-model="a_integration_type.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
        <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click.stop="editIntegrationType(a_integration_type)" />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
        <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deleteIntegrationType(a_integration_type.id)" size="md" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      
      
    </q-card>
  </div>
</template>

<script>
import FileUploader from 'components/FileUploader'
import editEntityMixin from '../../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'

export default {
  name: "InterventionType",
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
    isPublished(value, event){
      this.int_type_shell.published = value
    },
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
      this.createShell()
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
h5 {
  font-weight: bold;
}
</style>
