<template>
  <div>
    <ActiveLanguageSelector />
    <FunctionConfiguration />
  </div>
</template>

<script>
import ActiveLanguageSelector from "./settings/ActiveLanguageSelector.vue";
import FunctionConfiguration from "./settings/FunctionConfiguration.vue";

export default {
  name: "Settings",
  components: {
    ActiveLanguageSelector,
    FunctionConfiguration
  },
  computed: {},
  mounted: function() {}
};
</script>

<style>
</style>
