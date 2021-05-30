<template>
  <q-layout id="migration-situation-container" v-if="!isLoading">
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: "MigrationSituation",
  data: function () {
    return {
      isLoading: true,
    }
  },
  created() {
    this.$q.loading.show({
      delay: 400
    })
    if (true) {
      this.$store.dispatch("statistics/fetchStatistics").then((res) => {
        this.$q.loading.hide()
        this.isLoading = false
      })
    } else {
      this.$q.loading.hide()
    }
  }
}
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
  /* background-color: white; */
  color: black;
}
.q-list {
  /* align with the main menu bar */
  margin-top: 177px;
}
#migration-situation-container {
  margin-top: -50px;
  /* height: calc(100vh - 50px); */
}
.q-page-container {
  margin-top: 50px;
}
</style>
