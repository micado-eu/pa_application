<template>
  <q-layout id="migration-situation-container">
    <q-drawer
      v-model="open"
      key="situation-drawer"
      show-if-above
      bordered
      :content-style="{backgroundColor: '#DCE4E8',border: 'none'}"
      class="situation-drawer"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template>
            <q-separator class="bg-dark-separator"  />
            <q-expansion-item
              class="situation-menu-expansion-item"
              expand-separator
              :label="$t('data_settings.data_management')"
              caption
              clickable
              default-opened

            >
              <q-item
                v-for="setting in data_settings"
                :key="setting.label"
                :header-inset-level="1"
                clickable
                :to=" '/data_settings' + setting.link"
                class="sub-item"
                active-class="my-menu-link"
              >
                <q-item-section>{{ $t(setting.label) }}</q-item-section>
              </q-item>
            </q-expansion-item>
            <q-separator class="bg-dark-separator" />
            </template>
            <q-item
                clickable
                to="/data_settings/settings"
                class="situation-menu-item"
                active-class="my-menu-link"
              >
                <q-item-section>{{ $t('data_settings.settings') }}</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/data_settings/language"
                class="situation-menu-item"
                active-class="my-menu-link"
              >
                <q-item-section>{{ $t('data_settings.language') }}</q-item-section>
              </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
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
      open:true,
      tab: 'data',
      innerTab: 'innerMails',
      splitterModel: 20,
      data_settings:[
        {
          label: "data_settings.document_types",
          link: "/document_types"
        },
        {
          label: "data_settings.intervention_categories",
          link: "/intervention_categories"
        },
        {
          label: "data_settings.intervention_types",
          link: "/intervention_types"
        },
        {
          label: "data_settings.topics",
          link: "/topics"
        },
        {
          label: "data_settings.user_types",
          link: "/user_types"
        }
      ]
    }
  },
  computed: {},
  created(){
     this.$root.$on('drawer', (data) => {
      this.open = data;
    })
  }
 /* mounted() {
    // has to use a brief timeout
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 1000);
    }
  },
  methods: {
    scrollTo: function (hash) {
      location.href = this.$route.path + hash;
    }
  }*/
};
</script>

<style scoped>
#nav {
  display: flex;
}
.col {
  flex: 1;
  justify-content: center;
  text-decoration: none;
}
.nav-active {
  background-color: white;
  color: black;
}
.situation-menu-expansion-item {
  /* background-color: #0b91ce; */
  font-weight: bold;
  font-size: 14px;
}
.sub-item {
  font-weight: normal;
  font-size: 14px;
}
.situation-menu-item {
  background-color: #dce4e8;
  font-weight: bold;
  font-size: 14px;
}
.q-list {
  /* align with the main menu bar */
  margin-top: 177px;
}
.my-menu-link {
    color: white;
    background: #0b91ce;
  }
</style>
