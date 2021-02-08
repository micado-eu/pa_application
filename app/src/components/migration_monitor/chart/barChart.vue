<template>
  <svg :width="width" :height="height" :id="id">
    <g
      v-if="sizeSet"
      :transform="'translate(' + margin.left + ',' + margin.top + ')'"
    >
      <!-- <rect
        v-for="(d, i) in content"
        :key="i + '_rect'"
        :id="i + '_rect'"
        :ref="i + '_rect'"
        :x="scaleX(d[catAxis])"
        :y="scaleY(d[valAxis])"
        :width="barWidth"
        :height="height - scaleY(d[valAxis]) - margin.top - margin.bottom"
        fill="#99e6b4"
        stroke="white"
        stroke-width="1px"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      /> -->
      <rect
        v-for="(d, i) in content"
        :key="i + '_rect'"
        :id="i + '_rect'"
        :ref="i + '_rect'"
        :x="scaleX(d[catAxis])"
        :y="getY(d).pos"
        :fill="getfill(d)"
        :width="barWidth"
        :height="getY(d).colheight"
        stroke="white"
        stroke-width="1px"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      />
    </rect>
    <!-- rect above was not closed -->

      <!-- For print function to work, "display: none" has to be inline -->
      <!-- Label for value (y-axis) -->
      <text
        v-for="(d, i) in content"
        :key="i + '_texty'"
        :ref="i + '_texty'"
        class="label"
        display="none"
        :x="scaleX(d[catAxis]) + barWidth / 2"
        :y="getY(d).pos-5"
        text-anchor="middle"
      >
        {{ d[valAxis] }}
      </text>
      <!-- For print function to work, "display: none" has to be inline -->
      <!-- Label for date (x-axis) -->
      <text
        v-for="(d, i) in content"
        :key="i + '_textx'"
        :ref="i + '_textx'"
        class="label"
        display="none"
        :x="scaleX(d[catAxis]) + barWidth / 2"
        :y="height - margin.top - margin.bottom + 15"
        text-anchor="middle"
      >
        {{ d[catAxis] }}
      </text>
    </g>
    <text
      v-if="sizeSet"
      :x="-margin.top - height / 2"
      :y="margin.left / 2"
      text-anchor="middle"
      transform="rotate(-90)"
    >
      {{ valAxis }}
    </text>
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
      :transform="
        'translate(' + margin.left + ', ' + (height - margin.bottom) + ')'
      "
    />
    <ChartAxisLeft
      v-if="sizeSet"
      :scaleY="scaleY"
      :key="yid"
      :transform="'translate(' + margin.left + ', ' + margin.top + ')'"
    />
  </svg>
</template>
<script>
import { scaleLinear, scaleTime, scaleBand, extent, select } from "d3"
import ChartAxisBottom from "./ChartAxisBottom.vue"
import ChartAxisLeft from "./ChartAxisLeft.vue"

export default {
  name: "barChart",
  components: {
    ChartAxisBottom,
    ChartAxisLeft
  },
  props: {
    content: Array,
    catAxis: String,
    valAxis: String,
    xistime: Boolean
  },
  data() {
    return {
      id: "barSvg",
      margin: {
        left: 100,
        top: 30,
        right: 30,
        bottom: 60
      },
      width: "100%",
      height: "55%",
      xid: "x0",
      yid: "y0",
      resizeTimeout: false,
      rangeTimeout: false,
      sizeSet: false,
    }
  },
  computed: {
    svg() {
      return select(`#${this.id}`)
    },
    scaleX() {
      if (this.xistime) {
        return scaleTime()
          .domain(extent(this.content, (d) => d[this.catAxis]))
          .range([0, this.width - this.margin.left - this.margin.right])
      }
      return scaleBand()
        .domain(this.content.map((d) => d[this.catAxis]))
        .range([0, this.width - this.margin.left - this.margin.right])
    },
    scaleY() {
      let minvalue = Math.min(...this.content.map((d) => d[this.valAxis]));
      if (minvalue < 0){
        return (
          scaleLinear()
            // .domain(extent(this.content, d => d[this.valAxis]))
            .domain([Math.min(...this.content.map((d) => d[this.valAxis])), Math.max(...this.content.map((d) => d[this.valAxis]))])
            .range([this.height - this.margin.top - this.margin.bottom, 0])
        )
      } else {
        return (
          scaleLinear()
            // .domain(extent(this.content, d => d[this.valAxis]))
            .domain([0, Math.max(...this.content.map((d) => d[this.valAxis]))])
            .range([this.height - this.margin.top - this.margin.bottom, 0])
        )
      }
    },
    getY(){
      return function(d){
        let value = d[this.valAxis] //value of data entry
        let height = this.height-this.margin.top-this.margin.bottom //height of container
        let maxvalue = Math.max(...this.content.map((d) => d[this.valAxis])) //maximum value in data entry
        let minvalue = Math.min(...this.content.map((d) => d[this.valAxis])) //minimum value in data entry
        var range
        var pos
        var colheight
        if (minvalue<0){
          range = maxvalue+Math.abs(minvalue)
          colheight=(Math.abs(value)/range)*height
          if (value<0){
            pos=((range+minvalue)/range)*height
          } else{
            pos=((range+minvalue-Math.abs(value))/range)*height
          }
        } else {
          range = maxvalue
          pos=((range-value)/range)*height
          colheight=(value/range)*height
        }
        return {"pos":pos,"colheight":colheight}

      }
    },
    barWidth() {
      return (
        (this.width - this.margin.left - this.margin.right) /
        this.content.length
      )
    },
    getfill(){
      return function(d){
        if (d[this.valAxis]>0){
          return "#0b91ce"
        } else {
          return "#C71f40"
        }
      }
    }
  },
  methods: {
    updateGraph() {
      const client = this.$el.getBoundingClientRect()
      this.width = client.width
      this.height = client.height
      this.refreshAxes()
    },
    refreshAxes() {
      // force axes to update according to the size
      this.xid = this.xid === "x_0" ? "x_1" : "x_0"
      this.yid = this.yid === "y_0" ? "y_1" : "y_0"
    },
    onResize() {
      // clear the resizeTimeout
      clearTimeout(this.resizeTimeout)
      // start timing for event "completion"
      this.resizeTimeout = setTimeout(this.updateGraph, 250)
    },
    onMouseOver(event) {
      const textx = this.$refs[`${event.target.id.split("_")[0]}_textx`][0]
      const texty = this.$refs[`${event.target.id.split("_")[0]}_texty`][0]
      textx.style.display = "inline"
      texty.style.display = "inline"
    },
    onMouseLeave(event) {
      const textx = this.$refs[`${event.target.id.split("_")[0]}_textx`][0]
      const texty = this.$refs[`${event.target.id.split("_")[0]}_texty`][0]
      textx.style.display = "none"
      texty.style.display = "none"
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
    for (let i=0;i<this.content.length;i++) {
      // console.log("i: ",`${i}_textx`)
      // console.log("i: ",this.$refs)
      const textx = this.$refs[`${i}_textx`][0]
      const texty = this.$refs[`${i}_texty`][0]
      textx.style.display = "none"
      texty.style.display = "none"
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize)
  }
}
</script>
<style scoped>
div {
  background: white;
}
.label {
  transition: 0.2s;
  pointer-events: none;
}
</style>
