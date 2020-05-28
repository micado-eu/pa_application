<template>
  <div>
    <div id="nav">
      <router-link v-for="(d,i) in anchor" :key="i" :to="'#'+d.title" class="col">
        <h6>{{d.title}}</h6>
      </router-link>
    </div>
    <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>{{graph_data[0].title}}</h6>
          <p>
            <strong>description:</strong>
          </p>
          <p>
            <strong>data provider:</strong>EU
          </p>
          <p>
            <strong>updated time:</strong>2019.07
          </p>
        </div>
      </div>
      <lineChart
        class="chart"
        :lineData="graph_data[0].content"
        :timeColumn="'parseDate'"
        :valueColumn="'parseY'"
      />
    </div>
    <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>{{graph_data[1].title}}</h6>
          <p>
            <strong>description:</strong>
          </p>
          <p>
            <strong>data provider:</strong>EU
          </p>
          <p>
            <strong>updated time:</strong>2019.07
          </p>
        </div>
      </div>
      <lineChart
        class="chart"
        :lineData="graph_data[1].content"
        :timeColumn="'parseDate'"
        :valueColumn="'parseY'"
      />
    </div>
  </div>
</template>

<script>
import { Style, Stroke, Fill } from "ol/style.js";
import * as mpapi from "masterportalAPI";
import services from "../../api/map/config/services.json";
import portalConfig from "../../api/map/config/portal.json";
import localGeoJSON from "../../api/map/config/localGeoJSON.js";
import lineChart from "./lineChart";
import pieChart from "./pieChart";
import barChart from "./barChart";

export default {
  name: "MigrationSituation",
  components: {
    lineChart,
    pieChart,
    barChart
  },
  data: function() {
    return {
      graph_data: [],
      anchor: [
        { title: "incoming", link: "" },
        { title: "accommodation", link: "" },
        { title: "integration", link: "" },
        { title: "return", link: "" }
      ]
    };
  },
  computed: {
    city_graphs: function() {
      return [...this.$store.state.statistics.mapping.city.incoming];
    }
  },
  mounted: function() {
    this.graph_data = [];
    console.log("!!!!!!!!! ", this.city_graphs);
    for (let i = 0; i < this.city_graphs.length; i++) {
      const graphObj = { ...this.city_graphs[i] },
        data = { ...this.$store.state.statistics[graphObj.id] },
        resolve = graphObj.resolve;
      graphObj.content = eval("data" + resolve);
      graphObj.content.forEach(item => {
        item.parseDate = new Date(item[graphObj.date][0]).getTime() / 1000;
        item.parseY = parseInt(item[graphObj.y][0]);
      });
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
}
.col {
  flex: 1;
  text-align: center;
}
.mock-body {
  flex: 1;
}
.mock-content {
  padding: 1em;
  color: black;
  background: white;
  /* display: flex; */
  /* flex-direction: column; */
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.56);
  border-radius: 5px;
}

/* Not part of MPAPI, but really nice if no background image is configured. */
.map-background {
  background: #22222222;
}
#row {
  height: 400px;
  display: flex;
  margin: auto;
  width: 90%;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.56);
}
#map-row {
  display: flex;
  margin: auto;
  width: 90%;
  margin-top: 20px;
}
.chart {
  flex: 9;
}
.info {
  flex: 3;
}
.info-content {
  margin: 50px;
}
</style>
