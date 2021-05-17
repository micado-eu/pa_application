<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      elevated
      class="bg-accent"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          data-cy="menu_button"
        />

        <q-toolbar-title>{{$t("application_title")}}</q-toolbar-title>
        <q-btn
          v-if="this.$auth.loggedIn() && this.surveyJSON != null"
          no-caps
          style="background-color:white; color:#0B91CE"
          :label="$t('data_settings.survey')"
          @click="generateSurvey"
        />
        <div>Micado v0.1</div>

      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(nav) in navs"
          :to="nav.to"
          :key="nav.label"
          :label="$t( nav.label )"
          :icon="nav.icon"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="767"
      bordered
      content-class="bg-accent text-white"
    >
      <div class="column flex-center q-gutter-y-md">
        <UserButton />
        <!--<q-btn
          round
          class="q-gutter-y-md"
          v-if="isLoggedIn"
        >
          <q-avatar size="42px">
            <img v-if="userpic!=null" src="https://cdn.quasar.dev/img/avatar2.jpg">
            <img v-else :src="this.userpic">
          </q-avatar>
        </q-btn>-->
      </div>

      <q-item
        clickable
        @click="toLogin()"
        v-if="!isLoggedIn"
      >
        <q-item-section avatar>
          <q-icon name="exit_to_app" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('menu.login') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        @click="toLogout()"
        v-if="isLoggedIn"
      >
        <q-item-section avatar>
          <q-icon name="power_settings_new" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('menu.logout') }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-list
        dark
        v-if="isLoggedIn"
      >
        <q-item-label header>{{ $t('menu.title') }}</q-item-label>
        <q-item
          :disable="nav.auth != undefined ? !check(nav.auth) : false"
          :data-cy="nav.label.replace('.', '_')"
          exact
          dark
          active
          clickable
          v-feature-flipping="nav.feature"
          active-class="my-menu-link"
          v-for="(nav) in navs"
          @click="changeIcon(nav.label)"
          :to="nav.to"
          :key="nav.label"
          style="padding-top:16px; padding-bottom:16px"
        >
          <q-item-section avatar>
            <q-icon
              :key="nav.label"
              :name="(selectedKey == nav.label) ? nav.active_icon : nav.icon "
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t( nav.label) }}</q-item-label>
            <q-item-label caption>{{ $t(nav.description) }}</q-item-label>
          </q-item-section>
        </q-item>
        <br />
        <div class="row justify-center full-height full-width text-center">
          <img
            alt="Powered by Micado"
            src="~assets/Powered by micado - white.svg"
          />
        </div>
      </q-list>
    </q-drawer>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Survey</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div id="surveyContainer">
            <survey :survey="survey"></survey>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import ListenToggle from 'components/ListenToggle'
import storeMappingMixin from '../mixin/storeMappingMixin'
import UserButton from 'components/UserButton'
import * as SurveyVue from 'survey-vue'


