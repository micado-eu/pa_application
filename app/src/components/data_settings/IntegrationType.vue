<template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">{{$options.name}}</h5>
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
    <q-card
      class="q-pa-md div-2"
      :hidden="hideForm"
    >

      <q-tab-panels
        v-model="langTab"
        class="bg-grey-2 inset-shadow "
        animated
      >
        <q-tab-panel
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
        >
        <HelpLabel
          :fieldLabel="$t('input_labels.intervention_type')"
          :helpLabel ="$t('help.intervention_type')"
          class=" div-3"
          />
          <q-input
            counter
            maxlength="100"
            :rules="[ val => val.length <= 100 || 'Please use maximum 100 characters']"
            outlined
            filled
            dense
            :readonly="!(int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
            v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].interventionTitle"
            :label="$t('input_labels.type_placeholder')"
          />
          <HelpLabel
          :fieldLabel="$t('input_labels.description')"
          :helpLabel ="$t('help.intervention_type_description')"
          class=" div-3"
          style="padding-top:10px"
          />
          <GlossaryEditor
            class="desc-editor"
            :readonly="!(int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
            v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
            :lang="language.lang"
            ref="editor"
          />
          <div>
            <TranslateStateButton
              v-model="int_type_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState"
              :isForDefaultLanguage="language.lang===activeLanguage"
              :objectId="int_type_shell.id"
              :readonly="!(language.lang===activeLanguage)"
              @micado-change="(id) => {changeTranslationState(int_type_shell, id.state)}"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        v-model="langTab"
        dense
        class="bg-grey-2"
        active-color="accent"
        indicator-color="accent"
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
       
      <div class="q-gutter-sm">
        <HelpLabel
          :fieldLabel="$t('input_labels.category_type')"
          :helpLabel ="$t('help.intervention_category_type')"
          class=" div-4"
          style="padding-top:10px"
          />
        <q-select
          filled
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
          :helpLabel ="$t('help.integration_type_validators')"
          class=" div-4"
          style="padding-top:10px"
          />
        <q-select
          filled
          clearable
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
        <div class="col-2" style="min-width:130px; max-width:130px">
          <HelpLabel
            :fieldLabel="$t('input_labels.is_published')"
            :helpLabel ="$t('help.is_published')"
            style="padding-left:17px"
          />
        </div>
        <div class="col" style="padding-top:2px">
          <q-toggle
            v-model="int_type_shell.published"
            color="green"
            :disable="int_type_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
          />
        </div>
      </div>
      <hr id="hr">
      <q-btn
      :data-cy="'canceltype'"
        no-caps
        class="delete-button"
        unelevated
        rounded
        :label="$t('button.cancel')"
        @click="cancelIntegrationType()"
      />
      <q-btn
      :data-cy="'savetype'"
        no-caps
        color="accent"
        unelevated
        rounded
        class="button"
        :label="$t('button.save')"
        @click="savingIntegrationType()"
      />

    </q-card>
    <div class="row div-7">
      <div class="col-9 flex flex-left div-8">
        {{$t('input_labels.name')}}
      </div>
      <div class="col-1 flex flex-left">
        {{$t('input_labels.is_published')}}
      </div>
      <div class="col-1 flex flex-center div-9">
        {{$t('input_labels.edit')}}
      </div>
      <div class="col-1 flex flex-center div-10">
        {{$t('input_labels.delete')}}
      </div>
    </div>
    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="a_integration_type in intervention_types"
        :key="a_integration_type.id"
      >
        <q-item-section class="col-9 flex flex-left section">{{showTypeLabel(a_integration_type)}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
          <q-toggle
            v-model="a_integration_type.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon
          :data-cy="'edittype'.concat(a_integration_type.id)"
            id="icon"
            name="img:statics/icons/Edit.png"
            size="md"
            @click.stop="editIntegrationType(a_integration_type)"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon
          :data-cy="'deletetype'.concat(a_integration_type.id)"
            name="img:statics/icons/Icon - Delete.svg"
            @click.stop="deletingIntegrationType(a_integration_type.id)"
            size="md"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">

    </q-card>
  </div>
</template>

<script>
import FileUploader from 'components/FileUploader'
import GlossaryEditor from 'components/GlossaryEditor'
import editEntityMixin from '../../mixin/editEntityMixin'
import storeMappingMixin from '../../mixin/storeMappingMixin'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'
import HelpLabel from '../HelpLabel'


export default {
  name: 'InterventionType',
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        intervention_types: 'integration_type/intervention_types',
        intervention_categories: 'integration_category/intervention_categories',
        tenants: 'tenant/tenants'
      },
      actions: {
        deleteIntegrationTypeElement: 'integration_type/deleteIntegrationTypeElement',
        saveIntegrationTypeElement: 'integration_type/saveIntegrationTypeElement',
        editIntegrationTypeElement: 'integration_type/editIntegrationTypeElement',
        fetchIntegrationType: 'integration_type/fetchIntegrationType',
        fetchIntegrationCategory: 'integration_category/fetchIntegrationCategory',
        fetchTenants: 'tenant/fetchTenants',
        updatePublished: 'integration_type/updatePublished',
        saveTranslationProd: 'integration_type/saveTranslationProd',
        deleteTranslationProd: 'integration_type/deleteTranslationProd'
      }
    })],
  data () {
    return {
      int_type_shell: { id: -1, translations: [], categoryType: null },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      options: [],
      validatorsOptions: [],
      publishedOrig:false
    }
  },
  components: {
    GlossaryEditor,HelpLabel
  },
  methods: {
    isPublished(value){
     if( value.published == true){
        this.updatePublished({type:value, published: value.published})
        this.saveTranslationProd(value.id)
      }
      else{
        this.updatePublished({type:value, published: value.published})
      }
   },
    deletingIntegrationType (index) {
        this.$q.notify({
        type: 'warning',
        message: 'Warning: Deleting an intervention type will also delete all the interventions of the same tipe. Proceed?',
        actions: [
          { label: 'Delete', color: 'red', handler: () => { 
            console.log(index)
            this.deleteIntegrationTypeElement(index) } },
          { label: 'Back', color: 'accent', handler: () => { console.log("not deleting") } }
        ]
      })
      
    },
    savingIntegrationType () {
      if (this.isNew) {
        // we are adding a new instance
        this.saveIntegrationTypeElement(this.int_type_shell)
          .then((int_cat) => {
            console.log('saved')
          })
      } else {
        // we are updating the exsisting
        this.editIntegrationTypeElement(this.int_type_shell)
          .then((int_cat) => {
            console.log('updated')
          })
           if(this.int_type_shell.published != this.publishedOrig){
          this.isPublished(this.int_type_shell)
        }
      }
      this.hideForm = true
      this.hideAdd = false
      this.createShell()
    },
    newIntegrationType () {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelIntegrationType () {
      console.log(this.normalizedOptions)
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      this.createShell()

    },
    editIntegrationType (integration_type) {
      this.isNew = false
      this.hideForm = false
      this.hideAdd = true
      // this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
      this.mergeType(integration_type)
      this.publishedOrig = integration_type.published
    },
    showTypeLabel (workingType) {
      return workingType.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].interventionTitle
    },
    createShell () {
      this.int_type_shell = {
        id: -1, translations: [], categoryType: null, interventionTypeValidators: [], published:false
      }
      this.languages.forEach((l) => {
        this.int_type_shell.translations.push({
          id: -1, lang: l.lang, interventionTitle: '', description: '', translationDate: null, translationState: 0
        })
      })
    },
    mergeType (intervention_type) {
      console.log('MERGING')
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
      this.int_type_shell.interventionProcess = intervention_type.interventionProcess
      intervention_type.translations.forEach((pr) => {
        console.log(pr)
        for (let i = 0; i < this.int_type_shell.translations.length; i++) {
          if (this.int_type_shell.translations[i].lang == pr.lang) {
            this.int_type_shell.translations.splice(i, 1)
            this.int_type_shell.translations.push(JSON.parse(JSON.stringify(pr)))
            break
          }
        }
      })
      console.log("checking the merge")

      console.log(this.int_type_shell)
    }
  },

  created () {
    this.createShell()
    this.loading = true
    console.log(this.$store)
    this.fetchIntegrationType()
      .then((processes) => {
        this.loading = false
      })
    this.fetchIntegrationCategory()
      .then((processes) => {
        this.intervention_categories.forEach((cat) => {
          const translation = cat.translations.filter((transl) => transl.lang == this.activeLanguage)[0]
          this.options.push({ value: translation.id, label: translation.title })
        })
        this.loading = false
      })
    this.fetchTenants()
      .then((tenants) => {
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
