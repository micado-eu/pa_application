<template>
<div>
<div v-if="loading"> load </div>
  <div v-else class="q-pa-md">
    <h5>{{$t('data_settings.settings')}}</h5>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
          <HelpLabel
              :fieldLabel="$t('data_settings.survey_settings')"
              :helpLabel="$t('help.survey_settings')"
            />
          
          </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row">
           <div class="col"><span>{{$t('data_settings.ex_survey')}}</span><q-toggle v-model="internalSurvey" color="green" label=""/><span>{{$t('data_settings.in_survey')}}</span></div>
          <div class="col" style="text-align:right">
          <q-btn
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('internal_survey',newInternalSurvey, internalSurvey )"
        />
        </div>

      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.survey_local')"
              :helpLabel="$t('help.survey_local')"
            />
            </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
           <q-input
              dense
              bg-color="grey-3"
              standout
              outlined
              counter
              :readonly="!edit_survey_local"
              v-model="surveyLocal"
              />
        </div>
        <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_survey_local"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_survey_local = true"
        />
          <q-btn
          v-if="edit_survey_local"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('survey_local')"
        />
          <q-btn
          v-if="edit_survey_local"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('survey_local',newSurveyLocal, surveyLocal )"
        />
        </div>
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
          <HelpLabel
              :fieldLabel="$t('data_settings.survey_en')"
              :helpLabel="$t('help.survey_en')"
            />
       </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
                <div class="col">
           <q-input
              dense
              bg-color="grey-3"
              standout
              outlined
              counter
              :readonly="!edit_survey_en"
              v-model="surveyEn"
              />
                </div>
                <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_survey_en"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_survey_en = true"
        />
          <q-btn
          v-if="edit_survey_en"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('survey_en')"
        />
          <q-btn
          v-if="edit_survey_en"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('survey_en',newSurveyEn, surveyEn )"
        />
                </div>
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
          <HelpLabel
              :fieldLabel="$t('data_settings.feature_settings')"
              :helpLabel="$t('help.feature_settings')"
            />
            </div>
      </q-card-section>
            <q-separator />
      <q-card-section>
        <FeaturesElement
          v-for="afeature in workingFeatures"
          :feature="afeature"
          :key="afeature.id"
          @input="manageFeatures"
        />
        <div style="text-align:right">
        <q-btn
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveFeatures"
        />
        </div>
      </q-card-section>
    </q-card>
        <ActiveLanguageSelector />
    <LanguageManager :languages="languages" />

    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
                    <HelpLabel
              :fieldLabel="$t('data_settings.pa_logo')"
              :helpLabel="$t('help.pa_logo')"
            />
            </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
        <croppa
          v-model="myCroppa"
          :width="150"
          :height="150"
          :quality="1"
        ></croppa>
        </div>
        <div class="col" style=" display: flex;align-items: center;justify-content: right">
        <q-btn
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveLogo"
        />
        </div>
      </q-card-section>
    </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.pa_email')"
              :helpLabel="$t('help.pa_email_setting')"
            />
