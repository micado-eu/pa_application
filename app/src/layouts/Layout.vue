<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
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
          :to="nav.to"
          :key="nav.label"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
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
          icon: "home",
          to: "/",
          description: "menu.home_desc"
        },
        {
          label: "menu.situation",
          icon: "dvr",
          to: "/situation/map",
          description: "menu.situation_desc"
        },
        {
          label: "menu.migrant",
          icon: "face",
          to: "/migrant",
          description: "menu.migrant_desc"
        },
        {
          label: "menu.cso",
          icon: "business",
          to: "/cso",
          description: "menu.cso_desc"
        },
        {
          label: "menu.process",
          icon: "linear_scale",
          to: "/guided_process_editor",
          description: "menu.process_desc"
        },
        {
          label: "menu.information_centre",
          icon: "description",
          to: "/information",
          description: "menu.information_centre_desc"
        },
        {
          label: "menu.usage",
          icon: "bar_chart",
          to: "/dashboard",
          description: "menu.usage_desc"
        },
        {
          label: "menu.glossary",
          icon: "img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png",
          to: "/glossary",
          description: "menu.glossary_desc"
        },
        {
          label: "menu.chatbot",
          icon: "adb",
          to: "/chatbot",
          description: "menu.chatbot_desc"
        },
        {
          label: "menu.setting",
          icon: "settings",
          to: "/data_settings",
          description: "menu.setting_desc"
        }
      ]
    };
  }
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
