<template>
  <div class="col q-gutter-md">
   <!-- <h5>{{$t("data_settings.language")}}</h5>-->
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
          :disable="language.lang===def_lang"
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
        <div class="text-h4">{{$t('data_settings.default_language')}}</div>
      </q-card-section>
      <q-card-section>

        <q-select
          filled
          v-model="def_lang"
          :options="langOptions"
          option-value="lang"
          option-label="name"
          option-disable="inactive"
          emit-value
          map-options
          @input="updateDefLang"
          style="min-width: 250px; max-width: 300px"
        />
        <q-btn
          :label="$t('data_settings.set_default_language')"
          @click="saveDefLang"
        ></q-btn>

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
      old_lang: this.$defaultLang
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
    ...mapActions("language", ["fetchLanguages", "setLanguageActive", "setLanguageDefault"]),
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
      console.log(this.old_lang)
      let setting = { key: "default_language", value: this.def_lang }
      this.updateSetting(setting)
        .then((result) => {
          console.log(result)
          this.setLanguageDefault({lang:this.def_lang, isDefault:true})
          this.setLanguageDefault({lang:this.old_lang, isDefault:false})
          this.old_lang = JSON.parse(JSON.stringify(this.def_lang))
          //       window.location.reload()
        })

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