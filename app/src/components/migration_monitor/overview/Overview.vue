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