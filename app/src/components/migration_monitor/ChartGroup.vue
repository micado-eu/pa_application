<template>
  <div :id="category">

    <div class="group" ref="group">
      <div class="row" id="header">
        <h5>{{category}}&nbsp;&nbsp;</h5>
        <!-- <q-btn
          id="printbtn"
          color="grey"
          icon="print"
          round
          title="print this page"
          @click="printPNG()"
        /> -->
      </div>
      <div class="row">
        <div v-for="(d,i) in graph_data" :key="i" class="col-12">
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
  padding:20px;
}
h5 {
  margin: 0;
  padding-top: 75px;
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
  width: 90%;
  margin: auto;
}
p {
  margin: 0;
}
.q-icon {
  font-size: 24px;
}
#header{
  display:flex;
  align-items: flex-end;
  justify-content: space-between;
}
#printbtn{
  height:42px;
}
</style>
