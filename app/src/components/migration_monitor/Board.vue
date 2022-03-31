<template>
  <div class="board">
    <div
      class="banner row justify-between"
    >
      {{ board }}
      <div class="settings row justify-between">
        <q-select
          class="col-10 printList"
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
          color="accent"
          background="white"
          size="md"
          v-close-popup
          @click="printPNG()"
        />
        <q-btn
          :label="$t('button.go_back')"
          class="q-ml-md q-mr-md"
          color="white"
          outline
          text-color="accent"
          size="md"
          to="/situation/main"
          :title="$t('button.return_main')"
      />
      </div>
    </div>
    <hr style="border: 1px solid #0F3A5D">
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
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  extent,
  select,
  line,
  curveCardinal,
  selectAll
} from "d3";

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

      function PrepareToPrint(dom, uid) {

        var dupnode = dom.cloneNode(true)
        dupnode.id = "printPrep"+uid
        dupnode.classList.add('printPrep')
        dom.appendChild(dupnode)
        var charts = select('#printPrep'+uid).selectAll('.chart')
        var canvaswidth = select('#printPrep'+uid).node().getBoundingClientRect().width
        select('#printPrep'+uid).selectAll('.q-slider').remove()
        select('#printPrep'+uid).selectAll('.row').selectAll('.col').classed('metadata',true)
        charts.selectAll('circle').remove()
        charts.selectAll('text').style('font-family','"Nunito", sans-serif')
        charts.each(function(d,i){
          let w = select(this).node().getBoundingClientRect().width
          let h = select(this).node().getBoundingClientRect().height
          let ratio = (canvaswidth * 0.45) / w
          select(this).style("width", ratio * w + 'px')
          select(this).style("height", ratio * h + 'px')
        })
        select('#printPrep'+uid).selectAll('h6').classed('chartTitle',true)
        select('#printPrep'+uid).selectAll('h1').classed('catTitle',true)
        select('#printPrep'+uid).selectAll('.invisible').remove()
        return document.getElementById('printPrep'+uid)
      }

      this.$refs.group.forEach((group) => {
        if (this.printList.indexOf(group.category) > -1) {
          htmlToImage.toPng(PrepareToPrint(group.$el, group._uid), { })
          .then((dataUrl) => {
            download(dataUrl, `${group.category}.png`)
            .then(document.getElementById('printPrep'+group._uid).remove())
          })
        }
      });
    },
  },
};
</script>

<style scoped>
.banner {
  font-style: normal;
  min-height: 72px;
  text-align: center;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 10px;
  font-weight: bold;
  font-size: 40px;
  line-height: 41px;
  color: var(--q-color-accent);
  background-image: url("/statics/BG Pattern.svg");
  align-items: center;
}

.q-btn {
  text-transform: none;
  font-weight: bold;
}

#printbtn {
  position: fixed;
  right: 5rem;
  bottom: 5rem;
}
.charts {
  background-color: white;
  /* margin-bottom: 10rem; */
}

p {
  margin: 0;
}

.q-icon {
  font-size: 24px;
}

.q-btn {
  height: 3em;
}

.settings {
  align-items: center;
}

</style>

<style>
.q-field--outlined .q-field__control::before {
  /* border: 1px solid white; */
  transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-field__label {
  color: black;
}

.printPrep {
  padding: 0;
  width: 1200px;
}

.chartTitle {
  width: 100%;
  font-weight: bold;
}
.catTitle {
  width: 100%;
  text-align: center;
}

.metadata {
  margin-left: auto;
  margin-right: auto;
  flex: inherit;
  margin-bottom: 2em;
  flex-basis: 45%;
}
</style>
