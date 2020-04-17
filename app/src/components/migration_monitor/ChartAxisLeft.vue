<template>
  <g class="yAxis"></g>
</template>

<script>
import { select, axisLeft, ScaleLinear } from "d3";

export default {
  name: "ChartAxisLeft",
  props: ["scaleY"],
  computed: {
    axisY: function() {
      return axisLeft(this.scaleY);
    }
  },
  mounted() {
    this.svgAxisY = select(this.$el)
      .append("g")
      .call(this.axisY.tickSize(2))
      .attr("stroke", "white");
    this.svgAxisY.select("path").style("stroke", "white");
    this.svgAxisY.selectAll("line").style("stroke", "white");
  }
};
</script>
