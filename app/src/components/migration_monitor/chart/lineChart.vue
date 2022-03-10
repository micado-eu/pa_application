<template>
  <svg :width="width" :height="height" :id="'c_'+graphid" >
    <!-- Axis label Value (Y-Axis) -->
    <text
      v-if="sizeSet"
      :x="-height/2"
      :y="margin.left/2"
      text-anchor="middle"
      transform="rotate(-90)"
    >
      {{ valAxis }}
    </text>
    <!-- Axis label Category (X-axis) -->
    <text
      v-if="sizeSet"
      :x="width / 2"
      :y="height - margin.bottom / 2.4"
      text-anchor="middle"
    >
      {{ catAxis }}
    </text>
    <ChartAxisBottom
      v-if="sizeSet"
      :length="content.length"
      :scaleX="scaleX"
      :key="xid"
      :tickpadd="tickpadd"
      :transform="
        'translate(' + margin.left + ', ' + (zeroLine + margin.top) + ')'
      "
    />
    <ChartAxisLeft
      v-if="sizeSet"
      :scaleY="scaleY"
      :key="yid"
      :transform="'translate(' + margin.left + ', ' + margin.top + ')'"
    />
        <g
      v-if="sizeSet"
      :transform="'translate(' + margin.left + ',' + margin.top + ')'"
      >
      <path
        :d="drawLine(content)"
        fill="none"
        stroke="#0b91ce"
        stroke-width="3px"

      />
        <circle
        v-for="(d, i) in content"
        :id="'circle_'+i"
        :key="i"
        :cx="scaleX(d[catAxis]) + barWidth / 2"
        :cy="scaleY(d[valAxis])"
        :r="4"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
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
  <!-- Display = none is specified for printing -->
      <text
        v-for="(d, i) in content"
        filter="url(#solid)"
        :id="'label_'+i"
        :key="i + '_textx'"
        :ref="i + '_textx'"
        class="label invisible"
        display="none"
        :x="scaleX(d[catAxis]) + barWidth / 2"
        :y="scaleY(d[valAxis])-10"
        text-anchor="middle"
      >{{ d[catAxis] }}: {{ d[valAxis].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</text>      
    </g>
  </svg>
</template>
<script>
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  extent,
  select,
  line,
  curveCardinal
} from "d3"
import ChartAxisBottom from "./ChartAxisBottom.vue"
import ChartAxisLeft from "./ChartAxisLeft.vue"

export default {
  name: "lineChart",
  components: {
    ChartAxisBottom,
    ChartAxisLeft
  },
  props: {
    content: Array,
    catAxis: String,
    valAxis: String,
    xistime: Boolean,
    max: Number,
    min: Number

  },
  data() {
    return {
      id: "lineSvg",
      margin: {
        left: 100,
        top: 30,
        right: 30,
        bottom: 60
      },
      width: "100%",
      height: null,
      xid: "x0",
      yid: "y0",
      timeout: false,
      sizeSet: false,
      rangeTimeout: false
    }
  },
  computed: {
    graphid: function() {
      return this._uid
    },
    svg() {
      return select(`#${this.id}`)
    },
    scaleX() {
      // if (this.xistime) {
      //   return scaleTime()
      //     .domain(extent(this.content, (d) => d[this.catAxis]))
      //     .range([0, this.width - this.margin.left - this.margin.right])
      // }
      return scaleBand()
        .domain(this.content.map((d) => d[this.catAxis]))
        .range([0, this.width - this.margin.left - this.margin.right])
    },
    scaleY() {
      if (this.min < 0) {
        return scaleLinear()
          .domain([this.min, this.max])
          .range([this.height - this.margin.top - this.margin.bottom, 0]);
      } else {
        return scaleLinear()
          .domain([0, this.max])
          .range([this.height - this.margin.top - this.margin.bottom, 0]);
      }
    },
        zeroLine() {
      return this.scaleY(0);
    },
    drawLine() {
      return line()
        .x((d) => this.scaleX(d[this.catAxis]) + this.barWidth / 2)
        .y((d) => this.scaleY(d[this.valAxis]))
        .curve(curveCardinal)
    },
    barWidth() {
      return (
        (this.width - this.margin.left - this.margin.right) /
        this.content.length
      )
    },
        tickpadd() {
      return (
        this.height - this.margin.top - this.margin.bottom - this.zeroLine + 5
      );
    }
  },
  methods: {
    updateGraph() {
      const client = this.$el.getBoundingClientRect()
      this.width = client.width
      this.height = client.height
      // force axes to update according to the size
      this.refreshAxes()
    },
    onResize() {
      // clear the timeout
      clearTimeout(this.timeout)
      // start timing for event "completion"
      this.timeout = setTimeout(this.updateGraph, 250)
    },
    onMouseOver(event) {
      let chartid = event.target.parentNode.parentNode.id
      let groupid = event.target.id.split("_")[1]
      select("#"+chartid).select("#label_"+groupid).classed("invisible",false)
      select("#"+chartid).select("#label_"+groupid).style("display","inline")


    },
    onMouseLeave(event) {
      let chartid = event.target.parentNode.parentNode.id
      let groupid = event.target.id.split("_")[1]
      select("#"+chartid).select("#label_"+groupid).classed("invisible",true)
      select("#"+chartid).select("#label_"+groupid).style("display","none")


    },
    refreshAxes() {
      // force axes to update according to the size
      this.xid = this.xid === "x_0" ? "x_1" : "x_0"
      this.yid = this.yid === "y_0" ? "y_1" : "y_0"
    }
  },
  watch: {
    content: function (val) {
      clearTimeout(this.rangeTimeout)
      this.rangeTimeout = setTimeout(this.refreshAxes, 250)
    }
  },
  mounted() {
    // window.resize event listener
    window.addEventListener("resize", this.onResize)
    this.updateGraph()
    this.sizeSet = true
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  }
}
</script>
<style scoped>
div {
  /* margin-top: 5%;
  margin-left: 5%; */
  background: white;
}
.line,
.label {
  transition: 0.2s;
  pointer-events: none;
}
.line {
  stroke: #ff7c44;
}
rect {
  pointer-events: all;
}
circle {
  fill:#4a4a4a;
  opacity: 0;
}
circle:hover{
  opacity: 1;
}
.invisible {
  display:none;
}
svg{
  overflow: visible;
}
</style>
