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
      MICADO Migration Situation Monitor
    </div>
    <div class="q-pa-md row  justify-center">
      <q-btn
        no-caps
        class="q-ml-md"
        color="secondary"
        size="md"
        :label="$t('button.situation_manage_charts')"
        to="/situation/overview"
      />
      <q-btn
        no-caps
        class="q-ml-md q-mr-md"
        color="white"
        text-color="black"
        size="md"
        :label="$t('button.situation_about')"
        to="#"
      />
    </div>
    <div class="q-pa-md row">
      <div v-for="(b, i) in boards" :key="i" class="col-4">
        <q-card class="q-ma-md">
          <q-card-section class="icon-div">
            <q-icon :name="b.icon" style="font-size: 5em" />
          </q-card-section>
          <q-card-section class="title-div">
            <div class="text-h6" @click="jump(b.link)">{{ b.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="card-body" vertical align="left" >
            <q-btn
              v-for="(cat, i) in getCategory(b)"
              :key="i"
              flat
              @click="onClickNav(b.title, cat.category)"
              >{{ cat.category }}</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MigrationMonitorMain",
  components: {},
  data() {
    return {}
  },
  computed: {
    boards() {
      const boards = this.$store.state.statistics.boards.reduce((acc, b) => {
        acc.push({
          title: b,
          link: `/situation/board/${b}`,
          icon: "analytics"
        })
        return acc
      }, [])
      return boards
    }
  },
  methods: {
    jump(link) {
      this.$router.push(link)
    },
    getCategory(board) {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === board.title
      )
    },
    onClickNav(board, category) {
      this.$router.push(`/situation/board/${board}#${category}`)
    }
  }
}
</script>
<style scoped>
.card {
  margin: auto;
  width: 97%;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}
.icon-div {
  text-align: center;
}
.title-div {
  text-align: center;
  cursor: pointer;
}
.title-div:hover {
  text-decoration: underline;
}
.card-body{
  background-color: #F1F8FC;
}
</style>