<template>
  <q-card bordered class="q-ma-md">
    <q-card-section>
      <div class="setting_title">
                  <HelpLabel
              :fieldLabel="$t('input_labels.lang_editor')"
              :helpLabel="$t('help.lang_editor')"
            />
        </div>
    </q-card-section>
    <q-separator />
    <q-card-section >
      <q-btn
        class="button"
        :label="$t('button.add_language')"
        no-caps
        :disable="hideAdd"
        @click="newLang"
        size="15px"
      />
    </q-card-section>
    <q-card class="q-pa-xl div-2" :hidden="hideForm">
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class=""
      >
        <HelpLabel
          :fieldLabel="$t('input_labels.language_name')"
          :helpLabel="$t('help.topic')"
          class="div-3"
          style="padding-top: 10px"
        />

        <q-input
          outlined
          filled
          dense
          ref="name"
          counter
          :maxlength="25"
          :hint="$t('input_labels.required')"
          :rules="[
            (val) => val.length <= 25 || 'Please use maximum 25 characters',
            (val) => !!val || 'Field is required',
          ]"
          v-model="language_shell.name"
          :label="$t('input_labels.topic_placeholder')"
        />
        <HelpLabel
          :fieldLabel="$t('input_labels.language_abbr')"
          :helpLabel="$t('help.topic')"
          class="div-3"
          style="padding-top: 10px"
        />

        <q-input
          outlined
          filled
          dense
          ref="iso"
          counter
          :maxlength="25"
          :hint="$t('input_labels.required')"
          :rules="[
            (val) => val.length <= 25 || 'Please use maximum 25 characters',
            (val) => !!val || 'Field is required',
          ]"
          :readonly="!isNew"
          v-model="language_shell.lang"
          :label="$t('input_labels.topic_placeholder')"
        />
        <HelpLabel
          :fieldLabel="$t('input_labels.language_iso')"
          :helpLabel="$t('help.topic')"
          class="div-3"
          style="padding-top: 10px"
        />

        <q-input
          outlined
          filled
          dense
          ref="tag"
          counter
          :maxlength="25"
          :hint="$t('input_labels.required')"
          :rules="[
            (val) => val.length <= 25 || 'Please use maximum 25 characters',
            (val) => !!val || 'Field is required',
          ]"
          v-model="language_shell.isoCode"
          :label="$t('input_labels.topic_placeholder')"
        />
        <q-btn
          no-caps
          class="delete-button"
          unelevated
          rounded
          :label="$t('button.cancel')"
          type="reset"
          @click="cancelLang()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          :label="$t('button.save')"
          class="button"
          type="input"
        />
      </form>
    </q-card>
    <q-list id="list">
      <q-item>
        <q-item-section class="col-4 flex flex-left">
          {{ $t("input_labels.language_name") }}
        </q-item-section>
        <q-item-section class="col-3 flex flex-center top">
          {{ $t("input_labels.language_abbr") }}
        </q-item-section>
        <q-item-section class="col-3 flex flex-center top">
          {{ $t("input_labels.language_iso") }}
        </q-item-section>
        <q-item-section class="col-2 flex flex-center top">
          {{ $t("input_labels.edit") }}
        </q-item-section>
      </q-item>
      <hr id="hr" />

      <q-item v-for="language in languages" :key="language.isoCode">
        <q-item-section
          class="col-4 flex flex-left title"
          style="padding-top: 10px"
          >{{ language.name }}
        </q-item-section>
        <q-item-section class="col-3 flex flex-center top">
          {{ language.lang }}
        </q-item-section>
        <q-item-section class="col-3 flex flex-center top">
          {{ language.isoCode }}
        </q-item-section>
        <q-item-section class="col-2 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Edit.png'"
            :tooltip="$t('help.edit_process')"
            @click.native="editingLang(language)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import IconWithTooltip from "components/IconWithTooltip"
import HelpLabel from "components/HelpLabel"
import storeMappingMixin from "../mixin/storeMappingMixin"


export default {
  name: "LanguageManager",
  props: ["languages"],
  components: {
    IconWithTooltip,
    HelpLabel
  },
  mixins: [
    storeMappingMixin({
      getters: {},
      actions: {
        saveLanguage: "language/saveLanguage",
        updateLanguage: "language/updateLanguage"
      }
    })
  ],
  data() {
    return {
      language_shell: {
        lang: "",
        isoCode: "",
        name: "",
        active: false,
        isDefault: false,
        voiceString: "",
        voiceActive: false
      },
      hideForm: true,
      hideAdd: false,
      isNew: false
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$refs.name)
      console.log(this.$refs.iso)
      console.log(this.$refs.tag)
      this.$refs.name.validate()
      this.$refs.iso.validate()
      this.$refs.tag.validate()
      if (
        this.$refs.name.hasError ||
        this.$refs.iso.hasError ||
        this.$refs.tag.hasError
      ) {
        this.formHasError = true
        this.$q.notify({
          color: "negative",
          message: this.$t("warning.req_fields")
        })
        return false
      } else {
        console.log("in else of submit")
        this.savingLanguage()
        this.onReset()
      }
    },
    onReset() {
      this.$refs.name.resetValidation()
      this.$refs.iso.resetValidation()
      this.$refs.tag.resetValidation()
    },
    savingLanguage() {
      if (this.isNew) {
        // we are adding a new instance
        this.saveLanguage(this.language_shell).then((int_cat) => {
          console.log("saved")
        })
      } else {
        // we are updating the exsisting
        this.updateLanguage(this.language_shell).then((int_cat) => {
          console.log("updated")
        })
      }
      this.hideAdd = false
      this.hideForm = true
      this.createShell()
    },
    cancelLang() {
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
    },
    createShell() {
      this.language_shell = {
        lang: "",
        isoCode: "",
        name: "",
        active: false,
        isDefault: false,
        voiceString: "",
        voiceActive: false
      }
    },
    editingLang(lang) {
      this.isNew = false
      this.hideForm = false
      this.mergeLang(lang)
    },
    mergeLang(lang) {
      console.log(lang)
      this.language_shell.lang = lang.lang
      this.language_shell.isoCode = lang.isoCode
      this.language_shell.name = lang.name
      this.language_shell.active = lang.active
      this.language_shell.isDefault = lang.isDefault
      this.language_shell.voiceString = lang.voiceString
      this.language_shell.voiceActive = lang.voiceActive
    },
    newLang() {
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    }
  }
}
</script>
<style scoped>
.setting_title{
  font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #000000;
}
.button{
  background: #0B91CE;
border-radius: 5px;
color: white;
}
</style>
