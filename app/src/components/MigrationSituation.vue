<template>
  <div id="migration-situation-container" v-if="boards.length>2">
    <div id="nav" class="bg-accent">
      <q-item
        clickable
        active
        active-class="nav-active"
        class="col"
        v-for="(d,i) in boards"
        :key="i"
        :to="d.link"
      >
        <h6>{{d.title}}</h6>
      </q-item>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "MigrationSituation",
  computed: {
    boards: function () {
      const boards = this.$store.state.statistics.boards.map((b) => {
        return { title: b, link: `/situation/${b}` };
      });
      boards.push(
        { title: "map", link: `/situation/map` },
        { title: "editor", link: `/situation/editor` }
      );
      return boards;
    },
  },
  created: function () {
    this.$q.loading.show({
      delay: 400,
    });
    this.$store.dispatch("statistics/fetchStatistics").then(() => {
      this.$q.loading.hide();
    });
  },
};
</script>
<style scoped>
#migration-situation-container {
  min-height: inherit;
}
#nav {
  display: flex;
}
.col {
  flex: 1;
  justify-content: center;
  text-decoration: none;
}
.nav-active {
  background-color: white;
  color: black;
}
h6 {
  margin: 0;
}
</style>
