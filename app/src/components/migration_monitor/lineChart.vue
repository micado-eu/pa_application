<template>
  <svg :width="width" :height="height" :id="id">
    <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
      <path :d="drawLine(lineData)" stroke="#ecbc3a" />
      <circle
        v-for="(d,i) in lineData"
        :key="i"
        :cx="scaleX(new Date(d[timeColumn]*1000))"
        :cy="scaleY(d[valueColumn])"
        :r="2"
        fill="#3490DC"
      />
    </g>
    <ChartAxisBottom
      :scaleX="scaleX"
      :key = "axisBottomKey"
      :transform="'translate(' + margin.left + ', ' + (height - margin.bottom) + ')'"
    />
    <ChartAxisLeft
      :scaleY="scaleY"
      :key = "axisLeftKey"
      :transform="'translate(' + margin.left + ', ' + margin.top + ')'"
    />
  </svg>
</template>
<script>
import {
  scaleLinear,
  scaleTime,
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
  name: "lineChart",
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
      id: "lineSvg",
      margin: {
        left: 100,
        top: 20,
        right: 20,
        bottom: 50
      },
      width: '100%',
      height: '100%',
      axisBottomKey: 'axisBottom',
      axisLeftKey: 'axisLeft'
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
    scaleY: function() {
      return scaleLinear()
        .domain(extent(this.lineData, d => d[this.valueColumn]))
        .range([this.height - this.margin.top - this.margin.bottom, 0]);
    },
    drawLine: function() {
      return line()
        .x(d => this.scaleX(new Date(d[this.timeColumn] * 1000)))
        .y(d => this.scaleY(d[this.valueColumn]))
        .curve(curveCardinal);
    }
  },
  methods: {
  },
  mounted: function() {
    const client = this.$el.getBoundingClientRect();
    console.log("rect: ",this.$el.getBoundingClientRect());
    this.width = client.width;
    this.height = client.height;
    // force axes to update according to the size
    this.axisBottomKey = 'axisBottomReady';
    this.axisLeftKey = 'axisLeftReady';
  }
};
</script>
<style scoped>
svg {
  background-color: null;
}
path {
  fill: none;
  stroke: #99E6B4;
  stroke-width: 3px;
}
</style>
