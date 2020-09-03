<template>
  <div class="board">
    <div class="charts" ref="charts">
      <ChartGroup
        v-for="(c,i) in categories"
        :key="board+'_'+i"
        :category="c.category"
        :board="board"
        @group-clicked="renderModal"
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
    <Modal v-if="showModal" @close="showModal = false" :graphData="graphData" />
  </div>
</template>

<script>
import ChartGroup from "./ChartGroup";
import htmlToImage from "html-to-image";
import download from "downloadjs";
import Modal from "./modal/Modal";

export default {
  name: "Board",
  components: {
    ChartGroup,
    Modal,
  },
  data: function () {
    return {
      showModal: true,
      grahDataId: null,
    };
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
    graphData: function () {
      return this.$store.state.statistics.charts.filter(
        (c) => c.id === this.grahDataId
      )[0];
    },
  },
  methods: {
    printPNG: function () {
      htmlToImage.toPng(this.$refs["charts"]).then(function (dataUrl) {
        download(dataUrl, "my-node.png");
      });
    },
    renderModal: function (grahDataId) {
      this.grahDataId = grahDataId;
      this.showModal = true;
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
