<template>
  <div>
    <div
      style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 30px;line-height: 41px;color:white; background-color:#FF7C44">
      Add new chart</div>
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
</style>