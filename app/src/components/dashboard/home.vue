<template>
  <div>
    <!-- <Metabase /> -->
    <ImmigrationMonitor /> 
  </div>
</template>

<script>
import Metabase from "./metabase/metabase.vue";
import ImmigrationMonitor from "./immigrationMonitor/dashboard.vue";

export default {
  components: {
    Metabase,
    ImmigrationMonitor
  },
  name: "Dashboard",
  data() {
    return {};
  }
};
</script>
