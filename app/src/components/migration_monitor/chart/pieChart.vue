<template>
  <svg :width="width" :height="height" :id="id">
    <g v-if="sizeSet" :transform="`translate( ${ width/2 },${ height/2})`">
      <g v-for="(d,i) in pie(pieData)" :key="i">
        <path :d="pathArc(d)" :fill="interpolateGnBu(color(d.data[labelColumn]))" />
        <text :transform="drawLabel(d)" text-anchor="middle" font-size="17">{{d.data[labelColumn]}}</text>
      </g>
    </g>
  </svg>
</template>
<script>
import { arc, pie, interpolateGnBu, scaleBand } from "d3"

export default {
  name: "pieChart",
  components: {},
  props: {
    pieData: Array,
    labelColumn: String,
    valueColumn: String
  },
  data: function() {
    return {
      data: [{ percentage: 10 }, { percentage: 20 }, { percentage: 30 }],
      id: "pieSvg",
      radius: "150",
      width: "100%",
      height: "85%",
      sizeSet: false
    }
  },
  computed: {
    svg: function() {
      return select("#" + this.id)
    },
    pie: function() {
      return pie().value(d => parseInt(d[this.valueColumn]))
    },
    pathArc: function() {
      return arc()
        .outerRadius(this.radius)
        .innerRadius(0)
    },
    labelArc: function() {
      return arc()
        .outerRadius(1.5 * this.radius)
        .innerRadius(1.5 * this.radius)
    },
    color: function() {
      return scaleBand()
        .domain(this.pieData.map(d => d[this.labelColumn]))
        .range([0, 1])
    },
    drawLabel: function() {
      return d => "translate(" + this.labelArc.centroid(d) + ")"
    },
    interpolateGnBu: function() {
      return interpolateGnBu
    }
  },
  methods: {
    updateGraph: function() {
      const client = this.$el.getBoundingClientRect()
      this.width = client.width - 20
      this.height = client.height
    }
  },
  mounted: function() {
    // window.resize event listener
    this.updateGraph()
    this.sizeSet = true
  }
}
</script>
<style scoped>
svg {
  /* background-color: null;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 5px; */
}
div {
  background: white;
}
path {
  stroke: white;
  stroke-width: 1px;
}
</style>
