<template>
  <q-layout id="board-container" v-if="boards.length > 2">
    <q-drawer
      key="situation-drawer"
      show-if-above
      bordered
      :style="{backroundColor: 'red'}"
      :content-style="{
        position: 'sticky',
        top:'50px',
        background:'#DCE4E8',
        maxHeight:'100vh',
        }"
      class="situation-drawer"
    >
      <q-scroll-area class="fit">
        <q-list>
        <template v-for="(board,i) in boards">
            <q-expansion-item
              class="situation-menu-expansion-item"
              :key="i"
              :to="board.link"
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
                @click="onClickNav(board.title, c.category)"
                class="situation-menu-item"
              >
                <q-item-section>{{ c.category }}</q-item-section>
              </q-item>
            </q-expansion-item>
            <q-separator :key="'sep' + i" />
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
  name: "BoardContainer",
  data: function () {
    return {}
  },
  computed: {
    boards() {
      return this.$store.state.statistics.boards.map((b) => ({
        title: b,
        link: `/situation/board/${b}`
      }))
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
        this.$route.path.indexOf("board") + 6
      )
      this.$router.push(`${baseURL + board}#${category}`)
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

#board-container {
  margin-top: -50px;
  /* height: calc(100vh - 50px); */
}
.q-page-container {
  margin-top: 50px;
}

</style>
