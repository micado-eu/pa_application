<template>
  <div>
    <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>Refugee influx - Mediterranean Situation</h6>
          <p><strong>description: </strong>Persecution, conflict and poverty forced over 1 million people to flee to Europe in 2015. Many came seeking safety for themselves and their families, risking their lives and facing a treacherous journey</p>
          <p><strong>data provider: </strong>EU</p>
          <p><strong>updated time: </strong>2019.07</p>
        </div>
      </div>
      <lineChart
        class="chart"
        :lineData="timeseries"
        :timeColumn="'unix_timestamp'"
        :valueColumn="'individuals'"
      />
    </div>
    <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>Demographic composition</h6>
          <p><strong>description: </strong></p>
          <p><strong>data provider: </strong>EU</p>
          <p><strong>updated time: </strong>2019.07</p>
        </div>
      </div>
      <pieChart
        class="chart"
        :pieData="origins"
        :labelColumn="'pop_origin_name'"
        :valueColumn="'individuals'"
      />
    </div>
    <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>Personen § 3 AsylbLG</h6>
          <p><strong>description: </strong></p>
          <p><strong>data provider: </strong>EU</p>
          <p><strong>updated time: </strong>2019.07</p>
        </div>
      </div>
      <barChart
        class="chart"
        :lineData="migrants"
        :timeColumn="'unix_timestamp'"
        :valueColumn="'AsylbLG3'"
      />
    </div>
        <div id="row">
      <div class="info">
        <div class="info-content">
          <h6>Personen § 2 AsylbLG</h6>
          <p><strong>description: </strong></p>
          <p><strong>data provider: </strong>EU</p>
          <p><strong>updated time: </strong>2019.07</p>
        </div>
      </div>
      <barChart
        class="chart"
        :lineData="migrants"
        :timeColumn="'unix_timestamp'"
        :valueColumn="'AsylbLG2'"
      />
    </div>
    <div id="map-row">
      <div class="mock-body">
        <div class="mock-content">
          <div class="map-background">
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * this is a map view rendered using Masterportal API (https://bitbucket.org/geowerkstatt-hamburg/masterportalapi/src/master/)
 * documentation and examples are available in the corresponding node_module folder
 */
import { Style, Stroke, Fill } from "ol/style.js";
import * as mpapi from "masterportalAPI";
import services from "../api/map/config/services.json";
import portalConfig from "../api/map/config/portal.json";
import localGeoJSON from "../api/map/config/localGeoJSON.js";
import lineChart from "./migration_monitor/lineChart";
import pieChart from "./migration_monitor/pieChart";
import barChart from "./migration_monitor/barChart";

export default {
  name: "MpMap",
  components: {
    lineChart,
    pieChart,
    barChart
  },
  computed: {
    timeseries: function() {
      return this.$store.state.statistics.timeseries.data.timeseries;
    },
    origins: function() {
      return this.$store.state.statistics.origin.data;
    },
    migrants: function() {
      return this.$store.state.statistics.migrants.data.migrants;
    }
  },
  mounted: function() {
    const hamburgServicesUrl =
      "http://geoportal-hamburg.de/lgv-config/services-internet.json";

    //* Cleans up map before it is re-rendered (happens on every save during dev mode)
    document.getElementById(portalConfig.target).innerHTML = "";

    //* Fake service that holds client-side prepared geojson; also nice to test automatic transformation since data is in WGS 84
    const localService = {
      id: "2002",
      typ: "GeoJSON",
      features: localGeoJSON
    };
    services.push(localService);

    //* geojson styling function call to override default styling
    mpapi.geojson.setCustomStyles({
      MultiPolygon: new Style({
        stroke: new Stroke({
          width: 2,
          color: "#000000"
        }),
        fill: new Fill({
          color: "#FFFFFF55"
        })
      })
    });

    //* SYNCHRONOUS EXAMPLE: layerConf is known
    window.mpapi.map = mpapi.createMap({
      ...portalConfig,
      layerConf: services
    });
    ["2001", "2002"].forEach(id => window.mpapi.map.addLayer(id));
  }
};
</script>

<style>
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
