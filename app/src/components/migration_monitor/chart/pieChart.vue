<template>
  <svg :width="width" :height="height" :id="id">
    <g v-if="sizeSet" :transform="`translate( ${ width/2 },${ height/2})`">
      <g v-for="(d,i) in pie(content)" :key="i">
        <path 
          :d="pathArc(d)" 
          :fill="interpolateGnBu(color(d.data[catAxis]))" 
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave"  
          :id="d.data[catAxis]+'_arc'"
        />
        <text 
          class="label" 
          :ref="d.data[catAxis]+'_label'" 
          :key="d.data[catAxis]+'_label'" 
          :transform="drawLabel(d)" text-anchor="middle" 
          font-size="17">{{d.data[catAxis]}} - {{d.data[valAxis]}}
        </text>
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
    content: Array,
    catAxis: String,
    valAxis: String
  },
  data: function() {
    return {
      data: [{ percentage: 10 }, { percentage: 20 }, { percentage: 30 }],
      id: "pieSvg",
      radius: "100",
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
      return pie().value(d => parseInt(d[this.valAxis]))
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
        .domain(this.content.map(d => d[this.catAxis]))
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
    },
    onMouseOver(event) {
      const label = this.$refs[`${event.target.id.split('_')[0]}_label`][0]
      label.style.opacity = 1
    },
    onMouseLeave(event) {
      const label = this.$refs[`${event.target.id.split('_')[0]}_label`][0]
      label.style.opacity = 0.2
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
div {
  background: white;
}
path {
  stroke: white;
  stroke-width: 1px;
}
.label {
  opacity: 0.2;
  transition: 0.2s;
}
</style>
