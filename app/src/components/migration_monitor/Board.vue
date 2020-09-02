<template>
  <div class="board">
    <div class="charts" ref="charts">
      <ChartGroup
        v-for="(c,i) in categories"
        :key="board+'_'+i"
        :category="c.category"
        :board="board"
      />
    </div>
    <q-btn
      id="printbtn"
      color="info"
      icon="print"
      round
      title="print this page"
      @click="printPNG()"
    />
  </div>
</template>

<script>
import ChartGroup from "./ChartGroup";
import htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  name: "Board",
  components: {
    ChartGroup,
  },
  computed: {
    categories: function () {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === this.board
      );
    },
    board: function () {
      return this.$route.params.board;
    },
  },
  methods: {
    printPNG: function () {
      htmlToImage.toPng(this.$refs["charts"]).then(function (dataUrl) {
        download(dataUrl, "my-node.png");
      });
    },
  },
};
</script>

<style scoped>
#printbtn {
  position: fixed;
  right: 5rem;
  bottom: 5rem;
}
.charts {
  background-color: white;
  padding-bottom: 10rem;
}

.col {
  flex: 1;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
}

p {
  margin: 0;
}
.q-icon {
  font-size: 24px;
}
</style>
