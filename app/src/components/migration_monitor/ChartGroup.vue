<template>
  <div :id="category">
    <div class="group" ref="group">
      <div class="row full-width" id="header">
        <h1 @click="onClickNav(category)">{{category}}&nbsp;&nbsp;</h1>
        <!-- <q-btn
          id="printbtn"
          color="grey"
          icon="print"
          round
          title="print this page"
          @click="printPNG()"
        /> -->
      </div>
      <div class="row chartcontainer">
        <div v-for="(d,i) in graph_data" :key="i" class="col-6 chartdiv">
          <Chart :graph-data="d" @chart-clicked="sendData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import htmlToImage from 'html-to-image'
import download from 'downloadjs'
import Chart from './chart/Chart'

export default {
  name: 'ChartGroup',
  components: {
    Chart
  },
  props: ['category', 'board'],
  data() {
    return {
      graph_data: []
    }
  },
  computed: {
    charts() {
      return [
        ...this.$store.state.statistics.charts
        // // FIXME: mockdata for map chart
        // {
        //   board: 'hamburg',
        //   category: 'incoming',
        //   content: '',
        //   description: 'bla',
        //   format: 'csv',
        //   title: 'TEST MAP',
        //   type: 'MAP'
        // }
      ]
    }
  },
  methods: {
    printPNG() {
      htmlToImage.toPng(this.$refs.group, { filter: (node) => node.id !== 'printbtn' }).then((dataUrl) => {
        download(dataUrl, 'my-node.png')
      })
    },
    onClickNav: function (category) {
      location.href = this.$route.path + "#" + category
    },
    sendData(grahDataId) {
      console.log('group:', grahDataId)
      this.$emit('group-clicked', grahDataId)
    }
  },
  mounted() {
    this.graph_data = []
    this.charts.forEach((c) => {
      if (c.board === this.board && c.category === this.category) {
        this.graph_data.push(c)
      }
    })
  }
}
</script>

<style scoped>
.group{
  background-color: white;
  margin: auto;
  width: 97%;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.chartcontainer {
  display: flex;
  align-items: stretch;
  justify-content: left;
}

.chartdiv {
  margin-left: 5px;
  margin-right: 5px;
  flex-basis: 45%;
  min-width: 500px;
}

h1 {
  font-size:2rem;
  margin: 0 auto;
}
h6 {
  display: inline-block;
}
#nav {
  display: flex;
  position: sticky;
  top: 50px;
}
.col {
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
}
.anchor {
  width: max-content;
  text-align: center;
  padding: 20px;
}
.anchor:hover {
  color: #ff7c44;
}
.row {
  width: 100%;
  margin: auto;
}
p {
  margin: 0;
}
.q-icon {
  font-size: 24px;
}
#printbtn{
  height:42px;
}
#header{
  background-color: var(--q-color-primary);
  color: var(--q-color-dark);
  font-weight: bold;
  text-align: center;
  /* padding-top: 2em;
  padding-bottom: 2em; */
}
</style>
