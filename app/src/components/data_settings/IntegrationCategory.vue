<template>
  <div
    :id="$options.name"
    class="q-pa-md"
  >
    <div class="row wrap justify-start items-start content-center">
      <div class="col">
        <router-link :to="'#'+$options.name">
          <h5 @click="onClickTitle()">{{$t("data_settings.intervention_categories")}}</h5>
        </router-link>
      </div>
      <div class="full-height col">
        <div class="row  justify-end items-center ">
          <UploadButton entity="intervention_category" />
          <q-btn
            color="info"
            :data-cy="'addcategory'"
            no-caps
            :label="$t('button.add_category')"
            @click="newIntegrationCategory()"
            :disable="hideAdd"
            class="add-button"
          />
        </div>
      </div>
    </div>
    <q-card class="my-card">
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
      <q-card-section
        :hidden="hideForm"
        class="div-2"
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
          :fieldLabel="$t('input_labels.intervention_category')"
          :helpLabel ="$t('help.intervention_category')"
          />
            
            <q-input
              counter
              :maxlength="$envconfig.titleLimit"
              :rules="[
              val => val.length <= $envconfig.titleLimit || 'Please use maximum 30 characters',
              val => !!val || 'Field is required'
              ]"
              ref="intervention_type"
              :hint="$t('input_labels.required')"
              outlined
              filled
              dense
              v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].title"
              :readonly="!(int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
              :label="$t('input_labels.category_placeholder')"
            />
            <div>
              <TranslateStateButton
                v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState"
                :isForDefaultLanguage="language.lang===activeLanguage"
                :objectId="int_cat_shell.id"
                :readonly="!(language.lang===activeLanguage)"
                @micado-change="(id) => {changeTranslationState(int_cat_shell, id.state)}"
                @return-to-edit="(id) => {
                  changeTranslationState(int_cat_shell, id.state)
                  deleteTranslationProd(int_cat_shell.id)
                  int_cat_shell.published = false
                }"
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
        <div class="row">
        <div class="col-3" style="min-width:200px">
          <HelpLabel
            :fieldLabel="$t('button.validate_and_publish')"
            :helpLabel ="$t('help.is_published')"
            style="padding-left:17px"
          />
        </div>
        <div class="col-2" style="padding-top:2px">
          <q-toggle
            v-model="int_cat_shell.published"
            color="accent"
            :disable="int_cat_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event,int_cat_shell.id)"
          />
        </div>
      </div>
        <hr id="hr">
        <q-btn
        :data-cy="'savecategory'"
          class="button"
          :disable="int_cat_shell.published"
          color="accent"
          no-caps
          unelevated
          rounded
          :label="$t('button.save')"
          type="submit"
        />
        <q-btn
          :data-cy="'cancelcategory'"
          class="delete-button"
          no-caps
          unelevated
          rounded
          :label="$t('button.cancel')"
          @click="cancelIntegrationCategory()"
        />
      </q-card-section>
    </form>
    </q-card>
    <q-item class="">

      <q-item-section class="col-7 flex flex-left ">
        {{$t('input_labels.name')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
         {{$t('input_labels.is_published')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.transl_state')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{$t('input_labels.edit')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{$t('input_labels.delete')}}
      </q-item-section>
    </q-item>
    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="a_integration_category in intervention_categories"
        :key="a_integration_category.id"
      >
        <q-item-section class="col-7 flex flex-left ">{{showCategoryLabel(a_integration_category)}}</q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <q-toggle
            v-model="a_integration_category.published"
            color="accent"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top" >
               {{getTranslationState(a_integration_category.id)}}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <q-icon
          :data-cy="'editcategory'.concat(a_integration_category.id)"
            name="img:statics/icons/Edit.png"
            size="md"
            @click.stop="editIntegrationCategory(a_integration_category)"
          />

        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">

          <q-icon
          :data-cy="'deletecategory'.concat(a_integration_category.id)"
            name="img:statics/icons/Icon - Delete.svg"
            @click.stop="deletingIntegrationCategory(a_integration_category)"
            size="md"
          />

        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'
import storeMappingMixin from '../../mixin/storeMappingMixin'
import UploadButton from '../UploadButton'
import HelpLabel from '../HelpLabel'
//import TranslateStateButton from '@bit/micado.shared.translatestatebutton'

export default {
  name: "InterventionCategory",
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        intervention_categories: 'integration_category/intervention_categories'
      }, actions: {
        deleteIntegrationCategory: 'integration_category/deleteIntegrationCategory',
        saveIntegrationCategory: 'integration_category/saveIntegrationCategory',
        editCategoryTypeElement: 'integration_category/editCategoryTypeElement',
        fetchIntegrationCategory: 'integration_category/fetchIntegrationCategory',
        updatePublished: 'integration_category/updatePublished',
        saveTranslationProd: 'integration_category/saveTranslationProd',
        deleteTranslationProd: 'integration_category/deleteTranslationProd'
      }
    })],
  data () {
    return {
      int_cat_shell: { id: -1, translations: [] },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      publishedOrig:false

    }
  },
  components: {
    UploadButton, HelpLabel
  },
  methods: {
        getTranslationState(id){
      var cate = this.intervention_categories.filter((cat)=>{
        return cat.id == id
      })[0]
      var state = cate.translations.filter((transl)=>{
        return transl.lang == this.$defaultLang
      })[0].translationState
      if(state == 0){
        return this.$i18n.t('translation_states.editing')
      }
      else if(state ==1){
        return this.$i18n.t('translation_states.translatable')
      }
      else if(state==2){
        return this.$i18n.t('translation_states.translating')
      }
      else{
        return this.$i18n.t('translation_states.translated')
      }
    },
    onSubmit () {
      console.log(this.$refs.intervention_type[0])
      this.$refs.intervention_type[0].validate()
      if (this.$refs.intervention_type[0].hasError) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savingIntegrationCategory()
      }
    },
        onReset () {
       this.$refs.intervention_type[0].validate()

       this.$refs.intervention_type[0].resetValidation()
    },
     isPublished(event,value){
     console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_cat_temp =  this.intervention_categories.filter((type)=>{
        return type.id == value
      })[0]
      var publishing_cat = JSON.parse(JSON.stringify(publishing_cat_temp))
      if( event == true){
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.publish_intervention_category'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({cat:publishing_cat, published: event})
            this.saveTranslationProd(value)
            this.cancelIntegrationCategory()
             }},
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.this.int_cat_shell.published = false } }
        ]
      })
       
      }
      else{
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.unpublish_intervention_category'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({cat:publishing_cat, published:event})
            this.deleteTranslationProd(value)}},
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.this.int_cat_shell.published = true } }
        ]
      })
       
      }
     },
    onClickTitle: function () {
      this.$emit("scroll", "#" + this.$options.name)
    },
    deletingIntegrationCategory (category) {
      this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.delete_intervention_category'),
        actions: [
          { label: this.$t('button.delete'), color: 'red', handler: () => { 
            console.log(category)
            this.deleteIntegrationCategory(category) } },
          { label: this.$t('button.back'), color: 'accent', handler: () => { console.log("not deleting") } }
        ]
      })
    },
    showCategoryLabel (workingCat) {

      return workingCat.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].title
    },
    savingIntegrationCategory () {
      if (this.isNew) {
        // we are adding a new instance
        this.saveIntegrationCategory(this.int_cat_shell)
          .then(int_cat => {
            console.log("saved")
          })
      } else {
        // we are updating the exsisting
        this.editCategoryTypeElement(this.int_cat_shell)
          .then(int_cat => {
            console.log("updated")
          })
         
      }
      this.hideForm = true
      this.hideAdd = false
      this.createShell()
    },
    newIntegrationCategory () {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    cancelIntegrationCategory () {
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
    },
    editIntegrationCategory (integration_category) {
      this.isNew = false
      this.hideForm = false
      //this.int_cat_shell = JSON.parse(JSON.stringify(integration_category));
      this.mergeCategory(integration_category)
      this.publishedOrig = integration_category.published

    },
    createShell () {
      this.int_cat_shell = { id: -1, translations: [], published:false }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_cat_shell.translations.push({ id: -1, lang: l.lang, title: '', translationDate: null, translationState: 0 })
      })
    },
    mergeCategory (category) {
      console.log(category)
      this.int_cat_shell.id = category.id
      this.int_cat_shell.published = category.published
      //this.int_cat_shell.published = category.published
      //this.int_cat_shell.publicationDate = category.publicationDate
      category.translations.forEach(tr => {
        console.log(tr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_cat_shell.translations.length; i++) {
          if (this.int_cat_shell.translations[i].lang == tr.lang) {
            this.int_cat_shell.translations.splice(i, 1)
            this.int_cat_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break
          }
        }
      })

      console.log(this.int_cat_shell)
    }
  },
  //store.commit('increment', 10)
  created () {
    this.createShell()
    this.loading = true
    console.log(this.$store)
    this.fetchIntegrationCategory()
      .then(categories => {
        console.log(categories)
        this.loading = false
      })

  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: #000000;
}
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
#add-button {
  width: 200px;
}
.button {
  width: 100px;
  border-radius: 2px;
  margin-right: 15px;
  margin-left: 10px;
  margin-top: 30px;
}
.div-3 {
  font-size: 16px;
  font-weight: 600;
}
#hr {
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #dadada;
}
.div-4 {
  padding-left: 20px;
}
.div-5 {
  padding-bottom: 10px;
}
.div-6 {
  padding-left: 15px;
}
.div-7 {
  margin-left: 0px;
}
.div-8 {
  padding-left: 20px;
}
#icon {
  margin-right: 10px;
}
</style>
