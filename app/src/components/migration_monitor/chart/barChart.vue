<template>
  <svg :width="width" :height="height" :id="id">
    <g
      v-if="sizeSet"
      :transform="'translate(' + margin.left + ',' + margin.top + ')'"
    >
      <rect
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
      />
      <!-- For print function to work, "display: none" has to be inline -->
      <text
        v-for="(d, i) in content"
        :key="i + '_texty'"
        :ref="i + '_texty'"
        class="label"
        display="none"
        :x="scaleX(d[catAxis]) + barWidth / 2"
        :y="scaleY(d[valAxis])"
        text-anchor="middle"
      >
        {{ d[valAxis] }}
      </text>
      <!-- For print function to work, "display: none" has to be inline -->
      <text
        v-for="(d, i) in content"
        :key="i + '_textx'"
        :ref="i + '_textx'"
        class="label"
        display="none"
        :x="scaleX(d[catAxis]) + barWidth / 2"
        :y="height - margin.top - margin.bottom"
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
      sizeSet: false
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
      return (
        scaleLinear()
          // .domain(extent(this.content, d => d[this.valAxis]))
          .domain([0, Math.max(...this.content.map((d) => d[this.valAxis]))])
          .range([this.height - this.margin.top - this.margin.bottom, 0])
      )
    },
    barWidth() {
      return (
        (this.width - this.margin.left - this.margin.right) /
        this.content.length
      )
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
      console.log("i: ",`${i}_textx`)
      console.log("i: ",this.$refs)

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
