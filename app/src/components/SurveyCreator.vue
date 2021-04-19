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
              type="date"
              @input="changedJson()"
              counter
              :rules="[ 
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.activationDate"
            />
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
              type="date"
              counter
              :rules="[ 
                val => !!val || 'Field is required'
                ]"
              v-model="new_survey.expiryDate"
            />
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

    <q-list
      bordered
      separator
    >
      <SurveyElement
        v-for="survey in surveys"
        :key="survey.id"
        :theSurvey="survey"
        @editSurvey="editSurvey"
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
      new_survey: {
        id: 0,
        survey: {},
        active: false,
        activationDate: new Date(),
        expiryDate: '',
        title: '',
        destinationApp: 0
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
        saveSurvey: 'survey/saveSurvey'
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
    newSurvey () {
      this.$refs.title.resetValidation()
      this.$refs.survey.resetValidation()


      this.is_new = true
      this.hideAdd = true
      this.hideForm = false
    },
    cancelSurvey () {
      this.hideAdd = false
      this.hideForm = true

    },
    changedJson () {
      console.log("chenged json")
      console.log(this.new_survey.survey)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>