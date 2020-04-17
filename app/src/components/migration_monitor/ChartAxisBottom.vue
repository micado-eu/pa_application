<template>
  <g></g>
</template>

<script >
import { select, axisBottom, ScaleTime } from "d3";

export default {
  name: "ChartAxisBottom",
  props: ["scaleX"],
  computed: {
    axisX: function() {
      return axisBottom(this.scaleX);
    }
  },
  mounted() {
    this.svgAxisX = select(this.$el)
      .append("g")
      .call(this.axisX.tickSize(2))
      .attr("stroke", "white");
    // use post-selection to change axis color
    this.svgAxisX.select("path").style('stroke','white');
    this.svgAxisX.selectAll("line").style('stroke','white');
  }
};
</script>
