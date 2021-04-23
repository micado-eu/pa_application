<template>
  <q-page class="col center">
    <div class="col">
      <img
        alt="Micado logo"
        src="~assets/micado-logo.png"
      >
      <div>
        PA Application
      </div>
      <div class="h6">Build: {{buildDate}}</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      buildDate: new Date(this.$envconfig.appBuildDate)
    }
  },
  methods: {
    toLogin () {
      this.$auth.login()
    }
  }
}
</script>
