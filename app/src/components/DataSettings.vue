<template>
  <div>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          name="data"
          :label="$t('data_settings.data_management')"
        />
        <q-tab
          name="settings"
          :label="$t('data_settings.settings')"
        />
        <q-tab
          name="language"
          :label="$t('data_settings.language')"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel
          name="data"
          class="q-pa-none"
        >

          <q-splitter v-model="splitterModel">

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-teal"
              >
                <q-tab
                  name="dataDocType"
                  icon="mail"
                  :label="$t('data_settings.document_types')"
                />
                <q-tab
                  name="dataIntCat"
                  icon="alarm"
                  :label="$t('data_settings.intervention_categories')"
                />
                <q-tab
                  name="dataIntType"
                  icon="movie"
                  :label="$t('data_settings.intervention_types')"
                />
                <q-tab
                  name="dataTopic"
                  icon="movie"
                  :label="$t('data_settings.topics')"
                />
                <q-tab
                  name="dataUserType"
                  icon="movie"
                  :label="$t('data_settings.user_types')"
                />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="dataDocType">
                  <DocumentTypeManager @scroll="scrollTo" />
                </q-tab-panel>

                <q-tab-panel name="dataIntCat">
                  <IntegrationCategory @scroll="scrollTo" />
                </q-tab-panel>

                <q-tab-panel name="dataIntType">
                  <IntegrationType @scroll="scrollTo" />
                </q-tab-panel>
                <q-tab-panel name="dataTopic">
                  <Topic @scroll="scrollTo" />
                </q-tab-panel>
                <q-tab-panel name="dataUserType">
                  <UserType @scroll="scrollTo" />
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="settings">
          <div class="text-h6">Settings for MICADO migrant application</div>
          <FunctionConfiguration />
        </q-tab-panel>

        <q-tab-panel name="language">
          <ActiveLanguageSelector />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </div>
</template>

<script>
import DocumentTypeManager from "./data_settings/DocumentTypeManager";
import IntegrationCategory from "./data_settings/IntegrationCategory";
import IntegrationType from "./data_settings/IntegrationType";
import Topic from "./data_settings/Topic";
import UserType from "./data_settings/UserType";
import ActiveLanguageSelector from "./settings/ActiveLanguageSelector.vue";
import FunctionConfiguration from "./settings/FunctionConfiguration.vue";

const TIMEOUT = 1;

export default {
  name: "DataSettings",
  components: {
    DocumentTypeManager,
    IntegrationCategory,
    IntegrationType,
    Topic,
    UserType,
    ActiveLanguageSelector,
    FunctionConfiguration,
  },
  data() {
    return {
      tab: 'data',
      innerTab: 'innerMails',
      splitterModel: 20
    }
  },
  computed: {},
  mounted() {
    // has to use a brief timeout
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 1000);
    }
  },
  methods: {
    scrollTo: function (hash) {
      location.href = this.$route.path + hash;
    }
  }
};
</script>

<style>
</style>
