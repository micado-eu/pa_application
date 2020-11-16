<template>
  <div id="card" :style="{ 'height': height }" @click="$emit('chart-clicked', graph.id)">
    <h6>{{graph.title}}</h6>
    <lineChart
      v-if="graph.type==='LINE'"
      class="chart"
      :content="content"
      :catAxis="graph.x"
      :valAxis="graph.y"
      :xistime="graph.xistime"
    />
    <barChart
      v-if="graph.type==='BAR'"
      class="chart"
      :content="content"
      :catAxis="graph.x"
      :valAxis="graph.y"
      :xistime="graph.xistime"
    />
    <pieChart
      v-if="graph.type==='PIE'"
      class="chart"
      :content="graph.content"
      :catAxis="graph.x"
      :valAxis="graph.y"
    />
    <mapChart v-if="graph.type==='MAP'" class="chart" />
    <div v-if="['LINE','BAR'].indexOf(graph.type) > -1" class="q-px-lg q-mx-lg">
      <q-badge color='grey' >
        Model: {{ lower }} to {{ upper }} ({{min}} to {{ max }})
      </q-badge>
      <q-range
        v-model="range"
        :min="0"
        :max="graph.content.length-1"
        color="grey"
      />
    </div>
  </div>
</template>

<script>
import lineChart from './lineChart.vue'
import pieChart from './pieChart.vue'
import barChart from './barChart.vue'
import mapChart from './mapChart.vue'

export default {
  name: 'MigrationSituation',
  components: {
    lineChart,
    pieChart,
    barChart,
    mapChart
  },
  props: ['graphData'],
  data() {
    return {
      height: '400px',
      range: { min: 0, max: 0 },
      graph: this.graphData
    }
  },
  computed: {
    d: function(){
      return this.graphData
    },
    min:function(){
      return this.graphData.content[0][ this.graphData.x]
    },
    max: function () {
      return  this.graphData.content[ this.graphData.content.length-1][this.graphData.x] 
    },
    lower: function (){
      return this.graphData.content[this.range.min][this.graphData.x] 
    },
    upper: function (){
      return this.graphData.content[this.range.max][this.graphData.x] 
    },
    content: function (){
      const content = this.graph.content.filter((c,i)=> i >= this.range.min && i <= this.range.max)
      return content
    }
  },
  created() {
    if (this.graphData.type === 'MAP' || this.graphData.type === 'PIE') this.height = '600px'
    this.range.max = this.graphData.content.length - 1 
  
  }
}
</script>

<style scoped>
#card {
  margin: auto;
  width: 97%;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}
.info-content {
  font-size: 1rem;
  /* margin: 50px; */
}
h6 {
  padding: 20px 0 0 0;
  margin:0;
  text-align: center;
}
.chart {
  display: block;
  margin: auto;
}
.q-pa-md{
  padding: 0px 16px
}
</style>
