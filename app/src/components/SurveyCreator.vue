<template>
  <div>
    <div class="row">
      <div class="col-6">
        <h5>{{$t('data_settings.surveymanagement')}}</h5>
      </div>
      <div class="col-6 div-1">
        <q-btn
          color="info"
          no-caps
          :data-cy="'addSurvey'"
          :label="$t('button.add_survey')"
          @click="newSurvey()"
          :disable="hideAdd"
          class="add-button"
        />
      </div>
    </div>
    <q-card
      class="q-pa-xl div-2"
      :hidden="hideForm"
    >
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.surveymanagement')}}</div>
      </q-card-section>
      <q-card-section>
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.title')"
              :helpLabel="$t('help.survey_title')"
              class="div-3"
            />
            <q-input
              :readonly="!is_new"
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="title"
              :hint="$t('input_labels.required')"
              outlined
              maxlength="50"
              counter
              :rules="[ 
                val => val.length <= 50 || 'Please use maximum 50 characters',
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.title"
            />
          </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.survey')"
              :helpLabel="$t('help.survey_content')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="survey"
              :hint="$t('input_labels.required')"
              outlined
              type="textarea"
              @input="changedJson()"
              counter
              :rules="[ 
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.survey"
            />
          </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.activationDate')"
              :helpLabel="$t('help.survey_activationDate')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="survey"
              :hint="$t('input_labels.required')"
              outlined
              counter
              :rules="[ 
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.activationDate"
            >
            <template v-slot:prepend>
        <q-icon
          name="event"
          class="cursor-pointer"
          data-cy="date_icon"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="new_survey.activationDate"
              mask="YYYY-MM-DD"
              color="accent"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$t('date_selector.close')"
                  color="accent"
                  flat
                  data-cy="close_date_menu"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
            </q-input>
          </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.expiryDate')"
              :helpLabel="$t('help.survey_expiryDate')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="survey"
              :hint="$t('input_labels.required')"
              outlined
              counter
              :rules="[ 
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.expiryDate"
            >
                        <template v-slot:prepend>
        <q-icon
          name="event"
          class="cursor-pointer"
          data-cy="date_icon"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="new_survey.expiryDate"
              mask="YYYY-MM-DD"
              color="accent"
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$t('date_selector.close')"
                  color="accent"
                  flat
                  data-cy="close_date_menu"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
            </q-input>
          </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.active')"
              :helpLabel="$t('help.survey_activation')"
              class="div-3"
            />
            <q-toggle
              v-model="new_survey.active"
              color="green"
            />
          </div>
          <div
            class=" q-pa-xsm "
            id="div-2"
          >
            <HelpLabel
              :fieldLabel="$t('new_survey.destinationApp')"
              :helpLabel="$t('help.survey_destinationApp')"
              class="div-3"
            />
            <q-select
              filled
              v-model="new_survey.destinationApp"
              :options="syrvey_options"
              label="Standard"
              emit-value
              map-options
            />
          </div>
          <hr id="hr">
          <q-btn
            no-caps
            class="delete-button"
            :data-cy="'canceldoc'"
            unelevated
            rounded
            :label="$t('button.cancel')"
            type="reset"
            @click="cancelSurvey()"
          />
          <q-btn
            no-caps
            :data-cy="'savedoc'"
            color="accent"
            unelevated
            rounded
            :label="$t('button.save')"
            class="button"
            type="submit"
          />
        </form>
        <hr id="hr">

        <div id="surveyContainer">
          <survey :survey="surveyrender"></survey>
        </div>
      </q-card-section>
    </q-card>
    <q-item  style="">
    <q-item-section class="col-3 flex flex-left " >
        {{$t('input_labels.name')}}
    </q-item-section>
    <q-item-section class="col-1 flex flex-center top" style="margin-left:0px" >
        {{$t('input_labels.active')}}
      </q-item-section>
    <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.start_date_survey')}}
      </q-item-section>
    <q-item-section class="col-1 flex flex-center top">
        {{$t('input_labels.end_date_survey')}}
      </q-item-section>
    <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.related_app')}}
      </q-item-section>
       <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.answers')}}
      </q-item-section>
    <q-item-section class="col-1 flex flex-center top" >
       {{$t('input_labels.edit')}}
    </q-item-section>
     <q-item-section class="col-1 flex flex-center top" >
       {{$t('button.download')}}
    </q-item-section>
    <q-item-section class="col-1 flex flex-center top" >
      {{$t('input_labels.delete')}}
    </q-item-section>
        </q-item>
    <q-list
      bordered
      separator
    >
      <SurveyElement
        v-for="survey in surveys"
        :key="survey.id"
        :theSurvey="survey"
        @editSurvey="editSurvey(survey.id)"
        @remove="deletingSurvey(survey.id)"
        @download="downloadSurvey"
      />
    </q-list>
  </div>
