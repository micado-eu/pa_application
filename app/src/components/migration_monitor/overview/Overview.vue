<template>
  <div>
    <div
      style="
        font-style: normal;
        height: 72px;
        text-align: center;
        padding-top: 15px;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color: white;
        background-color: #ff7c44;
      "
    >
      Overview
    </div>
    <div class="q-pa-md">
      <div class="row justify-start q-pb-lg">
          <q-btn
            color="info"
            no-caps
            :label="$t('button.add_new_chart')"
            to="/situation/editor"
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
</style>