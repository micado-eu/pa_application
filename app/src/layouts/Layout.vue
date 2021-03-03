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
            src="~assets/powered_Micado_white.png"
          />
        </div>
      </q-list>
    </q-drawer>

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

export default {
  name: 'Layout',
  mixins: [
    storeMappingMixin({
      getters: {
        check: 'auth/check',
        user: 'auth/user',
        pic:'user/pic'
      },
      actions: {
        getUserPic: 'user/getUserPic'
      }
    })],
  components: {
    UserButton
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
  data () {
    return {
      leftDrawerOpen: false,
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
    toLogout () {
      this.$auth.logout()
    },
    changeIcon (key) {
      console.log('selected key')
      this.selectedKey = key
    }
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
