<template>
  <q-page padding>
    <div
      class="q-gutter-lg row"
      v-for="i in Math.ceil(languages.length / 4)"
      v-bind:key="i"
    >
      <div
        class="q-gutter-xs col"
        v-for="language in languages.slice((i - 1) * 4, i * 4)"
        style="text-align:center"
        :id="language.iso_code"
        @click="setActive(language)"
        v-bind:key="language.iso_code"
      >
        <!-- TODO: Change color to primary when styles are correctly set -->
        <q-btn
          v-bind:unelevated="!language.active"
          v-bind:outlined="language.active"
          rounded
          style="color: #0F3A5D;"
          v-bind:label="language.name"
          no-caps
        >
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  computed: {
    ...mapGetters('language', ['languages'])
  },
  methods: {
    ...mapActions("language", ["fetchLanguages", "setLanguageActive"]),
    setActive (language) {
      let newLanguage = {
        iso_code: language.iso_code,
        name: language.name,
        active: !language.active
      }
      this.setLanguageActive(newLanguage)
    }
  },
  created () {
    this.fetchLanguages()
  }
}
</script>