</template>

<script>
//import * as SurveyCreator from "survey-creator";
//import "survey-creator/survey-creator.css";
import * as SurveyVue from "survey-vue";
//import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";
import * as SurveyKo from "survey-knockout";
import * as widgets from "surveyjs-widgets";
import storeMappingMixin from '../mixin/storeMappingMixin'
import SurveyElement from './survey/SurveyElement'
import HelpLabel from 'components/HelpLabel'


export default {
  name: "survey-creator",
  data () {
    return {
      hideAdd: false,
      hideForm: true,
      is_new: true,
      syrvey_options: [
        {
          label: this.$t("new_survey.dest_opt_migrant"),
          value: 0
        },
        {
          label: this.$t("new_survey.dest_opt_pa"),
          value: 1
        },
        {
          label: this.$t("new_survey.dest_opt_ngo"),
          value: 2
        }
      ],
      new_survey: {
        id: 0,
        survey: {},
        active: false,
        activationDate: null,
        expiryDate: null,
        title: '',
        destinationApp: 0,
        answerNumber:0
      }
    };
  },
  computed: {
    surveyrender () {
      console.log("computed surveyrender")
      console.log(this.new_survey)
      if (this.new_survey) {
        return new SurveyVue.Model(this.new_survey.survey)
      } else {
        return null
      }
    }

  },
  components: {
    SurveyElement, HelpLabel
  },
  mixins: [
    storeMappingMixin({
      getters: {
        surveys: 'survey/surveys'
      },
      actions: {
        fetchSurvey: 'survey/fetchSurvey',
        saveSurvey: 'survey/saveSurvey',
        updateSurvey:'survey/editSurvey',
        deleteSurvey:'survey/deleteSurvey',
        fetchCSV:'survey/fetchCSV'
      }
    })],
  mounted () {
    let options = { showEmbededSurveyTab: true };
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.saveSurveyFunc = function () {
      console.log(JSON.stringify(this.text));
    };
  },
  async created () {
    console.log("created")
    await this.fetchSurvey()
    console.log(this.surveys)
    //    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    /*
    this.fetchFeatures()
      .then(features => {
        //        this.loading = false
        console.log("got features")
        console.log(this.features)
      });
      */

  },
  methods: {
    downloadSurvey(value){
      console.log(value)
      this.fetchCSV(value).then((csv)=>{
        console.log(csv)
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', 'survey' + value.surveyid);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      })
    },
    onSubmit(){
      this.$refs.title.validate()
      this.$refs.survey.validate()
      if (this.$refs.title.hasError || this.$refs.survey.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: 'You need to fill in the required fields first'
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savingSurvey()
      }
    },
    newSurvey () {
      this.$refs.title.resetValidation()
      this.$refs.survey.resetValidation()


      this.is_new = true
      this.hideAdd = true
      this.hideForm = false
    },
    savingSurvey(){
    JSON.stringify(this.new_survey.survey)
    var expiry = new Date(this.new_survey.expiryDate).toISOString();
    this.new_survey.expiryDate = expiry
    var activation = new Date(this.new_survey.activationDate).toISOString();
    this.new_survey.activationDate = activation
    console.log(this.new_survey.expiryDate)
    console.log(this.new_survey.activationDate)
      if(this.is_new){
      //var working_survey = JSON.parse(JSON.stringify(this.new_survey, ['survey', 'active', 'activationDate', 'expiryDate', 'title', 'destinationApp']))
      //console.log(working_survey)
      this.saveSurvey(this.new_survey) 
      this.hideAdd = false
      this.hideForm = true
      }
      else{
            //var working_survey = JSON.parse(JSON.stringify(this.new_survey, ['id','survey', 'active', 'activationDate', 'expiryDate', 'title', 'destinationApp']))
        this.updateSurvey(this.new_survey)
      this.hideAdd = false
      this.hideForm = true
      }
      
    },
    cancelSurvey () {
      this.hideAdd = false
      this.hideForm = true

    },
    changedJson () {
      console.log("chenged json")
      console.log(this.new_survey.survey)
    },
    editSurvey(id){
      var the_survey = this.surveys.filter((sur)=>{
        return sur.id == id
      })[0]
      console.log(the_survey)
      JSON.parse(the_survey.survey)
      this.new_survey = JSON.parse(JSON.stringify(the_survey)) 
      this.is_new = false
      this.hideAdd = true
      this.hideForm = false
    },
    deletingSurvey(id){
      console.log("in deleting survey")
      this.$q.notify({
        type: 'warning',
        timeout:0,
        message: 'Warning: Deleting a survey will also delete all related answers. Proceed?',
        actions: [
          { label: 'Delete', color: 'red', handler: () => { 
            this.deleteSurvey(id)
               } },
          { label: 'Back', color: 'accent', handler: () => { 
            console.log("not deleting")
            } }
        ]
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>