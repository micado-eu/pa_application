<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="closeDrawers()"
          icon="menu"
          aria-label="Menu"
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
      <auth-menu />
      <q-list dark>
        <q-item-label header>{{ $t('menu.title') }}</q-item-label>
        <q-item
          clickable
          exact
          dark
          active
          active-class="my-menu-link"
          v-for="(nav) in navs"
          @click="changeIcon(nav.label)"
          :to="nav.to"
          :key="nav.label"
          style="padding-top:16px; padding-bottom:16px"
        >
          <q-item-section avatar>
            <q-icon :key="nav.label" :name="(selectedKey == nav.label) ? nav.active_icon : nav.icon " />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t( nav.label) }}</q-item-label>
            <q-item-label caption>{{ $t(nav.description) }}</q-item-label>
          </q-item-section>
        </q-item>
        <br />
        <div class="row justify-center full-height full-width text-center">
          <img alt="Powered by Micado" src="~assets/powered_Micado_white.png" />
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
import AuthMenu from "./auth/AuthMenu";

//import ListenToggle from 'components/ListenToggle'

export default {
  name: "Layout",

  components: {
    AuthMenu
  },

  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "menu.home",
          icon: "img:statics/icons/Icon - Home.png",
          active_icon:"img:statics/icons/Icon - Home (selected).png",
          to: "/",
          description: "menu.home_desc"
        },
        {
          label: "menu.situation",
          icon: "img:statics/icons/Icon - Migration Situation Monitor.png",
          active_icon:"img:statics/icons/Icon - Migration Situation Monitor (selected).png",
          to: "/situation/editor",
          description: "menu.situation_desc"
        },
        {
          label: "menu.migrant",
          icon: "img:statics/icons/Icon - Migrant Management.png",
          active_icon:"img:statics/icons/Icon - Migrant Management (selected).png",
          to: "/migrant",
          description: "menu.migrant_desc"
        },
        {
          label: "menu.cso",
          icon: "img:statics/icons/Icon - CSO Admin Management.png",
          active_icon:"img:statics/icons/Icon - CSO Admin Management (selected).png",
          to: "/cso",
          description: "menu.cso_desc"
        },
        {
          label: "menu.process",
          icon: "img:statics/icons/Icon - Guided Processes.png",
          active_icon:"img:statics/icons/Icon - Guided Processes (selected).png",
          to: "/guided_process_editor",
          description: "menu.process_desc"
        },
        {
          label: "menu.information_centre",
          icon: "img:statics/icons/Icon - Information Centre.png",
          active_icon:"img:statics/icons/Icon - Information Centre (selected).png",
          to: "/information",
          description: "menu.information_centre_desc"
        },
        {
          label: "menu.usage",
          icon: "img:statics/icons/Icon - Micado Stats.png",
          active_icon:"img:statics/icons/Icon - Micado Stats (selected).png",
          to: "/dashboard",
          description: "menu.usage_desc"
        },
        {
          label: "menu.glossary",
          icon: "img:statics/icons/Icon - Glossary.png",
          active_icon:"img:statics/icons/Icon - Glossary (selected).png",
          to: "/glossary",
          description: "menu.glossary_desc"
        },
        {
          label: "menu.chatbot",
          icon: "img:statics/icons/Icon - Chatbot.png",
          active_icon:"img:statics/icons/Icon - Chatbot (selected).png",
          to: "/chatbot",
          description: "menu.chatbot_desc"
        },
        {
          label: "menu.setting",
          icon: "img:statics/icons/Icon - Settings.png",
          active_icon:"img:statics/icons/Icon - Settings (selected).png",
          to: "/data_settings/document_types",
          description: "menu.setting_desc"
        }
      ],
      selectedKey: "menu.home"
    };
  },
  methods: {
    changeIcon(key) {
      console.log("selected key")
      this.selectedKey = key
  },
  closeDrawers(){
    this.leftDrawerOpen = !this.leftDrawerOpen
    this.$root.$emit('drawer', this.leftDrawerOpen);
  }
  
},
  
};
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
