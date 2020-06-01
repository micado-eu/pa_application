<template>
  <svg :width="width" :height="height" :id="id">
    <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
      <!-- <circle
        v-for="(d,i) in lineData"
        :key="i"
        :cx="scaleX(new Date(d[timeColumn]*1000))"
        :cy="scaleY(d[valueColumn])"
        :r="2"
        fill="#3490DC"
      />-->
      <rect
        v-for="(d,i) in lineData"
        :key="i"
        :x="scaleXBand(new Date(d[timeColumn]*1000))"
        :y="scaleY(d[valueColumn])"
        :width="scaleXBand.bandwidth()"
        :height="height - scaleY(d[valueColumn]) - margin.top - margin.bottom"
      />
    </g>
    <ChartAxisBottom
      :scaleX="scaleX"
      :key="xid"
      :transform="'translate(' + margin.left + ', ' + (height - margin.bottom) + ')'"
    />
    <ChartAxisLeft
      :scaleY="scaleY"
      :key="yid"
      :transform="'translate(' + margin.left + ', ' + margin.top + ')'"
    />
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
  axisBottom,
  axisLeft,
  curveCardinal
} from "d3";
import ChartAxisBottom from "./ChartAxisBottom.vue";
import ChartAxisLeft from "./ChartAxisLeft.vue";

export default {
  name: "barChart",
  components: {
    ChartAxisBottom,
    ChartAxisLeft
  },
  props: {
    lineData: Array,
    timeColumn: String,
    valueColumn: String
  },
  data: function() {
    return {
      id: "barSvg",
      margin: {
        left: 30,
        top: 30,
        right: 30,
        bottom: 30
      },
      width: "100%",
      height: "300",
      xid: "x0",
      yid: "y0",
      timeout: false
    };
  },
  computed: {
    svg: function() {
      return select("#" + this.id);
    },
    scaleX: function() {
      return scaleTime()
        .domain(extent(this.lineData, d => new Date(d[this.timeColumn] * 1000)))
        .range([0, this.width - this.margin.left - this.margin.right]);
    },
    scaleXBand: function() {
      return scaleBand()
        .domain(this.lineData.map(d => new Date(d[this.timeColumn] * 1000)))
        .range([0, this.width - this.margin.left - this.margin.right]);
    },
    scaleY: function() {
      return scaleLinear()
        .domain(extent(this.lineData, d => d[this.valueColumn]))
        .range([this.height - this.margin.top - this.margin.bottom, 0]);
    }
  },
  methods: {
    updateGraph: function() {
      const client = this.$el.getBoundingClientRect();
      this.width = client.width - 20;
      this.height = client.height;
      // force axes to update according to the size
      this.xid = this.xid === "x_0" ? "x_1" : "x_0";
      this.yid = this.yid === "y_0" ? "y_1" : "y_0";
    },
    onResize: function() {
      // clear the timeout
      clearTimeout(this.timeout);
      // start timing for event "completion"
      this.timeout = setTimeout(this.updateGraph, 250);
    }
  },
  mounted: function() {
    // window.resize event listener
    window.addEventListener("resize", this.onResize);
    this.updateGraph();
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.onResize);
  }
};
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
  /* margin-top: 5%;
  margin-left: 5%; */
  background: white;
}
path {
  fill: none;
  stroke: #99e6b4;
  stroke-width: 3px;
}
rect {
  fill: #99e6b4;
  stroke: white;
  stroke-width: 1px;
}
</style>
