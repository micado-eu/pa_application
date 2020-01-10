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

        <q-toolbar-title>
          Micado PA Console
        </q-toolbar-title>

        <div>MicadoPA v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <auth-menu />
      <q-list>
        <q-item-label header>PA Console</q-item-label>
        <q-item clickable tag="a" to="/dashboard">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboards</q-item-label>
            <q-item-label caption>Example of dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/documents">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage document types</q-item-label>
            <q-item-label caption>Manage documents needed in flows</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a"  to="/flow">
          <q-item-section avatar>
            <q-icon name="timeline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configure flows</q-item-label>
            <q-item-label caption>Configure process flows</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/chatbot">
          <q-item-section avatar>
            <q-icon name="question_answer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configure services</q-item-label>
            <q-item-label caption>Configure services shown to migrants</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="settings_applications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configure Migrants app settings</q-item-label>
            <q-item-label caption>Customize logo and common settings for migrant's application</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Enable NGO</q-item-label>
            <q-item-label caption>Manage NGO users</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Upload MICADO data</q-item-label>
            <q-item-label caption>Upload CSV data in MICADO</q-item-label>
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
import AuthMenu from './auth/AuthMenu'

export default {
  name: 'MyLayout',

  components: {
    AuthMenu
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
