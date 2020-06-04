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

        <q-toolbar-title>Micado App</q-toolbar-title>

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
            <q-item-label caption>{{ nav.description }}</q-item-label>
          </q-item-section>
        </q-item>
        <br />
        <div class="row justify-center full-height full-width text-center">
          <img alt="Powered by Micado" src="~assets/powered_Micado_white.png" />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
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
          description: ""
        },
        {
          label: "menu.situation",
          icon: "dvr",
          to: "/situation/city",
          description: "Dashboard and charts of migration situation"
        },
        {
          label: "menu.migrant",
          icon: "face",
          to: "/migrant",
          description: "manage migrant accounts"
        },
        {
          label: "menu.ngo",
          icon: "business",
          to: "/cso",
          description: "manage CSO accounts"
        },
        {
          label: "menu.process",
          icon: "linear_scale",
          to: "/guided_process_editor",
          description: "Edit guided processes information"
        },
        {
          label: "menu.information_centre",
          icon: "description",
          to: "/information",
          description: "Manage the information"
        },
        {
          label: "menu.usage",
          icon: "bar_chart",
          to: "/dashboard",
          description: "Dashboard and charts of the MICADO app usage"
        },
        {
          label: "menu.glossary",
          icon: "img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png",
          to: "/glossary",
          description: "Manage the glossary"
        },
        {
          label: "menu.chatbot",
          icon: "adb",
          to: "/chatbot",
          description: "Manage and train the MICADO Bot"
        },
        {
          label: "menu.setting",
          icon: "settings",
          to: "/data_settings",
          description: "Manage MICADO application"
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