</div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      :readonly="!editing"
      v-model="email"
              />
        </div>
        <div class="col" style="text-align:right">
        <q-btn
          v-if="!editing"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="editing = true"
        />
          <q-btn
          v-if="editing"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelMail"
        />
          <q-btn
          v-if="editing"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveMail"
        />
        </div>
      </q-card-section>
    </q-card>
    
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.privacy')"
              :helpLabel="$t('help.privacy')"
            />
         </div>
      </q-card-section>
            <q-separator />
            <div class="q-pa-md">
              <GlossaryEditor
                data-cy="description_input"
                class="desc-editor "
                style="width:100%; text-align:left"
                :readonly="!(t_settings_edit.filter((top)=> top.key == 'policy')[0].is_setting_edit)"
                v-model="t_settings.filter((top) => top.key == 'policy')[0].translations.filter((transl) => transl.translated ==false)[0].value"

                ref="editor"
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
          <div class="col-2" style="padding-top: 2px">
            <q-toggle
              :value="
                t_settings.filter((top) => top.key == 'policy')[0].translations.filter(
                  (top) => top.translated == false
                )[0].translationState == 1
              "
              :disable="
                t_settings_edit.filter((top) => top.key == 'policy')[0].is_setting_edit == false
              "
              color="accent"
              @input="makeTranslatablePolicy($event,'policy')"
            />
          </div>
                    <div class="col-2" style="min-width: 200px">
            <HelpLabel
              :fieldLabel="$t('input_labels.is_published')"
              :helpLabel="$t('help.is_published')"
              style="padding-left: 17px"
            />
          </div>
          <div class="col-2" style="padding-top: 2px">
            <q-toggle
              v-model="t_settings.filter((top) => top.key == 'policy')[0].published"
              color="accent"
              :disable="
                t_settings.filter((top) => top.key == 'policy')[0].translations.filter((top) => top.translated == false)[0]
                  .translationState != 1 || t_settings_new.filter((top) => top.key == 'policy')[0].is_setting_new == true
              "
              @input="isPublishedSetting($event, 'policy')"
            />
          </div>
          </div>

         <div  class="q-pa-md" style="text-align:right">
        <q-btn
          v-if="!(t_settings_edit.filter((top)=> top.key == 'policy')[0].is_setting_edit)"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="t_settings_edit.filter((top)=> top.key == 'policy')[0].is_setting_edit = true"
        />
          <q-btn
          v-if="t_settings_edit.filter((top)=> top.key == 'policy')[0].is_setting_edit"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelPolicy('policy')"
        />
          <q-btn
          v-if="t_settings_edit.filter((top)=> top.key == 'policy')[0].is_setting_edit"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="savePolicy('policy')"
        />
         </div>


    </q-card>
      <q-tab-panels
        v-model="tabs"
        class=" "
        animated
      >
        <q-tab-panel
          v-for="setting in t_settings.filter((top) => top.key != 'policy')"
          :key="setting.key"
          :name="setting.key"
        >
            <q-card bordered >
      <q-card-section>
        <div class="setting_title">
              <HelpLabel
              :fieldLabel="$t('data_settings.content')"
              :helpLabel="$t('help.content')"
            />
          </div>
      </q-card-section>
            <q-separator />
            <q-tabs
        v-model="tabs"
        dense
        class="bg-grey-2"
        active-color="accent"
        indicator-color="accent"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="setting in t_settings.filter((top) => top.key != 'policy')"
          :key="setting.key"
          :name="setting.key"
          :label="setting.key"
        />
      </q-tabs>
          <div class="q-pa-md">
              <GlossaryEditor
                data-cy="description_input"
                class="desc-editor "
                style="width:100%; text-align:left"
                :readonly="!(t_settings_edit.filter((top)=> top.key == setting.key)[0].is_setting_edit)"
                v-model="setting.translations.filter((transl) => transl.translated ==false)[0].value"

                ref="editor"
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
          <div class="col-2" style="padding-top: 2px">
            <q-toggle
              :value="
                setting.translations.filter(
                  (top) => top.translated == false
                )[0].translationState == 1
              "
              :disable="
                t_settings_edit.filter((top) => top.key == setting.key)[0].is_setting_edit == false
              "
              color="accent"
              @input="makeTranslatablePolicy($event,setting.key)"
            />
          </div>
                    <div class="col-2" style="min-width: 200px">
            <HelpLabel
              :fieldLabel="$t('input_labels.is_published')"
              :helpLabel="$t('help.is_published')"
              style="padding-left: 17px"
            />
          </div>
          <div class="col-2" style="padding-top: 2px">
            <q-toggle
              v-model="setting.published"
              color="accent"
              :disable="
                setting.translations.filter((top) => top.translated == false)[0]
                  .translationState != 1 || t_settings_new.filter((top) => top.key == setting.key)[0].is_setting_new == true
              "
              @input="isPublishedSetting($event, setting.key)"
            />
          </div>
          </div>

         <div class="q-pa-md" style="text-align:right">
        <q-btn
          v-if="!(t_settings_edit.filter((top)=> top.key == setting.key)[0].is_setting_edit)"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="t_settings_edit.filter((top)=> top.key == setting.key)[0].is_setting_edit = true"
        />
          <q-btn
          v-if="t_settings_edit.filter((top)=> top.key == setting.key)[0].is_setting_edit"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelPolicy(setting.key)"
        />
          <q-btn
          v-if="t_settings_edit.filter((top)=> top.key == setting.key)[0].is_setting_edit"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="savePolicy(setting.key)"
        />
         </div>


    </q-card>
        </q-tab-panel>
              </q-tab-panels>      
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.helpdesk_pa')"
              :helpLabel="$t('help.helpdesk_pa')"
            />
          </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
           <q-input
              dense
              bg-color="grey-3"
              standout
              outlined
              counter
              :readonly="!edit_helpdesk_pa"
              v-model="helpdeskPa"
              />
        </div>
       <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_helpdesk_pa"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_helpdesk_pa = true"
        />
          <q-btn
          v-if="edit_helpdesk_pa"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_pa')"
        />
          <q-btn
          v-if="edit_helpdesk_pa"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_pa',newHelpdeskPa, helpdeskPa )"
        />
       </div>
      </q-card-section>
    </q-card>
     </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
          <HelpLabel
              :fieldLabel="$t('data_settings.helpdesk_ngo')"
              :helpLabel="$t('help.helpdesk_ngo')"
            />
          </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      :readonly="!edit_helpdesk_ngo"
      v-model="helpdeskNgo"
              />
        </div>
        <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_helpdesk_ngo"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_helpdesk_ngo = true"
        />
          <q-btn
          v-if="edit_helpdesk_ngo"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_ngo')"
        />
          <q-btn
          v-if="edit_helpdesk_ngo"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_ngo',newHelpdeskNgo, helpdeskNgo )"
        />
        </div>
      </q-card-section>
    </q-card>
     </q-card>
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.helpdesk_migrant')"
              :helpLabel="$t('help.helpdesk_migrant')"
            />
          </div>
      </q-card-section>
            <q-separator />
      <q-card-section class="row">
        <div class="col">
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      :readonly="!edit_helpdesk_migrant"
      v-model="helpdeskMigrant"
              />
        </div>
              <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_helpdesk_migrant"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_helpdesk_migrant = true"
        />
          <q-btn
          v-if="edit_helpdesk_migrant"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_migrant')"
        />
          <q-btn
          v-if="edit_helpdesk_migrant"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_migrant',newHelpdeskMigrant, helpdeskMigrant )"
        />
              </div>
      </q-card-section>
    </q-card>
     <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="setting_title">
            <HelpLabel
              :fieldLabel="$t('data_settings.duration_of_new')"
              :helpLabel="$t('help.duration_of_new')"
            />
          </div>
      </q-card-section> 
            <q-separator />
      <q-card-section class="row">
        <div class="col">
        <div class="row">
           <q-input
              type="number"
              dense
              class="col-2"
              bg-color="grey-3"
              standout
              outlined
              counter
              :readonly="!edit_duration_of_new"
              v-model.number="durationOfNew"
              />
              <p class="col-10 duration">{{$t('input_labels.days')}}</p>
        </div>
        </div>
        <div class="col" style="text-align:right">
        <q-btn
          v-if="!edit_duration_of_new"
          class="button_edit"
          no-caps
          :label="$t('button.edit')"
          @click="edit_duration_of_new = true"
        />
          <q-btn
          v-if="edit_duration_of_new"
          class="button_cancel"
          no-caps
          :label="$t('button.cancel')"
          @click="cancelSetting('duration_of_new')"
        />
          <q-btn
          v-if="edit_duration_of_new"
          class="button"
          no-caps
          :label="$t('button.save')"
          @click="saveSingleSetting('duration_of_new',newDurationOfNew, durationOfNew )"
        />
        </div>
      </q-card-section>
    </q-card>
  </div>
  </div>
