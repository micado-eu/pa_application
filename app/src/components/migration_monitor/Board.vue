<template>
  <div class="board">
    <div class="q-pa-md row justify-between">
      <div>{{ board }}</div>
      <div class="row justify-between">
        <q-select
          class="col-10"
          outlined
          v-model="printList"
          multiple
          :options="categories.map((c) => c.category)"
          :label="$t('migration_monitor.print_categories')"
          style="width: 250px"
        />
        <q-btn
          no-caps
          class="q-ml-md"
          :label="$t('button.print')"
          color="info"
          size="md"
          v-close-popup
          @click="printPNG()"
        />
      </div>
      <q-btn
        class="q-ml-md q-mr-md"
        icon="home"
        color="white"
        text-color="black"
        size="md"
        to="/situation/main"
        :title="$t('button.return_main')"
      />
    </div>
    <div class="charts">
      <ChartGroup
        v-for="(c, i) in categories"
        ref="group"
        :key="board + '_' + i"
        :category="c.category"
        :id="c.category"
        :board="board"
        @group-clicked="renderModal"
      />
    </div>
    <Modal v-if="showModal" @close="showModal = false" :graphData="graphData" />
  </div>
</template>

<script>
import ChartGroup from "./ChartGroup";
import Modal from "./modal/Modal";
import htmlToImage from "html-to-image";
import download from "downloadjs";

export default {
  name: "Board",
  components: {
    ChartGroup,
    Modal,
  },
  data() {
    return {
      showModal: false,
      grahDataId: null,
      printList: [],
    };
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === this.board
      );
    },
    board() {
      return this.$route.params.board;
    },
    graphData() {
      return this.$store.state.statistics.charts.filter(
        (c) => c.id === this.grahDataId
      )[0];
    },
  },
  methods: {
    renderModal(grahDataId) {
      this.grahDataId = grahDataId;
      this.showModal = true;
    },
    printPNG() {
      this.$refs.group.forEach((group) => {
        if (this.printList.indexOf(group.category) > -1) {
          htmlToImage.toPng(group.$el, {}).then((dataUrl) => {
            download(dataUrl, `${group.category}.png`);
          });
        }
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

p {
  margin: 0;
}

.q-icon {
  font-size: 24px;
}
</style>
