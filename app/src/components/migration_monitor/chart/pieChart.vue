<template>
  <svg :width="width" :height="height" :id="'c_'+graphid">
    <g v-if="sizeSet" :transform="`translate( ${ width/2 },${ height/2})`">
      <g v-for="(d,i) in pie(content)" :key="i" :id="'g_'+i" class="arcgroup">
        <path
          :d="pathArc(d)" 
          :fill="interpolateViridis(color(d.data[catAxis]))" 
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave"  
          :id="'a_'+i"
        />
        <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
      <feFlood flood-color="white" flood-opacity="0.8" result="bg" />
      <feMerge>
        <feMergeNode in="bg"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
        </defs>
        <text 
          class="label"
          filter="url(#solid)"
          :id="'l_'+i"
          :ref="d.data[catAxis]+'_label'" 
          :key="d.data[catAxis]+'_label'" 
          :transform="drawLabel(d)" text-anchor="middle" 
          font-size="12">{{d.data[catAxis]}} - {{d.data[valAxis]}}
        </text>
      </g>
    </g>
  </svg>
</template>
<script>
import { arc, pie, interpolateViridis, scaleBand, select } from "d3"

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
      // id: "pieSvg",
      radius: "100",
      width: "100%",
      height: "85%",
      sizeSet: false
    }
  },
  computed: {
    graphid: function() {
      return this._uid
    },
    svg: function() {
      return select("#" + this.id)
    },
    pie: function() {
      return pie().value(d => parseInt(d[this.valAxis]))
    },
    pathArc: function() {
      return arc()
        .outerRadius(this.radius)
        .innerRadius(66)
    },
    labelArc: function() {
      return arc()
        .outerRadius(1.2 * this.radius)
        .innerRadius(1.2 * this.radius)
    },
    color: function() {
      return scaleBand()
        .domain(this.content.map(d => d[this.catAxis]))
        .range([0, 1])
    },
    drawLabel: function() {
      return d => "translate(" + this.labelArc.centroid(d) + ")"
    },
    interpolateViridis: function() {
      return interpolateViridis
    }
  },
  methods: {
    updateGraph: function() {
      const client = this.$el.getBoundingClientRect()
      this.width = client.width - 20
      this.height = client.height
    },
    onMouseOver(event) {
      let currgraph = select("#"+event.target.parentNode.parentNode.parentNode.id)
      let currid = currgraph.select("#g_"+event.target.id.split("_")[1])
      currgraph.selectAll("path").classed("inactive",true)
      currgraph.selectAll("text").classed("inactive",true)
      currid.select("path").classed("inactive",false)
      currid.select("text").classed("inactive",false)
      currid.select("text").classed("highlighted",true)
      currid.raise()
    },
    onMouseLeave(event) {
      let currgraph = select("#"+event.target.parentNode.parentNode.parentNode.id)
      currgraph.selectAll("path").classed("inactive",false)
      currgraph.selectAll("text").classed("inactive",false)
      currgraph.selectAll("text").classed("highlighted",false)
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
  stroke-width: 2px;
  opacity: 1;
}
.label {
  opacity: 0.75;
  pointer-events: none;
}
.inactive {
  opacity: 0.15;
}
.highlighted {
  opacity: 1;
}
.textbg {
  position: absolute;
}
.invisible {
  display: none;
}
svg{
  overflow: visible;
}
</style>
