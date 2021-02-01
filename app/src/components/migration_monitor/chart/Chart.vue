<template>
  <div id="card" :style="{ height: height }">
    <div id="header" class="q-pt-md q-pl-lg">
      <h6
        color="white"
        text-color="black"
        title="click to show details"
        @click="$emit('chart-clicked', graph.id)"
      >
        {{ graph.title }}
      </h6>
    </div>
    <p class="q-px-lg q-mx-lg no-padding">
      <strong>description:</strong>
      {{ graph.description }}
      <br />
      <strong>data provider:</strong>EU
      <br />
      <strong>updated time:</strong>2019.07
    </p>
    <lineChart
      v-if="graph.type === 'LINE'"
      class="chart line-chart"
      :content="filteredContent"
      :catAxis="graph.x"
      :valAxis="graph.y"
      :xistime="graph.xistime"
    />
    <barChart
      v-if="graph.type === 'BAR'"
      class="chart bar-chart"
      :content="filteredContent"
      :catAxis="graph.x"
      :valAxis="graph.y"
      :xistime="graph.xistime"
    />
    <pieChart
      v-if="graph.type === 'PIE'"
      class="chart pie-chart"
      :content="graph.content"
      :catAxis="graph.x"
      :valAxis="graph.y"
    />
    <mapChart v-if="graph.type === 'MAP'" class="chart" />
    <div
      v-if="['LINE', 'BAR'].indexOf(graph.type) > -1"
      class="q-px-lg q-mx-lg  no-padding"
    >
      <q-range
        v-model="range"
        :min="0"
        :max="graph.content.length - 1"
        color="grey"
      />
      <p>
        Statistics: {{ lower }} to {{ upper }}
        <br />
        Minimum Value: {{ min }}
        <br />
        Maximum Value: {{ max }}
        <br />
        Mean Value: {{ mean }}
      </p>
    </div>
  </div>
</template>

<script>
import lineChart from "./lineChart.vue"
import pieChart from "./pieChart.vue"
import barChart from "./barChart.vue"
import mapChart from "./mapChart.vue"

export default {
  name: "MigrationSituation",
  components: {
    lineChart,
    pieChart,
    barChart,
    mapChart
  },
  props: ["graphData"],
  data() {
    return {
      height: "auto",
      range: { min: 0, max: 0 },
      graph: this.graphData
    }
  },
  computed: {
    d: function () {
      return this.graphData
    },
    min: function () {
      return Math.min(...this.filteredContent.map((c) => c[this.graphData.y]))
    },
    max: function () {
      return Math.max(...this.filteredContent.map((c) => c[this.graphData.y]))
    },
    mean: function () {
      return Math.floor(
        this.filteredContent.reduce((acc, c) => acc + c[this.graphData.y], 0) /
          this.filteredContent.length
      )
    },
    lower: function () {
      return this.graphData.content[this.range.min][this.graphData.x]
    },
    upper: function () {
      return this.graphData.content[this.range.max][this.graphData.x]
    },
    filteredContent: function () {
      const content = this.graph.content.filter(
        (c, i) => i >= this.range.min && i <= this.range.max
      )
      return content
    }
  },
  created() {
    if (this.graphData.type === "MAP" || this.graphData.type === "PIE")
      this.height = "auto"
    this.range.max = this.graphData.content.length - 1
  }
}
</script>

<style scoped>
.info-content {
  font-size: 1rem;
  /* margin: 50px; */
}
h6 {
  margin: 0;
  text-align: center;
}
.no-padding {
  padding: 0;
}
.chart {
  display: block;
  margin: auto;
}
.line-chart {
  height: 200px;
}
.bar-chart {
  height: 200px;
}
.pie-chart {
  height: 500px;
}
.q-pa-md {
  padding: 0px 16px;
}
#header {
  display: flex;
  justify-content: left;
  align-items: center;
}
h6 {
  padding: 0;
  cursor: pointer;
}
h6:hover {
  text-decoration: underline;
}
</style>
