<template>
  <g></g>
</template>

<script >
import { select, axisBottom } from 'd3'

export default {
  name: 'ChartAxisBottom',
  props: ['scaleX','length','tickpadd'],
  computed: {
    axisX() {
      return axisBottom(this.scaleX)
      // making sure the ticks are not too compact
      .tickFormat((x, i) => i % Math.floor(this.length/5) ? "" : x)
      .tickPadding([this.tickpadd])
    }
  },
  mounted() {
    this.svgAxisX = select(this.$el)
      .append('g')
      .call(this.axisX.tickSize(2))
      // .selectAll("text")
      // .attr("dx","-.5em")
      // .attr("text-anchor","end")
      // .attr("transform", "rotate(-65)");

    //   .attr("stroke", "white");
    // // use post-selection to change axis color
    // this.svgAxisX.select("path").style('stroke','white');
    // this.svgAxisX.selectAll("line").style('stroke','white');
  }
}
</script>
