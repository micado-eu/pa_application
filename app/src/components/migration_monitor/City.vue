<template>
  <div>
    <div id="nav">
      <router-link v-for="(d,i) in anchor" :key="i" :to="'#'+d.title" class="col">
        <div class="anchor">
          <p>
            <q-icon :name="d.icon" />
          </p>
          <p>{{d.title}}</p>
        </div>
      </router-link>
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
  name: "MigrationSituation",
  components: {
    Chart
  },
  data: function() {
    return {
      graph_data: [],
      anchor: [
        { title: "incoming", link: "", icon: "directions_run" },
        { title: "accommodation", link: "", icon: "local_hotel" },
        { title: "integration", link: "", icon: "how_to_reg" },
        { title: "return", link: "", icon: "airplanemode_active" }
      ]
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
};
</script>

<style scoped>
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
