<template>
  <div>
    <DocumentTypeManager @scroll="scrollTo" />
    <IntegrationCategory @scroll="scrollTo" />
    <IntegrationType @scroll="scrollTo" />
    <Topic @scroll="scrollTo" />
    <UserType @scroll="scrollTo" />
  </div>
</template>

<script>
import DocumentTypeManager from "./data_settings/DocumentTypeManager";
import IntegrationCategory from "./data_settings/IntegrationCategory";
import IntegrationType from "./data_settings/IntegrationType";
import Topic from "./data_settings/Topic";
import UserType from "./data_settings/UserType";
const TIMEOUT = 1;

export default {
  name: "DataSettings",
  components: {
    DocumentTypeManager,
    IntegrationCategory,
    IntegrationType,
    Topic,
    UserType
  },
  computed: {},
  mounted() {
    // has to use a brief timeout
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), 1000);
    }
  },
  methods: {
    scrollTo: function(hash) {
      location.href = this.$route.path + hash;
    }
  }
};
</script>

<style>
</style>
