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
    <Modal v-if="showModal" @close="showModal = false" :graphData="graphData" />
  </div>
</template>

<script>
import ChartGroup from './ChartGroup'
import Modal from './modal/Modal'

export default {
  name: 'Board',
  components: {
    ChartGroup,
    Modal
  },
  data() {
    return {
      showModal: false,
      grahDataId: null
    }
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === this.board
      )
    },
    board() {
      return this.$route.params.board
    },
    graphData() {
      return this.$store.state.statistics.charts.filter(
        (c) => c.id === this.grahDataId
      )[0]
    }
  },
  methods: {
    renderModal(grahDataId) {
      this.grahDataId = grahDataId
      this.showModal = true
    }
  }
}
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
