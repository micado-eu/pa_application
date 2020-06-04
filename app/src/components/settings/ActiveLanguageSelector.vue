<template>
  <div class="q-pa-md">
    <h5>{{$options.name}}</h5>

    <q-btn
      v-for="language in languages"
      :key="language.iso_code"
      :unelevated="!language.active"
      :outline="language.active"
      :style="language.active"
      class="q-mx-sm language_btn"
      :label="language.name"
      @click="setActive(language)"
      :id="language.iso_code"
      no-caps
    ></q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LanguageSettings",
  computed: {
    ...mapGetters("language", ["languages"])
  },
  methods: {
    ...mapActions("language", ["fetchLanguages", "setLanguageActive"]),
    setActive(language) {
      let newLanguage = {
        iso_code: language.iso_code,
        name: language.name,
        active: !language.active
      };
      this.setLanguageActive(newLanguage);
    }
  },
  created() {
    this.fetchLanguages();
  }
};
</script>
<style lang="scss" scoped>
.language_btn {
  color: #0f3a5d;
  border-radius: 2px;
}
</style>