export default {
  name: 'Layout',
  mixins: [
    storeMappingMixin({
      getters: {
        check: 'auth/check',
        user: 'auth/user',
        pic:'user/pic',
        activeSurvey: 'survey/activeSurvey'
      },
      actions: {
        getUserPic: 'user/getUserPic',
        fetchPASurvey:'survey/fetchPASurvey',
        saveSurveyAnswer: 'survey/saveSurveyAnswer'
      }
    })],
  components: {
    UserButton,
    SurveyVue
  },
  computed: {
    isLoggedIn () {
      console.log("called isloggedin")
      return this.$auth.loggedIn() && this.check(["Application/micado_migrant_manager","Application/micado_superadmin","Application/micado_admin"])
    },
   /* userpic_computer(){
       if(this.$store.state.auth.user != null){
         console.log(this.pic)
      return this.pic[0].picture
       }
    }*/
    },
  created () {
    console.log("AUTH IN LAYOUT")
    console.log(this.$auth.loggedIn())
    console.log(this.user)
     if(this.$store.state.auth.user != null){
      this.getUserPic(this.user.umid).then((user_found)=>{
        console.log("I AM THE PICTURE")
        console.log(user_found)
      })
  }
  },
  mounted(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = "window._mfq = window._mfq || [];(function () {var mf = document.createElement(\"script\"); mf.type = \"text/javascript\"; mf.defer = true;      mf.src = \"//cdn.mouseflow.com/projects/" + this.$envconfig.paMouseflow + ".js\";      document.getElementsByTagName(\"head\")[0].appendChild(mf);    })();";
    document.getElementsByTagName('head')[0].appendChild(script);

  },
  data () {
    return {
      leftDrawerOpen: false,
      alert: false,
      survey: null,
      surveyJSON: null,
      navs: [
        {
          label: 'menu.home',
          icon: 'img:statics/icons/Icon - Home.png',
          active_icon: 'img:statics/icons/Icon - Home (selected).png',
          to: '/',
          feature: "FEAT_DEFAULT",
          description: 'menu.home_desc'
        },
        {
          label: 'menu.situation',
          icon: 'img:statics/icons/Icon - Migration Situation Monitor.png',
          active_icon: 'img:statics/icons/Icon - Migration Situation Monitor (selected).png',
          to: '/situation/main',
          feature: "FEAT_DEFAULT",
          description: 'menu.situation_desc'
        },
        {
          label: 'menu.migrant',
          icon: 'img:statics/icons/Icon - Migrant Management.png',
          active_icon: 'img:statics/icons/Icon - Migrant Management (selected).png',
          to: '/migrant',
          feature: "FEAT_DEFAULT",
          auth: "Application/micado_migrant_manager",
          description: 'menu.migrant_desc'
        },
        {
          label: 'menu.cso',
          icon: 'img:statics/icons/Icon - CSO Admin Management.png',
          active_icon: 'img:statics/icons/Icon - CSO Admin Management (selected).png',
          to: '/cso',
          feature: "FEAT_DEFAULT",
          description: 'menu.cso_desc',
          auth: "Application/micado_superadmin"
        },
        {
          label: 'menu.process',
          icon: 'img:statics/icons/Icon - Guided Processes.png',
          active_icon: 'img:statics/icons/Icon - Guided Processes (selected).png',
          to: '/guided_process_editor',
          feature: "FEAT_PROCESSES",
          description: 'menu.process_desc'
        },
        {
          label: 'menu.information_centre',
          icon: 'img:statics/icons/Icon - Information Centre.png',
          active_icon: 'img:statics/icons/Icon - Information Centre (selected).png',
          to: '/information',
          feature: "FEAT_EVENTS",
          description: 'menu.information_centre_desc'
        },
        {
          label: 'menu.events',
          icon: 'img:statics/icons/Icon - Events (30x30).png',
          active_icon: 'img:statics/icons/Icon - Events (selected) (30x30).png',
          to: '/events',
          feature: "FEAT_EVENTS",
          description: 'menu.events_desc'
        },
        {
          label: 'menu.usage',
          icon: 'img:statics/icons/Icon - Micado Stats.png',
          active_icon: 'img:statics/icons/Icon - Micado Stats (selected).png',
          to: '/dashboard',
          feature: "FEAT_DEFAULT",
          description: 'menu.usage_desc'
        },
        {
          label: 'menu.glossary',
          icon: 'img:statics/icons/Icon - Glossary.png',
          active_icon: 'img:statics/icons/Icon - Glossary (selected).png',
          to: '/glossary',
          feature: "FEAT_GLOSSARY",
          description: 'menu.glossary_desc'
        },
        /*{
          label: 'menu.chatbot',
          icon: 'img:statics/icons/Icon - Chatbot.png',
          active_icon: 'img:statics/icons/Icon - Chatbot (selected).png',
          to: '/chatbot',
          feature: "FEAT_ASSISTANT",
          description: 'menu.chatbot_desc'
        },*/
        {
          label: 'menu.setting',
          icon: 'img:statics/icons/Icon - Settings.png',
          active_icon: 'img:statics/icons/Icon - Settings (selected).png',
          to: '/data_settings/document_types',
          feature: "FEAT_DEFAULT",
          description: 'menu.setting_desc'
        }
      ],
      selectedKey: 'menu.home',
      userpic:null
    }
  },
  methods: {
    toLogin () {
      this.$auth.login()
    },
    generateSurvey () {
      console.log("computed surveyrender")
      console.log(this.surveyJSON)
      if (this.surveyJSON != null) {
        this.survey = new SurveyVue.Model(this.surveyJSON)
        console.log("after survey initialization")
        this.survey.onComplete.add((result) => {
          console.log("result of SURVEY")
          console.log(result.data)
          this.saveResults(result.data)
        })
        this.alert = true
        return this.survey
      } else {
        return null
      }
    },
     saveResults (answer) {
      console.log(this.activeSurvey)
      var formatted_results = {
        idSurvey: this.activeSurvey.id,
        idUser: this.user.umid,
        answer: JSON.stringify(answer),
        answerDate: new Date().toISOString()
      }
      console.log(formatted_results)
      this.saveSurveyAnswer(formatted_results)
      console.log("I am saving the results of the survey!!!!!")
    },
    toLogout () {
      this.$auth.logout()
    },
    changeIcon (key) {
      console.log('selected key')
      this.selectedKey = key
    }
  },
  created(){
        this.fetchPASurvey(this.user.umid).then((sr) => {
      console.log("I AM THE SUrVEY")
      console.log(sr)
      if(sr != null){
        this.surveyJSON = JSON.parse(sr.survey)
      }
      console.log("I AM THE SUrVEY json")

      console.log(this.surveyJSON)
    })
  }

}
</script>

<style>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
  .my-menu-link {
    color: white;
    background: #0b91ce;
  }
  body {
    font-family: "Nunito", sans-serif;
  }
}
</style>
