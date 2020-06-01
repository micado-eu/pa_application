<template>
  <div :id="category">
    <div class="row">
      <h5>{{category}}</h5>
    </div>
    <div class="row">
      <div v-for="(d,i) in graph_data" :key="i" class="col-12 col-lg-6">
        <Chart :graph-data="d" />
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
    Chart
  },
  props: ["category"],
  data: function() {
    return {
      graph_data: []
    };
  },
  computed: {
    city_graphs: function() {
      return JSON.parse(
        JSON.stringify(this.$store.state.statistics.city_graphs)
      );
    }
  },
  mounted: function() {
    this.graph_data = [];
    for (let i = 0; i < this.city_graphs.length; i++) {
      if (this.city_graphs[i].category === this.category) {
        const graphObj = { ...this.city_graphs[i] };
        graphObj.content.forEach(item => {
          item[graphObj.x] = new Date(item[graphObj.x][0]).getTime() / 1000;
          item[graphObj.y] = parseInt(item[graphObj.y][0]);
        });
        if (graphObj.xIsTime) {
          graphObj.content = graphObj.content.sort(
            (a, b) => b[graphObj.x] - a[graphObj.x]
          );
        }
        this.graph_data.push(graphObj);
      }
    }
  }
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
