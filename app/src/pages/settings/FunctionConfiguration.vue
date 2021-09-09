<template>
  <div class="q-pa-md">
    <h5>{{$t('data_settings.settings')}}</h5>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.feature_settings')}}</div>
      </q-card-section>
      <q-card-section>
        <FeaturesElement
          v-for="afeature in workingFeatures"
          :feature="afeature"
          :key="afeature.id"
        />
        <q-btn
          color="accent"
          glossy
          label="Save"
          @click="saveFeatures"
        />
      </q-card-section>
    </q-card>
        <ActiveLanguageSelector />

    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.pa_logo')}}</div>
      </q-card-section>
      <q-card-section>
        <croppa
          v-model="myCroppa"
          :width="150"
          :height="150"
          :quality="1"
        ></croppa>
        <q-btn
          color="accent"
          glossy
          label="Save"
          @click="saveLogo"
        />
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.pa_email')}}</div>
      </q-card-section>
      <q-card-section>
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      :readonly="!editing"
      v-model="email"
              />
        <q-btn
          v-if="!editing"
          color="accent"
          glossy
          :label="$t('button.edit')"
          @click="editing = true"
        />
          <q-btn
          v-if="editing"
          color="accent"
          glossy
          :label="$t('button.cancel')"
          @click="cancelMail"
        />
          <q-btn
          v-if="editing"
          color="accent"
          glossy
          :label="$t('button.save')"
          @click="saveMail"
        />

      </q-card-section>
    </q-card>
    
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.privacy')}}</div>
      </q-card-section>
             <q-tab-panels
          v-model="langTab"
          class="  "
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
              <GlossaryEditor
                data-cy="description_input"
                class="desc-editor "
                style="width:100%; text-align:left"
                :readonly="!(policy.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)|| !(editing_policy)"
                v-model="policy.translations.filter(filterTranslationModel(language.lang))[0].value"
                :lang="language.lang"
                ref="editor"
              />
              <div style="text-align:right;padding-left: 150px;">
              <TranslateStateButton
                v-model="policy.translations.filter(filterTranslationModel(language.lang))[0].translationState"
                :isForDefaultLanguage="language.lang===activeLanguage"
                :objectId="policy.id"
                :readonly="!(language.lang===activeLanguage)"
                @micado-change="(id) => {
                  changeTranslationState(policy, id.state)
                 //groupSteps(edit_process.id)
                  //updateStepTranslationState(id.state)
                  
                }"
                @return-to-edit="(id) => {
                  changeTranslationState(policy, id.state)
                  deleteTranslationProd(policy.id)
                  policy.published = false
                }"
              />
            </div>
                </q-tab-panel>
        </q-tab-panels>
        <div style="padding-left:16px;padding-right:16px">
        <hr id="hr-2">
        <q-tabs
          v-model="langTab"
          dense
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
        
        <hr id="hr-2">
         </div>
         <div style="padding-left:16px;padding-right:16px">
        <q-btn
          v-if="!editing_policy"
          color="accent"
          glossy
          :label="$t('button.edit')"
          @click="editing_policy = true"
        />
          <q-btn
          v-if="editing_policy"
          color="accent"
          glossy
          :label="$t('button.cancel')"
          @click="cancelPolicy"
        />
          <q-btn
          v-if="editing_policy"
          color="accent"
          glossy
          :label="$t('button.save')"
          @click="savePolicy"
        />
         </div>


    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.helpdesk_pa')}}</div>
      </q-card-section>
      <q-card-section>
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      type="textarea"
      :readonly="!edit_helpdesk_pa"
      v-model="helpdeskPa"
              />
        <q-btn
          v-if="!edit_helpdesk_pa"
          color="accent"
          glossy
          :label="$t('button.edit')"
          @click="edit_helpdesk_pa = true"
        />
          <q-btn
          v-if="edit_helpdesk_pa"
          color="accent"
          glossy
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_pa')"
        />
          <q-btn
          v-if="edit_helpdesk_pa"
          color="accent"
          glossy
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_pa',newHelpdeskPa, helpdeskPa )"
        />

      </q-card-section>
    </q-card>
     </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.helpdesk_ngo')}}</div>
      </q-card-section>
      <q-card-section>
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      type="textarea"
      :readonly="!edit_helpdesk_ngo"
      v-model="helpdeskNgo"
              />
        <q-btn
          v-if="!edit_helpdesk_ngo"
          color="accent"
          glossy
          :label="$t('button.edit')"
          @click="edit_helpdesk_ngo = true"
        />
          <q-btn
          v-if="edit_helpdesk_ngo"
          color="accent"
          glossy
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_ngo')"
        />
          <q-btn
          v-if="edit_helpdesk_ngo"
          color="accent"
          glossy
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_ngo',newHelpdeskNgo, helpdeskNgo )"
        />

      </q-card-section>
    </q-card>
     </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.helpdesk_migrant')}}</div>
      </q-card-section>
      <q-card-section>
           <q-input
      dense
      bg-color="grey-3"
      standout
      outlined
      counter
      :readonly="!edit_helpdesk_migrant"
      v-model="helpdeskMigrant"
              />
        <q-btn
          v-if="!edit_helpdesk_migrant"
          color="accent"
          glossy
          :label="$t('button.edit')"
          @click="edit_helpdesk_migrant = true"
        />
          <q-btn
          v-if="edit_helpdesk_migrant"
          color="accent"
          glossy
          :label="$t('button.cancel')"
          @click="cancelSetting('helpdesk_migrant')"
        />
          <q-btn
          v-if="edit_helpdesk_migrant"
          color="accent"
          glossy
          :label="$t('button.save')"
          @click="saveSingleSetting('helpdesk_migrant',newHelpdeskMigrant, helpdeskMigrant )"
        />

      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import GlossaryEditor from 'components/GlossaryEditor'

