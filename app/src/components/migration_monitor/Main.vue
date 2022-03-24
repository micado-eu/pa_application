<template>
  <div>
    <div v-if="loading">
      {{ $t('input_labels.loading') }}
    </div>
    <div v-else>
      <div id="content">
        <div
          class=" q-pa-md image "
          style="text-align:center"
        >
          <div
            class=" top-div"
            style=""
          >
            {{ $t('menu.situation') }}
            <q-icon
              name="img:statics/msm_header.svg"
              class="top-icon"
            />
          </div>
        </div>
        <hr style="border: 1px solid #0F3A5D">
    <div class="q-pa-md row  justify-center">
      <q-btn
        no-caps
        class="q-ml-md"
        color="accent"
        size="md"
        :label="$t('button.situation_manage_charts')"
        to="/situation/overview"
      />
    </div>
    <div class="q-pa-md row">
      <div v-for="(b, i) in boards" :key="i" class="col-4">
        <q-card 
        bordered
        class="q-ma-md boardcard">
          <q-card-section class="title-div">
            <div class="text-h6" @click="jump(b.link)">{{ b.title }}</div>
          </q-card-section>
          <q-separator
            color="accent"
            size="1pt"
           />
          <q-card-actions class="card-body" vertical align="left" >
            <q-btn
              v-for="(cat, i) in getCategory(b)"
              class="categorytitle"
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

.boardcard {
  margin: auto;
  width: 97%;
  margin-top: 20px;
  border-radius: 10px;
  border: 1pt solid var(--q-color-accent);
  /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2); */
}
.icon-div {
  text-align: center;
}

.text-h6 {
  color: var(--q-color-accent);
  font-weight: bolder;
  padding-top: 1em;
  padding-bottom: 1em;
}

.categorytitle {
  text-transform: none;
  margin-left: auto;
  margin-right: auto;
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

.top-icon{
width:360px;
  height:100%
}
.top-div{
  font-style: normal;
  padding-top:15px;
  padding-left:30px;
  font-weight: bold;
  font-size: 40px;
  line-height: 54px;
  color:#0F3A5D; 
}
.image{
  background-image: url("/statics/BG Pattern.svg");
}
</style>