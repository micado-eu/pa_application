<template>
  <div class="q-pa-md">
    <Category />
    <AddNew />
  </div>
</template>

<script>
import Category from "./Category";
import AddNew from "./AddNew";

export default {
  name: "MigrationMonitorEditor",
  components: {
    Category,
    AddNew
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>