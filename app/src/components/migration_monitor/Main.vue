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
    <div class="q-pa-md row">
      <div
        v-for="(b, i) in boards"
        @click="jump(b.title)"
        :key="i"
        class="col-4"
      >
        <q-card class="q-ma-md">
          <q-card-section class="icon-div">
            <q-icon :name="b.icon" style="font-size: 5em" />
          </q-card-section>
          <q-card-section class="title-div">
            <div class="text-h6">{{ b.title }}</div>
          </q-card-section>
          <!-- <q-card-section class='desc-div'>
            {{ b.title }}
          </q-card-section> -->
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
          link: `/situation/${b}`,
          icon: "analytics"
        })
        return acc
      }, [])
      return boards
    }
  },
  methods: {
    jump(title) {
      this.$router.push(`/situation/${title}`)
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
}
</style>