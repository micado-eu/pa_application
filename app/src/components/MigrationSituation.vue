<template>
  <q-layout id="migration-situation-container" v-if="boards.length>2">
    <q-drawer
      key="situation-drawer"
      show-if-above
      bordered
      :content-style="{backgroundColor: '#DCE4E8',border: 'none'}"
      class="situation-drawer"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(board,i) in boards">
            <q-separator class="bg-dark-separator" :key="'sep' + i" />
            <q-expansion-item
              class="situation-menu-expansion-item"
              :key="i"
              :to="board.link"
              active-class="my-menu-link"
              expand-separator
              :label="board.title"
              caption
              clickable
            >
              <q-item
                v-for="(c,i) in getCategory(board)"
                :key="i+'_category'"
                :header-inset-level="1"
                clickable
                :to="onClickNav(board.title, c.category)"
                class="situation-menu-item"
              >
                <q-item-section>{{ c.category }}</q-item-section>
              </q-item>
            </q-expansion-item>
            <q-separator class="bg-dark-separator" :key="'sep' + i" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'MigrationSituation',
  computed: {
    boards() {
      const boards = this.$store.state.statistics.boards.map((b) => ({ title: b, link: `/situation/${b}` }))
      boards.push(
        { title: 'map', link: '/situation/map' },
        { title: 'editor', link: '/situation/editor' }
      )
      return boards
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
        this.$route.path.indexOf('situation') + 10
      )
      // location.href = baseURL + board + "#" + category;
      return `${baseURL + board}#${category}`
    }
  },
  created() {
    this.$q.loading.show({
      delay: 400
    })
    this.$store.dispatch('statistics/fetchStatistics').then(() => {
      this.$q.loading.hide()
    })
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
  background-color: white;
  color: black;
}
.situation-menu-expansion-item {
  /* background-color: #0b91ce; */
  font-weight: bold;
}
.situation-menu-item {
  background-color: #dce4e8;
  font-weight: normal;
}
.q-list {
  /* align with the main menu bar */
  margin-top: 177px;
}
#migration-situation-container{
  margin-top: -50px;
  /* height: calc(100vh - 50px); */
}
.q-page-container{
  margin-top:50px;
}
</style>
