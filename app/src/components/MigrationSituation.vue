<template>
  <q-layout id="migration-situation-container" v-if="boards.length > 2">
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
    return {}
  },
  computed: {
    boards() {
      return this.$store.state.statistics.boards.map((b) => ({
        title: b,
        link: `/situation/${b}`
      }))
    },
    menuItems() {
      return [
        { title: "Main page", link: "/situation/main", children: [] },
        { title: "Manage Charts", link: "/situation/overview", children: [] },
        { title: "Map", link: "/situation/map", children: [] },
        {
          title: "Dashboards",
          link: "/situation/bla",
          children: [...this.boards]
        }
      ]
    }
  },
  methods: {
    getCategory(board) {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === board.title
      )
    },
    /**
     * jump to the corresponding chartGroup when clicked
     */
    onClickNav(board, category) {
      const baseURL = this.$route.path.substring(
        0,
        this.$route.path.indexOf("situation") + 10
      )
      // location.href = baseURL + board + "#" + category;
      return `${baseURL + board}#${category}`
    }
  },
  created() {
    this.$q.loading.show({
      delay: 400
    })
    if (true) {
      this.$store.dispatch("statistics/fetchStatistics").then((res) => {
        this.$q.loading.hide()
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