</template>

<script>
import GlossaryEditor from "components/GlossaryEditor"

import storeMappingMixin from "../../mixin/storeMappingMixin"
import editEntityMixin from "../../mixin/editEntityMixin"
import FeaturesElement from "../../components/settings/FeaturesElement"
//import Croppa from 'vue-croppa'
import "vue-croppa/dist/vue-croppa.css"
import ActiveLanguageSelector from "../../components/settings/ActiveLanguageSelector.vue"
import translatedButtonMixin from "../../mixin/translatedButtonMixin"
import LanguageManager from "../../components/LanguageManager"
import HelpLabel from "components/HelpLabel"


export default {
  name: "FunctionConfiguration",
  data() {
    return {
      t_settings:[],
      t_settings_orig:[],
      t_settings_edit:[],
      t_settings_new:[],
      group: ["FEAT_SERVICES"],
      workingFeatures: [],
      myCroppa: {},
      editing: false,
      email: null,
      emailOrig: null,
      policy: null,
      guides:null,
      event:null,
      info:null,
      doc:null,
      plan:null,
      policyOrig: null,
      helpdeskPa: null,
      helpdeskPaOrig: null,
      helpdeskNgo: null,
      helpdeskNgoOrig: null,
      helpdeskMigrant: null,
      helpdeskMigrantOrig: null,
      durationOfNew: null,
      durationOfNewOrig: null,
      surveyLocal:null,
      surveyLocalOrig:null,
      surveyEn:null,
      surveyEnOrig:null,
      isNew: true,
      newFathers: true,
      newPolicy: true,
      newHelpdeskPa: true,
      newHelpdeskNgo: true,
      newHelpdeskMigrant: true,
      newDurationOfNew: true,
      newSurveyLocal:true,
      newSurveyEn:true,
      t_tags: [],
      edit_fathers: false,
      fathers: [],
      fathersOrig: [],
      editing_policy: false,
      edit_helpdesk_pa: false,
      edit_helpdesk_ngo: false,
      edit_helpdesk_migrant: false,
      edit_duration_of_new: false,
      edit_survey_local:false,
      edit_survey_en:false,
      loading:true,
      tabs:'guides', 
      internalSurvey:false,
      newInternalSurvey:true
    }
  },
  mixins: [
    editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        features: "features/features",
        settings: "settings/settings",
        mixed_settings:"settings/mixed_settings"
      },
      actions: {
        fetchFeatures: "features/fetchFeatures",
        updateAllFeatures: "features/updateAllFeatures",
        updateSetting: "settings/updateSetting",
        saveSetting: "settings/saveSetting",
        fetchTopic: "topic/fetchTopic",
        fetchMixedSettings: "settings/fetchMixedSettings",
        savingPolicy: "settings/savePolicy",
        updatePolicy: "settings/updatePolicy",
        updatePublished: "settings/updatePublished",
        saveTranslationProd: "settings/saveTranslationProd",
        deleteTranslationProd: "settings/deleteTranslationProd"
      }
    })
  ],
  components: {
    FeaturesElement,
    ActiveLanguageSelector,
    GlossaryEditor,
    LanguageManager,
    HelpLabel
  },
  computed: {},
  methods: {
    manageFeatures(value){
    /*  if(value.flagKey == "FEAT_MIGRANT_LOGIN" && value.enabled == false){
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_DOCUMENTS"
        })[0].enabled = false
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_ASSISTANT"
        })[0].enabled = false
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_TASKS"
        })[0].enabled = false
      }
      else if (value.flagKey == "FEAT_MIGRANT_LOGIN" && value.enabled == true){
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_DOCUMENTS"
        })[0].enabled = true
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_ASSISTANT"
        })[0].enabled = true
        this.workingFeatures.filter((filt)=>{
          return filt.flagKey == "FEAT_TASKS"
        })[0].enabled = true
      }
      console.log(value)
      console.log(this.workingFeatures)*/
    },
    isPublishedSetting(event, value) {
      console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_setting_temp = this.mixed_settings.filter((set) => {
        return set.key == value
      })[0]
      console.log(publishing_setting_temp)
      var publishing_setting = JSON.parse(JSON.stringify(publishing_setting_temp))
      if (event == true) {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.publish_topic"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  setting: publishing_setting,
                  published: event
                })
                this.saveTranslationProd(publishing_setting.id)
                //this.cancelTopic();
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.t_settings.filter((set)=>{return set.key == key})[0].published = false
              }
            }
          ]
        })
      } else {
        this.$q.notify({
          type: "warning",
          timeout: 0,
          message: this.$t("warning.unpublish_topic"),
          actions: [
            {
              label: this.$t("lists.yes"),
              color: "accent",
              handler: () => {
                this.updatePublished({
                  setting: publishing_setting,
                  published: event
                })
                this.deleteTranslationProd(publishing_setting.id)
              }
            },
            {
              label: this.$t("lists.no"),
              color: "red",
              handler: () => {
                this.t_settings.filter((set)=>{return set.key == key})[0].published = true
              }
            }
          ]
        })
      }
    },
    makeTranslatablePolicy(value, key) {
      console.log(value)

      if (value) {
      this.t_settings.filter((set)=>{
        return set.key == key
      })[0].translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
              this.t_settings.filter((set)=>{
        return set.key == key
      })[0].translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    checkExists(settings,key){
       var exist = settings.filter((set)=>{
          return set.key == key
        })
        if(exist.length >0){
          var exist_parsed = JSON.parse(JSON.stringify(exist[0]))
          exist_parsed.translations = [exist_parsed.translations.filter((set)=>{return set.translated == false})[0]]
          console.log(exist_parsed)
          this.t_settings.push(JSON.parse(JSON.stringify(exist_parsed)))
          this.t_settings_orig.push(JSON.parse(JSON.stringify(exist_parsed)))
          this.t_settings_new.push({key:exist_parsed.key, is_setting_new:false})
        }
        else{
          this.t_settings.push(JSON.parse(JSON.stringify(this.createPolicyShell(key))))
          this.t_settings_orig.push(JSON.parse(JSON.stringify(this.createPolicyShell(key))))
          this.t_settings_new.push({key:key, is_setting_new:true})
        }
        this.t_settings_edit.push({key:key, is_setting_edit:false})
    },
    addSettingsFromScratch(key){
          this.t_settings.push(JSON.parse(JSON.stringify(this.createPolicyShell(key))))
          this.t_settings_orig.push(JSON.parse(JSON.stringify(this.createPolicyShell(key))))
          this.t_settings_new.push({key:key, is_setting_new:true})
          this.t_settings_edit.push({key:key, is_setting_edit:false})
    },
    createPolicyShell(key) {
     var shell = {
        id: -1,
        key: key,
        published: false,
        translations: []
      }
      shell.translations = []
      shell.translations.push({
        id: -1,
        lang: this.activeLanguage,
        value: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
      return shell
      //var shellOrig = JSON.parse(JSON.stringify(shell))
    },
    cancelPolicy(key) {
      console.log("going back")
      console.log(key)
      console.log(this.t_settings_orig.filter((set)=>{return set.key == key})[0])
      console.log(this.t_settings_orig.filter((set)=>{return set.key == key})[0].translations.filter((top) => top.translated == false)[0].value)
     this.t_settings.filter((set)=>{return set.key == key})[0].translations.filter((top) => top.translated == false)[0].value = JSON.parse(JSON.stringify(this.t_settings_orig.filter((set)=>{return set.key == key})[0].translations.filter((top) => top.translated == false)[0].value)) 
      this.t_settings_edit.filter((top)=> top.key == key)[0].is_setting_edit = false
    },
    savePolicy(key) {
            console.log(this.t_settings_new)
      var is_new = this.t_settings_new.filter((set)=>{
        return set.key == key
      })[0].is_setting_new

      if (is_new) {
        this.t_settings.filter((set)=>{return set.key == key})[0].translations.push({
          id: -1,
          lang: this.activeLanguage,
          value: this.t_settings.filter((set)=>{return set.key == key})[0].translations[0].value,
          translationDate: null,
          translationState: this.t_settings.filter((set)=>{return set.key == key})[0].translations[0]
            .translationState,
          translated: true
        })
        //}
        this.t_settings.filter((set)=>{return set.key == key})[0].translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        console.log("saving new policy")
        console.log(this.policy)
        this.savingPolicy(this.t_settings.filter((set)=>{return set.key == key})[0])
      } else {
        if (this.t_settings.filter((set)=>{return set.key == key})[0].translations.filter((top) => top.translated == false)[0].translationState == 1) {
          this.t_settings.filter((set)=>{return set.key == key})[0].translations.push({
            id: this.t_settings.filter((set)=>{return set.key == key})[0].id,
            lang: this.activeLanguage,
            value: this.t_settings.filter((set)=>{return set.key == key})[0].translations[0].value,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        this.t_settings.filter((set)=>{return set.key == key})[0].translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        this.updatePolicy(this.t_settings.filter((set)=>{return set.key == key})[0])
      }
      console.log("updating old policy")
      this.t_settings_edit.filter((top)=> top.key == key)[0].is_setting_edit = false
      this.t_settings_new.filter((top)=> top.key == key)[0].is_setting_new = false
      this.t_settings_orig.filter((set)=>{return set.key == key})[0] = JSON.parse(JSON.stringify(this.t_settings.filter((set)=>{return set.key == key})[0]))
    },
    cancelFathers() {
      this.fathers = JSON.parse(JSON.stringify(this.fathersOrig))
      this.edit_fathers = false
    },
    saveFathers() {
      console.log(this.fathers)
      if (this.newFathers) {
        console.log("saving new father_topics")
        this.saveSetting({
          key: "father_topics",
          value: JSON.stringify(this.fathers)
        })
      } else {
        this.updateSetting({
          key: "father_topics",
          value: JSON.stringify(this.fathers)
        })
      }
      console.log("updating old father_topics")
      this.edit_fathers = false
      this.fathersOrig = JSON.parse(JSON.stringify(this.fathers))
    },
    cancelMail() {
      this.email = JSON.parse(JSON.stringify(this.emailOrig))
      this.editing = false
    },
    cancelSetting(setting) {
      switch (setting) {
        case "helpdesk_pa":
          this.helpdeskPa = JSON.parse(JSON.stringify(this.helpdeskPaOrig))
          this.edit_helpdesk_pa = false
          break
        case "helpdesk_ngo":
          this.helpdeskNgo = JSON.parse(JSON.stringify(this.helpdeskNgoOrig))
          this.edit_helpdesk_ngo = false
          break
        case "helpdesk_migrant":
          this.helpdeskMigrant = JSON.parse(
            JSON.stringify(this.helpdeskMigrantOrig)
          )
          this.edit_helpdesk_migrant = false
          break
        case "duration_of_new":
          this.durationOfNew = JSON.parse(
            JSON.stringify(this.durationOfNewOrig)
          )
          this.edit_duration_of_new = false
          break
        case "survey_local":
          this.surveyLocal = JSON.parse(
            JSON.stringify(this.surveyLocalOrig)
          )
          this.edit_survey_local = false
          break
        case "survey_en":
          this.surveyEn = JSON.parse(
            JSON.stringify(this.surveyEnOrig)
          )
          this.edit_survey_en = false
          break
        default:
          console.log("non of those")
      }
    },
    saveMail() {
      if (this.isNew) {
        console.log("saving new feedback email")
        this.saveSetting({ key: "feedback_email", value: this.email })
      } else {
        this.updateSetting({ key: "feedback_email", value: this.email })
      }
      console.log("updating old feedback email")
      this.editing = false
      this.emailOrig = JSON.parse(JSON.stringify(this.email))
    },
    saveSingleSetting(key, is_new, item) {
      if (is_new) {
        console.log("saving new feedback email")
        this.saveSetting({ key: key, value: String(item) })
      } else {
        this.updateSetting({ key: key, value: String(item) })
      }
      switch (key) {
        case "helpdesk_pa":
          this.helpdeskPaOrig = JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_pa = false
          break
        case "helpdesk_ngo":
          this.helpdeskNgoOrig = JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_ngo = false
          break
        case "helpdesk_migrant":
          this.helpdeskMigrantOrig = JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_migrant = false
          break
        case "duration_of_new":
          this.durationOfNewOrig = JSON.parse(JSON.stringify(item))
          this.edit_duration_of_new = false
          break
        case "survey_local":
          this.surveyLocalOrig = JSON.parse(JSON.stringify(item))
          this.edit_survey_local = false
          break
        case "survey_en":
          this.surveyEnOrig = JSON.parse(JSON.stringify(item))
          this.edit_survey_en = false
          break
        default:
          console.log("non of those")
      }
    },

    saveFeatures() {
      console.log(this.workingFeatures)
      /*
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      axios
        .post(
          "https://api.micadoproject.eu/db/v01/migrant_app_config",
          {
            id: 1,
            features: this.features
          },
          {
            //             httpsAgent: agent ,
            headers: {
              Prefer: "resolution=merge-duplicates",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJNaWdyYW50QXBwbGljYXRpb24iLCJpZCI6MSwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9nYXRld2F5Lm1pY2Fkb3Byb2plY3QuZXU6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiQnJvbnplIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlBvc3RnUkVTVEFQSSIsImNvbnRleHQiOiJcL2RiXC92MDEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MDEiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn1dLCJjb25zdW1lcktleSI6InZabFNMbTFnYzVOMzIxbnRIN2Ztd2tONTNvVWEiLCJleHAiOjM3MzAyOTc0MzgsImlhdCI6MTU4MjgxMzc5MSwianRpIjoiYmYyMjBiYjMtNjY3MC00OTA5LWI4OTctOTY2ZDVhZDdhN2M0In0.GORnM7Hfflrv8iNFbBOZoLg7475tnLaXwY2f88My_qVCAupJxqPihM901E5GNQUsL2I7PW9_ymbCPJki0FuaIhdXk4ovso11ghjWDkVH9fUoMm_FElNynOlWp7gPDwtXbS5sNI2nZHflvUmc9IYG70XJG6tWhg4hI8bW0sNr03gkQOjQzbUqSqHb__J_oLJye1IGi657oJUtXnVLSDfRHOKl7w8SATrSiR_K57SkT4xGmpLqYGmbXsoWFJT-FHe1-WVrGBvwk2kqZfjgjDUoUedrDR0F9T_YrVIuPtruGqR4gJGWBuXPciOSHYsGu12Oxg3zC1FwoptN0NA2AZ-oTg" //the token is a variable which holds the token
            }
          }
        )
        .then(console.log("posted"))
        .catch(function (err) {
          // Run into big problems when I get an error
          console.log("Got an error calling API manager: ", err);
          response => [];
        });
        */
      this.updateAllFeatures(this.workingFeatures)
      console.log("posted")
      this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    },
    saveLogo() {
      console.log(this.myCroppa.generateDataUrl())
      let setting = { key: "pa_logo", value: this.myCroppa.generateDataUrl() }
      this.updateSetting(setting).then((result) => {
        console.log(result)
        //       window.location.reload()
      })
    }
  },
  created() {
    console.log(this.languages)
    console.log("created")
    console.log(this.features)
    console.log(this.settings)
    this.createPolicyShell()
    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    console.log(this.settings["feedback_email"])
    this.settings.forEach((setting) => {
      console.log(setting.key)
      if (setting.key == "feedback_email") {
        this.email = setting.value
        this.emailOrig = setting.value
        this.isNew = false
      }
      if (setting.key == "father_topics") {
        this.fathers = JSON.parse(setting.value)
        this.fathersOrig = JSON.parse(setting.value)
        this.newFathers = false
      }
      if (setting.key == "helpdesk_pa") {
        console.log(setting)
        this.helpdeskPa = setting.value
        this.helpdeskPaOrig = setting.value
        this.newHelpdeskPa = false
      }
      if (setting.key == "helpdesk_ngo") {
        this.helpdeskNgo = setting.value
        this.helpdeskNgoOrig = setting.value
        this.newHelpdeskNgo = false
      }
      if (setting.key == "helpdesk_migrant") {
        this.helpdeskMigrant = setting.value
        this.helpdeskMigrantOrig = setting.value
        this.newHelpdeskMigrant = false
      }
      if (setting.key == "duration_of_new") {
        this.durationOfNew = Number(setting.value)
        this.durationOfNewOrig = Number(setting.value)
        this.newDurationOfNew = false
      }
      if (setting.key == "survey_local") {
        this.surveyLocal = setting.value
        this.surveyLocalOrig =setting.value
        this.newSurveyLocal = false
      }
      if (setting.key == "survey_en") {
        this.surveyEn = setting.value
        this.surveyEnOrig = setting.value
        this.newSurveyEn = false
      }
      if (setting.key == "internal_survey") {
        console.log("IN INTERNAL SRVEY")
        var isTrue = (setting.value === 'true')
        this.internalSurvey = isTrue
        //this.internalSurveyOrig = setting.value
        this.newInternalSurvey = false
        console.log(this.internalSurvey)
      }
    })
    this.fetchMixedSettings().then((settings) => {
      console.log("I AM MIXED SETTINGS")
      console.log(settings)
      if (settings.length > 0) {
        this.checkExists(settings,'policy')
        this.checkExists(settings,'info')
        this.checkExists(settings,'doc')
        this.checkExists(settings,'event')
        this.checkExists(settings,'plan')
        this.checkExists(settings,'guides')
        console.log(this.t_settings)
        console.log(this.t_settings_edit)

       /* var exist_policy = settings.filter((set)=>{
          return set.key == policy
        })
        if(exist_policy.length >0){
          this.t_settings.push(JSON.parse(JSON.stringify(exist_policy[0])))
          this.t_settings_orig.push(JSON.parse(JSON.stringify(exist_policy[0])))
          this.t_settings_new.push({key:exist_policy[0].key, is_setting_new:false})
        }
        /*settings.forEach((setting)=>{
        if (setting.key == "policy" || setting.key == "info" || setting.key == "doc" || setting.key == "event" || setting.key == "plan" || setting.key == "guides") {
          /*this.policy = JSON.parse(JSON.stringify(setting[0]))
          this.policyOrig = JSON.parse(JSON.stringify(setting[0]))
          this.newPolicy = false
          this.t_settings.push(this.createPolicyShell(setting))
          this.t_settings_orig.push(this.createPolicyShell(setting))
          this.t_settings_new.push({key:key, is_setting_new:false})
        }
        console.log("I am translatable settings")
        console.log(this.t_settings)
        })*/

      }
      else{
        this.addSettingsFromScratch('policy')
        this.addSettingsFromScratch('info')
        this.addSettingsFromScratch('doc')
        this.addSettingsFromScratch('event')
        this.addSettingsFromScratch('plan')
        this.addSettingsFromScratch('guides')
      }
      this.loading = false

    })
    this.fetchTopic().then((topics) => {
      console.log(topics)
      var published_topics = topics.filter((top) => {
        return top.published == true
      })
      published_topics.forEach((topic) => {
        var the_topic = {
          label: topic.translations.filter(
            this.filterTranslationModel(this.activeLanguage)
          )[0].topic,
          value: topic.id
        }
        this.t_tags.push(the_topic)
      })
    })
    /*
    this.fetchFeatures()
      .then(features => {
        //        this.loading = false
        console.log("got features")
        console.log(this.features)
      });
      */
  }
}
</script>
<style scoped>
.duration{
  padding-top:5px;
  padding-left:10px;
  font-size: 20px;
}
.setting_title{
  font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #000000;
}
.button{
  background: #0F3A5D;
border-radius: 5px;
color:white;
margin-right: 30px;
width: 150px;

}
.button_edit{
  background: #FF7C44;
border-radius: 5px;
color:white;
margin-right: 30px;
width: 150px;

}
.button_cancel{
margin-right: 30px;
width: 150px;

border: 1px solid #C71F40;
box-sizing: border-box;
border-radius: 5px;

}
</style>