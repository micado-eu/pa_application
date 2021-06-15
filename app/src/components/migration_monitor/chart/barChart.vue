<template>
  <svg :width="width" :height="height" :id="'c_'+graphid">
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

      <rect
        v-for="(d, i) in content"
        :key="i + '_rect'"
        :id="i + '_rect'"
        :ref="i + '_rect'"
        :x="scaleX(d[catAxis])+(barWidth*0.5)*(1/0.8)/4"
        :y="d[valAxis] > 0 ? scaleY(d[valAxis]) : zeroLine"
        :fill="istime ? d[valAxis] > 0 ? '#0b91ce' : '#C71f40' : interpolateViridis(Math.random())"
        :width="barWidth"
        :height="Math.abs(zeroLine - scaleY(d[valAxis]))"
        stroke="white"
        stroke-width="1px"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      />
      <!-- For print function to work, "display: none" has to be inline -->
      <!-- Label for value (y-axis) -->
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
        v-for="(d, i) in content"
        :key="i + '_texty'"
        :ref="i + '_texty'"
        class="label"
        display="none"
        filter="url(#solid)"
        :x="scaleX(d[catAxis])+(barWidth*0.5)*(1/0.8)"
        :y="scaleY(d[valAxis])"
        text-anchor="middle"
      >
        {{ d[catAxis] }}: {{ d[valAxis].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}
      </text>
      <!-- For print function to work, "display: none" has to be inline -->
      <!-- Label for date (x-axis) -->
      <!-- <text
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
      </text> -->
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
  </svg>
</template>
<script>
import {
  scaleLinear,
  scaleTime,
  scaleBand,
  extent,
  select,
  tickPadding,
  axis,
  interpolateViridis
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
    content: Array,
    catAxis: String,
    valAxis: String,
    xistime: Boolean,
    max: Number,
    min: Number
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
    };
  },
  computed: {
    graphid: function() {
      return this._uid
    },
    svg() {
      return select(`#${this.id}`);
    },
    scaleX() {
      //Commented, becaue istime has bugs in asssigning the correct date
      // if (this.xistime) {
      //   return scaleTime()
      //     .domain(extent(this.content, (d) => d[this.catAxis]))
      //     .range([0, this.width - this.margin.left - this.margin.right]);
      // }
      return scaleBand()
        .domain(this.content.map((d) => d[this.catAxis]))
        .range([0, this.width - this.margin.left - this.margin.right]);
    },
    zeroLine() {
      return this.scaleY(0);
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
    barWidth() {
      return (
        (this.width - this.margin.left - this.margin.right) /
        this.content.length
      )*0.8;
    },
    tickpadd() {
      return (
        this.height - this.margin.top - this.margin.bottom - this.zeroLine + 5
      );
    },
    interpolateViridis: function() {
      return interpolateViridis
    },
    istime: function () {
      if (this.xistime === null) {
        return true
      }
      return this.xistime
    }
  },
  methods: {
    updateGraph() {
      const client = this.$el.getBoundingClientRect();
      this.width = client.width;
      this.height = client.height;
      this.refreshAxes();
    },
    refreshAxes() {
      // force axes to update according to the size
      this.xid = this.xid === "x_0" ? "x_1" : "x_0";
      this.yid = this.yid === "y_0" ? "y_1" : "y_0";
    },
    onResize() {
      // clear the resizeTimeout
      clearTimeout(this.resizeTimeout);
      // start timing for event "completion"
      this.resizeTimeout = setTimeout(this.updateGraph, 250);
    },
    onMouseOver(event) {
      const texty = this.$refs[`${event.target.id.split("_")[0]}_texty`][0];
      texty.style.display = "inline";
    },
    onMouseLeave(event) {
      const texty = this.$refs[`${event.target.id.split("_")[0]}_texty`][0];
      texty.style.display = "none";
    }
  },
  watch: {
    content: function (val) {
      clearTimeout(this.rangeTimeout);
      this.rangeTimeout = setTimeout(this.refreshAxes, 250);
    }
  },
  mounted() {
    // window.resize event listener
    window.addEventListener("resize", this.onResize);
    this.updateGraph();
    this.sizeSet = true;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style scoped>
div {
  background: white;
}
.label {
  transition: 0.2s;
  pointer-events: none;
}
svg{
  overflow: visible;
}
</style>
