<template>
  <div class="col q-gutter-md">
    <h5>{{$t("data_settings.language")}}</h5>
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('data_settings.manage_languages')}}</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          v-for="language in languages"
          :key="language.isoCode"
          :outline="!language.active"
          :style="language.active"
          class="q-mx-sm language_btn"
          :label="language.name"
          @click="setActive(language)"
          :id="language.isoCode"
          color="accent"
          no-caps
        ></q-btn>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('data_settings.manage_translations')}}</div>
      </q-card-section>
      <q-card-section>

        <q-btn
          :label="$t('data_settings.send_to_translation')"
          @click="sendToTranslation()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import weblateClient from 'api-weblate-client'

export default {
  name: "LanguageSettings",
  computed: {
    ...mapGetters("language", ["languages"])
  },
  methods: {
    ...mapActions("language", ["fetchLanguages", "setLanguageActive"]),
    setActive (language) {
      let newLanguage = {
        lang: language.lang,
        isoCode: language.isoCode,
        name: language.name,
        active: !language.active
      }
      this.setLanguageActive(newLanguage)
    },
    sendToTranslation () {
      weblateClient.sendToTranslation()
        .then((result) => {
          console.log(result)
        })
    }
  },
  created () {
    this.fetchLanguages()
  }
}
</script>
<style lang="scss" scoped>
.language_btn {
  border-radius: 2px;
}
</style>