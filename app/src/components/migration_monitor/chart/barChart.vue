<template>
  <svg :width="width" :height="height" :id="id">
    <g
      v-if="sizeSet"
      :transform="'translate(' + margin.left + ',' + margin.top + ')'"
    >
      <rect
        v-for="(d,i) in lineData"
        :key="i+'_rect'"
        :id="i+'_rect'"
        :ref="i+'_rect'"
        :x="scaleX(d[timeColumn])"
        :y="scaleY(d[valueColumn])"
        :width="barWidth"
        :height="height - scaleY(d[valueColumn]) - margin.top - margin.bottom"
        fill='#99e6b4'
        stroke='white'
        stroke-width='1px'
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      />
      <text
        v-for="(d,i) in lineData"
        :key="i+'_label'"
        :ref="i+'_label'"
        class="label"
        :x="scaleX(d[timeColumn])+barWidth/2"
        :y="scaleY(d[valueColumn])"
        text-anchor="middle"
      >{{d[valueColumn]}}</text>
    </g>
    <text
      v-if="sizeSet"
      :x="-margin.top - height/2"
      :y="margin.left/2"
      text-anchor="middle"
      transform="rotate(-90)"
    >{{valueColumn}}</text>
    <text
      v-if="sizeSet"
      :x="width/2 "
      :y="height - margin.bottom/2.4"
      text-anchor="middle"
    >{{timeColumn}}</text>
    <ChartAxisBottom
      v-if="sizeSet"
      :scaleX="scaleX"
      :key="xid"
      :transform="'translate(' + margin.left + ', ' + (height - margin.bottom) + ')'"
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
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  extent,
  select
} from 'd3'
import ChartAxisBottom from './ChartAxisBottom.vue'
import ChartAxisLeft from './ChartAxisLeft.vue'

export default {
  name: 'barChart',
  components: {
    ChartAxisBottom,
    ChartAxisLeft
  },
  props: {
    lineData: Array,
    timeColumn: String,
    valueColumn: String,
    xistime: Boolean
  },
  data() {
    return {
      id:'barSvg',
      margin: {
        left: 100,
        top: 30,
        right: 30,
        bottom: 60
      },
      width: '100%',
      height: '70%',
      xid: 'x0',
      yid: 'y0',
      resizeTimeout: false,
      rangeTimeout:false,
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
          .domain(extent(this.lineData, (d) => d[this.timeColumn]))
          .range([0, this.width - this.margin.left - this.margin.right])
      }
      return scaleBand()
        .domain(this.lineData.map((d) => d[this.timeColumn]))
        .range([0, this.width - this.margin.left - this.margin.right])
    },
    scaleY() {
      return (
        scaleLinear()
          // .domain(extent(this.lineData, d => d[this.valueColumn]))
          .domain([
            0,
            Math.max(...this.lineData.map((d) => d[this.valueColumn]))
          ])
          .range([this.height - this.margin.top - this.margin.bottom, 0])
      )
    },
    barWidth() {
      return (
        (this.width - this.margin.left - this.margin.right)
        / this.lineData.length
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
    refreshAxes(){
      // force axes to update according to the size
      this.xid = this.xid === 'x_0' ? 'x_1' : 'x_0'
      this.yid = this.yid === 'y_0' ? 'y_1' : 'y_0'
    },
    onResize() {
      // clear the resizeTimeout
      clearTimeout(this.resizeTimeout)
      // start timing for event "completion"
      this.resizeTimeout = setTimeout(this.updateGraph, 250)
    },
    onMouseOver(event) {
      const label = this.$refs[`${event.target.id.split('_')[0]}_label`][0]
      label.style.opacity = 1
    },
    onMouseLeave(event) {
      const label = this.$refs[`${event.target.id.split('_')[0]}_label`][0]
      label.style.opacity = 0
    }
  },
  watch: {
    lineData: function (val) {
      clearTimeout(this.rangeTimeout)
      this.rangeTimeout = setTimeout(this.refreshAxes, 250)
    }
  },
  mounted() {
    // window.resize event listener
    window.addEventListener('resize', this.onResize)
    this.updateGraph()
    this.sizeSet = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
<style scoped>
div {
  /* margin-top: 5%;
  margin-left: 5%; */
  background: white;
}
.label {
  opacity: 0;
  transition: 0.2s;
}
</style>
