<template>
  <div>
    <div class="q-pa-lg">
      <div class="row justify-between q-pb-lg">
        <div class="title">{{$t("migration_monitor.manage_charts")}}</div>
        <q-btn
          color="secondary"
          no-caps
          size="md"
          :label="$t('button.add_new_chart')"
          to="/situation/editor"
        />
        <q-btn
          class="q-ml-md q-mr-md"
          icon="home"
          color="white"
          text-color="black"
          size="md"
          to="/situation/main"
          title="return to main page"
        />
      </div>
      <List />
    </div>
  </div>
</template>

<script>
import List from "./List"

export default {
  name: "MigrationMonitorManage",
  components: {
    List
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.title {
  font-weight: bold;
  font-size: 30px;
}
</style>