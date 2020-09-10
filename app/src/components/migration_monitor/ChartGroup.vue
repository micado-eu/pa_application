<template>
  <div :id="category">
    <div class="row">
      <h5>{{category}}</h5>
    </div>
    <div class="row">
      <div v-for="(d,i) in graph_data" :key="i" class="col-12">
        <Chart :graph-data="d" @chart-clicked="sendData" />
      </div>
    </div>
  </div>
</template>

<script>
import { Style, Stroke, Fill } from "ol/style.js";
import * as mpapi from "masterportalAPI";
import services from "../../api/map/config/services.json";
import portalConfig from "../../api/map/config/portal.json";
import localGeoJSON from "../../api/map/config/localGeoJSON.js";
import Chart from "./chart/Chart";

export default {
  name: "ChartGroup",
  components: {
    Chart,
  },
  props: ["category", "board"],
  data: function () {
    return {
      graph_data: [],
    };
  },
  computed: {
    charts: function () {
      return [
        ...this.$store.state.statistics.charts,
        // FIXME: mockdata for map chart
        {
          board: "hamburg",
          category: "incoming",
          content: "",
          description: "bla",
          format: "csv",
          title: "TEST MAP",
          type: "MAP",
        },
      ];
    },
  },
  methods: {
    sendData: function (grahDataId) {
      console.log("group:",grahDataId);
      this.$emit("group-clicked", grahDataId);
    },
  },
  mounted: function () {
    this.graph_data = [];
    this.charts.forEach((c) => {
      if (c.board === this.board && c.category === this.category) {
        this.graph_data.push(c);
      }
    });
  },
};
</script>

<style scoped>
h5 {
  margin: 0;
  padding-top: 75px;
}
h6 {
  display: inline-block;
}
#nav {
  display: flex;
  position: sticky;
  top: 50px;
}
.col {
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
}
.anchor {
  width: max-content;
  text-align: center;
  padding: 20px;
}
.anchor:hover {
  color: #ff7c44;
}
.row {
  width: 90%;
  margin: auto;
}
p {
  margin: 0;
}
.q-icon {
  font-size: 24px;
}
</style>
