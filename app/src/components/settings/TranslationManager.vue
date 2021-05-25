<template>
  <div class="col q-gutter-md">
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('data_settings.manage_translations')}}</div>
      </q-card-section>
      <q-card-section>

        <q-btn
          :label="$t('data_settings.send_to_translation')"
          @click="sendToTranslation()"
        />
        <q-spinner
          class="q-ml-md"
          color="accent"
          v-if="loading"
          size="3em"
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
  data () {
    return {
      def_lang: this.$defaultLang,
      loading: false
    }
  },
  computed: {
    ...mapGetters("language", ["languages"]),
    langOptions () {
      return this.languages.filter((lan)=>{
        return lan.active == true
      })
    }
  },
  methods: {
    ...mapActions("language", ["fetchLanguages", "setLanguageActive"]),
    ...mapActions("settings", ["updateSetting"]),
    setActive (language) {
      let newLanguage = {
        lang: language.lang,
        isoCode: language.isoCode,
        name: language.name,
        active: !language.active
      }
      this.setLanguageActive(newLanguage)
    },
    updateDefLang (val) {
      console.log(val)
    },
    saveDefLang () {
      console.log(this.def_lang)
      let setting = { key: "default_language", value: this.def_lang }
      this.updateSetting(setting)
        .then((result) => {
          console.log(result)
          //       window.location.reload()
        })

    },
    sendToTranslation () {
      this.loading = true
      weblateClient.sendToTranslation()
        .then((result) => {
          this.$q.notify({
            type: 'positive',
            message: this.$t("success_messages.send_translation")
          })
          console.log(result)
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: this.$t("error_messages.send_translation") + error
          })
          console.err(error)
        })
        .finally(() => {
          this.loading = false
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