<template>
  <div>
    <div
      class="banner row centered"
    >
          {{$t("migration_monitor.add_chart")}}
    </div>
    <hr style="border: 1px solid #0F3A5D">
    <div class="q-pa-md">
      <AddNew />
    </div>
  </div>
</template>

<script>
// import Category from "./Category";
import AddNew from "./AddNew"

export default {
  name: "MigrationMonitorEditor",
  components: {
    // Category,
    AddNew
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.banner {
  font-style: normal;
  min-height: 72px;
  text-align: center;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 10px;
  font-weight: bold;
  font-size: 40px;
  line-height: 41px;
  color: var(--q-color-accent);
  background-image: url("/statics/BG Pattern.svg");
  align-items: center;
  justify-content: center;
}
</style>