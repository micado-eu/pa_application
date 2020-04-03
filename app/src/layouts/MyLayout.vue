<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Micado PA Console</q-toolbar-title>

        <div>MicadoPA v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <auth-menu />
      <q-list>
        <q-item-label header>PA Console</q-item-label>
        <q-item clickable v-for="item in menuConfig" :key="item.id" tag="a" :to="item.to" :target="item.target" :href="item.href">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.name}}</q-item-label>
            <q-item-label caption>{{item.caption}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthMenu from "./auth/AuthMenu";

export default {
  name: "MyLayout",

  components: {
    AuthMenu
  },

  data() {
    return {
      leftDrawerOpen: false,
      menuConfig: {
        "Dashboards": {
          id: 1,
          name: "Dashboards",
          caption: "Example of dashboard",
          icon: "assessment",
          to: "/dashboard",
          href: null,
          target: null
        },
        "Manage document types": {
          id: 2,
          name: "Manage document types",
          caption: "Manage documents needed in flows",
          icon: "description",
          to: "/documents",
          href: null,
          target: null
        },
        "Configure flows": {
          id: 3,
          name: "Configure flows",
          caption: "Configure process flows",
          icon: "timeline",
          to: "/flow",
          href: null,
          target: null
        },
        "Configure services": {
          id: 4,
          name: "Configure services",
          caption: "Configure services shown to migrants",
          icon: "question_answer",
          to: "/requestmediation",
          href: null,
          target: null
        },
        "Configure Migrants app settings": {
          id: 5,
          name: "Configure Migrants app settings",
          caption: "Customize logo and common settings for migrant's application",
          icon: "settings_applications",
          to: null,
          href: "https://forum.quasar.dev",
          target: "_blank"
        },
        "Enable NGO": {
          id: 6,
          name: "Enable NGO",
          caption: "Manage NGO users",
          icon: "supervisor_account",
          to: null,
          href: "https://twitter.quasar.de",
          target: "_blank"
        },
        "Upload MICADO data": {
          id: 7,
          name: "Upload MICADO data",
          caption: "Upload CSV data in MICADO",
          icon: "public",
          to: null,
          href: "https://facebook.quasar.dev",
          target: "_blank"
        }
      }
    };
  }
};
</script>
