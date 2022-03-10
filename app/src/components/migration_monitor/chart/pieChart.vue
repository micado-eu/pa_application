<template>
  <svg :width="width" :height="height" :id="'c_'+graphid">
    <g v-if="sizeSet" :transform="`translate( ${ width/2 },${ height/2})`">
      <g :id="'labelgroup_'+graphid" class="labelgroup">
      </g>
      <g :id="'piegroup_'+graphid"/>
      <g v-for="(d,i) in pie(content)" 
      :key="i" 
      :id="'g_'+i" 
      class="arcgroup"
      :hide="d.data[valAxis]/numtotal > 0.05 ? 'visible':'hidden'"
      >        
      <path
          :d="pathArc(d)" 
          :fill="interpolateViridis(color(d.data[catAxis]))"
          :outerrad="drawLabel(d)" 
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave"  
          :id="'a_'+i"
        />

        <g 
            :class="d.data[valAxis]/numtotal > 0.05 ? 'newlabeldiv':'newlabeldiv invisible'"
            :id="'l_'+i"
            >

          <rect
          class="labelBG"
          fill="white"
          >
          </rect>
          <text
          class="newlabel"
          >
          {{d.data[catAxis]}} - {{d.data[valAxis].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}
          </text>
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
import { arc, pie, interpolateViridis, scaleBand, select, create } from "d3"
import { defaultStandardCss } from 'survey-vue'

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
      sizeSet: false,
      numtotal: null
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
        .outerRadius(1 * this.radius)
        .innerRadius(1 * this.radius)
    },
    color: function() {
      return scaleBand()
        .domain(this.content.map(d => d[this.catAxis]))
        .range([0, 1])
    },
    drawLabel: function(d) {
      return d => [this.pathArc.centroid(d)]
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
      let currGraphId = event.target.parentNode.parentNode.parentNode.parentNode.id.split("_")[1]
      let currArcId = event.target.parentNode.id.split("_")[1]
      let currGraph = select('#c_'+currGraphId)
      let currArc = currGraph.select('#g_'+currArcId)
      currGraph.selectAll(".arcgroup").classed("inactive",true)
      currArc.classed('inactive',false)
      currArc.select('#l_'+currArcId).classed('invisible',false).raise()
    },
    onMouseLeave(event) {
      let currGraphId = event.target.parentNode.parentNode.parentNode.parentNode.id.split("_")[1]
      let currArcId = event.target.parentNode.id.split("_")[1]
      let currGraph = select('#c_'+currGraphId)
      let currArc = currGraph.select('#g_'+currArcId)
      currArc.selectAll('foreignObject').raise()
      currGraph.selectAll(".arcgroup").classed("inactive",false)
      let hidden = currArc.attr('hide')
      if (hidden === 'hidden') {
        currGraph.select("#l_"+currArcId).classed("invisible",true)
        }
    }
  },
  mounted: function() {
    // window.resize event listener
    this.updateGraph()
    this.sizeSet = true 
    this.numtotal = Object.values((this.content)).reduce((total,obj) => obj[this.valAxis] + total, 0)
  },
  updated: function () {
    
    let arcs = select('#c_'+this.graphid).selectAll('.arcgroup')
    let arcdiv = select('#c_'+this.graphid).select('#piegroup_'+this.graphid)
    arcs.each(function() { arcdiv.append(() => this)})  

    let labels = select('#c_'+this.graphid).selectAll('.label')
    let defs = select('#c_'+this.graphid).selectAll('defs')
    let labeldiv = select('#c_'+this.graphid).select('#labelgroup_'+this.graphid)
    defs.each(function() { labeldiv.append(() => this)})
    labels.each(function() { labeldiv.append(() => this)})
    labeldiv.raise()  

    let newlabeldiv = select('#c_'+this.graphid).selectAll('.newlabeldiv')

    function transformlabel(d){
      let outerrad = select(d.parentNode).select('path').attr('outerrad').split(',')
      let x = outerrad[0]*1.35
      let y = outerrad[1]*1.35
      let textsize = {height: select(d).select('text').node().getBoundingClientRect().height, width: select(d).select('text').node().getBoundingClientRect().width}
      if ( y > 0 ) {
          y = y*1 + textsize.height/2
      }
      if ( x < 0 ) {
          x = x - textsize.width
      }
      return {label:[x,y],rect:{pos:[x-textsize.width*0.05,y-textsize.height/1.25],size:[textsize.height*1.1,textsize.width*1.1]}}
    }

    newlabeldiv.each(function(d,i){
      select(this).select('text').attr('font-size','0.8em').attr('transform','translate('+transformlabel(this).label+')').raise()
      select(this).select('rect').attr('transform','translate('+transformlabel(this).rect.pos+')')
      select(this).select('rect').attr('width',transformlabel(this).rect.size[1]).attr('height',transformlabel(this).rect.size[0])
      })
  }
}
</script>
<style scoped>

div {
  background: white;
}
.chart {
  position: relative;
}

path {
  stroke: white;
  stroke-width: 2px;
  opacity: 1;
}
.label {
  opacity: 1;
  pointer-events: none;
}
.inactive {
  opacity: 0.15;
  transition: 0.25s;
}
path:hover{
  opacity: 1;
  transition-duration: 0.25s;
}
.labelBG {
  fill-opacity: 0.7;
}
.invisible {
  opacity: 0;
}
svg{
  overflow: visible;
}

.newlabel {
  width: fit-content;
  padding: 10px;
  max-width: 70px;
}

.newlabeldiv {
  overflow: visible;
  pointer-events: none;
  white-space: nowrap;
}

</style>