import storeMappingMixin from '../../mixin/storeMappingMixin'
import editEntityMixin from '../../mixin/editEntityMixin'
import FeaturesElement from '../../components/settings/FeaturesElement'
//import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import ActiveLanguageSelector from '../../components/settings/ActiveLanguageSelector.vue'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'

export default {
  name: "FunctionConfiguration",
  data () {
    return {
      group: ["FEAT_SERVICES"],
      workingFeatures: [],
      myCroppa: {},
      editing: false,
      email:null,
      emailOrig: null,
      policy:null,
      policyOrig:null,
      helpdeskPa:null,
      helpdeskPaOrig:null,
      helpdeskNgo:null,
      helpdeskNgoOrig:null,
      helpdeskMigrant:null,
      helpdeskMigrantOrig:null,
      isNew:true,
      newFathers:true,
      newPolicy:true,
      newHelpdeskPa:true,
      newHelpdeskNgo:true,
      newHelpdeskMigrant:true,
      t_tags:[],
      edit_fathers:false,
      fathers:[],
      fathersOrig:[],
      editing_policy:false,
      edit_helpdesk_pa:false,
      edit_helpdesk_ngo:false,
      edit_helpdesk_migrant:false,
    }
  },
  mixins: [editEntityMixin,
  translatedButtonMixin,
    storeMappingMixin({
      getters: {
        features: 'features/features',
        settings: 'settings/settings'
      }, actions: {
        fetchFeatures: 'features/fetchFeatures',
        updateAllFeatures: 'features/updateAllFeatures',
        updateSetting: 'settings/updateSetting',
        saveSetting:'settings/saveSetting',
        fetchTopic: 'topic/fetchTopic',
        fetchMixedSettings:'settings/fetchMixedSettings',
        savingPolicy:'settings/savePolicy',
        updatePolicy: 'settings/updatePolicy'

      }
    })],
  components: {
    FeaturesElement,ActiveLanguageSelector,GlossaryEditor,
  },
  computed: {

  },
  methods: {
    createPolicyShell(){
      this.policy = {id:-1, key:'privacy_policy', published:false, translations:[]}
      this.languages.forEach(l => {
        this.policy.translations.push({ id: -1, lang: l.lang, value: '', translationState: 0 })
      })
      this.policyOrig = JSON.parse(JSON.stringify(this.policy))
    },
    cancelPolicy(){
      this.policy =  JSON.parse(JSON.stringify(this.policyOrig))
      this.editing_policy = false
     
    },
    savePolicy(){
      if(this.newPolicy){
        console.log("saving new policy")
        this.savingPolicy(this.policy)
      }
      else{
        this.updatePolicy(this.policy)
      }
      console.log("updating old policy")
      this.editing_policy = false
      this.policyOrig = JSON.parse(JSON.stringify(this.policy))
    },
    cancelFathers(){
      this.fathers =  JSON.parse(JSON.stringify(this.fathersOrig))
      this.edit_fathers = false
    },
    saveFathers(){
      console.log(this.fathers)
      if(this.newFathers){
        console.log("saving new father_topics")
        this.saveSetting({key:'father_topics', value:JSON.stringify(this.fathers)})
      }
      else{
        this.updateSetting({key:'father_topics', value:JSON.stringify(this.fathers)})
      }
      console.log("updating old father_topics")
      this.edit_fathers = false
      this.fathersOrig = JSON.parse(JSON.stringify(this.fathers))
    },
    cancelMail(){
      this.email =  JSON.parse(JSON.stringify(this.emailOrig))
      this.editing = false
     
    },
    cancelSetting(setting){
      switch(setting) {
        case 'helpdesk_pa':
          this.helpdeskPa =  JSON.parse(JSON.stringify(this.helpdeskPaOrig))
          this.edit_helpdesk_pa = false
          break;
        case y:
          // code block
          break;
        default:
          console.log("non of those")
      }
    },
    saveMail(){
      if(this.isNew){
        console.log("saving new feedback email")
        this.saveSetting({key:'feedback_email', value:this.email})
      }
      else{
        this.updateSetting({key:'feedback_email', value:this.email})
      }
      console.log("updating old feedback email")
      this.editing = false
      this.emailOrig = JSON.parse(JSON.stringify(this.email))
    },
    saveSingleSetting(key, is_new, item){
      if(is_new){
        console.log("saving new feedback email")
        this.saveSetting({key:key, value:item})
      }
      else{
        this.updateSetting({key:key, value:item})
      }
      switch(key) {
        case 'helpdesk_pa':
          this.helpdeskPaOrig =  JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_pa = false
          break;
        case 'helpdesk_ngo':
          this.helpdeskNgoOrig =  JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_ngo = false
          break;
        case 'helpdesk_migrant':
          this.helpdeskMigrantOrig =  JSON.parse(JSON.stringify(item))
          this.edit_helpdesk_pa = false
          break;
        default:
          console.log("non of those")
      }
    },

    saveFeatures () {
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
    saveLogo () {
      console.log(this.myCroppa.generateDataUrl())
      let setting = { key: "pa_logo", value: this.myCroppa.generateDataUrl() }
      this.updateSetting(setting)
        .then((result) => {
          console.log(result)
          //       window.location.reload()
        })
    }

  },
  created () {
    console.log(this.languages)
    console.log("created")
    console.log(this.features)
    console.log(this.settings)
    this.createPolicyShell()
    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    console.log(this.settings['feedback_email'])
    this.settings.forEach((setting) => {
      console.log(setting.key)
      if(setting.key =='feedback_email'){
        this.email = setting.value
        this.emailOrig = setting.value
        this.isNew = false
      }
      if(setting.key =='father_topics'){
        this.fathers = JSON.parse(setting.value)
        this.fathersOrig = JSON.parse(setting.value)
        this.newFathers = false
      }
      if(setting.key =='helpdesk_pa'){
        console.log(setting)
        this.helpdeskPa = setting.value
        this.helpdeskPaOrig = setting.value
        this.newHelpdeskPa = false
      }
      if(setting.key =='helpdesk_ngo'){
        this.helpdeskNgo = setting.value
        this.helpdeskNgoOrig = setting.value
        this.newHelpdeskNgo = false
      }
      if(setting.key =='helpdesk_pamigrant'){
        this.helpdeskMigrant = setting.value
        this.helpdeskMigrantOrig = setting.value
        this.newHelpdeskMigrant = false
      }

    });
    this.fetchMixedSettings().then((setting)=>{
      if(setting.length >0){
        if(setting[0].key == 'privacy_policy'){
        this.policy = setting[0]
        this.policyOrig = setting[0]
        this.newPolicy = false
      }
      }

    })
          this.fetchTopic()
      .then((topics) => {
        console.log(topics)
         var published_topics = topics.filter((top)=>{return top.published == true})
        published_topics.forEach(topic => {
          var the_topic = { label: topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic, value: topic.id }
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
